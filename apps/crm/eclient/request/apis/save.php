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
		$tablename = 'mst_partnerreg';
		$primarykey = 'partner_id';
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

			$obj->partnerorg_id = strtoupper($obj->partnerorg_id);
			$obj->partnertype_id = strtoupper($obj->partnertype_id);
			$obj->partner_name = strtoupper($obj->partner_name);
			$obj->partner_dirut = strtoupper($obj->partner_dirut);
			$obj->partner_dir = strtoupper($obj->partner_dir);
			$obj->partner_addressline1 = strtoupper($obj->partner_addressline1);
			$obj->partner_addressline2 = strtoupper($obj->partner_addressline2);
			$obj->partner_addressline3 = strtoupper($obj->partner_addressline3);
			$obj->partner_city = strtoupper($obj->partner_city);
			$obj->partner_country = strtoupper($obj->partner_country);
			$obj->partner_postcode = strtoupper($obj->partner_postcode);
			$obj->partner_billaddrline1 = strtoupper($obj->partner_billaddrline1);
			$obj->partner_billaddrline2 = strtoupper($obj->partner_billaddrline2);
			$obj->partner_billaddrline3 = strtoupper($obj->partner_billaddrline3);
			$obj->partner_phone1 = strtoupper($obj->partner_phone1);
			$obj->partner_phone2 = strtoupper($obj->partner_phone2);
			$obj->partner_phone3 = strtoupper($obj->partner_phone3);
			$obj->partner_phone4 = strtoupper($obj->partner_phone4);
			$obj->partner_fax1 = strtoupper($obj->partner_fax1);
			$obj->partner_fax2 = strtoupper($obj->partner_fax2);
			$obj->partner_email1 = strtoupper($obj->partner_email1);
			$obj->partner_email2 = strtoupper($obj->partner_email2);
			$obj->partner_aktanoth = strtoupper($obj->partner_aktanoth);
			$obj->partner_siupno = strtoupper($obj->partner_siupno);
			$obj->partner_sk = strtoupper($obj->partner_sk);
			$obj->partner_tdp = strtoupper($obj->partner_tdp);
			$obj->partner_bank = strtoupper($obj->partner_bank);
			$obj->partner_npwp = strtoupper($obj->partner_npwp);
			$obj->partner_cf1 = strtoupper($obj->partner_cf1);
			$obj->partner_cf2 = strtoupper($obj->partner_cf2);
			$obj->partner_cf3 = strtoupper($obj->partner_cf3);
			$obj->partner_cf4 = strtoupper($obj->partner_cf4);
			$obj->partner_cf5 = strtoupper($obj->partner_cf5);
			$obj->partner_cf6 = strtoupper($obj->partner_cf6);
			$obj->partner_cf7 = strtoupper($obj->partner_cf7);


			// if ($obj->partnerorg_id=='--NULL--') { unset($obj->partnerorg_id); }
			// if ($obj->partnertype_id=='--NULL--') { unset($obj->partnertype_id); }
			// if ($obj->partner_dirut=='--NULL--') { unset($obj->partner_dirut); }
			// if ($obj->partner_dir=='--NULL--') { unset($obj->partner_dir); }
			// if ($obj->partner_addressline1=='--NULL--') { unset($obj->partner_addressline1); }
			// if ($obj->partner_addressline2=='--NULL--') { unset($obj->partner_addressline2); }
			// if ($obj->partner_addressline3=='--NULL--') { unset($obj->partner_addressline3); }
			// if ($obj->partner_city=='--NULL--') { unset($obj->partner_city); }
			// if ($obj->partner_country=='--NULL--') { unset($obj->partner_country); }
			// if ($obj->partner_postcode=='--NULL--') { unset($obj->partner_postcode); }
			// if ($obj->partner_billaddrline1=='--NULL--') { unset($obj->partner_billaddrline1); }
			// if ($obj->partner_billaddrline2=='--NULL--') { unset($obj->partner_billaddrline2); }
			// if ($obj->partner_billaddrline3=='--NULL--') { unset($obj->partner_billaddrline3); }
			// if ($obj->partner_phone1=='--NULL--') { unset($obj->partner_phone1); }
			// if ($obj->partner_fax1=='--NULL--') { unset($obj->partner_fax1); }
			// if ($obj->partner_email1=='--NULL--') { unset($obj->partner_email1); }
			// if ($obj->partner_email2=='--NULL--') { unset($obj->partner_email2); }
			// if ($obj->partner_aktanoth=='--NULL--') { unset($obj->partner_aktanoth); }
			// if ($obj->partner_siupno=='--NULL--') { unset($obj->partner_siupno); }
			// if ($obj->partner_sk=='--NULL--') { unset($obj->partner_sk); }
			// if ($obj->partner_tdp=='--NULL--') { unset($obj->partner_tdp); }
			// if ($obj->partner_bank=='--NULL--') { unset($obj->partner_bank); }
			// if ($obj->partner_npwp=='--NULL--') { unset($obj->partner_npwp); }
			// if ($obj->partner_cf1=='--NULL--') { unset($obj->partner_cf1); }
			// if ($obj->partner_cf2=='--NULL--') { unset($obj->partner_cf2); }
			// if ($obj->partner_cf3=='--NULL--') { unset($obj->partner_cf3); }
			// if ($obj->partner_cf4=='--NULL--') { unset($obj->partner_cf4); }
			// if ($obj->partner_cf5=='--NULL--') { unset($obj->partner_cf5); }
			// if ($obj->partner_cf6=='--NULL--') { unset($obj->partner_cf6); }
			// if ($obj->partner_cf7=='--NULL--') { unset($obj->partner_cf7); }
			// if ($obj->partner_isdisabled=='--NULL--') { unset($obj->partner_isdisabled); }
			// if ($obj->partner_isapproved=='--NULL--') { unset($obj->partner_isapproved); }
			// if ($obj->partner_apprby=='--NULL--') { unset($obj->partner_apprby); }
			// if ($obj->partner_apprdt=='--NULL--') { unset($obj->partner_apprdt); }



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
				$primarykey, 'partner_id', 'partnerorg_id', 'partnertype_id', 'partner_name', 'partner_dirut', 'partner_dir', 'partner_addressline1', 'partner_addressline2', 'partner_addressline3', 'partner_city', 'partner_country', 'partner_postcode', 'partner_billaddrline1', 'partner_billaddrline2', 'partner_billaddrline3', 'partner_phone1', 'partner_phone2', 'partner_phone3', 'partner_phone4', 'partner_fax1', 'partner_fax2', 'partner_email1', 'partner_email2', 'partner_aktanoth', 'partner_siupno', 'partner_sk', 'partner_tdp', 'partner_bank', 'partner_npwp', 'partner_cf1', 'partner_cf2', 'partner_cf3', 'partner_cf4', 'partner_cf5', 'partner_cf6', 'partner_cf7', 'partner_isdisabled', 'partner_isapproved', 'partner_apprby', 'partner_apprdt', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($data->partnerorg_id, $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
				'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($data->partnertype_id, $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
				'country_name' => \FGTA4\utils\SqlUtility::Lookup($data->partner_country, $this->db, 'mst_country', 'country_id', 'country_name'),
				
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