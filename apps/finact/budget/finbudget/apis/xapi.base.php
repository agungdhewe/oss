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
 * finact/budget/finbudget/apis/xapi.base.php
 *
 * finbudgetBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul finbudget
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/08/2021
 */
class finbudgetBase extends WebAPI {

	protected $main_tablename = "mst_finbudget";
	protected $main_primarykey = "finbudget_id";
	protected $main_field_version = "finbudget_version";	
	
	protected $field_iscommit = "finbudget_iscommit";
	protected $field_commitby = "finbudget_commitby";
	protected $field_commitdate = "finbudget_commitdate";		
			
	
	protected $fields_isapprovalprogress = "finbudget_isapprovalprogress";			
	protected $field_isapprove = "finbudget_isapproved";
	protected $field_approveby = "finbudget_approveby";
	protected $field_approvedate = "finbudget_approvedate";
	protected $field_isdecline = "finbudget_isdeclined";
	protected $field_declineby = "finbudget_declineby";
	protected $field_declinedate = "finbudget_declinedate";

	protected $approval_tablename = "mst_finbudgetappr";
	protected $approval_primarykey = "finbudgetappr_id";
	protected $approval_field_approve = "finbudgetappr_isapproved";
	protected $approval_field_approveby = "finbudgetappr_by";
	protected $approval_field_approvedate = "finbudgetappr_date";
	protected $approval_field_decline = "finbudgetappr_isdeclined";
	protected $approval_field_declineby = "finbudgetappr_declinedby";
	protected $approval_field_declinedate = "finbudgetappr_declineddate";
	protected $approval_field_notes = "finbudgetappr_notes";
	protected $approval_field_version = "finbudget_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*finbudget*/.txt";
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