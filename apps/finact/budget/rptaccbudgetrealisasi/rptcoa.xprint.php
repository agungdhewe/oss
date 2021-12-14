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
	
	
	public function LoadPage($dept_id, $dt) {
		$userdata = $this->auth->session_get_user();
		// $this->report_date = $dt;
		// $this->report_date_sql = (\DateTime::createFromFormat('d/m/Y',$dt))->format('Y-m-d');
		
		$date_sql = \DateTime::createFromFormat('d/m/Y',$dt)->format('Y-m-d');


		try {


			// $stmt = $this->db->prepare('call accbudget_listing()');
			// $stmt->execute();
			// $row =  $stmt->fetch(\PDO::FETCH_ASSOC);
			// $cacheid = $row['cacheid'];
			$sql = "call deptbudget_usage(:dept_id, :dt)";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':dept_id'=>$dept_id, 
				':dt' => $date_sql
			]);

			$sql = "
				select 
				A.accbudget_id,
				B.accbudget_name,
				C.coa_name,
				A.deptbudget_value,
				A.projbudget_value,
				A.inquiry_value,
				A.receive_value
				from 
				TEMP_BUDGET_RESULT A inner join mst_accbudget B on B.accbudget_id=A.accbudget_id
									inner join mst_coa C on C.coa_id=B.coa_id 			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$this->rows =  $stmt->fetchall(\PDO::FETCH_ASSOC);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};
