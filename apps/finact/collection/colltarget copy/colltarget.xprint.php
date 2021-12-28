<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class PrintForm extends WebModule {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/logfile-corpbudget.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

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
	
	
	public function LoadPage() {
		$this->preloadscripts = [
			'jslibs/qrious.js'
		];

		$id = $_GET['id'];


		$tablename = 'mst_corpbudget';
		$primarykey = 'corpbudget_id';

		try {

			// header
			$sql = $this->getSqlHeader();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':colltarget_id' => $id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$row = $rows[0];

			$this->colltarget_id = $row['colltarget_id'];
			$this->periodemo_name = $row['periodemo_name'];
			$this->empl_name = $row['empl_name'];
			$this->dept_name = $row['dept_name'];

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getSqlHeader() {
		return "
			select 
			A.colltarget_id,
			A.periodemo_id,
			(select periodemo_name from mst_periodemo where periodemo_id=A.periodemo_id) as periodemo_name,
			A.empl_id,
			(select empl_name from mst_empl where empl_id = A.empl_id) as empl_name,
			A.dept_id,
			(select dept_name from mst_dept where dept_id = A.dept_id) as dept_name
			from trn_colltarget A
			where
			A.colltarget_id = :colltarget_id
		";
	}	


}

$MODULE = new PrintForm();