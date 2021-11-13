<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/debug.php';


use \FGTA4\debug;

$MODULE = new class extends WebModule {
	function __construct() {
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
	
	
	public function LoadPage($rpttype, $empl_id, $periodemo_id) {
		$userdata = $this->auth->session_get_user();

		$this->reportparameter = (object)[
			'rpttype' => $rpttype,
			'empl_id' => $empl_id,
			'periodemo_id' => $periodemo_id
		];

		try {
		} catch (\Exception $ex) {
			// debug::log($ex->getMessage());
			throw $ex;
		}
	}






};

