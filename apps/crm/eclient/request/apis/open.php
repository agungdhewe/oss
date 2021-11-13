<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataOpen extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}
	
	public function execute($options) {

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
					"partner_id" => " partner_id = :partner_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_partnerreg', [
				'partner_id', 'partnerorg_id', 'partnertype_id', 'partner_name', 'partner_dirut', 'partner_dir', 'partner_addressline1', 'partner_addressline2', 'partner_addressline3', 'partner_city', 'partner_country', 'partner_postcode', 'partner_billaddrline1', 'partner_billaddrline2', 'partner_billaddrline3', 'partner_phone1', 'partner_phone2', 'partner_phone3', 'partner_phone4', 'partner_fax1', 'partner_fax2', 'partner_email1', 'partner_email2', 'partner_aktanoth', 'partner_siupno', 'partner_sk', 'partner_tdp', 'partner_bank', 'partner_npwp', 'partner_cf1', 'partner_cf2', 'partner_cf3', 'partner_cf4', 'partner_cf5', 'partner_cf6', 'partner_cf7', 'partner_isdisabled', 'partner_isapproved', 'partner_apprby', 'partner_apprdt', '_createby', '_createdate', '_modifyby', '_modifydate' 
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
				
				'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnerorg_id'], $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
				'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
				'country_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_country'], $this->db, 'mst_country', 'country_id', 'country_name'),

				'_createby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataOpen();