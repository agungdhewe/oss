<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * ent/affiliation/partner/apis/modeltransaksi-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel modeltransaksi} partner (mst_partner)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/04/2021
 */
$API = new class extends partnerBase {

	public function execute($options) {
		$tablename = 'mst_partnertrxmodel';
		$primarykey = 'partnertrxmodel_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"partnertrxmodel_id" => " partnertrxmodel_id = :partnertrxmodel_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_partnertrxmodel A', [
				'partnertrxmodel_id', 'trxmodel_id', 'coa_id', 'unbill_coa_id', 'partner_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
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

				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'unbill_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['unbill_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				
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