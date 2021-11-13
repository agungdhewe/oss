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
 * finact/budget/projbudgetrev/apis/xapi.base.php
 *
 * projbudgetrevBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul projbudgetrev
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/06/2021
 */
class projbudgetrevBase extends WebAPI {

	protected $main_tablename = "mst_projbudgetrev";
	protected $main_primarykey = "projbudgetrev_id";
	protected $main_field_version = "projbudgetrev_version";	
	
	protected $field_iscommit = "projbudgetrev_iscommit";
	protected $field_commitby = "projbudgetrev_commitby";
	protected $field_commitdate = "projbudgetrev_commitdate";		
			
	
	protected $fields_isapprovalprogress = "projbudgetrev_isapprovalprogress";			
	protected $field_isapprove = "projbudgetrev_isapproved";
	protected $field_approveby = "projbudgetrev_approveby";
	protected $field_approvedate = "projbudgetrev_approvedate";
	protected $field_isdecline = "projbudgetrev_isdeclined";
	protected $field_declineby = "projbudgetrev_declineby";
	protected $field_declinedate = "projbudgetrev_declinedate";

	protected $approval_tablename = "mst_projbudgetrevappr";
	protected $approval_primarykey = "projbudgetrevappr_id";
	protected $approval_field_approve = "projbudgetrevappr_isapproved";
	protected $approval_field_approveby = "projbudgetrevappr_by";
	protected $approval_field_approvedate = "projbudgetrevappr_date";
	protected $approval_field_decline = "projbudgetrevappr_isdeclined";
	protected $approval_field_declineby = "projbudgetrevappr_declinedby";
	protected $approval_field_declinedate = "projbudgetrevappr_declineddate";
	protected $approval_field_notes = "projbudgetrevappr_notes";
	protected $approval_field_version = "projbudgetrev_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*projbudgetrev*/.txt";
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