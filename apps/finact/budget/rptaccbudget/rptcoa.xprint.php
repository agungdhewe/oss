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


			$stmt = $this->db->prepare('call accbudget_listing()');
			$stmt->execute();
			$row =  $stmt->fetch(\PDO::FETCH_ASSOC);
			$cacheid = $row['cacheid'];

			$stmt = $this->db->prepare("
				select
				accbudget_id, accbudget_name, accbudget_parent, accbudget_isparent, accbudget_path, accbudget_level, coa_id
				from 
				xhc_accbudget
				where
				cacheid = :cacheid
				order by cacherownum
			");
			$stmt->execute([':cacheid'=>$cacheid]);
			$this->rows =  $stmt->fetchall(\PDO::FETCH_ASSOC);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};
