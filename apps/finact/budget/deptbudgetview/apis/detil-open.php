<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/budget/deptbudget/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} deptbudget (mst_deptbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {

	public function execute($options) {
		$tablename = 'mst_deptbudgetdet';
		$primarykey = 'deptbudgetdet_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"deptbudgetdet_id" => " deptbudgetdet_id = :deptbudgetdet_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_deptbudgetdet A', [
				'deptbudgetdet_id', 'deptbudgetdet_descr', 'deptbudgetdet_01', 'deptbudgetdet_02', 'deptbudgetdet_03', 'deptbudgetdet_04', 'deptbudgetdet_05', 'deptbudgetdet_06', 'deptbudgetdet_07', 'deptbudgetdet_08', 'deptbudgetdet_09', 'deptbudgetdet_10', 'deptbudgetdet_11', 'deptbudgetdet_12', 'deptbudgetdet_total', 'accbudget_id', 'deptbudgetdet_notes', 'deptbudget_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

	

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};