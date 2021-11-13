<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * media/sales/mediaorder/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header mediaorder (trn_mediaorder)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/04/2021
 */
$API = new class extends mediaorderBase {
	
	public function execute($options) {
		$tablename = 'trn_mediaorder';
		$primarykey = 'mediaorder_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"mediaorder_id" => " mediaorder_id = :mediaorder_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_mediaorder A', [
				'mediaorder_id', 'mediaordertype_id', 'mediaorder_date', 'mediaorder_descr', 'mediaorder_ref', 'ae_empl_id', 'agency_partner_id', 'advertiser_partner_id', 'brand_id', 'curr_id', 'mediaorder_istax', 'taxtype_id', 'mediapackage_id', 'salesordertype_id', 'trxmodel_id', 'dept_id', 'doc_id', 'mediaorder_version', 'mediaorder_iscommit', 'mediaorder_commitby', 'mediaorder_commitdate', 'mediaorder_isapprovalprogress', 'mediaorder_isapproved', 'mediaorder_approveby', 'mediaorder_approvedate', 'mediaorder_isdeclined', 'mediaorder_declineby', 'mediaorder_declinedate', 'mediaorder_notes', 'mediaorder_isclose', 'mediaorder_closeby', 'mediaorder_closedate', '_createby', '_createdate', '_modifyby', '_modifydate'
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				'mediaorder_date' => date("d/m/Y", strtotime($record['mediaorder_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'mediaordertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['mediaordertype_id'], $this->db, 'mst_mediaordertype', 'mediaordertype_id', 'mediaordertype_name'),
				'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'agency_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['agency_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'advertiser_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['advertiser_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'mediapackage_descr' => \FGTA4\utils\SqlUtility::Lookup($record['mediapackage_id'], $this->db, 'mst_mediapackage', 'mediapackage_id', 'mediapackage_descr'),
				'salesordertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['salesordertype_id'], $this->db, 'mst_salesordertype', 'salesordertype_id', 'salesordertype_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'mediaorder_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
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