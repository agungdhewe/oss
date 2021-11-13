<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * ent/affiliation/partnertype/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header partnertype (mst_partnertype)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/10/2021
 */
$API = new class extends partnertypeBase {
	
	public function execute($options) {
		$tablename = 'mst_partnertype';
		$primarykey = 'partnertype_id';
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
					"partnertype_id" => " partnertype_id = :partnertype_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_partnertype A', [
				'partnertype_id', 'partnertype_name', 'partnertype_descr', 'partnercategory_id', 'itemclass_id', 'unbill_accbudget_id', 'unbill_coa_id', 'payable_accbudget_id', 'payable_coa_id', 'partnertype_isempl', 'partnertype_ishaveae', 'partnertype_ishavecollector', 'partnertype_isdisabled', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				
				'partnercategory_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercategory_id'], $this->db, 'mst_partnercategory', 'partnercategory_id', 'partnercategory_name'),
				'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
				'unbill_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['unbill_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'unbill_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['unbill_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'payable_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['payable_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'payable_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['payable_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),


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