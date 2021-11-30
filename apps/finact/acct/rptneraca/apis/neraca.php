<?php


class Neraca  {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}

	function getdata($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
	
		try {


			$stmt = $this->db->prepare("
				call ledger_report_format(:coareport_id, :date);			
			");
	
			$stmt->execute([
				':coareport_id' => 'NR',
				':date' => $pertanggal 
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}



}
