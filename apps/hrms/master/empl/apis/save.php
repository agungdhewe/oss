<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;


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
		$tablename = 'mst_empl';
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
			$obj->empl_dtjoin = (\DateTime::createFromFormat('d/m/Y',$obj->empl_dtjoin))->format('Y-m-d');			
			$obj->empl_dtexit = (\DateTime::createFromFormat('d/m/Y',$obj->empl_dtexit))->format('Y-m-d');			
			$obj->empl_birthdate = (\DateTime::createFromFormat('d/m/Y',$obj->empl_birthdate))->format('Y-m-d');
			$obj->empl_nik = strtoupper($obj->empl_nik);
			$obj->empl_name = strtoupper($obj->empl_name);
			$obj->empl_birthplace = strtoupper($obj->empl_birthplace);
			$obj->empl_address = strtoupper($obj->empl_address);
			$obj->empl_city = strtoupper($obj->empl_city);
			$obj->empl_prov = strtoupper($obj->empl_prov);
			$obj->empl_hp = strtoupper($obj->empl_hp);
			$obj->empl_email = strtolower($obj->empl_email);
			$obj->empl_kk = strtoupper($obj->empl_kk);
			$obj->empl_ktp = strtoupper($obj->empl_ktp);
			$obj->empl_npwp = strtoupper($obj->empl_npwp);
			$obj->empl_bpjstk = strtoupper($obj->empl_bpjstk);
			$obj->empl_bpjskes = strtoupper($obj->empl_bpjskes);
			$obj->hrjob_id = strtoupper($obj->hrjob_id);
			$obj->hrstatus_id = strtoupper($obj->hrstatus_id);
			$obj->dept_id = strtoupper($obj->dept_id);
			$obj->site_id = strtoupper($obj->site_id);
			$obj->auth_id = strtoupper($obj->auth_id);
			$obj->marital_id = strtoupper($obj->marital_id);
			$obj->gender_id = strtoupper($obj->gender_id);
			$obj->edu_id = strtoupper($obj->edu_id);
			$obj->religion_id = strtoupper($obj->religion_id);


			//unset($obj->empl_dtexit);

			// if ($obj->empl_dtexit=='--NULL--') { unset($obj->empl_dtexit); }
			// if ($obj->empl_birthdate=='--NULL--') { unset($obj->empl_birthdate); }
			// if ($obj->empl_address=='--NULL--') { unset($obj->empl_address); }
			// if ($obj->empl_city=='--NULL--') { unset($obj->empl_city); }
			// if ($obj->empl_prov=='--NULL--') { unset($obj->empl_prov); }
			// if ($obj->empl_hp=='--NULL--') { unset($obj->empl_hp); }
			// if ($obj->empl_email=='--NULL--') { unset($obj->empl_email); }
			// if ($obj->empl_kk=='--NULL--') { unset($obj->empl_kk); }
			// if ($obj->empl_ktp=='--NULL--') { unset($obj->empl_ktp); }
			// if ($obj->empl_npwp=='--NULL--') { unset($obj->empl_npwp); }
			// if ($obj->empl_bpjstk=='--NULL--') { unset($obj->empl_bpjstk); }
			// if ($obj->empl_bpjskes=='--NULL--') { unset($obj->empl_bpjskes); }
			// if ($obj->auth_id=='--NULL--') { unset($obj->auth_id); }



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
				$primarykey, 'empl_id', 'empl_nik', 'empl_name', 'empl_isdisabled', 'empl_dtjoin', 'empl_dtexit', 'empl_birthplace', 'empl_birthdate', 'empl_address', 'empl_city', 'empl_prov', 'empl_hp', 'empl_email', 'empl_kk', 'empl_ktp', 'empl_npwp', 'empl_bpjstk', 'empl_bpjskes', 'hrjob_id', 'hrstatus_id', 'dept_id', 'site_id', 'auth_id', 'marital_id', 'gender_id', 'edu_id', 'religion_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$dataresponse = [];
			foreach ($row as $key => $value) {
				$dataresponse[$key] = $value;
			}

			$auth_name =  \FGTA4\utils\SqlUtility::Lookup($data->auth_id, $this->db, 'mst_auth', 'auth_id', 'auth_name');
			$result->dataresponse = (object) array_merge($dataresponse, [
				//  untuk lookup atau modify response ditaruh disini
				'empl_dtjoin' => date("d/m/Y", strtotime($row['empl_dtjoin'])),
				'empl_dtexit' => date("d/m/Y", strtotime($row['empl_dtexit'])),
				'empl_birthdate' => date("d/m/Y", strtotime($row['empl_birthdate'])),
				'hrjob_name' => \FGTA4\utils\SqlUtility::Lookup($data->hrjob_id, $this->db, 'mst_hrjob', 'hrjob_id', 'hrjob_name'),
				'hrstatus_name' => \FGTA4\utils\SqlUtility::Lookup($data->hrstatus_id, $this->db, 'mst_hrstatus', 'hrstatus_id', 'hrstatus_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($data->dept_id, $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'site_name' => \FGTA4\utils\SqlUtility::Lookup($data->site_id, $this->db, 'mst_site', 'site_id', 'site_name'),
				'auth_name' => \FGTA4\utils\SqlUtility::Lookup($data->auth_id, $this->db, 'mst_auth', 'auth_id', 'auth_name'),
				'marital_name' => \FGTA4\utils\SqlUtility::Lookup($data->marital_id, $this->db, 'mst_marital', 'marital_id', 'marital_name'),
				'gender_name' => \FGTA4\utils\SqlUtility::Lookup($data->gender_id, $this->db, 'mst_gender', 'gender_id', 'gender_name'),
				'edu_name' => \FGTA4\utils\SqlUtility::Lookup($data->edu_id, $this->db, 'mst_edu', 'edu_id', 'edu_name'),
				'religion_name' => \FGTA4\utils\SqlUtility::Lookup($data->religion_id, $this->db, 'mst_religion', 'religion_id', 'religion_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		$seqname = 'FE';
		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=>'00']);
		$id = $seqname . $raw['ye'] . \str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;

		//return uniqid();
	}

}

$API = new DataSave();