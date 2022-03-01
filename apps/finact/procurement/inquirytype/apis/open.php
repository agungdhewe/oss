<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}


use \FGTA4\exceptions\WebException;


/**
 * finact/procurement/inquirytype/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header inquirytype (mst_inquirytype)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/01/2022
 */
$API = new class extends inquirytypeBase {
	
	public function execute($options) {
		$tablename = 'mst_inquirytype';
		$primarykey = 'inquirytype_id';
		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquirytype_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquirytype_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"inquirytype_id" => " inquirytype_id = :inquirytype_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_inquirytype A', [
				'inquirytype_id', 'inquirymodel_id', 'inquirytype_name', 'inquirytype_isdisabled', 'inquirytype_descr', 'inquiryselect_id', 'inquirytype_isperempl', 'itemmanage_id', 'inquirytype_isallowadvance', 'inquirytype_isemplaspartner', 'inquirytype_maxadvancevalue', 'related_dept_id', 'related_team_id', 'owner_dept_id', 'owner_team_id', 'site_id', 'room_id', 'orderout_dept_id', 'orderout_team_id', 'trxmodel_id', 'inquiry_title_ina', 'inquiry_title_eng', 'inquiry_doc_id', 'request_title_ina', 'request_title_eng', 'request_doc_id', 'orderout_title_ina', 'orderout_title_eng', 'orderout_doc_id', 'inquirytype_isuseqty', 'inquirytype_isusedays', 'inquirytype_isusetask', 'inquirytype_islimitqty', 'inquirytype_islimitdays', 'inquirytype_islimittask', 'inquirytype_islimitvalue', 'inquirytype_isallowoverbudget', 'inquirytype_isallowunbudget', 'inquirytype_isdeptuser', 'inquirytype_isdeptowner', 'inquirytype_isdeptmaintainer', 'inquirytype_isqtybreakdown', 'inquirytype_istoberequest', 'inquirytype_isautorequest', 'inquirytype_isautoorder', 'inquirytype_ismovinginit', 'inquirytype_isdateinterval', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				
				'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
				'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
				'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
				'related_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'related_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
				'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'room_name' => \FGTA4\utils\SqlUtility::Lookup($record['room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
				'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'inquiry_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'request_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'orderout_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),


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