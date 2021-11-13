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
		return confirm_execute($this, $data);
	}
};


function confirm_execute($self, $data) {
	try {

		$ret = (object)[
			'success' => false,
			'partner_id' => $data->partner_id
		];

		$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
		$self->db->beginTransaction();



		try {
			$obj = new \stdClass;
			$obj->partneruser_password = md5($data->partner_pass);
			$obj->partner_id = $data->partner_id;
			$obj->partneruser_email1 = $data->partner_email1;
			$obj->_modifyby = 'partner';
			$obj->_modifydate = date("Y-m-d H:i:s");

			$key = new \stdClass;
			$key->partner_id = $data->partner_id;
			$key->partneruser_email1 = $data->partner_email1;			


			$tablename = 'mst_partneruser';
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);

			// print_r($cmd);

			$stmt = $self->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);



			\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, "mst_partnerreg", $data->partner_id, "SET NEW PASSWORD", 'partner', (object)[]);
			\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, "mst_partneruser", $data->partner_id, "SET NEW PASSWORD", 'partner', (object)[]);


			$ret->success = true;
			$ret->data = $key;

			$self->db->commit();
		} catch (\Exception $ex) {
			$self->db->rollBack();
			throw $ex;
		} finally {
			$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
		}

		return $ret;

	} catch (\Exception $ex) {
		throw $ex;
	}
}

