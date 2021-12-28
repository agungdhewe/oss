<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/collection/colltarget/apis/billout-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel billout} colltarget (trn_colltarget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/12/2021
 */
$API = new class extends colltargetBase {

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
				'colltargetbillout_id', 'partner_id', 'billout_id', 'billout_isunreference', 'colltargetbillout_datetarget', 'colltargetbillout_notes', 'billout_idr', 'billout_isdiscvalue', 'billout_discp', 'billout_discval', 'billout_idrtopay', 'billout_ppntopay', 'billout_idrtotal', 'billout_datedue', 'billout_daystotarget', 'billout_totalitem', 'billout_totalqty', 'billout_salesgross', 'billout_discount', 'billout_subtotal', 'billout_pph', 'billout_nett', 'billout_ppn', 'billout_total', 'billout_totaladdcost', 'billout_dp', 'billout_payment', 'billout_paid', 'colltarget_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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