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
 * finact/budget/deptbudget/apis/xapi.base.php
 *
 * deptbudgetBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul deptbudget
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
class deptbudgetBase extends WebAPI {

	protected $main_tablename = "mst_deptbudget";
	protected $main_primarykey = "deptbudget_id";
	protected $main_field_version = "deptbudget_version";	
	
	protected $field_iscommit = "deptbudget_iscommit";
	protected $field_commitby = "deptbudget_commitby";
	protected $field_commitdate = "deptbudget_commitdate";		
			
	
	protected $fields_isapprovalprogress = "deptbudget_isapprovalprogress";			
	protected $field_isapprove = "deptbudget_isapproved";
	protected $field_approveby = "deptbudget_approveby";
	protected $field_approvedate = "deptbudget_approvedate";
	protected $field_isdecline = "deptbudget_isdeclined";
	protected $field_declineby = "deptbudget_declineby";
	protected $field_declinedate = "deptbudget_declinedate";

	protected $approval_tablename = "mst_deptbudgetappr";
	protected $approval_primarykey = "deptbudgetappr_id";
	protected $approval_field_approve = "deptbudgetappr_isapproved";
	protected $approval_field_approveby = "deptbudgetappr_by";
	protected $approval_field_approvedate = "deptbudgetappr_date";
	protected $approval_field_decline = "deptbudgetappr_isdeclined";
	protected $approval_field_declineby = "deptbudgetappr_declinedby";
	protected $approval_field_declinedate = "deptbudgetappr_declineddate";
	protected $approval_field_notes = "deptbudgetappr_notes";
	protected $approval_field_version = "deptbudget_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*deptbudget*/.txt";
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