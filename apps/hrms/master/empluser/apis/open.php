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
					"empl_id" => " A.empl_id = :empl_id "
				]
			);

			// $sql = \FGTA4\utils\SqlUtility::Select('mst_empluser', [
			// 	'empl_id', 'empl_nik', 'empl_name', 'dept_name', 'site_name', 'user_id', '_createby', '_createdate', '_modifyby', '_modifydate' 
			// ], $where->sql);
			$sql = "
				select 
				A.empl_id, A.empl_nik, A.empl_name, 
				B.empluser_allowviewalldept,
				B.empluser_allowviewallunit,
				B.empluser_allowviewallsite,
				C.dept_name, D.site_name, B.user_id, B._createby, B._createdate, B._modifyby, B._modifydate 
				from mst_empl A left join mst_empluser B on B.empl_id=A.empl_id
								left join mst_dept C on C.dept_id = A.dept_id
								left join mst_site D on D.site_id = A.site_id			
			
			" . $where->sql;	

			
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
				
				'user_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_id'], $this->db, 'fgt_user', 'user_id', 'user_name'),

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