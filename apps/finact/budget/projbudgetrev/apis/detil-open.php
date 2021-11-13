<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
require_once __DIR__ . '/xdata-static.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/budget/projbudgetrev/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} projbudgetrev (mst_projbudgetrev)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/06/2021
 */
$API = new class extends projbudgetrevBase {

	public function execute($options) {
		$tablename = 'mst_projbudgetrevdet';
		$primarykey = 'projbudgetrevdet_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"projbudgetrevdet_id" => " projbudgetrevdet_id = :projbudgetrevdet_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_projbudgetrevdet A', [
				'projbudgetrevdet_id', 'projbudgetrevdet_mode', 'accbudget_id', 'projbudgetrevdet_descr', 'projbudgetrevdet_qty', 'projbudgetrevdet_days', 'projbudgetrevdet_task', 'projbudgetrevdet_rate', 'projbudgetrevdet_value', 'projbudgetrevdet_qty_prev', 'projbudgetrevdet_days_prev', 'projbudgetrevdet_task_prev', 'projbudgetrevdet_rate_prev', 'projbudgetrevdet_value_prev', 'projbudgetrevdet_rate_variance', 'projbudgetrevdet_value_variance', 'projbudgetrev_id'
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
				'projbudgetrevdet_modename' =>  \FGTA4\utils\StaticData::get($record['projbudgetrevdet_mode'], 'mode', 'text'),
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