<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends collaccmtnBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_collaccmtndet';
		$primarykey = 'collaccmtndet_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			$this->log($data);

			try {
				$obj = new \stdClass;
				$obj->collaccmtndet_id = \uniqid();
				$obj->billout_id = $data->billout_id;
				$obj->billout_datedue = $data->billout_datedue;
				$obj->billout_daystotarget = $data->billout_age;
				$obj->billout_idr = $data->billout_idr;	
				$obj->billout_ppn = $data->billout_ppn;
				$obj->billout_ppnval = $data->billout_ppnval;
				$obj->billout_pph = $data->billout_pph;
				$obj->billout_pphval = $data->billout_pphval;
				$obj->billout_idrnett = $data->billout_idrnett;
				$obj->billout_discval = $data->billout_discval;
				$obj->billout_idrtotal = $data->billout_idrtotal;
				$obj->billout_idrtopay = $data->billout_idrtopay;
				$obj->billout_ppntopay = $data->billout_ppntopay;
				$obj->collaccmtn_id = $data->collaccmtn_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				$sql = "
					select count(*) as n 
					from 
					trn_collaccmtndet A inner join trn_collaccmtn B on B.collaccmtn_id = A.collaccmtn_id
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