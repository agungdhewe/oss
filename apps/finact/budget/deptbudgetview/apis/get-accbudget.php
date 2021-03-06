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
$API = new class extends deptbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$options->criteria->not_selected = 1;

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'include_accbudget_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'deptbudget_id', '');

			$include_accbudget_id = $options->criteria->include_accbudget_id;
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') ",
					"accbudget_isdisabled" => " A.accbudget_isdisabled = :accbudget_isdisabled ",
					"deptbudget_id" => "--",
					"include_accbudget_id" => "--",
					"not_selected" => " B.accbudget_id is null "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select 
					count(A.accbudget_id) as n
					from
					mst_accbudget A left join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id and B.accbudget_id <> :include_accbudget_id and B.deptbudget_id = :deptbudget_id
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
					from mst_accbudget A left join mst_deptbudgetdet B on A.accbudget_id = B.accbudget_id and B.accbudget_id <> :include_accbudget_id  and B.deptbudget_id = :deptbudget_id
				" 
				. $where->sql 
				. " order by accbudget_id "
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