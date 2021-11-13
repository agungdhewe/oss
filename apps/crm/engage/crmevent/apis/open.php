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
					"crmevent_id" => " crmevent_id = :crmevent_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_crmevent', [
				'crmevent_id', 'crmevent_name', 'crmevent_descr', 'crmevent_dtstart', 'crmevent_dtend', 'crmevent_dtaffected', 'crmevent_message', 'crmevent_iscommit', 'crmevent_isdisabled', 'crmevent_isunlimit', 'crmevent_isclose', 'crmevent_targetinvited', 'crmevent_targetattendant', 'crmevent_targetnewcontact', 'crmevent_targettx', 'crmevent_targettxnew', 'crmevent_targetbuyer', 'crmevent_targetbuyernew', 'crmevent_targetsales', 'crmevent_targetsalesnew', 'crmevent_totalinvited', 'crmevent_totalattendant', 'crmevent_totalnewcontact', 'crmevent_totaltx', 'crmevent_totaltxnew', 'crmevent_totalbuyer', 'crmevent_totalbuyernew', 'crmevent_totalsales', 'crmevent_totalsalesnew', 'crmsource_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'crmevent_dtstart' => date("d/m/Y", strtotime($record['crmevent_dtstart'])),
				'crmevent_dtend' => date("d/m/Y", strtotime($record['crmevent_dtend'])),
				'crmevent_dtaffected' => date("d/m/Y", strtotime($record['crmevent_dtaffected'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'crmsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['crmsource_id'], $this->db, 'mst_crmsource', 'crmsource_id', 'crmsource_name'),

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