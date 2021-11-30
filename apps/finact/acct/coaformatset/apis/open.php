<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/acct/coaformatset/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header coaformatset (mst_coaformatset)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
$API = new class extends coaformatsetBase {
	
	public function execute($options) {
		$tablename = 'mst_coaformatset';
		$primarykey = 'coaformatset_id';
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
					"coaformatset_id" => " coaformatset_id = :coaformatset_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_coaformatset A', [
				'coaformatset_id', 'coaformatset_order', 'coaformatset_name', 'coaformatset_descr', 'coaformatset_indent', 'coaformatset_isblankline', 'coaformatset_isbold', 'coaformatset_isitalic', 'coaformatset_isunderline', 'coaformatset_isparent', 'coaformatset_parent', 'coaformatset_path', 'coaformatset_pathid', 'coaformatset_level', 'coaformat_id', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				
				// 'coaformatset_name' => '2343242',
				'coaformatset_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['coaformatset_parent'], $this->db, 'mst_coaformatset', 'coaformatset_id', 'coaformatset_name'),
				'coaformat_name' => \FGTA4\utils\SqlUtility::Lookup($record['coaformat_id'], $this->db, 'mst_coaformat', 'coaformat_id', 'coaformat_name'),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			$this->log($result->record);
			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};