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
					"search" => " A.curr_id LIKE CONCAT('%', :search, '%') OR A.curr_name LIKE CONCAT('%', :search, '%') "
				]
			);

			
			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_curr A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				curr_id, curr_name, curr_descr, curr_isdisabled, _createby, _createdate, _modifyby, _modifydate 
				from mst_curr A
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
					 'curr_islocal' => $record['curr_id'] == __LOCAL_CURR ? 1 : 0,
					 'curr_rate' => $this-> getCurrentRate($record['curr_id'])
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


	function getCurrentRate($curr_id) {
		if ($curr_id=__LOCAL_CURR) {
			return 1;
		}

		$stmt = $this->db->prepare("
			select currrate_value 
			from mst_currrate 
			where curr_id=:curr_id
			order by currrate_date desc
			limit 1
		");
		$stmt->execute([
			':curr_id' => $curr_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)) {
			return $rows[0]['currrate_value'];
		} else {
			return 1;
		}
	}

}

$API = new DataList();