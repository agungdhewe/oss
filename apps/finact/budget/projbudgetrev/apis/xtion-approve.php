<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
// require_once __ROOT_DIR.'/core/currency.php';
require_once __ROOT_DIR.'/apps/fgta/framework/fgta4libs/apis/otp.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

/**
 * finact/budget/projbudgetrev/apis/xtion-approve.php
 *
 * =======
 * Approve
 * =======
 * Melakukan approve/decline dokumen,
 * sesuai dengan authorisasi yang di setting pada modul ent/organisation/doc
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/12/2021
 */
$API = new class extends projbudgetrevBase {

	public function execute($id, $param) {
		$tablename = 'mst_projbudgetrev';
		$primarykey = 'projbudgetrev_id';		
		$userdata = $this->auth->session_get_user();

		$param->approvalsource = [
			'id' => $id,
			'userdata' => $userdata,
			'date' => date("Y-m-d H:i:s"),
			'tablename_head' => $this->main_tablename,
			'tablename_appr' => $this->approval_tablename,
			'field_id' => $this->main_primarykey,
			'field_id_detil' => $this->approval_primarykey,

			'flag_head_isapprovalprogress' => $this->fields_isapprovalprogress,
			'flag_head_approve' => $this->field_isapprove,
			'flag_head_approveby' => $this->field_approveby,
			'flag_head_approvedate' => $this->field_approvedate,
			'flag_head_decline' => $this->field_isdecline,
			'flag_head_declineby' => $this->field_declineby,
			'flag_head_declinedate' => $this->field_declinedate,
			'flag_appr' => $this->approval_field_approve,
			'flag_decl' => $this->approval_field_decline,
			'appr_by' => $this->approval_field_approveby,
			'appr_date' => $this->approval_field_approvedate,
			'decl_by' => $this->approval_field_declineby,
			'decl_date' => $this->approval_field_declinedate,
			'notes' => $this->approval_field_notes,
			'approval_version' => $this->approval_field_version,
			'document_version' => $this->main_field_version
		];


		try {

			$useotp = property_exists($this, 'useotp') ? $this->useotp : true;
			if ($useotp) {
				$otp = \property_exists($param, 'otp') ?	$param->otp : '';
				$otpcode = \property_exists($param, 'otpcode') ? $param->otpcode : ''; 		
				try {
					OTP::Verify($this->db, $otp, $otpcode);
				} catch (\Exception $ex) {
					throw new WebException('OTP yang anda masukkan salah', 403);
				}
			}

			// $this->CURR = new Currency($this->db);
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, $param->approve ? 'approve' : 'decline');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$ret = $this->approve($currentdata, $param);

				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'projbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				if ( $param->approve) {
					if ($ret->isfinalapproval) {
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'FINAL APPROVAL', $userdata->username, (object)[]);
					} else {
						\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'APPROVE', $userdata->username, (object)[]);
					}
				} else {
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'DECLINE', $userdata->username, (object)[]);
				}


				$this->db->commit();
				return (object)[
					'success' => true,
					'isfinalapproval' => $ret->isfinalapproval,
					'dataresponse' => $dataresponse
				];
				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}	
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function approve($currentdata, $param) {
		try {
			StandartApproval::CheckAuthoriryToApprove($this->db, $param);	
			StandartApproval::CheckPendingApproval($this->db, $param);

			$ret = (object)['isfinalapproval'=>false];
			if ($param->approve) {
				// echo "approving...\r\n";
				$ret = StandartApproval::Approve($this->db, $param);
				if ($ret->isfinalapproval) {
					$this->ApplyRevToProjbudget($currentdata, $param);
				}

			} else {
				// echo "declining...\r\n";
				StandartApproval::Decline($this->db, $param);
			}

			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}

	public function ApplyRevToProjbudget($currentdata, $param) {
		$userdata = $currentdata->user;
		$projbudgetrev_id = $currentdata->header->projbudgetrev_id;
		$projbudget_id = $currentdata->header->projbudget_id;
		
		try {

			$objupd = new \stdClass;
			$objupd->projbudgetdet_id = null;
			$objupd->projbudgetdet_qty = null;
			$objupd->projbudgetdet_days = null;
			$objupd->projbudgetdet_task = null;
			$objupd->projbudgetdet_rate = null;
			$objupd->projbudgetdet_value = null;
			$objupd->_modifyby = null;
			$objupd->_modifydate = null;

			$keyupd = new \stdClass;
			$keyupd->projbudgetdet_id = null;




			$objnew = new \stdClass;
			$objnew->projbudget_id = null;
			$objnew->projbudgetdet_id = null;
			$objnew->accbudget_id = null;
			$objnew->alloc_dept_id = null;
			$objnew->projbudgetdet_descr = null;
			$objnew->projbudgetdet_qty = null;
			$objnew->projbudgetdet_days = null;
			$objnew->projbudgetdet_task = null;
			$objnew->projbudgetdet_rate = null;
			$objnew->projbudgetdet_valueprop = null;
			$objnew->projbudgetdet_value = null;
			$objnew->_createby = null;
			$objnew->_createdate = null;


			$cmdupd = \FGTA4\utils\SqlUtility::CreateSQLUpdate('mst_projbudgetdet', $objupd, $keyupd);
			$stmtupdate = $this->db->prepare($cmdupd->sql);
			
			$cmdins = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_projbudgetdet', $objnew);
			$stmtinsert = $this->db->prepare($cmdins->sql);
		

			$count_insert = 0;
			$stmt = $this->db->prepare("select * from mst_projbudgetrevdet where projbudgetrev_id = :projbudgetrev_id");
			$stmt->execute([':projbudgetrev_id' => $projbudgetrev_id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			foreach ($rows as $row) {
			
				// update projbudgetdet
				$budgetrevmode_id = $row['budgetrevmode_id'];

				if ($budgetrevmode_id=='A') {
					// tambah baru
					$param = [
						':projbudget_id' => $projbudget_id,
						':projbudgetdet_id' => \uniqid(),
						':accbudget_id' => $row['accbudget_id'],
						':alloc_dept_id' => $row['alloc_dept_id'],
						':projbudgetdet_descr' => $row['projbudgetrevdet_descr'],
						':projbudgetdet_qty' => $row['projbudgetrevdet_days'],
						':projbudgetdet_days' => $row['projbudgetrevdet_days'],
						':projbudgetdet_task' => $row['projbudgetrevdet_days'],
						':projbudgetdet_rate' => $row['projbudgetrevdet_rate'],
						':projbudgetdet_valueprop' => $row['projbudgetrevdet_value'],
						':projbudgetdet_value' => $row['projbudgetrevdet_value'],
						':_createby' => $userdata->username,
						':_createdate' => date("Y-m-d H:i:s")


					];
					$stmtinsert->execute($param);

				} else {
					// update
					$param = [
						':projbudgetdet_id' => $row['projbudgetdet_id'],
						':projbudgetdet_qty' => $row['projbudgetrevdet_days'],
						':projbudgetdet_days' => $row['projbudgetrevdet_days'],
						':projbudgetdet_task' => $row['projbudgetrevdet_days'],
						':projbudgetdet_rate' => $row['projbudgetrevdet_rate'],
						':projbudgetdet_value' => $row['projbudgetrevdet_value'],
						':_modifyby' => $userdata->username,
						':_modifydate' => date("Y-m-d H:i:s")
					];
					$stmtupdate->execute($param);


				}
			}



		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};


