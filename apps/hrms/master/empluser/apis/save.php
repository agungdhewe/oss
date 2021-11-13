<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataSave extends WebAPI {
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
	
	public function execute($data, $options) {
		$tablename = 'mst_empluser';
		$primarykey = 'empl_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');

			// $obj->empl_id = strtoupper($obj->empl_id);
			// $obj->empl_nik = strtoupper($obj->empl_nik);
			// $obj->empl_name = strtoupper($obj->empl_name);
			// $obj->dept_name = strtoupper($obj->dept_name);
			// $obj->site_name = strtoupper($obj->site_name);





			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = 'assign user_id';
				// if ($datastate=='NEW') {
				// 	$action = 'NEW';
				// 	if ($autoid) {
				// 		$obj->{$primarykey} = $this->NewId([]);
				// 	}
				// 	$obj->_createby = $userdata->username;
				// 	$obj->_createdate = date("Y-m-d H:i:s");
				// 	$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);

				// } else {
				// 	$action = 'MODIFY';
				// 	$obj->_modifyby = $userdata->username;
				// 	$obj->_modifydate = date("Y-m-d H:i:s");				
				// 	$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				// }
	
				$sql = "
					INSERT INTO mst_empluser 
					(empl_id, user_id, empluser_allowviewalldept, empluser_allowviewallunit, empluser_allowviewallsite, _createby, _createdate) 
					VALUES (:empl_id, :user_id, :empluser_allowviewalldept, :empluser_allowviewallunit, :empluser_allowviewallsite, :_createby, :_createdate) 
					ON DUPLICATE KEY 
						UPDATE 
						user_id = :user_id,
						empluser_allowviewalldept = :empluser_allowviewalldept,
						empluser_allowviewallunit = :empluser_allowviewallunit,
						empluser_allowviewallsite = :empluser_allowviewallsite,
						_modifyby = :_modifyby,
						_modifydate = :_modifydate 
				";	

				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					':empl_id' => $obj->empl_id,
					':user_id' => $obj->user_id,
					':empluser_allowviewalldept' => $this->getCheckStatus($obj->empluser_allowviewalldept),
					':empluser_allowviewallunit' => $this->getCheckStatus($obj->empluser_allowviewallunit),
					':empluser_allowviewallsite' => $this->getCheckStatus($obj->empluser_allowviewallsite),
					':_createby' =>  $userdata->username,
					':_createdate' => date("Y-m-d H:i:s"),
					':_modifyby' =>  $userdata->username,
					':_modifydate' => date("Y-m-d H:i:s")					
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			// $where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			// $sql = \FGTA4\utils\SqlUtility::Select($tablename , [
			// 	$primarykey, 'empl_id', 'empl_nik', 'empl_name', 'dept_name', 'site_name', 'user_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			// ], $where->sql);

			$sql = "
				select 
				A.empl_id, A.empl_nik, A.empl_name, 
				B.empluser_allowviewalldept,
				B.empluser_allowviewallunit,
				B.empluser_allowviewallsite,				
				C.dept_name, D.site_name, B.user_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_empl A left join mst_empluser B on B.empl_id=A.empl_id
								left join mst_dept C on C.dept_id = A.dept_id
								left join mst_site D on D.site_id = A.site_id			
				where
				A.empl_id = :empl_id
			"; 

			$stmt = $this->db->prepare($sql);
			$stmt->execute([':empl_id' => $obj->empl_id]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'user_name' => \FGTA4\utils\SqlUtility::Lookup($data->user_id, $this->db, 'fgt_user', 'user_id', 'user_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		return uniqid();
	}


	public function getCheckStatus($value) {
		if (is_bool($value)) {
			return $value ? 1 : 0;		
		} else {
			return $value;
		}
	}

}

$API = new DataSave();