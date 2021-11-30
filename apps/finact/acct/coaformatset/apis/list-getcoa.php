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
$API = new class extends coaformatsetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'coa_isdisabled', '0');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'coaformat_id', 1);
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'coa_include', '');

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.coa_id LIKE CONCAT('%', :search, '%') OR A.coa_name LIKE CONCAT('%', :search, '%') OR A.coa_nameshort LIKE CONCAT('%', :search, '%')",
					"coa_isdisabled" => " A.coa_isdisabled = :coa_isdisabled ",
					// "coa_include" => " (B.coa_id is null or A.coa_id=:coa_include) ",
					"coa_include" => null,
					"coaformat_id" => '--'
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select 
					count(*) as n 
					from mst_coa A -- left join mst_coaformatsetitem B on B.coa_id=A.coa_id and B.coaformat_id = :coaformat_id		
					" 
					. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.coa_id, A.coa_name, A.coa_nameshort
					from mst_coa A -- left join mst_coaformatsetitem B on B.coa_id=A.coa_id and B.coaformat_id = :coaformat_id	
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