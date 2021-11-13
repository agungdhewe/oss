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
		$tablename = 'trn_crmevent';
		$primarykey = 'crmevent_id';
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
			$obj->crmevent_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->crmevent_dtstart))->format('Y-m-d');			$obj->crmevent_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->crmevent_dtend))->format('Y-m-d');			$obj->crmevent_dtaffected = (\DateTime::createFromFormat('d/m/Y',$obj->crmevent_dtaffected))->format('Y-m-d');
			$obj->crmevent_name = strtoupper($obj->crmevent_name);
			$obj->crmsource_id = strtoupper($obj->crmsource_id);


			// if ($obj->crmevent_descr=='--NULL--') { unset($obj->crmevent_descr); }
			// if ($obj->crmevent_message=='--NULL--') { unset($obj->crmevent_message); }



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
				$primarykey, 'crmevent_id', 'crmevent_name', 'crmevent_descr', 'crmevent_dtstart', 'crmevent_dtend', 'crmevent_dtaffected', 'crmevent_message', 'crmevent_iscommit', 'crmevent_isdisabled', 'crmevent_isunlimit', 'crmevent_isclose', 'crmevent_targetinvited', 'crmevent_targetattendant', 'crmevent_targetnewcontact', 'crmevent_targettx', 'crmevent_targettxnew', 'crmevent_targetbuyer', 'crmevent_targetbuyernew', 'crmevent_targetsales', 'crmevent_targetsalesnew', 'crmevent_totalinvited', 'crmevent_totalattendant', 'crmevent_totalnewcontact', 'crmevent_totaltx', 'crmevent_totaltxnew', 'crmevent_totalbuyer', 'crmevent_totalbuyernew', 'crmevent_totalsales', 'crmevent_totalsalesnew', 'crmsource_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'crmevent_dtstart' => date("d/m/Y", strtotime($row['crmevent_dtstart'])),
				'crmevent_dtend' => date("d/m/Y", strtotime($row['crmevent_dtend'])),
				'crmevent_dtaffected' => date("d/m/Y", strtotime($row['crmevent_dtaffected'])),
				'crmsource_name' => \FGTA4\utils\SqlUtility::Lookup($data->crmsource_id, $this->db, 'mst_crmsource', 'crmsource_id', 'crmsource_name'),
				
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