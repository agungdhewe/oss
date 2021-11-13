<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;
use \FGTA4\StandartApproval;



$API = new class extends WebAPI {
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



			return (object)[
				'success'=>true,
				// 'errormessage' => 'ini itu ini itu'
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};


