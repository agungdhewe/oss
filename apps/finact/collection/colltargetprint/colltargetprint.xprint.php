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
	
	
	public function LoadPage($periodemo_id, $periodemo_name) {
		$userdata = $this->auth->session_get_user();

		$this->periodemo_id = $periodemo_id;
		$this->periodemo_name = $periodemo_name;

		try {
			$this->log($periodemo_id);

			$sql = "
				select 
				A.empl_id ,
				(select empl_name from mst_empl where empl_id=A.empl_id) as empl_name,
				sum(B.billout_idrtopay) as idrtopay, 
				sum(B.billout_pphval) as pphtopay,
				sum(B.billout_discval) as discval 
				from
				trn_colltarget A inner join trn_colltargetbillout B ON B.colltarget_id = A.colltarget_id 
				where 
				A.periodemo_id = :periodemo_id
				group by A.empl_id  				
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=> '202110',
			]);	
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			$this->rows = $rows;

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};
