<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/budget/deptbudgetrev/apis/approval-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel approval} deptbudgetrev (mst_deptbudgetrev)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetrevBase {

	public function execute($options) {
		$tablename = 'mst_deptbudgetrevappr';
		$primarykey = 'deptbudgetrevappr_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"deptbudgetrevappr_id" => " deptbudgetrevappr_id = :deptbudgetrevappr_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_deptbudgetrevappr A', [
				'deptbudgetrevappr_id', 'deptbudgetrevappr_isapproved', 'deptbudgetrevappr_by', 'deptbudgetrevappr_date', 'deptbudgetrev_version', 'deptbudgetrevappr_isdeclined', 'deptbudgetrevappr_declinedby', 'deptbudgetrevappr_declineddate', 'deptbudgetrevappr_notes', 'deptbudgetrev_id', 'docauth_descr', 'docauth_order', 'docauth_value', 'docauth_min', 'authlevel_id', 'authlevel_name', 'auth_id', 'auth_name', '_createby', '_createdate', '_modifyby', '_modifydate' 
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
					
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']

				
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