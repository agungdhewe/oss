<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/fin/billout/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} billout (trn_billout)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/12/2021
 */
$API = new class extends billoutBase {

	public function execute($options) {
		$tablename = 'trn_billoutdetil';
		$primarykey = 'billoutdetil_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"billoutdetil_id" => " billoutdetil_id = :billoutdetil_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_billoutdetil A', [
				'billoutdetil_id', 'billoutrowtype_id', 'orderindelv_id', 'itemclass_id', 'billoutdetil_descr', 'billoutdetil_totalitem', 'billoutdetil_totalqty', 'billoutdetil_salesgross', 'billoutdetil_discount', 'billoutdetil_subtotal', 'billoutdetil_pph', 'billoutdetil_nett', 'billoutdetil_ppn', 'billoutdetil_total', 'billoutdetil_totaladdcost', 'billoutdetil_dp', 'billoutdetil_payment', 'accbudget_id', 'coa_id', 'billout_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'billoutrowtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billoutrowtype_id'], $this->db, 'mst_billoutrowtype', 'billoutrowtype_id', 'billoutrowtype_name'),
				'orderindelv_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderindelv_id'], $this->db, 'trn_orderindelv', 'orderindelv_id', 'orderindelv_descr'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				
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