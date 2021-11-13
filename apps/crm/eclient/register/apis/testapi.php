<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

use \FGTA4\exceptions\WebException;


$API = new class() extends WebAPI {
	function __construct() {
		$this->debugoutput = false;
	}

	public function execute($param1, $param2) {
		mailer_execute($this);
	}
};


function mailer_execute($self) {
	try {

		$mailer = new stdClass;


		$maildata = [

		];




		// $mailsetting = [
		// 	"host" => "",
		// 	"port" => "",
		// 	"username" => "",
		// 	"password" => "",


		// ];


		// $mailer = "phpmailer"; //local
		// if ($mailer=="local") {

		// } else {


		// }


		$from = "noreply@ferrine.com";
		$to = "agung_dhewe@yahoo.com";
		$subject = "Checking PHP mail";
		$message = "PHP mail berjalan dengan baik";
		$headers = "From:" . $from;
		mail($to,$subject,$message, $headers);

		echo uniqid();
	} catch (\Exception $ex) {
		throw $ex;
	}
}

