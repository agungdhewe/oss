<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/collection/colltemprecv/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header colltemprecv (trn_colltemprecv)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/10/2021
 */
$API = new class extends colltemprecvBase {
	
	public function execute($options) {
		$tablename = 'trn_colltemprecv';
		$primarykey = 'colltemprecv_id';
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
					"colltemprecv_id" => " colltemprecv_id = :colltemprecv_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_colltemprecv A', [
				  'colltemprecv_id', 'periodemo_id', 'colltemprecv_date', 'empl_id', 'dept_id', 'partner_id', 'colltemprecv_descr'
				, 'collsource_id'
				, 'paymtype_id', 'bankrekening_id', 'paym_bankname', 'paym_bgnum', 'paym_bgdatedue', 'paym_bgdate'
				, 'coa_id', 'colltemprecv_isadvance', 'colltemprecv_idrtopay', 'colltarget_ppntopay'
				, 'doc_id', 'colltemprecv_version', 'colltemprecv_iscommit', 'colltemprecv_commitby', 'colltemprecv_commitdate'
				, 'colltemprecv_isverified', 'colltemprecv_verifyby', 'colltemprecv_verifydate'
				, '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'colltemprecv_date' => date("d/m/Y", strtotime($record['colltemprecv_date'])),
				'paym_bgdatedue' => date("d/m/Y", strtotime($record['paym_bgdatedue'])),
				'paym_bgdate' => date("d/m/Y", strtotime($record['paym_bgdate'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				'bankrekening_name' => \FGTA4\utils\SqlUtility::Lookup($record['bankrekening_id'], $this->db, 'mst_bankrekening', 'bankrekening_id', 'bankrekening_name'),
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'collsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['collsource_id'], $this->db, 'mst_collsource', 'collsource_id', 'collsource_name'),
				'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'colltemprecv_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['colltemprecv_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'colltemprecv_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['colltemprecv_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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