<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__.'/apis/datareport.php';



use \FGTA4\debug;

class PrintForm extends WebModule {
	function __construct() {
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
		
		$objdt = \DateTime::createFromFormat('d/m/Y',$dt);
		$pertanggal = $objdt->format('Y-m-d');
		try {



			$this->db->query("call ap_get_bydate('2021-10-31')");


			$sql = "
				select 
				A.partner_id,
				(select partner_name from mst_partner where partner_id = A.partner_id) as partner_name,
				A.jurnal_id,
				(select jurnal_descr from trn_jurnal where jurnal_id=A.jurnal_id) as jurnal_descr,
				A.ref_jurnal_duedate,
				@days := datediff('2021-09-30', A.ref_jurnal_duedate) as days ,
				case when @days<=0 then A.outstanding_idr else 0 end as age_0,
				case when @days>0 and @days<=30 then A.outstanding_idr else 0 end as age_30,
				case when @days>30 and @days<=60 then A.outstanding_idr else 0 end as age_60,
				case when @days>60 and @days<=90 then A.outstanding_idr else 0 end as age_90,
				case when @days>90 then A.outstanding_idr else 0 end as age_120,
				A.outstanding_idr
				from 
				RESULT_AP_PERIODE A
				order by partner_name, jurnal_id
				;				
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute();		
			$rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

			$this->rows = $rows;

		} catch (\Exception $ex) {
			throw $ex;
		}
	}






}

$MODULE = new PrintForm();