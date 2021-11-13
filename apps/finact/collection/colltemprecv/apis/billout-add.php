<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends colltemprecvBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_colltemprecvdetil';
		$primarykey = 'colltemprecvdetil_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			$this->log($data);

			try {
				$obj = new \stdClass;
				$obj->colltemprecvdetil_id = \uniqid();
				$obj->billout_id = $data->billout_id;
				$obj->billout_datedue = $data->billout_datedue;
				$obj->billout_daystotarget = $data->billout_age;
				$obj->billout_idr = $data->billout_idr;	
				$obj->billout_ppn = $data->billout_ppn;
				$obj->billout_ppnval = $data->billout_ppnval;
				$obj->billout_pph = $data->billout_pph;
				$obj->billout_pphval = $data->billout_pphval;
				$obj->billout_idrnett = $data->billout_idrnett;
				
				$obj->billout_idrtotal = $data->billout_idrtotal;
				

				$billout_idrtotal = (float)$data->billout_idrtotal;
				$add_billout_discval = (float)$data->add_billout_discval;
				if ($add_billout_discval>0) {
					$obj->billout_discp = $data->add_billout_discp;
					$obj->billout_discval = $data->add_billout_discval;
					$obj->billout_idrtopay = $billout_idrtotal - $add_billout_discval ;
					$obj->billout_ppntopay = $data->billout_ppntopay;
					$obj->billout_pphtopay = $data->billout_pphtopay;
				} else {
					$obj->billout_discp = $data->billout_discp;
					$obj->billout_discval = $data->billout_discval;
					$obj->billout_idrtopay = $data->billout_idrtopay;
					$obj->billout_ppntopay = $data->billout_ppntopay;
					$obj->billout_pphtopay = $data->billout_pphtopay;
				}



				$obj->colltemprecv_id = $data->colltemprecv_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");

				$sql = "
					select count(*) as n 
					from 
					trn_colltemprecvdetil A inner join trn_colltemprecv B on B.colltemprecv_id = A.colltemprecv_id
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