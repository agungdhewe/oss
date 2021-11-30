<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 



use \FGTA4\debug;

class PrintForm extends WebModule {
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
		$this->report_date = $dt;

		
		$objdt = \DateTime::createFromFormat('d/m/Y',$dt);
		$pertanggal = $objdt->format('Y-m-d');

		try {
			$stmt = $this->db->prepare("call ledger_report_format(:coaformat_id, :date)");
			$stmt->execute([
				':coaformat_id' => 'NR',
				':date' => $pertanggal
			]);	
	
			$stmt = $this->db->prepare("select * from RESULT_GL_FORMAT");
			$stmt->execute();
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			$this->rows = $rows; 

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






}

$MODULE = new PrintForm();