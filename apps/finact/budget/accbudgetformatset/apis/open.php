<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/budget/accbudgetformatset/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header accbudgetformatset (mst_accbudgetformatset)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/09/2021
 */
$API = new class extends accbudgetformatsetBase {
	
	public function execute($options) {
		$tablename = 'mst_accbudgetformatset';
		$primarykey = 'accbudgetformatset_id';
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
					"accbudgetformatset_id" => " accbudgetformatset_id = :accbudgetformatset_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_accbudgetformatset A', [
				'accbudgetformatset_id', 'accbudgetformatset_order', 'accbudgetformatset_name', 'accbudgetformatset_descr', 'accbudgetformatset_isparent'
				, 'accbudgetformatset_isbold', 'accbudgetformatset_isitalic', 'accbudgetformatset_isunderline'
				, 'accbudgetformatset_parent', 'accbudgetformatset_path', 'accbudgetformatset_pathid', 'accbudgetformatset_level', 'accbudgetformat_id', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				
				'accbudgetformatset_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetformatset_parent'], $this->db, 'mst_accbudgetformatset', 'accbudgetformatset_id', 'accbudgetformatset_name'),
				'accbudgetformat_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetformat_id'], $this->db, 'mst_accbudgetformat', 'accbudgetformat_id', 'accbudgetformat_name'),


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