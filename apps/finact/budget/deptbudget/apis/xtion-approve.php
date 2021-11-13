<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __ROOT_DIR . "/core/sequencer.php";
// require_once __ROOT_DIR.'/core/currency.php';
require_once __ROOT_DIR.'/apps/fgta/framework/fgta4libs/apis/otp.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

/**
 * finact/budget/deptbudget/apis/xtion-approve.php
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
$API = new class extends deptbudgetBase {

	public function execute($id, $param) {
		$tablename = 'mst_deptbudget';
		$primarykey = 'deptbudget_id';		
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
			$this->data_check($currentdata, $param);

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
					'deptbudget_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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

	public function data_check($currentdata, $param) {
		try {
			/* Cek data */
			$deptinfo = \FGTA4\utils\SqlUtility::LookupRow($currentdata->header->dept_id, $this->db, 'mst_dept', 'dept_id');	
			$dept_id = $deptinfo['dept_id'];
			$project_id = $deptinfo['project_id'];
			$dept_name = $deptinfo['dept_name'];
			$year = $currentdata->header->deptbudget_year;

			if ($deptinfo['dept_issingleprojectbudget']) {
				if ($project_id==null) {
					throw new \Exception("Default project belum didefinisikan untuk '$dept_name'"); 
				}
			}

			// cek, decline tidak bisa dilakukan apabila sudah ada budget project yang dibuat untuk dept ini
			if (!$param->approve) {
				$stmt = $this->db->prepare("select count(*) as n from mst_projbudget where dept_id=:dept_id and projbudget_year=:year");
				$stmt->execute([':dept_id'=>$dept_id, ':year'=>$year]);
				$row = $stmt->fetch(\PDO::FETCH_ASSOC);	
				if ($row['n']>0) {
					throw new \Exception("Tidak bisa decline budget departemen yang telah dibuat breakdown budget by project"); 
				}
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
					$deptinfo = \FGTA4\utils\SqlUtility::LookupRow($currentdata->header->dept_id, $this->db, 'mst_dept', 'dept_id');
					$currentdata->deptinfo = $deptinfo;
					if ($deptinfo['dept_issingleprojectbudget']) {
						// Generate project budget
						$project_id = $deptinfo['project_id'];
						$this->GenerateProjectBudgetAll($project_id, $currentdata);
					}					
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


	public function ProjBudgetNewId($param) {
		$seqname = 'BP';
		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
		
}

	public function GenerateProjectBudgetAll($project_id, $currentdata) {
		try {
			$deptbudget_id = $currentdata->header->deptbudget_id;
			$year = $currentdata->header->deptbudget_year;
			$dept_id = $currentdata->header->dept_id;
			for ($month=1; $month<=12; $month++) {
				// cek existing
				$sql = "select projbudget_id, projbudget_version from mst_projbudget where projbudget_year = :year and projbudget_month = :month and project_id =:project_id and dept_id = :dept_id";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':year' => $year,
					':month' => $month,
					':project_id' => $project_id,
					':dept_id' => $dept_id
				]);
				$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
				if (count($rows)) {
					$projbudget_id = $rows[0]['projbudget_id'];
					$projbudget_version = (string)$rows[0]['projbudget_version'];
					if ($projbudget_version==='0') {
						// recreate kalau belum ada perubahan version
						$this->GenerateProjectBudgetDetil($projbudget_id, $year, $month, $deptbudget_id, $currentdata);
					}
				} else {
					$projbudget_id = $this->ProjBudgetNewId((object)[]);
					$this->GenerateProjectBudget($projbudget_id, $dept_id, $project_id, $year, $month, $deptbudget_id, $currentdata);
					\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/projbudget", "mst_projbudget", $projbudget_id, 'NEW', $currentdata->user->username, (object)[
						'note' => "Auto generated from deptbudget '$deptbudget_id' approval"
					]);
					\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/projbudget", "mst_projbudget", $projbudget_id, 'APPROVED', $currentdata->user->username, (object)[
						'note' => "Auto generated from deptbudget '$deptbudget_id' approval"
					]);

					$this->GenerateProjectBudgetDetil($projbudget_id, $year, $month, $deptbudget_id, $currentdata);
					\FGTA4\utils\SqlUtility::WriteLog($this->db, "finact/budget/projbudget", "mst_projbudgetdet", $projbudget_id, 'NEW', $currentdata->user->username, (object)[
						'note' => "Auto generated from deptbudget '$deptbudget_id' approval"
					]);

					$this->CopyApproval($deptbudget_id, $projbudget_id, $currentdata);
				}
				

			}
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	public function GenerateProjectBudget($projbudget_id, $dept_id, $project_id, $year, $month, $deptbudget_id, $currentdata) {
		try {
			$mostring = str_pad($month, 2, '0', STR_PAD_LEFT);
			$obj = (object)[
				'projbudget_id' => $projbudget_id,
				'projbudget_name' => $currentdata->deptinfo['dept_name'] . " REGULER $year $mostring",
				'projbudget_year' => $year,
				'projbudget_month' => $month,
				'projbudget_iscommit' => 1,
				'projbudget_commitby' => $currentdata->user->username,
				'projbudget_commitdate' => date("Y-m-d H:i:s"),
				'projbudget_isapproved' => 1,
				'dept_id' => $dept_id,
				'project_id' => $project_id,
				'doc_id' => 'PROJBUDGET',
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")
			];

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_projbudget", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function GenerateProjectBudgetDetil($projbudget_id, $year, $month, $deptbudget_id, $currentdata) {
		// BEGIN persiapan update
		$stmt_projbudgetdet_cek = $this->db->prepare("
			select projbudgetdet_id 
			from mst_projbudgetdet
			where accbudget_id = :accbudget_id and projbudget_id = :projbudget_id");

		$stmt_projbudgetdet_insert = $this->db->prepare("
			insert into mst_projbudgetdet
			(projbudgetdet_id, projbudgetdet_descr, projbudgetdet_qty, projbudgetdet_days, projbudgetdet_task, projbudgetdet_rate, projbudgetdet_valueprop, projbudgetdet_value, accbudget_id, projbudget_id,  _createby, _createdate)
			values
			(:projbudgetdet_id, :projbudgetdet_descr, :projbudgetdet_qty, :projbudgetdet_days, :projbudgetdet_task, :projbudgetdet_rate, :projbudgetdet_valueprop, :projbudgetdet_value, :accbudget_id, :projbudget_id,  :_createby, :_createdate)");
			
		$stmt_projbudgetdet_update = $this->db->prepare("
			update mst_projbudgetdet
			set
			projbudgetdet_qty=1, projbudgetdet_days=1, projbudgetdet_task=1,
			projbudgetdet_rate=:value, projbudgetdet_valueprop=:value, projbudgetdet_value=:value
			where projbudgetdet_id = :projbudgetdet_id and projbudget_id = :projbudget_id");
		// END



		// RESET DETIL
		$stmt_projbudgetdet_reset = $this->db->prepare("
			update mst_projbudgetdet
			set
			projbudgetdet_qty=1, projbudgetdet_days=1, projbudgetdet_task=1,
			projbudgetdet_rate=0, projbudgetdet_valueprop=0, projbudgetdet_value=0
			where projbudget_id = :projbudget_id");
		$stmt_projbudgetdet_reset->execute([':projbudget_id'=>$projbudget_id]);

		try {
			$mostring = str_pad($month, 2, '0', STR_PAD_LEFT);
			$sql = "
				update mst_projbudgetdet set 
				projbudgetdet_rate=0, projbudgetdet_valueprop=0, projbudgetdet_value=0 ,
				projbudgetdet_qty=0, projbudgetdet_days=0, projbudgetdet_task=0
				where projbudget_id = :projbudget_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":projbudget_id" => $projbudget_id]);


			$sql = "
				select 
				accbudget_id, deptbudgetdet_descr, deptbudgetdet_{$mostring} as value
				from mst_deptbudgetdet
				where deptbudget_id = :deptbudget_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":deptbudget_id" => $deptbudget_id]);	
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$accbudget_id = $row['accbudget_id'];
				$descr = $row['deptbudgetdet_descr'];
				$value = $row['value'];
				$stmt_projbudgetdet_cek->execute([
					':accbudget_id' => $accbudget_id,
					':projbudget_id' => $projbudget_id
				]);
				$rowsdet = $stmt_projbudgetdet_cek->fetchall(\PDO::FETCH_ASSOC);
				if (count($rowsdet)) {
					// update
					$projbudgetdet_id = $rowsdet[0]['projbudgetdet_id'];
					$stmt_projbudgetdet_update->execute([
						':value' =>  $value,
						":projbudgetdet_id" => $projbudgetdet_id,
						":projbudget_id" => $projbudget_id
					]);
				} else {
					// insert
					$stmt_projbudgetdet_insert->execute([
						":projbudgetdet_id" => uniqid(),
						":projbudgetdet_descr" => $descr,
						":projbudgetdet_qty" => 1,
						":projbudgetdet_days" => 1,
						":projbudgetdet_task" => 1 ,
						":projbudgetdet_rate" => $value,
						":projbudgetdet_valueprop" => $value,
						":projbudgetdet_value" => $value,
						":accbudget_id" => $accbudget_id,
						":projbudget_id" => $projbudget_id,
						":_createby" => $currentdata->user->username,
						":_createdate" => date("Y-m-d H:i:s"),
					]);
				}	
			
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function CopyApproval($deptbudget_id, $projbudget_id, $currentdata) {
		try {
			$stmt_insert = $this->db->prepare("
				insert into mst_projbudgetappr
				(
					`projbudgetappr_id` ,
					`projbudgetappr_isapproved`,
					`projbudgetappr_by`,
					`projbudgetappr_date`,
					`projbudgetappr_notes`,
					`projbudget_version`,
					`projbudget_id`,
					`docauth_descr`,
					`docauth_order`,
					`docauth_value`,
					`docauth_min`,
					`authlevel_id`,
					`authlevel_name`,
					`auth_id`,
					`auth_name`,
					`_createby`,
					`_createdate`
				) values (
					:projbudgetappr_id,
					:projbudgetappr_isapproved,
					:projbudgetappr_by,
					:projbudgetappr_date,
					:projbudgetappr_notes,
					:projbudget_version,
					:projbudget_id,
					:docauth_descr,
					:docauth_order,
					:docauth_value,
					:docauth_min,
					:authlevel_id,
					:authlevel_name,
					:auth_id,
					:auth_name,
					:_createby,
					:_createdate
				)
			");


			$sql = "
				select
					`deptbudgetappr_id` ,
					`deptbudgetappr_isapproved`,
					`deptbudgetappr_by`,
					`deptbudgetappr_date`,
					`deptbudget_version`,
					`deptbudgetappr_isdeclined`,
					`deptbudgetappr_declinedby`,
					`deptbudgetappr_declineddate`,
					`deptbudgetappr_notes`,
					`deptbudget_id`,
					`docauth_descr`,
					`docauth_order`,
					`docauth_value`,
					`docauth_min`,
					`authlevel_id`,
					`authlevel_name`,
					`auth_id`,
					`auth_name`
				from
				mst_deptbudgetappr
				where 
				deptbudget_id = :deptbudget_id
				order by docauth_order desc
				limit 1
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':deptbudget_id'=>$deptbudget_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$stmt_insert->execute([
					':projbudgetappr_id' => uniqid(),
					':projbudgetappr_isapproved' => 1,
					':projbudgetappr_by' => $row['deptbudgetappr_by'],
					':projbudgetappr_date' => $row['deptbudgetappr_date'],
					':projbudgetappr_notes' => "copied from approval deptbudget '$deptbudget_id'",
					':projbudget_version' => 0,
					':projbudget_id' => $projbudget_id,
					':docauth_descr' => $row['docauth_descr'],
					':docauth_order' => $row['docauth_order'],
					':docauth_value' => $row['docauth_value'],
					':docauth_min' => $row['docauth_min'],
					':authlevel_id' => $row['authlevel_id'],
					':authlevel_name' => $row['authlevel_name'],
					':auth_id' => $row['auth_id'],
					':auth_name' => $row['auth_name'],
					":_createby" => $currentdata->user->username,
					":_createdate" => date("Y-m-d H:i:s"),
				]);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};


