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
 * finact/collection/cashdisc/apis/xapi.base.php
 *
 * cashdiscBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul cashdisc
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/04/2021
 */
class cashdiscBase extends WebAPI {

	protected $main_tablename = "trn_cashdiscount";
	protected $main_primarykey = "cashdiscount_id";
	protected $main_field_version = "cashdiscount_version";	
	
	protected $field_iscommit = "cashdiscount_iscommit";
	protected $field_commitby = "cashdiscount_commitby";
	protected $field_commitdate = "cashdiscount_commitdate";		
			
	
	protected $fields_isapprovalprogress = "cashdiscount_isapprovalprogress";			
	protected $field_isapprove = "cashdiscount_isapproved";
	protected $field_approveby = "cashdiscount_approveby";
	protected $field_approvedate = "cashdiscount_approvedate";
	protected $field_isdecline = "cashdiscount_isdeclined";
	protected $field_declineby = "cashdiscount_declineby";
	protected $field_declinedate = "cashdiscount_declinedate";

	protected $approval_tablename = "trn_cashdiscountappr";
	protected $approval_primarykey = "cashdiscountappr_id";
	protected $approval_field_approve = "cashdiscountappr_isapproved";
	protected $approval_field_approveby = "cashdiscountappr_by";
	protected $approval_field_approvedate = "cashdiscountappr_date";
	protected $approval_field_decline = "cashdiscountappr_isdeclined";
	protected $approval_field_declineby = "cashdiscountappr_declinedby";
	protected $approval_field_declinedate = "cashdiscountappr_declineddate";
	protected $approval_field_notes = "cashdiscountappr_notes";
	protected $approval_field_version = "cashdiscount_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*cashdisc*/.txt";
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