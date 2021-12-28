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
 * finact/collection/colltarget/apis/xapi.base.php
 *
 * colltargetBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul colltarget
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/12/2021
 */
class colltargetBase extends WebAPI {

	protected $main_tablename = "trn_colltarget";
	protected $main_primarykey = "colltarget_id";
	protected $main_field_version = "colltarget_version";	
	
	protected $field_iscommit = "colltarget_iscommit";
	protected $field_commitby = "colltarget_commitby";
	protected $field_commitdate = "colltarget_commitdate";		
			
	
	protected $fields_isapprovalprogress = "colltarget_isapprovalprogress";			
	protected $field_isapprove = "colltarget_isapproved";
	protected $field_approveby = "colltarget_approveby";
	protected $field_approvedate = "colltarget_approvedate";
	protected $field_isdecline = "colltarget_isdeclined";
	protected $field_declineby = "colltarget_declineby";
	protected $field_declinedate = "colltarget_declinedate";

	protected $approval_tablename = "trn_colltargetappr";
	protected $approval_primarykey = "colltargetappr_id";
	protected $approval_field_approve = "colltargetappr_isapproved";
	protected $approval_field_approveby = "colltargetappr_by";
	protected $approval_field_approvedate = "colltargetappr_date";
	protected $approval_field_decline = "colltargetappr_isdeclined";
	protected $approval_field_declineby = "colltargetappr_declinedby";
	protected $approval_field_declinedate = "colltargetappr_declineddate";
	protected $approval_field_notes = "colltargetappr_notes";
	protected $approval_field_version = "colltarget_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*colltarget*/.txt";
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