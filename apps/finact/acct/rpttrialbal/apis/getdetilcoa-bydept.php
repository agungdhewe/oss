<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR. '/core/sqlutil.php';
require_once __ROOT_DIR. '/core/sequencer.php';

require_once __DIR__.'/jurnalsumary.php';



// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;

// use \FGTA4\debug;



$API = new class extends WebAPI {

	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*inquiry*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);
		
	}

	public function execute($param) {
		$userdata = $this->auth->session_get_user();

		$objdt = \DateTime::createFromFormat('d/m/Y',$param->date);
		$coa_id = $param->coa_id;

		try {

			$glsum = new \GLSummary((object)[
				'db' => $this->db,
				'currentuser' => $userdata
			]);
			$rows =  $glsum->getdatadetil($objdt, $coa_id);
			
			
			return (object)[
				'success' => true,
				'dataresponse' => $rows
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
};
