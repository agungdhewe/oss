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
		return doregister_execute($this, $data);
	}
};

function doregister_execute($self, $data) {
	try {
		if (IsExist($self, $data)) {
			throw new \Exception("sudah ada");
		}
	
		$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
		$self->db->beginTransaction();

		try {
			$partner = CreateEmptyPartnerRequest($self, $data);
			CreateNewPartnerUser($self, $partner);
			$self->db->commit();
		} catch (\Exception $ex) {
			$self->db->rollBack();
			throw $ex;
		} finally {
			$self->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
		}

		return (object)[
			"partner_id" => $partner->partner_id
		];
	} catch (\Exception $ex) {
		throw $ex;
	}
}

function IsExist($self, $data) {
	try {
		$sql = "select count(*) as n from mst_partnerreg where partner_name = :partner_name";
		$stmt = $self->db->prepare($sql);
		$stmt->execute([
			':partner_name' => $data->partner_name
		]);
		$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
		$n = $row['n'];
		
		if ($n>0) {
			return true;
		} else {
			return false;
		}
	} catch (\Exception $ex) {
		throw $ex;
	}
}


function GenerateConfirmationCode($self) {
	return "1234";
}

function  CreateEmptyPartnerRequest($self, $data) {
	try {
		$username = 'partner';
		$partner_id = uniqid();
		$tablename = "mst_partnerreg";
		$primarykey = 'partner_id';
		$obj = (object)[
			"partner_id" => $partner_id,
			"partner_name" => $data->partner_name,
			"partner_isdisabled" => 1,
			"partner_email1" => $data->partner_email,
			"partner_cf7" => GenerateConfirmationCode($self),
			"_createby" => $username,
		];

		$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);

		$stmt = $self->db->prepare($cmd->sql);
		$stmt->execute($cmd->params);
		\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, "INSERT", $username, (object)[]);

		return $obj;
	} catch (\Exception $ex) {
		throw $ex;
	}
}

function CreateNewPartnerUser($self, $partner) {
	try {
		$username = 'partner';
		$tablename = "mst_partneruser";
		$primarykey = 'partneruser_id';
		$partneruser_id = uniqid();
		$obj = (object)[
			"partneruser_id" => $partneruser_id,
			"partneruser_email1" => $partner->partner_email1,
			"partneruser_password" => md5(uniqid()),
			"partner_id" => $partner->partner_id,
			"_createby" => $username,
		];

		$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);


		$stmt = $self->db->prepare($cmd->sql);
		$stmt->execute($cmd->params);
		\FGTA4\utils\SqlUtility::WriteLog($self->db, $self->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, "INSERT", $username, (object)[]);


	} catch (\Exception $ex) {
		throw $ex;
	}
}

