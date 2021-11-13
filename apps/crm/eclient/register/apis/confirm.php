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

		$partner = GetData($self, $data->partner_id);
	
		$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
		$self->db->beginTransaction();

		try {
			if ($partner->confirmcode == $data->confirmcode) {
				$ret->success = true;
				$self->db->query("update mst_partnerreg set partner_isdisabled=0 where partner_id='" . $partner->partner_id . "'");
			} 

			$ret->partner_name = $partner->partner_name;
			$ret->partner_email1 = $partner->partner_email1;

			\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, "mst_partnerreg", $partner->partner_id, "CONFIRM", 'partner', (object)[]);


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


function GetData($self, $partner_id) {
	try {
		$sql = "select partner_id, partner_name, partner_email1, partner_cf7 as confirmcode from mst_partnerreg where partner_id = :partner_id";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([
			':partner_id' => $partner_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)==0) {
			throw new \Exception("partner '$partner_id' tidak ditemukan");
		}

		return (object)$rows[0];
	} catch (\Exception $ex) {
		throw $ex;
	}
}
