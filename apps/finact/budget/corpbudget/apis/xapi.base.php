<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

// /* Enable Debugging */
require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;




/**
 * finact/budget/corpbudget/apis/xapi.base.php
 *
 * corpbudgetBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul corpbudget
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/04/2021
 */
class corpbudgetBase extends WebAPI {

	protected $main_tablename = "mst_corpbudget";
	protected $main_primarykey = "corpbudget_id";
	protected $main_field_version = "corpbudget_version";	
	
	protected $field_iscommit = "corpbudget_iscommit";
	protected $field_commitby = "corpbudget_commitby";
	protected $field_commitdate = "corpbudget_commitdate";		
			
	
	protected $fields_isapprovalprogress = "corpbudget_isapprovalprogress";			
	protected $field_isapprove = "corpbudget_isapproved";
	protected $field_approveby = "corpbudget_approveby";
	protected $field_approvedate = "corpbudget_approvedate";
	protected $field_isdecline = "corpbudget_isdeclined";
	protected $field_declineby = "corpbudget_declineby";
	protected $field_declinedate = "corpbudget_declinedate";

	protected $approval_tablename = "mst_corpbudgetappr";
	protected $approval_primarykey = "corpbudgetappr_id";
	protected $approval_field_approve = "corpbudgetappr_isapproved";
	protected $approval_field_approveby = "corpbudgetappr_by";
	protected $approval_field_approvedate = "corpbudgetappr_date";
	protected $approval_field_decline = "corpbudgetappr_isdeclined";
	protected $approval_field_declineby = "corpbudgetappr_declinedby";
	protected $approval_field_declinedate = "corpbudgetappr_declineddate";
	protected $approval_field_notes = "corpbudgetappr_notes";
	protected $approval_field_version = "corpbudget_version";

			



	function __construct() {

		$logfilepath = __LOCALDB_DIR . "/output/corpbudget.txt";
		// debug::disable();
		debug::start($logfilepath, "w");

		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];		
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

		
	}

	function pre_action_check($data, $action) {
		try {
			return true;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function get_header_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				$this->main_tablename A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '$id' tidak ditemukan"); }
			return (object)$rows[0];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}