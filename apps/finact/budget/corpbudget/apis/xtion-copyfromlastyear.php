<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataCopy extends WebAPI {
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


	public function execute($corpbudget_id) {
		$userdata = $this->auth->session_get_user();



		try {

			$sql = "select count(*) as n from mst_corpbudgetdet where corpbudget_id = :corpbudget_id";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':corpbudget_id' => $corpbudget_id
			]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			if ($row['n']>0) {
				throw new \Exception('Budget sudah ada isinya');
			}


			$corpbudget_id = (int)$corpbudget_id;
			$lastyear_corpbudget_id = $corpbudget_id - 1;

			$sql = "select * from mst_corpbudgetdet where corpbudget_id = :corpbudget_id";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':corpbudget_id' => $lastyear_corpbudget_id
			]);

			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		
		
			$sql_insert = "
				insert into mst_corpbudgetdet
				( corpbudget_id,  corpbudgetdet_id,  corpbudgetdet_descr,  corpbudgetdet_01,  corpbudgetdet_02,  corpbudgetdet_03,  corpbudgetdet_04,  corpbudgetdet_05,  corpbudgetdet_06,  corpbudgetdet_07,  corpbudgetdet_08,  corpbudgetdet_09,  corpbudgetdet_10,  corpbudgetdet_11,  corpbudgetdet_12,  corpbudgetdet_total,  accbudget_id,  corpbudgetdet_notes,  _createby,   _createdate)
				values
				(:corpbudget_id, :corpbudgetdet_id, :corpbudgetdet_descr, :corpbudgetdet_01, :corpbudgetdet_02, :corpbudgetdet_03, :corpbudgetdet_04, :corpbudgetdet_05, :corpbudgetdet_06, :corpbudgetdet_07, :corpbudgetdet_08, :corpbudgetdet_09, :corpbudgetdet_10, :corpbudgetdet_11, :corpbudgetdet_12, :corpbudgetdet_total, :accbudget_id, :corpbudgetdet_notes, :_createby,  :_createdate)
			";	
			$stmt_insert = $this->db->prepare($sql_insert);

			foreach ($rows as $row) {
				$param = array();
				foreach ($row as $key => $value) {
					$param[":". $key] = $value;
				}
				$param[':corpbudget_id'] = $corpbudget_id;
				$param[':corpbudgetdet_id'] = uniqid();
				$param[':_createby'] = $userdata->username;
				$param[':_createdate'] = date("Y-m-d H:i:s");
				unset($param[':_modifyby']);
				unset($param[':_modifydate']);
			

				$stmt_insert->execute($param);

			}		
			
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}


$API = new DataCopy();


// [:corpbudgetdet_id] => 2020 
// [:corpbudgetdet_descr] => 
// [:corpbudgetdet_01] => -511886366 
// [:corpbudgetdet_02] => -2529573455 
// [:corpbudgetdet_03] => -6634276825 
// [:corpbudgetdet_04] => -10619502670 
// [:corpbudgetdet_05] => -3558372875 
// [:corpbudgetdet_06] => -664090908 
// [:corpbudgetdet_07] => -465681817 
// [:corpbudgetdet_08] => -2459062282 
// [:corpbudgetdet_09] => -1092999999 
// [:corpbudgetdet_10] => -1714762019 
// [:corpbudgetdet_11] => -1210500000 
// [:corpbudgetdet_12] => -777500000 
// [:corpbudgetdet_total] => -32238209216 
// [:accbudget_id] => 4010100001 
// [:corpbudgetdet_notes] => 
// [:corpbudget_id] => 2019 
// [:_createby] => 5effbb0a0f7d1 
// [:_createdate] => 2020-08-23 09:36:53 )


// :corpbudgetdet_id, 
// :corpbudgetdet_descr, 
// :corpbudgetdet_01, 
// :corpbudgetdet_02, 
// :corpbudgetdet_03, 
// :corpbudgetdet_04, 
// :corpbudgetdet_05, 
// :corpbudgetdet_06, 
// :corpbudgetdet_07, 
// :corpbudgetdet_08, 
// :corpbudgetdet_09, 
// :corpbudgetdet_10, 
// :corpbudgetdet_11, 
// :corpbudgetdet_12, 
// :corpbudgetdet_total, 
// :accbudget_id, 
// :corpbudgetdet_notes, 
// :_createby,  
// :_createdate