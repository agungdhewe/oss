<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



$API = new class extends coaformatsetBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_coaformatsetitem';
		$primarykey = 'coaformatsetitem_id';
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
	
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$obj = new \stdClass;
				$obj->coaformatsetitem_id = \uniqid();
				$obj->coa_id = $data->coa_id;
				$obj->coa_nameshort = $data->coa_nameshort;
				$obj->coaformat_id = $data->coaformat_id;
				$obj->coaformatset_id =  $data->coaformatset_id;
				$obj->_createby = $userdata->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				$action = 'NEW';
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				// $this->log($data);
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

