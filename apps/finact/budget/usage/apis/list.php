<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
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

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
			// $where = \FGTA4\utils\SqlUtility::BuildCriteria(
			// 	$options->criteria,
			// 	[
			// 		"search" => " A.HEINV_ART = :search ",
			// 		"dt" => " A.DT = :dt "
			// 	]
			// );
			
			$stmt = $this->db->prepare("
				select
				X.projbudget_id,
				X.accbudget_id,
				(select projbudget_name from mst_projbudget where projbudget_id=X.projbudget_id) as projbudget_name,
				(select accbudget_name from mst_accbudget where accbudget_id=X.accbudget_id) as accbudget_name,
				sum(X.budgetted) as budgetted,
				sum(X.requested) as requested,
				sum(X.applied) as applied,
				sum(X.realisasi) as realisasi
				from (
					
					select 
					B.projbudget_id , 
					B.accbudget_id , 
					B.projbudgetdet_value as budgetted,
					0 as requested,
					0 as applied,
					0 as realisasi
					from mst_projbudget A inner join mst_projbudgetdet B on B.projbudget_id = A.projbudget_id
					
					union all
					
					select 
					A.projbudget_id, 
					C.accbudget_id , 
					0 as budgetted,  
					SUM(B.purchreqitem_estprice) as requested, 
					0 as applied,
					0 as realisasi
					from trn_purchreq A inner join trn_purchreqitem B on B.purchreq_id = A.purchreq_id
										inner join mst_itemclass C on C.itemclass_id =B.itemclass_id  
					group by 
					A.projbudget_id, 
					C.accbudget_id 										
						
					union all

					select
					D.projbudget_id ,
					E.accbudget_id,
					0 as budgetted,  
					0 as requested, 
					SUM(B.purchorderitem_price) as applied,
					0 as realisasi
					from
					trn_purchorder  A inner join trn_purchorderitem B on B.purchorder_id = A.purchorder_id
									  inner join trn_purchreqitem C on C.purchreqitem_id = B.purchreqitem_id
									  inner join trn_purchreq D on D.purchreq_id = C.purchreq_id 
									  inner join mst_itemclass E on E.itemclass_id = B.itemclass_id 
					group by
					D.projbudget_id ,
					E.accbudget_id	


				) X
				group by
				X.projbudget_id,
				X.accbudget_id
			");

			$stmt->execute();
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = array();
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				
				array_push($records, array_merge($record, [
				]));
			}



			$total = count($records);
			$offset = $total;
			$maxrow = $total;

			// kembalikan hasilnya
			$result = new \stdClass;
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();