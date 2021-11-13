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
 * finact/sales/salesorder/apis/xapi.base.php
 *
 * salesorderBase
 * Kelas dasar untuk keperluan-keperluan api
 * kelas ini harus di-inherit untuk semua api pada modul salesorder
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/04/2021
 */
class salesorderBase extends WebAPI {

	protected $main_tablename = "trn_salesorder";
	protected $main_primarykey = "salesorder_id";
	protected $main_field_version = "salesorder_version";	
	
	protected $field_iscommit = "salesorder_iscommit";
	protected $field_commitby = "salesorder_commitby";
	protected $field_commitdate = "salesorder_commitdate";		
			
	
	protected $fields_isapprovalprogress = "salesorder_isapprovalprogress";			
	protected $field_isapprove = "salesorder_isapproved";
	protected $field_approveby = "salesorder_approveby";
	protected $field_approvedate = "salesorder_approvedate";
	protected $field_isdecline = "salesorder_isdeclined";
	protected $field_declineby = "salesorder_declineby";
	protected $field_declinedate = "salesorder_declinedate";

	protected $approval_tablename = "trn_salesorderappr";
	protected $approval_primarykey = "salesorderappr_id";
	protected $approval_field_approve = "salesorderappr_isapproved";
	protected $approval_field_approveby = "salesorderappr_by";
	protected $approval_field_approvedate = "salesorderappr_date";
	protected $approval_field_decline = "salesorderappr_isdeclined";
	protected $approval_field_declineby = "salesorderappr_declinedby";
	protected $approval_field_declinedate = "salesorderappr_declineddate";
	protected $approval_field_notes = "salesorderappr_notes";
	protected $approval_field_version = "salesorder_version";

			



	function __construct() {

		// $logfilepath = __LOCALDB_DIR . "/output//*salesorder*/.txt";
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


	public function get_item_row($id) {
		try {
			$sql = "
				select 
				A.*
				from 
				trn_salesorderitem A 
				where 
				A.$this->main_primarykey = :id 
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([":id" => $id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			return $rows;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}