<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.crmevent_id LIKE CONCAT('%', :search, '%') OR A.crmevent_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_crmevent A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				crmevent_id, crmevent_name, crmevent_descr, crmevent_dtstart, crmevent_dtend, crmevent_dtaffected, crmevent_message, crmevent_iscommit, crmevent_isdisabled, crmevent_isunlimit, crmevent_isclose, crmevent_targetinvited, crmevent_targetattendant, crmevent_targetnewcontact, crmevent_targettx, crmevent_targettxnew, crmevent_targetbuyer, crmevent_targetbuyernew, crmevent_targetsales, crmevent_targetsalesnew, crmevent_totalinvited, crmevent_totalattendant, crmevent_totalnewcontact, crmevent_totaltx, crmevent_totaltxnew, crmevent_totalbuyer, crmevent_totalbuyernew, crmevent_totalsales, crmevent_totalsalesnew, crmsource_id, _createby, _createdate, _modifyby, _modifydate 
				from trn_crmevent A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'crmsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['crmsource_id'], $this->db, 'mst_crmsource', 'crmsource_id', 'crmsource_name'),
					 
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataList();