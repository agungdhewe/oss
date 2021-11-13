<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';

// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\exceptions\WebException;
// use \FGTA4\debug;




/**
 * finact/budget/projbudget/apis/xapi.base.php
 *
 * projbudgetBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul projbudget
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/06/2021
 */
class projbudgetBase extends WebAPI {

	protected $main_tablename = "mst_projbudget";
	protected $main_primarykey = "projbudget_id";
	protected $main_field_version = "projbudget_version";	
	
	protected $field_iscommit = "projbudget_iscommit";
	protected $field_commitby = "projbudget_commitby";
	protected $field_commitdate = "projbudget_commitdate";		
			
	
	protected $fields_isapprovalprogress = "projbudget_isapprovalprogress";			
	protected $field_isapprove = "projbudget_isapproved";
	protected $field_approveby = "projbudget_approveby";
	protected $field_approvedate = "projbudget_approvedate";
	protected $field_isdecline = "projbudget_isdeclined";
	protected $field_declineby = "projbudget_declineby";
	protected $field_declinedate = "projbudget_declinedate";

	protected $approval_tablename = "mst_projbudgetappr";
	protected $approval_primarykey = "projbudgetappr_id";
	protected $approval_field_approve = "projbudgetappr_isapproved";
	protected $approval_field_approveby = "projbudgetappr_by";
	protected $approval_field_approvedate = "projbudgetappr_date";
	protected $approval_field_decline = "projbudgetappr_isdeclined";
	protected $approval_field_declineby = "projbudgetappr_declinedby";
	protected $approval_field_declinedate = "projbudgetappr_declineddate";
	protected $approval_field_notes = "projbudgetappr_notes";
	protected $approval_field_version = "projbudget_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*projbudget*/.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

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