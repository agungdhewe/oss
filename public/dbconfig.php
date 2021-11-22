<?php namespace FGTA4;

define('DB_CONFIG', [
	'FGTACLOUD' => [
		'DSN' => "mysql:host=localhost;dbname=ossdb",
		'user' => "root",
		'pass' => "rahasia"
	],


	'FGTAFS' => [
		'host' => 'localhost',
		'port' => '5984',
		'protocol' => 'http',
		'username' => null,
		'password' => null,
		'database' => 'ossdbfs'		
	]	

]);



$GLOBALS['MAINDB'] = 'FGTACLOUD';
$GLOBALS['MAINDBTYPE'] = 'mariadb';

$GLOBALS['MAIN_USERTABLE'] = 'ossdb.fgt_user';
