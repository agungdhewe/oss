<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;



/**
 * finact/acct/jurnal/apis/xtion-uncommit.php
 *
 * ========
 * UnCommit
 * ========
 * UnCommit dokumen, mengembalikan status dokumen ke draft 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2021
 */
$API = new class extends jurnalBase {

	public function execute($id, $param) {
		$tablename = 'trn_jurnal';
		$primarykey = 'jurnal_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'uncommit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();
			
			try {

	
				$this->save_and_set_uncommit_flag($id, $currentdata);


				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					'jurnal_date' => date("d/m/Y", strtotime($record['jurnal_date'])),
					'jurnal_datedue' => date("d/m/Y", strtotime($record['jurnal_datedue'])),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'UNCOMMIT', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
					'dataresponse' => $dataresponse
				];
				
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}



	public function save_and_set_uncommit_flag($id, $currentdata) {
		$currentdata->header->{$this->main_field_version}++;
		try {
			$sql = " 
				update $this->main_tablename
				set 
				$this->field_iscommit = 0,
				$this->field_commitby = null,
				$this->field_commitdate = null,
				$this->main_field_version = :version
				where
				$this->main_primarykey = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $currentdata->header->{$this->main_primarykey},
				":version" => $currentdata->header->{$this->main_field_version}
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	
};


