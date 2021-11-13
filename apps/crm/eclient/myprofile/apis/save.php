<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;



$API = new class() extends WebAPI {
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
	public function execute($data) {
		return save_execute($this, $data);
	}

};


function save_execute($self, $data) {
	$userdata = $self->auth->session_get_user();
	$partner_id = $userdata->username;
	$tablename = 'mst_partnerreg';
	$primarykey = 'partner_id';

	try {

		$key = new \stdClass;
		$obj = new \stdClass;
		foreach ($data as $fieldname => $value) {
			if ($fieldname==$primarykey) {
				$key->{$fieldname} = $value;
			}
			$obj->{$fieldname} = $value;
		}
		$obj->partner_id = $partner_id; // set partner id sesuai login
		$key->partner_id = $partner_id;

		$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
		$self->db->beginTransaction();

		try {

			$action = 'MODIFY';
			$obj->_modifyby = $userdata->username;
			$obj->_modifydate = date("Y-m-d H:i:s");				
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);

	
			$stmt = $self->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);

			\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, 'partner', (object)[]);


			$self->db->commit();
		} catch (\Exception $ex) {
			$self->db->rollBack();
			throw $ex;
		} finally {
			$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
		}			

		return $obj;
	} catch (\Exception $ex) {
		throw $ex;
	}
}