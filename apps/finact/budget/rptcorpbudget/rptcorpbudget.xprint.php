<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__.'/apis/corpbudgetsumary.php';



use \FGTA4\debug;

class PrintForm extends WebModule {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/rptcorpbudget.txt";
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
	
	
	public function LoadPage($corpbudget_id) {

		//$corpbudget_id = '2020';		
		$userdata = $this->auth->session_get_user();

		$this->preloadscripts = [
			'jslibs/qrious.js'
		];

		//$id = $_GET['id'];
		$this->printdate = date('d/m/Y');
		$this->corpbudget_id = $id;

		try {
			
			$this->empl_name = $userdata->userfullname;
			// header
			//$sql = $this->getSqlHeader();
			//$stmt = $this->db->prepare($sql);
			//$stmt->execute([':corpbudget_id' => $this->corpbudget_id]);
			//$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			//$row = $rows[0];			

			$corpsummary = new \CorpBudgetSummary((object)[
				'db' => $this->db,
				'currentuser' => $userdata
			]);
			$rows =  $corpsummary->getdata($corpbudget_id);
			$this->rows = $rows;			

		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function injuta($value) {
		return number_format($value / 1000000, 0);
		//return number_format($value / 1, 0);
	}

	public function inpercent($lalu, $curr) {		
		
		$growth =  $lalu == 0 ? 100 : ((($curr - $lalu)/($lalu)) * 100);
		
		if (abs($growth) < 1000000) {
				// Anything less than a million
				$format = number_format($growth, 2);
		} else if (abs($growth) < 1000000000) {
				// Anything less than a billion
				$format = number_format(abs($growth) / 1000000, 2) . 'M';
		} else {
				// At least a billion
				$format = number_format(abs($growth) / 1000000000, 2) . 'B';
		}
		
		return $format;
	}

}

$MODULE = new PrintForm();