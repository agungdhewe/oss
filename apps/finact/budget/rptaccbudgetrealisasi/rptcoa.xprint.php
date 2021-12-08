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


			// $stmt = $this->db->prepare('call accbudget_listing()');
			// $stmt->execute();
			// $row =  $stmt->fetch(\PDO::FETCH_ASSOC);
			// $cacheid = $row['cacheid'];

			$stmt = $this->db->prepare("
				select
				AX.accbudget_id,
				(select accbudget_name from mst_accbudget where accbudget_id=AX.accbudget_id) as accbudget_name,
				FORMAT(SUM(AX.budget), 0) as budget,
				FORMAT(SUM(AX.inquiry), 0) as inquiry,
				FORMAT(SUM(AX.realisasi), 0) as realisasi
				from (
					
					select 
					accbudget_id,
					projbudgetdet_value as budget,
					0 as inquiry,
					0 as realisasi
					from mst_projbudgetdet 
					-- where projbudget_id = 'BP21100001'
					
					
					union all
					
					
					select 
					A.accbudget_id,
					0 as budget,
					A.inquirydetil_estvalue as inquiry,
					0 as realisasi
					from
					trn_inquirydetil A inner join mst_projbudgetdet B on B.projbudgetdet_id = A.projbudgetdet_id
					-- where
					-- B.projbudget_id = 'BP21100001'
					
					
					union all
					
					
					select
					A.accbudget_id,
					0 as budget,
					0 as inquiry,
					A.recvitem_idr as realisasi
					from
					trn_recvitem A inner join trn_inquirydetil B on B.inquirydetil_id=A.inquiryitem_id
								inner join mst_projbudgetdet C on C.projbudgetdet_id = B.projbudgetdet_id
					-- where
					-- C.projbudget_id = 'BP21100001'
				
				) AX
				group by
				AX.accbudget_id
			");
			$stmt->execute();
			$this->rows =  $stmt->fetchall(\PDO::FETCH_ASSOC);

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






};
