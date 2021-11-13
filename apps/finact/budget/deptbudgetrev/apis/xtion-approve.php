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
 * finact/budget/deptbudgetrev/apis/xtion-approve.php
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
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetrevBase {

	public function execute($id, $param) {
		$tablename = 'mst_deptbudgetrev';
		$primarykey = 'deptbudgetrev_id';		
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
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'deptbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
					$this->ApplyRevToDeptbudget($currentdata, $param);
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


	public function ApplyRevToDeptbudget($currentdata, $param) {
		try {
			$dept_id = $currentdata->header->dept_id;
			$year = $currentdata->header->deptbudgetrev_year;
			$month = $currentdata->header->deptbudgetrev_month;
			$deptbudgetrev_id = $currentdata->header->deptbudgetrev_id;
			$deptbudgetdet_columnname = "deptbudgetdet_" . str_pad($month, 2, '0', STR_PAD_LEFT);


			$stmt_budgetdept_get = $this->db->prepare("
				select 
				A.deptbudget_id
				from 
				mst_deptbudget A
				where 
				    A.deptbudget_year = :deptbudget_year
				and A.dept_id = :dept_id 	
				and A.deptbudget_isapproved=1		
			");
			$stmt_budgetdept_get->execute([':deptbudget_year'=>$year, ':dept_id'=>$dept_id]);
			$row = $stmt_budgetdept_get->fetch(\PDO::FETCH_ASSOC);	
			if (!$row) {
				throw new \Exception("Tidak ada budget departemen '{$dept_id}' di tahun '{$year}' yang sudah di approve'");
			}

			$deptbudget_id = $row['deptbudget_id'];


			$stmt_cek = $this->db->prepare("
				select 
				A.deptbudget_id, B.deptbudgetdet_id , `{$deptbudgetdet_columnname}` as deptbudgetdet_value
				from 
				mst_deptbudget A inner join mst_deptbudgetdet B on B.deptbudget_id = A.deptbudget_id
				where 
				    A.deptbudget_id = :deptbudget_id 	
				and B.accbudget_id = :accbudget_id 
			");

			$stmt_update = $this->db->prepare("
				update mst_deptbudgetdet
				set 
				  `{$deptbudgetdet_columnname}` = :deptbudgetdet_value
				, `_modifyby` = :username
				, `_modifydate` = :date
				where
				deptbudgetdet_id = :deptbudgetdet_id
			");

			$stmt_insert = $this->db->prepare("
				insert into mst_deptbudgetdet
				(`deptbudget_id`, `deptbudgetdet_id`, `{$deptbudgetdet_columnname}`, `accbudget_id`, `_createby`, `_createdate`)
				values
				(:deptbudget_id, :deptbudgetdet_id, :deptbudgetdet_value, :accbudget_id, :username, :date)
			");



			$count_update = 0;
			$count_insert = 0;
			$stmt = $this->db->prepare("select * from mst_deptbudgetrevdet where deptbudgetrev_id = :deptbudgetrev_id");
			$stmt->execute([':deptbudgetrev_id' => $deptbudgetrev_id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);	
			foreach ($rows as $row) {
				$accbudget_id = $row['accbudget_id'];
				$deptbudgetrevdet_value = $row['deptbudgetrevdet_value'];

				$stmt_cek->execute([
					':deptbudget_id'=>$deptbudget_id, 
					':accbudget_id'=>$accbudget_id
				]);
				$deptbudgetrow  = $stmt_cek->fetch(\PDO::FETCH_ASSOC);
				if ($deptbudgetrow) {
					// update
					$count_update++;
					$deptbudgetdet_id = $deptbudgetrow['deptbudgetdet_id'];
					$deptbudgetdet_previousvalue = $deptbudgetrow['deptbudgetdet_value'];
					$stmt_update->execute([
						':deptbudgetdet_id' => $deptbudgetdet_id,
						':deptbudgetdet_value' => $deptbudgetrevdet_value,
						':username' => $currentdata->user->username,
						':date' => date("Y-m-d H:i:s")
					]);

					\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/deptbudget", "mst_deptbudgetdet", $deptbudgetdet_id, 'REVISI APPROVED', $currentdata->user->username, (object)[
						'note' => 'approved update value from ' . \number_format($deptbudgetdet_previousvalue) . ' to ' . \number_format($deptbudgetrevdet_value)
					]);
				} else {
					// insert
					$count_insert++;
					$deptbudgetdet_id = uniqid();
					$stmt_insert->execute([
						':deptbudget_id' => $deptbudget_id,
						':deptbudgetdet_id' => $deptbudgetdet_id, 
						':deptbudgetdet_value' => $deptbudgetrevdet_value, 
						':accbudget_id' => $accbudget_id, 
						':username' => $currentdata->user->username, 
						':date' => date("Y-m-d H:i:s")
					]);
				}
			}


			// hitung ulang total
			$stmt = $this->db->prepare("
				update mst_deptbudgetdet
				set 
				deptbudgetdet_total = (deptbudgetdet_01+deptbudgetdet_02+deptbudgetdet_03+deptbudgetdet_04+deptbudgetdet_05+deptbudgetdet_06+deptbudgetdet_07+deptbudgetdet_08+deptbudgetdet_09+deptbudgetdet_10+deptbudgetdet_11+deptbudgetdet_12)
				where
				deptbudget_id = :deptbudget_id
			");
			$stmt->execute([
				':deptbudget_id' => $deptbudget_id
			]);

			// update version
			$deptbudget = \FGTA4\utils\SqlUtility::LookupRow($deptbudget_id, $this->db, 'mst_deptbudget', 'deptbudget_id');
			$deptbudget_newversion = $deptbudget['deptbudget_version']+1;  	
			$stmt = $this->db->prepare("
				update mst_deptbudget
				set
				deptbudget_version = :deptbudget_version
				where
				deptbudget_id = :deptbudget_id
			");	
			$stmt->execute([
				':deptbudget_version' => $deptbudget_newversion ,
				':deptbudget_id' => $deptbudget_id
			]);



			\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/deptbudget", "mst_deptbudget", $deptbudget_id, 'REVISI APPROVED', $currentdata->user->username, (object)[
				'note' => "{$count_update} updated, {$count_insert} added",
				'interval15' => true
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



};


