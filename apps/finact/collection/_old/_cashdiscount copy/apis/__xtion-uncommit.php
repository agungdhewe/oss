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
			$this->pre_post_check($currentdata, 'uncommit');

			$this->remove_approval($currentdata);

			$this->save_and_set_uncommit_flag($currentdata);

			return (object)[
				'success' => true,
				'version' => $currentdata->header->cashdiscount_version
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function remove_approval($currentdata) {
		try {
			StandartApproval::remove(
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


	public function save_and_set_uncommit_flag($currentdata) {
		try {

			$sql = " 
				update trn_cashdiscount
				set 
				cashdiscount_iscommit = 0,
				cashdiscount_commitby = null,
				cashdiscount_commitdate = null
				where
				cashdiscount_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $currentdata->header->cashdiscount_id
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	

};


