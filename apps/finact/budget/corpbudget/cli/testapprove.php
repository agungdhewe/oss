<?php

require_once __ROOT_DIR.'/core/webapi.php';	
require_once __ROOT_DIR.'/core/webauth.php';	

class SCENARIO {
	public static $id;
	public static $username;
	public static $param;

	public static function Run() {
		require __DIR__ . '/../apis/xtion-approve.php';
		SCENARIO::$id = '1999';
		
		
		SCENARIO::$username = '5effbb0a0f7d1';  // MANAGER
		// SCENARIO::$username = '5facb8a36127f';  // GM
		// SCENARIO::$username = '5facb8bebf826';  // DIREKTUR
		
		
		SCENARIO::$param = (object)[
			'approve' => false,
			'approval_note' => 'cek lagi yang bener',
			
		];
		
		$API->auth = new class {
			public function session_get_user() {
				return (object) [
					'username' => SCENARIO::$username
				];
			}			
		};
		$API->useotp = false;
		$result = $API->execute(SCENARIO::$id, SCENARIO::$param);
	}
}


console::class(new class($args) extends clibase {
	function execute() {
		SCENARIO::Run();
	}
});
