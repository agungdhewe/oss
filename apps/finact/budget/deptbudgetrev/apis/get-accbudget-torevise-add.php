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
$API = new class extends deptbudgetrevBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'include_accbudget_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'deptbudgetrev_id', '');

			$deptbudget_month = str_pad($options->criteria->deptbudget_month, 2, '0', STR_PAD_LEFT);





			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') ",
					"deptbudget_year" => '--',
					"deptbudget_month" => null,
					"dept_id" => '--',
					"deptbudgetrev_id" => " B.accbudget_id is null and A.accbudget_id not in (select accbudget_id from mst_deptbudgetrevdet where deptbudgetrev_id = :deptbudgetrev_id) or A.accbudget_id = :include_accbudget_id ",
					"include_accbudget_id" => "--",
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select 
					count(A.accbudget_id) as n
					from mst_accbudget A left outer join 
					(mst_deptbudgetdet B inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) on B.accbudget_id = A.accbudget_id and C.dept_id = :dept_id and C.deptbudget_year = :deptbudget_year
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.accbudget_id, A.accbudget_name, A.accbudget_isdisabled, A.accbudget_descr, A.accbudgetgroup_id, A.accbudgetmodel_id, A.coa_id, 
					coalesce(B.deptbudgetdet_{$deptbudget_month}, 0) as deptbudgetdet_value,
					0 as deptbudgetdet_available
					from mst_accbudget A left outer join 
					(mst_deptbudgetdet B inner join mst_deptbudget C on C.deptbudget_id = B.deptbudget_id) on B.accbudget_id = A.accbudget_id and C.dept_id = :dept_id and C.deptbudget_year = :deptbudget_year
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

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'accbudgetgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetgroup_id'], $this->db, 'mst_accbudgetgroup', 'accbudgetgroup_id', 'accbudgetgroup_name'),
					'accbudgetmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetmodel_id'], $this->db, 'mst_accbudgetmodel', 'accbudgetmodel_id', 'accbudgetmodel_name'),
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