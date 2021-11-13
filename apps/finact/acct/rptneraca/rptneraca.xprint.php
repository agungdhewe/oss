<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__.'/apis/neraca.php';



use \FGTA4\debug;

class PrintForm extends WebModule {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/rpttrialbal.txt";
		// debug::disable();
		debug::start($logfilepath, "w");

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
	
	
	public function LoadPage($dt) {
		$userdata = $this->auth->session_get_user();
		$this->report_date = $dt;

		
		$objdt = \DateTime::createFromFormat('d/m/Y',$dt);


		try {

			$neraca = new \Neraca((object)[
				'db' => $this->db,
				'currentuser' => $userdata
			]);
			$rows =  $neraca->getdata($objdt);
			$this->rows = $rows; 

		} catch (\Exception $ex) {
			debug::log($ex->getMessage());
			throw $ex;
		}
	}






}

$MODULE = new PrintForm();