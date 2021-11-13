<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR . '/core/webuser.php';
require_once __ROOT_DIR . '/apps/fgta/framework/login/apis/loginexception.php';
require_once __ROOT_DIR . '/core/sqlutil.php';

use \FGTA4\exceptions\WebException;
use FGTA4\exceptions\LoginException;
use FGTA4\WebUser;
use FGTA4\WebAuth;


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
		return dologin_execute($this, $data);
	}
};


function dologin_execute($self, $data) {

	try {

		$sql = "
			SELECT 
			A.partner_id,
			A.partner_name,
			B.partneruser_id AS user_id,
			B.partneruser_password as user_password
			FROM mst_partnerreg A inner join mst_partneruser B on A.partner_id = B.partner_id 
			WHERE
			B.partneruser_email1 = :username
			AND A.partner_isdisabled=0
			AND B.partneruser_isdisabled=0
		";		

		$stmt = $self->db->prepare($sql);
		$stmt->execute([
			':username' => $data->username
		]);
		$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

		if ($row==null) {
			throw new LoginException("Login salah");
		}

		if ($row['user_password']!=md5($data->password)) {
			throw new LoginException("Password yang anda masukkkan salah");
		}

		$userdata = new WebUser();
		$userdata->username = $row['partner_id'];
		$userdata->userfullname =  $row['partner_name'];
		$userdata->groups = ['public'];
	

		// login berhasil, mulai session
		// $tokenid = uniqid();
		// setcookie('tokenid', $tokenid, 0, '/; samesite=strict');
		$currentCookieParams = session_get_cookie_params(); 
		session_set_cookie_params(
			$currentCookieParams["lifetime"], 
			'/;SameSite=Strict'
		);
		session_start(["name" => 'tokenid']);
		
		$userdata->tokenid = session_id();
		$self->auth->session_user_start($userdata);


		
		return $userdata;		
	} catch (\Exception $ex) {
		throw $ex;
	}
}

