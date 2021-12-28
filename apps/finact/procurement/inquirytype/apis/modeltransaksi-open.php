<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-modeltransaksi-handler.php')) {
	require_once __DIR__ .'/data-modeltransaksi-handler.php';
}


use \FGTA4\exceptions\WebException;



/**
 * finact/procurement/inquirytype/apis/modeltransaksi-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel modeltransaksi} inquirytype (mst_inquirytype)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/12/2021
 */
$API = new class extends inquirytypeBase {

	public function execute($options) {
		$tablename = 'mst_inquirytypetrxmodel';
		$primarykey = 'inquirytypetrxmodel_id';
		$userdata = $this->auth->session_get_user();
		

		$handlerclassname = "\\FGTA4\\apis\\inquirytype_modeltransaksiHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquirytype_modeltransaksiHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"inquirytypetrxmodel_id" => " inquirytypetrxmodel_id = :inquirytypetrxmodel_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_inquirytypetrxmodel A', [
				'inquirytypetrxmodel_id', 'trxmodel_id', 'orderout_inquirytype_id', 'inquirytype_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'orderout_inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
				
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);


			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataOpen')) {
					$hnd->DataOpen($result->record);
				}
			}

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

	

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};