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
		$tablename = 'mst_dept';
		$primarykey = 'dept_id';
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

			$obj->dept_id = strtoupper($obj->dept_id);
			// $obj->dept_name = strtoupper($obj->dept_name);
			// $obj->deptgroup_id = strtoupper($obj->deptgroup_id);
			// $obj->dept_parent = strtoupper($obj->dept_parent);
			// $obj->depttype_id = strtoupper($obj->depttype_id);
			// $obj->deptmodel_id = strtoupper($obj->deptmodel_id);
			// $obj->auth_id = strtoupper($obj->auth_id);


			// if ($obj->dept_parent=='--NULL--') { unset($obj->dept_parent); }



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);

				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				   $primarykey
				, 'dept_id', 'dept_name', 'dept_descr', 'dept_isparent', 'dept_isdisabled', 'dept_path', 'dept_level'
				, 'deptgroup_id', 'dept_parent', 'depttype_id', 'deptmodel_id', 'auth_id', 'project_id'
				, '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				// misalnya ada data yang perlu dilookup ditaruh disini
				'deptgroup_name' => \FGTA4\utils\SqlUtility::Lookup($data->deptgroup_id, $this->db, 'mst_deptgroup', 'deptgroup_id', 'deptgroup_name'),
				'dept_parent_name' => \FGTA4\utils\SqlUtility::Lookup($data->dept_parent, $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'depttype_name' => \FGTA4\utils\SqlUtility::Lookup($data->depttype_id, $this->db, 'mst_depttype', 'depttype_id', 'depttype_name'),
				'deptmodel_name' => \FGTA4\utils\SqlUtility::Lookup($data->deptmodel_id, $this->db, 'mst_deptmodel', 'deptmodel_id', 'deptmodel_name'),
				'auth_name' => \FGTA4\utils\SqlUtility::Lookup($data->auth_id, $this->db, 'mst_auth', 'auth_id', 'auth_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($data->project_id, $this->db, 'mst_project', 'project_id', 'project_name'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		return uniqid();
	}

}

$API = new DataSave();