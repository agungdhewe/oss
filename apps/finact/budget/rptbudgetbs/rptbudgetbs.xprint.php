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
		$this->report_date = $dt;
		$this->report_date_sql = (\DateTime::createFromFormat('d/m/Y',$dt))->format('Y-m-d');
		
		// $objdt = \DateTime::createFromFormat('d/m/Y',$dt);

		try {


			$stmt = $this->db->prepare("call deptbudget_bs_all_rpt(:dt)");
			$stmt->execute([':dt' => $this->report_date_sql]);
			// $row =  $stmt->fetch(\PDO::FETCH_ASSOC);


			$stmt = $this->db->prepare("
				select 
					rownum,
					rowsection,
					id as accbudget_id,
					name as accbudget_name,
					rowlevel,
					deptbudgetdet_01, deptbudgetdet_02, deptbudgetdet_03, deptbudgetdet_04, deptbudgetdet_05, deptbudgetdet_06,
					deptbudgetdet_07, deptbudgetdet_08, deptbudgetdet_09, deptbudgetdet_10, deptbudgetdet_11, deptbudgetdet_12,
					deptbudgetdet_total
				from TEMP_DEPTBUDGET_BS_RPT order by rownum
			");
			$stmt->execute();
			$this->rows =  $stmt->fetchall(\PDO::FETCH_ASSOC);
			// $this->rows = [];

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};
