<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/projbudgetrev/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header projbudgetrev (mst_projbudgetrev)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/06/2021
 */
$API = new class extends projbudgetrevBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			 $options->criteria->not_selected = 1;

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'include_accbudget_id', '');
			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'deptbudgetrev_id', '');

			$include_accbudget_id = $options->criteria->include_accbudget_id;
			$projbudget_id = $options->criteria->projbudget_id;
	
			/* Ambil data budget departemen yang available */
			$year = $options->criteria->projbudget_year;
			$month = $options->criteria->projbudget_month;
			$dept_id = $options->criteria->dept_id;
			$stmt = $this->db->prepare("call deptbudget_get_available (:dept_id, :year, :month, '', :projbudget_id)");
			$stmt->execute([
				':dept_id' => $dept_id,
				':year' => $year,
				':month' => $month,
				':projbudget_id' => $projbudget_id
			]);


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') ",
					"dept_id" => null,
					"projbudget_id" => '--',
					"projbudget_year" => null,
					"projbudget_month" => null,
					"projbudgetrev_id" => '--',
					"include_accbudget_id" => "--",
					"not_selected" => " D.accbudget_id is null "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
						select 
						count(*) as n
						from (mst_accbudget A inner join mst_projbudgetdet B on A.accbudget_id = B.accbudget_id 
											inner join mst_projbudget C on C.projbudget_id = B.projbudget_id and C.projbudget_id = :projbudget_id) 
							left join mst_projbudgetrevdet D on D.accbudget_id = A.accbudget_id  and D.accbudget_id <> :include_accbudget_id and D.projbudgetrev_id = :projbudgetrev_id
						


					" 
					. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.accbudget_id, A.accbudget_name, A.accbudget_isdisabled, A.accbudget_descr, A.accbudgetgroup_id, A.accbudgetmodel_id, A.accbudgettype_id, A.coa_id
					, (select projbudgetdet_id from mst_projbudgetdet where projbudget_id = :projbudget_id and accbudget_id = A.accbudget_id ) as projbudgetdet_id
					, coalesce((select deptbudget_total from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id), 0) as deptbudgetdet_value
					, coalesce((select deptbudget_available from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id), 0) as deptbudgetdet_available
					from (mst_accbudget A inner join mst_projbudgetdet B on A.accbudget_id = B.accbudget_id 
										inner join mst_projbudget C on C.projbudget_id = B.projbudget_id and C.projbudget_id = :projbudget_id) 
						left join mst_projbudgetrevdet D on D.accbudget_id = A.accbudget_id  and D.accbudget_id <> :include_accbudget_id and D.projbudgetrev_id = :projbudgetrev_id
					
				" 
				. $where->sql 
				. " order by A.accbudget_id "
				. $limit
			);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$projbudgetdet = \FGTA4\utils\SqlUtility::LookupRow($record['projbudgetdet_id'], $this->db, 'mst_projbudgetdet', 'projbudgetdet_id');

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'projbudgetdet_value' => $projbudgetdet['projbudgetdet_value'],
					'projbudgetdet_qty' => $projbudgetdet['projbudgetdet_qty'],
					'projbudgetdet_task' => $projbudgetdet['projbudgetdet_task'],
					'projbudgetdet_days' => $projbudgetdet['projbudgetdet_days'],
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};