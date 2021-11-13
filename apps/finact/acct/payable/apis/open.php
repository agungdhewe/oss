<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/acct/payable/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header payable (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 05/06/2021
 */
$API = new class extends payableBase {
	
	public function execute($options) {
		$tablename = 'trn_jurnal';
		$primarykey = 'jurnal_id';
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
					"jurnal_id" => " jurnal_id = :jurnal_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('view_jurnalap A', [
				'jurnal_id', 'jurnaltype_id', 'jurnal_ref', 'periodemo_id', 'jurnal_date', 'jurnal_datedue', 'billin_id', 'partner_id', 'jurnal_descr', 'jurnal_valfrg', 'curr_id', 'jurnal_valfrgrate', 'jurnal_validr', 'coa_id', 'dept_id', 'jurnalsource_id', 'jurnal_version', 'jurnal_iscommit', 'jurnal_commitby', 'jurnal_commitdate', 'jurnal_ispost', 'jurnal_postby', 'jurnal_postdate', 'jurnal_isclose', 'jurnal_isagingclose', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'jurnal_date' => date("d/m/Y", strtotime($record['jurnal_date'])),
				'jurnal_datedue' => date("d/m/Y", strtotime($record['jurnal_datedue'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'billin_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billin_id'], $this->db, 'trn_billin', 'billin_id', 'billin_descr'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
				'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),


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