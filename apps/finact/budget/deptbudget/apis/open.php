<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/budget/deptbudget/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header deptbudget (mst_deptbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {
	
	public function execute($options) {
		$tablename = 'mst_deptbudget';
		$primarykey = 'deptbudget_id';
		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"deptbudget_id" => " deptbudget_id = :deptbudget_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_deptbudget A', [
				  'deptbudget_id', 'deptbudget_year', 'deptbudget_notes', 'deptbudget_version', 'dept_id', 'doc_id', 'deptbudget_iscommit', 'deptbudget_commitby', 'deptbudget_commitdate', 'deptbudget_isapprovalprogress', 'deptbudget_isapproved', 'deptbudget_approveby', 'deptbudget_approvedate', 'deptbudget_isdeclined', 'deptbudget_declineby', 'deptbudget_declinedate', 'deptbudget_isveryfied', 'deptbudget_verifyby', 'deptbudget_verifydate'
				, ["(select sum(deptbudgetdet_total) from mst_deptbudgetdet where deptbudget_id = A.deptbudget_id) as deptbudgetdet_total"]
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}


			$approverow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_approveby"=>$userdata->username, "$this->approval_field_approve"=>'1'], $this->db, $this->approval_tablename);
			$declinerow = \FGTA4\utils\SqlUtility::LookupRow((object)["$this->main_primarykey"=>$record[$this->main_primarykey], "$this->approval_field_declineby"=>$userdata->username, "$this->approval_field_decline"=>'1'], $this->db, "$this->approval_tablename");
			

			$result->record = array_merge($record, [
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'deptbudget_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudget_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudget_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudget_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


				'pros_isuseralreadyapproved' => $approverow!=null ? '1' : '0',
				'pros_isuseralreadydeclined' => $declinerow!=null ? '1' : '0',
			
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};