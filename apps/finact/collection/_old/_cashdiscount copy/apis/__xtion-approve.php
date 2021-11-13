<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __ROOT_DIR.'/core/currency.php';
require_once __DIR__ . '/xtion.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;
use FGTA4\utils\Currency;

$API = new class extends CashdiscountXtionBase {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/corpbudget.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);	

	}

	public function execute($id, $param) {
		$userdata = $this->auth->session_get_user();

		$entity = 'cashdiscount';
		$tablename = "trn_$entity";
		$param->approvalsource = [
			'id' => $id,
			'userdata' => $userdata,
			'tablename_head' => $tablename,
			'tablename_appr' => $tablename.'appr',
			'field_id' => $entity . '_id',
			'field_id_detil' => $entity . 'appr_id',
			'flag_head' => $entity . '_isapproved',
			'flag_appr' => $entity . 'appr_isapproved',
			'flag_decl' => $entity . 'appr_isdeclined',
			'appr_by' => $entity . 'appr_by',
			'appr_date' => $entity . 'appr_date',
			'decl_by' => $entity . 'appr_declinedby',
			'decl_date' => $entity . 'appr_declineddate',
			'notes' => $entity . 'appr_notes'
		];


		try {
			$this->CURR = new Currency($this->db);
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				// 'detil'  => $this->get_detil_rows($id),
				'user' => $userdata
			];

			$periodemo_id = $this->get_periode_bydate($currentdata->header->cashdiscount_date);

			$this->periode_check($periodemo_id);
			$this->pre_post_check($currentdata, 'approve');

			$ret = $this->approve($currentdata, $param);

			if ($ret->isfinalapproval) {
				// add to jurnal
				$currentdata->header->periodemo_id = $periodemo_id;
				$currentdata->header->curr_id = $this->CURR->getLocalCurrency();
				$currentdata->header->coa_id_debet = '1001101';
				$currentdata->header->coa_id_kredit = '1001101';

				$jurnal = (object)[
					'header' => $this->create_docjurnal_header($currentdata),
					'detil' => $this->create_docjurnal_detil($currentdata)
				];

				$this->save_to_jurnal($jurnal);
			}

			return (object)[
				'success' => true,
				'version' => $currentdata->header->cashdiscount_version,
				'isfinalapproval' => $ret->isfinalapproval
			];
			
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
				$ret = StandartApproval::Approve($this->db, $param);
			} else {
				StandartApproval::Decline($this->db, $param);
			}


			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}

	function create_docjurnal_header($currentdata) {
		$header = (object)[
			'jurnal_id' => $currentdata->header->cashdiscount_id,
			'jurnal_ref' => $currentdata->header->cashdiscount_ref,
			'jurnal_date' => $currentdata->header->cashdiscount_date,
			'jurnal_descr' => "[CashDiscount] " .  $currentdata->header->cashdiscount_descr,
			'jurnal_ispost' => 1,
			'periodemo_id' => $currentdata->header->periodemo_id,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")
		];
		return $header;
	}


	function create_docjurnal_detil($currentdata) {
		$records = [];

		// DEBET
		$records[] = (object)[
			'jurnaldetil_id' => uniqid() ,
			'jurnaldetil_descr' =>  "[CashDiscount] " .  $currentdata->header->cashdiscount_descr,
			'jurnaldetil_valfrg' => $currentdata->header->cashdiscount_validr,
			'jurnaldetil_valfrgrate' => 1,
			'jurnaldetil_validr' =>  $currentdata->header->cashdiscount_validr,
			'coa_id' => $currentdata->header->coa_id_debet,
			'dept_id' => $currentdata->header->dept_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnal_id' => $currentdata->header->cashdiscount_id,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];


		// KREDIT
		$records[] = (object)[
			'jurnaldetil_id' => uniqid() ,
			'jurnaldetil_descr' =>  "[CashDiscount] " .  $currentdata->header->cashdiscount_descr,
			'jurnaldetil_valfrg' => $currentdata->header->cashdiscount_validr,
			'jurnaldetil_valfrgrate' => 1,
			'jurnaldetil_validr' =>  -$currentdata->header->cashdiscount_validr,
			'coa_id' => $currentdata->header->coa_id_kredit,
			'dept_id' => $currentdata->header->dept_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnal_id' => $currentdata->header->cashdiscount_id,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];


		return $records;
	}


};


