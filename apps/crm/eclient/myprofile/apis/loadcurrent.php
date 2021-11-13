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
	public function execute() {
		return loadcurrent_execute($this);
	}

};


function loadcurrent_execute($self) {
	$userdata = $self->auth->session_get_user();
	$partner_id = $userdata->username;

	try {
		$sql = "select * from mst_partnerreg where partner_id = :partner_id ";
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