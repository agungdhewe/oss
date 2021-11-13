<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


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
	
	
	public function LoadPage($dt) {
		$userdata = $this->auth->session_get_user();
		// $this->report_date = $dt;
		// $this->report_date_sql = (\DateTime::createFromFormat('d/m/Y',$dt))->format('Y-m-d');
		
		// $objdt = \DateTime::createFromFormat('d/m/Y',$dt);

		try {

			// $dr = new \DataReport((object)[
			// 	'db' => $this->db,
			// 	'currentuser' => $userdata
			// ]);
			// $rows =  $dr->getdata($objdt);
			// $this->rows = $rows; 

			$this->rows = [
				['id'=>1, 'text'=>'satu'],
				['id'=>1, 'text'=>'satu'],
				['id'=>1, 'text'=>'satu'],
				['id'=>1, 'text'=>'satu']
			];	

		} catch (\Exception $ex) {
			debug::log($ex->getMessage());
			throw $ex;
		}
	}






};
