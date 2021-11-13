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
		$tablename = 'mst_land';
		$primarykey = 'land_id';
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

			$obj->land_id = strtoupper($obj->land_id);
			$obj->land_name = strtoupper($obj->land_name);
			$obj->land_address = strtoupper($obj->land_address);
			$obj->land_phone = strtoupper($obj->land_phone);
			$obj->land_email = strtoupper($obj->land_email);





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
				$primarykey, 'land_id', 'land_name', 'land_address', 'land_phone', 'land_email', 'land_isdisabled', 'land_geoloc', 'landtype_id', 'zone_id', 'city_id', 'partner_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'landtype_name' => \FGTA4\utils\SqlUtility::Lookup($data->landtype_id, $this->db, 'mst_landtype', 'landtype_id', 'landtype_name'),
				'zone_name' => \FGTA4\utils\SqlUtility::Lookup($data->zone_id, $this->db, 'mst_zone', 'zone_id', 'zone_name'),
				'city_name' => \FGTA4\utils\SqlUtility::Lookup($data->city_id, $this->db, 'mst_city', 'city_id', 'city_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($data->partner_id, $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				
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