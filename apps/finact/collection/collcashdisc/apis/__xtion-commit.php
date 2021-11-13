<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __DIR__ . '/xtion.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;

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

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				// 'detil'  => $this->get_detil_rows($id),
				'user' => $userdata
			];


			$this->periode_check_date($currentdata->header->cashdiscount_date);
			$this->pre_post_check($currentdata, 'commit');

			$this->set_approval($currentdata);

			$this->save_and_set_commit_flag($currentdata);

			return (object)[
				'success' => true,
				'version' => $currentdata->header->cashdiscount_version
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function set_approval($currentdata) {
		try {
			StandartApproval::copy(
				$this->db, 
				$currentdata,
				'trn_cashdiscountappr', 
				['cashdiscount_id'=> $currentdata->header->cashdiscount_id, 'cashdiscountappr_id'=>null],
				'CASHDISC'
			);

		} catch (\Exception $ex) {
			throw $ex;
		}		
	}


	public function save_and_set_commit_flag($currentdata) {
		$currentdata->header->cashdiscount_version++;

		try {

			$sql = " 
				update trn_cashdiscount
				set 
				cashdiscount_version = :version,
				cashdiscount_iscommit = 1,
				cashdiscount_commitby = :username,
				cashdiscount_commitdate = :date
				where
				cashdiscount_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":version" => $currentdata->header->cashdiscount_version,
				":id" => $currentdata->header->cashdiscount_id,
				":username" => $currentdata->user->username,
				":date" => date("Y-m-d H:i:s")
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	
};


