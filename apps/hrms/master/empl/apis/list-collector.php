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
					"search" => " A.empl_id LIKE CONCAT('%', :search, '%') OR A.empl_nik LIKE CONCAT('%', :search, '%') OR A.empl_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_empl A inner join mst_collector B on B.empl_id = A.empl_id" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.empl_id, A.empl_nik, A.empl_name, A.empl_isdisabled, A.empl_dtjoin, A.empl_dtexit, A.empl_birthplace
				, A.empl_birthdate, A.empl_address, A.empl_city, A.empl_prov, A.empl_hp, A.empl_email, A.empl_kk, A.empl_ktp, A.empl_npwp
				, A.empl_bpjstk, A.empl_bpjskes, A.hrjob_id, A.hrstatus_id, A.dept_id, A.site_id, A.auth_id, A.marital_id, A.gender_id
				, A.edu_id, A.religion_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_empl A inner join mst_collector B on B.empl_id = A.empl_id
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
					'hrjob_name' => \FGTA4\utils\SqlUtility::Lookup($record['hrjob_id'], $this->db, 'mst_hrjob', 'hrjob_id', 'hrjob_name'),
					'hrstatus_name' => \FGTA4\utils\SqlUtility::Lookup($record['hrstatus_id'], $this->db, 'mst_hrstatus', 'hrstatus_id', 'hrstatus_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'auth_name' => \FGTA4\utils\SqlUtility::Lookup($record['auth_id'], $this->db, 'mst_auth', 'auth_id', 'auth_name'),
					'marital_name' => \FGTA4\utils\SqlUtility::Lookup($record['marital_id'], $this->db, 'mst_marital', 'marital_id', 'marital_name'),
					'gender_name' => \FGTA4\utils\SqlUtility::Lookup($record['gender_id'], $this->db, 'mst_gender', 'gender_id', 'gender_name'),
					'edu_name' => \FGTA4\utils\SqlUtility::Lookup($record['edu_id'], $this->db, 'mst_edu', 'edu_id', 'edu_name'),
					'religion_name' => \FGTA4\utils\SqlUtility::Lookup($record['religion_id'], $this->db, 'mst_religion', 'religion_id', 'religion_name'),
					 
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