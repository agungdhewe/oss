<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/collection/collschupd/apis/billout-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel billout} collschupd (trn_colltarget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/10/2021
 */
$API = new class extends collschupdBase {

	public function execute($options) {
		$tablename = 'trn_colltargetbillout';
		$primarykey = 'colltargetbillout_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"colltargetbillout_id" => " colltargetbillout_id = :colltargetbillout_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_colltargetbillout A', [
				'colltargetbillout_id', 'partner_id', 'billout_id', 'colltargetbillout_datetarget', 'colltargetbillout_iscancel', 'billout_datedue', 'billout_daystotarget', 'billout_idr', 'billout_ppn', 'billout_ppnval', 'billout_pph', 'billout_pphval', 'billout_idrnett', 'billout_isdiscvalue', 'billout_discp', 'billout_discval', 'billout_idrtotal', 'billout_idrtopay', 'billout_ppntopay', 'ori_billout_datetarget', 'ori_billout_datedue', 'ori_billout_daystotarget', 'ori_billout_idr', 'ori_billout_ppn', 'ori_billout_ppnval', 'ori_billout_pph', 'ori_billout_pphval', 'ori_billout_idrnett', 'ori_billout_isdiscvalue', 'ori_billout_discp', 'ori_billout_discval', 'ori_billout_idrtotal', 'ori_billout_idrtopay', 'ori_billout_ppntopay', 'colltarget_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'colltargetbillout_datetarget' => date("d/m/Y", strtotime($record['colltargetbillout_datetarget'])),
				'billout_datedue' => date("d/m/Y", strtotime($record['billout_datedue'])),
				'ori_billout_datetarget' => date("d/m/Y", strtotime($record['ori_billout_datetarget'])),
				'ori_billout_datedue' => date("d/m/Y", strtotime($record['ori_billout_datedue'])),
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
				
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