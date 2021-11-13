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
					"site_id" => " site_id = :site_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_site', [
				'site_id', 'site_name', 'site_address', 'site_phone', 'site_email', 'site_sqmwide', 'site_isdisabled', 'site_geoloc', 'site_opendate', 'sitemodel_id', 'sitegroup_id', 'land_id', 'dept_id', 'config_id', 'taxtype_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'site_opendate' => date("d/m/Y", strtotime($record['site_opendate'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'sitemodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitemodel_id'], $this->db, 'mst_sitemodel', 'sitemodel_id', 'sitemodel_name'),
				'sitegroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['sitegroup_id'], $this->db, 'mst_sitegroup', 'sitegroup_id', 'sitegroup_name'),
				'land_name' => \FGTA4\utils\SqlUtility::Lookup($record['land_id'], $this->db, 'mst_land', 'land_id', 'land_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'config_name' => \FGTA4\utils\SqlUtility::Lookup($record['config_id'], $this->db, 'mst_config', 'config_id', 'config_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),

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