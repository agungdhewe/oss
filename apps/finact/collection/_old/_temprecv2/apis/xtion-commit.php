<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends WebAPI {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/projbudget.txt";
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


	public function execute($id) {
		$userdata = $this->auth->session_get_user();
		try {
			// debug::log(print_r($data, true));
			
			// COMMIT PROCESS
			$sql = " 
				update trn_temprecv
				set 
				temprecv_iscommit = 1,
				temprecv_commitby = :user_id,
				temprecv_commitdate = :commit_date
				where
				temprecv_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,				
				":user_id" => $userdata->username,
				":commit_date" => date("Y-m-d H:i:s")
			]);


			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};