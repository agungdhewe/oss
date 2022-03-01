<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class PrintForm extends WebModule {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/logfile-billout.txt";
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


		$tablename = 'trn_billout';
		$primarykey = 'billout_id';

		try {

			// header
			$sql = $this->getSqlHeader();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':billout_id' => $id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$row = $rows[0];

			$this->billout_id = $row['billout_id'];
			$this->billout_descr= $row['billout_descr'];
			$this->empl_name = $row['empl_name'];
			$this->partner_name = $row['partner_name'];




			$sql_item = $this->getSqlItems();
			$stmt_item = $this->db->prepare($sql_item);
			$stmt_item->execute([':billout_id' => $id]);
			$itemrows  = $stmt_item->fetchall(\PDO::FETCH_ASSOC);
			$this->itemrows = $itemrows; 


		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getSqlHeader() {
		return "
			select 
			A.*,
			(select empl_name from mst_empl where empl_id =(select empl_id from mst_empluser where user_id = A._createby )) as empl_name,
			(select partner_name from mst_partner where partner_id = A.partner_id) as partner_name
			from trn_billout A where billout_id = :billout_id
		";
	}	


	function getSqlItems() {
		return "
			select 
			F.*
			from trn_billoutdetil F 
			where 
			billout_id = :billout_id
		";		
	}


}

$MODULE = new PrintForm();