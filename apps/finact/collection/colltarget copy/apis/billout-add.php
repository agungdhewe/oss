<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends colltargetBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_colltargetbillout';
		$primarykey = 'colltargetbillout_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$obj = new \stdClass;
				$obj->colltargetbillout_id = \uniqid();
				// $obj->itemasset_id = $data->itemasset_id == '' ? '--NULL--' : $data->itemasset_id;
				$obj->partner_id = $data->partner_id;
				$obj->billout_id = $data->billout_id;
				$obj->colltargetbillout_datetarget = date("Y-m-d");
				$obj->billout_datedue = $data->billout_datedue;
				$obj->billout_daystotarget = 0;
				$obj->billout_idr = $data->billout_validr;
				$obj->billout_ppn = $data->billout_ppn;
				$obj->billout_ppnval = $data->billout_ppnval;
				$obj->billout_pph = $data->billout_pph;
				$obj->billout_pphval = $data->billout_pphval;
				$obj->billout_idrnett = $data->billout_idrnett;
				$obj->billout_isdiscvalue = 0;
				$obj->billout_discp = $data->colltarget_estdisc;
				$obj->billout_discval = $data->billout_discval;
				$obj->billout_idrtotal = $data->billout_idrtotal;
				$obj->billout_idrtopay = $data->billout_idrtotal;
				$obj->billout_ppntopay = $data->billout_ppnval;
				$obj->colltargetbillout_notes = '';
				$obj->colltarget_id = $data->colltarget_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				$sql = "
					select count(*) as n 
					from 
					trn_colltargetbillout A inner join trn_colltarget B on B.colltarget_id = A.colltarget_id
					where 
					B.periodemo_id=:periodemo_id and A.billout_id = :billout_id
				";
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':periodemo_id' => $data->periodemo_id,
					':billout_id' => $data->billout_id
				]);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				$n = $rows[0]['n'];
				
				if ($n==0) {
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
					$action = 'NEW';
					\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
					$this->log($data);
				} 

				$this->db->commit();

				$result->_trid = $data->_trid;
				$result->success = true;
			} catch (\Exception $ex) {
				$result->success = false;
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};