<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/deptbudgetacc/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header deptbudgetacc (mst_dept)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 21/08/2021
 */
$API = new class extends accbudgetformatsetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'accbudget_isdisabled', '0');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'accbudgetformat_id', 1);
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'accbudget_include', '');

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.accbudget_id LIKE CONCAT('%', :search, '%') OR A.accbudget_name LIKE CONCAT('%', :search, '%') OR A.accbudget_nameshort LIKE CONCAT('%', :search, '%')",
					"accbudget_isdisabled" => " A.accbudget_isdisabled = :accbudget_isdisabled ",
					"accbudget_include" => " (B.accbudget_id is null or A.accbudget_id=:accbudget_include) ",
					"accbudgetformat_id" => '--'
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select 
					count(*) as n 
					from mst_accbudget A left join mst_accbudgetformatsetitem B on B.accbudget_id=A.accbudget_id and B.accbudgetformat_id = :accbudgetformat_id		
					" 
					. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.accbudget_id, A.accbudget_name, A.accbudget_nameshort
					from mst_accbudget A left join mst_accbudgetformatsetitem B on B.accbudget_id=A.accbudget_id and B.accbudgetformat_id = :accbudgetformat_id	
				" 
				. $where->sql 
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