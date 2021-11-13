<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xtion.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends TemprecvXtionBase {
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


	public function execute($id, $param) {
		$userdata = $this->auth->session_get_user();
		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'detil'  => $this->get_detil_rows($id),
				'user' => $userdata
			];	

			$this->periode_check_date($currentdata->header->temprecv_date);
			$this->pre_post_check($currentdata, 'commit');

			$this->save_and_set_uncommit_flag($currentdata);

			return (object)[
				'success' => true,
				'version' => $currentdata->header->temprecv_version
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function save_and_set_uncommit_flag($currentdata) {
		$currentdata->header->temprecv_version++;

		try {

			$sql = " 
				update trn_temprecv
				set 
				temprecv_iscommit = 0
				where
				temprecv_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $currentdata->header->temprecv_id
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	

};