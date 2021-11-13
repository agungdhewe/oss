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
 * finact/collection/collcashdisc/apis/xapi.base.php
 *
 * collcashdiscBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul collcashdisc
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/10/2021
 */
class collcashdiscBase extends WebAPI {

	protected $main_tablename = "trn_collcashdisc";
	protected $main_primarykey = "collcashdisc_id";
	protected $main_field_version = "collcashdisc_version";	
	
	protected $field_iscommit = "collcashdisc_iscommit";
	protected $field_commitby = "collcashdisc_commitby";
	protected $field_commitdate = "collcashdisc_commitdate";		
			
	
	protected $fields_isapprovalprogress = "collcashdisc_isapprovalprogress";			
	protected $field_isapprove = "collcashdisc_isapproved";
	protected $field_approveby = "collcashdisc_approveby";
	protected $field_approvedate = "collcashdisc_approvedate";
	protected $field_isdecline = "collcashdisc_isdeclined";
	protected $field_declineby = "collcashdisc_declineby";
	protected $field_declinedate = "collcashdisc_declinedate";

	protected $approval_tablename = "trn_collcashdiscappr";
	protected $approval_primarykey = "collcashdiscappr_id";
	protected $approval_field_approve = "collcashdiscappr_isapproved";
	protected $approval_field_approveby = "collcashdiscappr_by";
	protected $approval_field_approvedate = "collcashdiscappr_date";
	protected $approval_field_decline = "collcashdiscappr_isdeclined";
	protected $approval_field_declineby = "collcashdiscappr_declinedby";
	protected $approval_field_declinedate = "collcashdiscappr_declineddate";
	protected $approval_field_notes = "collcashdiscappr_notes";
	protected $approval_field_version = "collcashdisc_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*collcashdisc*/.txt";
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