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
		$tablename = 'mst_site';
		$primarykey = 'site_id';
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
			$obj->site_opendate = (\DateTime::createFromFormat('d/m/Y',$obj->site_opendate))->format('Y-m-d');
			$obj->site_id = strtoupper($obj->site_id);
			$obj->site_name = strtoupper($obj->site_name);
			$obj->site_address = strtoupper($obj->site_address);
			$obj->site_phone = strtoupper($obj->site_phone);
			$obj->site_email = strtoupper($obj->site_email);
			$obj->site_sqmwide = strtoupper($obj->site_sqmwide);





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
				$primarykey, 'site_id', 'site_name', 'site_address', 'site_phone', 'site_email', 'site_sqmwide', 'site_isdisabled', 'site_geoloc', 'site_opendate', 'sitemodel_id', 'sitegroup_id', 'land_id', 'dept_id', 'config_id', 'taxtype_id',  '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'sitemodel_name' => \FGTA4\utils\SqlUtility::Lookup($data->sitemodel_id, $this->db, 'mst_sitemodel', 'sitemodel_id', 'sitemodel_name'),
				'sitegroup_name' => \FGTA4\utils\SqlUtility::Lookup($data->sitegroup_id, $this->db, 'mst_sitegroup', 'sitegroup_id', 'sitegroup_name'),
				'land_name' => \FGTA4\utils\SqlUtility::Lookup($data->land_id, $this->db, 'mst_land', 'land_id', 'land_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($data->dept_id, $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'config_name' => \FGTA4\utils\SqlUtility::Lookup($data->config_id, $this->db, 'mst_config', 'config_id', 'config_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($data->taxtype_id, $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
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