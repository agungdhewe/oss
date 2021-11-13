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
	
	
	public function LoadPage($rpttype, $filter_id, $dt) {
		$userdata = $this->auth->session_get_user();

		$objdt = \DateTime::createFromFormat('d/m/Y',$dt);
		$date = $objdt->format('Y-m-d');

		$this->reportparameter = (object)[
			'rpttype' => $rpttype,
			'filter_id' => $filter_id,
			'date' => $date
		];


		// $this->pertanggal = $objdt->format('Y-m-d');

		try {

			// $glsum = new \GLSummary((object)[
			// 	'db' => $this->db,
			// 	'currentuser' => $userdata
			// ]);
			// $rows =  $glsum->getdata_bydeptpartner($objdt);
			// $this->rows = $rows; 

		} catch (\Exception $ex) {
			// debug::log($ex->getMessage());
			throw $ex;
		}
	}






};

