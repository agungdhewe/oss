<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/master/accbudget/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header accbudget (mst_accbudget)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/04/2021
 */
$API = new class extends projbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$options->criteria->not_selected = 1;


			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'isdeptalloc', '0');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'include_accbudget_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'projbudget_id', '');


			$isdeptalloc = (int)$options->criteria->isdeptalloc;
			$include_accbudget_id = $options->criteria->include_accbudget_id;
			$deptbudget_month = str_pad($options->criteria->deptbudget_month, 2, '0', STR_PAD_LEFT);
			$projbudget_id = $options->criteria->projbudget_id;

			
			/* Ambil data budget departemen yang available */
			$year = $options->criteria->deptbudget_year;
			$month = $options->criteria->deptbudget_month;
			$dept_id = $options->criteria->dept_id;
			$stmt = $this->db->prepare("call deptbudget_get_available (:dept_id, :year, :month, '', :projbudget_id_exclude)");
			$stmt->execute([
				':dept_id' => $dept_id,
				':year' => $year,
				':month' => $month,
				':projbudget_id_exclude' => $projbudget_id 
			]);


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') ",
					"deptbudget_year" => " C.deptbudget_year = :deptbudget_year ",
					"deptbudget_month" => null,
					"dept_id" => " C.dept_id = :dept_id ",
				
					"projbudgetdet_id_exclude" => null,
					"include_accbudget_id" => $isdeptalloc==0 ? "--" : null,
					"projbudget_id" => $isdeptalloc==0 ? "--" : null,
					"isdeptalloc" => null,
					"not_selected" => $isdeptalloc==0 ? " D.accbudget_id is null " : null
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			if ($isdeptalloc==0) {
				$stmt = $this->db->prepare("
					select 
					count(A.accbudget_id) as n
					from (mst_accbudget A inner join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) 
							left join mst_projbudgetdet D on D.accbudget_id = A.accbudget_id  and D.accbudget_id <> :include_accbudget_id and D.projbudget_id = :projbudget_id
					" 
					. $where->sql
				);
			} else {
				$stmt = $this->db->prepare("
					select 
					count(A.accbudget_id) as n
					from (mst_accbudget A inner join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) 
					" 
					. $where->sql
				);
			}

			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			if ($isdeptalloc==0) {
				$stmt = $this->db->prepare("
						select 
						A.accbudget_id, A.accbudget_name, A.accbudget_isdisabled, A.accbudget_descr, A.accbudgetgroup_id, A.accbudgetmodel_id, A.accbudgettype_id, A.coa_id, 
						B.deptbudgetdet_{$deptbudget_month} as deptbudgetdet_value,
						coalesce((select deptbudget_available from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id), 0) as deptbudgetdet_available
						from (mst_accbudget A inner join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) 
							left join mst_projbudgetdet D on D.accbudget_id = A.accbudget_id  and D.accbudget_id <> :include_accbudget_id and D.projbudget_id = :projbudget_id
						" 
					. $where->sql 
					. " order by A.accbudget_id "
					. $limit
				);
			} else {
				$stmt = $this->db->prepare("
						select 
						A.accbudget_id, A.accbudget_name, A.accbudget_isdisabled, A.accbudget_descr, A.accbudgetgroup_id, A.accbudgetmodel_id, A.accbudgettype_id, A.coa_id, 
						B.deptbudgetdet_{$deptbudget_month} as deptbudgetdet_value,
						coalesce((select deptbudget_available from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id), 0) as deptbudgetdet_available
						from (mst_accbudget A inner join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) 
						" 
					. $where->sql 
					. " order by A.accbudget_id "
					. $limit
				);

			}

			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					'accbudgetgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetgroup_id'], $this->db, 'mst_accbudgetgroup', 'accbudgetgroup_id', 'accbudgetgroup_name'),
					'accbudgetmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetmodel_id'], $this->db, 'mst_accbudgetmodel', 'accbudgetmodel_id', 'accbudgetmodel_name'),
					'accbudgettype_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgettype_id'], $this->db, 'mst_accbudgettype', 'accbudgettype_id', 'accbudgettype_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					 
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