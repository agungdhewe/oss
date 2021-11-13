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
 * finact/budget/deptbudgetrev/apis/xapi.base.php
 *
 * deptbudgetrevBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul deptbudgetrev
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
class deptbudgetrevBase extends WebAPI {

	protected $main_tablename = "mst_deptbudgetrev";
	protected $main_primarykey = "deptbudgetrev_id";
	protected $main_field_version = "deptbudgetrev_version";	
	
	protected $field_iscommit = "deptbudgetrev_iscommit";
	protected $field_commitby = "deptbudgetrev_commitby";
	protected $field_commitdate = "deptbudgetrev_commitdate";		
			
	
	protected $fields_isapprovalprogress = "deptbudgetrev_isapprovalprogress";			
	protected $field_isapprove = "deptbudgetrev_isapproved";
	protected $field_approveby = "deptbudgetrev_approveby";
	protected $field_approvedate = "deptbudgetrev_approvedate";
	protected $field_isdecline = "deptbudgetrev_isdeclined";
	protected $field_declineby = "deptbudgetrev_declineby";
	protected $field_declinedate = "deptbudgetrev_declinedate";

	protected $approval_tablename = "mst_deptbudgetrevappr";
	protected $approval_primarykey = "deptbudgetrevappr_id";
	protected $approval_field_approve = "deptbudgetrevappr_isapproved";
	protected $approval_field_approveby = "deptbudgetrevappr_by";
	protected $approval_field_approvedate = "deptbudgetrevappr_date";
	protected $approval_field_decline = "deptbudgetrevappr_isdeclined";
	protected $approval_field_declineby = "deptbudgetrevappr_declinedby";
	protected $approval_field_declinedate = "deptbudgetrevappr_declineddate";
	protected $approval_field_notes = "deptbudgetrevappr_notes";
	protected $approval_field_version = "deptbudgetrev_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*deptbudgetrev*/.txt";
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