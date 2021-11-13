<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


class DataPaste extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/test-paste.txt";
		debug::start($logfilepath, "w");
		debug::log("start debug");

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

	public function execute($corpbudget_id, $data) {
		$userdata = $this->auth->session_get_user();
		try {
			// debug::log(print_r($data, true));
			$stmt_check = $this->db->prepare("
				select * from mst_corpbudgetdet
				where
				corpbudget_id = :corpbudget_id and accbudget_id = :accbudget_id
			");

			$stmt_update = $this->db->prepare("
				update mst_corpbudgetdet
				set
				corpbudgetdet_01 = :corpbudgetdet_01,
				corpbudgetdet_02 = :corpbudgetdet_02,
				corpbudgetdet_03 = :corpbudgetdet_03,
				corpbudgetdet_04 = :corpbudgetdet_04,
				corpbudgetdet_05 = :corpbudgetdet_05,
				corpbudgetdet_06 = :corpbudgetdet_06,
				corpbudgetdet_07 = :corpbudgetdet_07,
				corpbudgetdet_08 = :corpbudgetdet_08,
				corpbudgetdet_09 = :corpbudgetdet_09,
				corpbudgetdet_10 = :corpbudgetdet_10,
				corpbudgetdet_11 = :corpbudgetdet_11,
				corpbudgetdet_12 = :corpbudgetdet_12,
				corpbudgetdet_total = :corpbudgetdet_total
				where
				corpbudget_id = :corpbudget_id and accbudget_id = :accbudget_id
			
			");

			/** Prepare Insert Here */
			$stmt_check_acc = $this->db->prepare("select * from mst_accbudget where accbudget_id = :accbudget_id");

			$sql_insert = "
				insert into mst_corpbudgetdet
				( corpbudget_id,  corpbudgetdet_id,  corpbudgetdet_01,  corpbudgetdet_02,  corpbudgetdet_03,  corpbudgetdet_04,  corpbudgetdet_05,  corpbudgetdet_06,  corpbudgetdet_07,  corpbudgetdet_08,  corpbudgetdet_09,  corpbudgetdet_10,  corpbudgetdet_11,  corpbudgetdet_12,  corpbudgetdet_total,  accbudget_id,  _createby,   _createdate)
				values
				(:corpbudget_id, :corpbudgetdet_id,  :corpbudgetdet_01, :corpbudgetdet_02, :corpbudgetdet_03, :corpbudgetdet_04, :corpbudgetdet_05, :corpbudgetdet_06, :corpbudgetdet_07, :corpbudgetdet_08, :corpbudgetdet_09, :corpbudgetdet_10, :corpbudgetdet_11, :corpbudgetdet_12, :corpbudgetdet_total, :accbudget_id, :_createby,  :_createdate)
			";	
			$stmt_insert = $this->db->prepare($sql_insert);
			
			foreach ($data as $obj) {
				// debug::log(print_r($obj, true));
				$stmt_check->execute([
					':corpbudget_id' => $corpbudget_id,
					':accbudget_id' => $obj->accbudget_id
				]);

				$stmt_check_acc->execute([':accbudget_id' => $obj->accbudget_id]);
				$acc_exist = $stmt_check_acc->fetchall(\PDO::FETCH_ASSOC);

				$budget_type = count($acc_exist) > 0 ? $acc_exist[0]['accbudgettype_id'] : '';
				// if ($budget_type === 'NR'){
				// 	$total = $obj->corpbudgetdet_12;
				// }else{
					$total = $obj->corpbudgetdet_01 + $obj->corpbudgetdet_02 + $obj->corpbudgetdet_03 + $obj->corpbudgetdet_04 + $obj->corpbudgetdet_05 + $obj->corpbudgetdet_06 + $obj->corpbudgetdet_07 + $obj->corpbudgetdet_08 + $obj->corpbudgetdet_09 + $obj->corpbudgetdet_10 + $obj->corpbudgetdet_11 + $obj->corpbudgetdet_12;
				// }

				
				$rows_exist = $stmt_check->fetchall(\PDO::FETCH_ASSOC);
				if (count($rows_exist)>0) {
					//update
					$stmt_update->execute([
						':corpbudget_id' => $corpbudget_id,
						':accbudget_id' => $obj->accbudget_id,
						':corpbudgetdet_01' => $obj->corpbudgetdet_01,
						':corpbudgetdet_02' => $obj->corpbudgetdet_02,
						':corpbudgetdet_03' => $obj->corpbudgetdet_03,
						':corpbudgetdet_04' => $obj->corpbudgetdet_04,
						':corpbudgetdet_05' => $obj->corpbudgetdet_05,
						':corpbudgetdet_06' => $obj->corpbudgetdet_06,
						':corpbudgetdet_07' => $obj->corpbudgetdet_07,
						':corpbudgetdet_08' => $obj->corpbudgetdet_08,
						':corpbudgetdet_09' => $obj->corpbudgetdet_09,
						':corpbudgetdet_10' => $obj->corpbudgetdet_10,
						':corpbudgetdet_11' => $obj->corpbudgetdet_11,
						':corpbudgetdet_12' => $obj->corpbudgetdet_12,
						':corpbudgetdet_total' => $total
					]);
				} else {
					//insert
					if (count($acc_exist) > 0) {
						$param = array();
						foreach ($obj as $key => $value) {
							$param[":". $key] = $value;
						}					
						$param[':corpbudget_id'] = $corpbudget_id;
						$param[':corpbudgetdet_id'] = uniqid();
						$param[':_createby'] = $userdata->username;
						$param[':_createdate'] = date("Y-m-d H:i:s");
						$param[':corpbudgetdet_total'] = $total;
																		
						unset($param[':no']);
						unset($param[':accbudget_name']);

						$stmt_insert->execute($param);
					}					
				}
			}

			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}


$API = new DataPaste();

