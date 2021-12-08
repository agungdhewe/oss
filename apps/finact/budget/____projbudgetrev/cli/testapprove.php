<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class SCENARIO {
	public static $id;
	public static $username;
	public static $param;

	public static function Run() {
		require __DIR__ . '/../apis/xtion-approve.php';
		SCENARIO::$id = 'BR0221120001';
		

		// SCENARIO::$username = '5effbb0a0f7d1';  // STAFF: agung
		SCENARIO::$username = '61abbade957eb';  // MANAGER: danisa
		// SCENARIO::$username = '61abbabe805bd';  // KADIV: jarvis
		// SCENARIO::$username = '61abba7d17e6b';  // DIREKTUR: indira
		
		
		SCENARIO::$param = (object)[
			'approve' => true,
			'approval_note' => 'ok',
		];
		
		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => SCENARIO::$username
				];
			}			
		};
		$API->reqinfo = (object)[
			'modulefullname' => 'finact/budget/projbudgetrev'
		];
		$API->useotp = false;
		$result = $API->execute(SCENARIO::$id, SCENARIO::$param);
	}
}


console::class(new class($args) extends clibase {
	function execute() {
		SCENARIO::Run();
	}
});
