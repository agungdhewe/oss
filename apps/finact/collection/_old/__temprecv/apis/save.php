<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



// /* Enable Debugging */
// require_once __ROOT_DIR.'/core/debug.php';
// use \FGTA4\debug;


class DataSave extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/temprecv-save.txt";
		// debug::disable();
		// debug::start($logfilepath, "w");

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
		$tablename = 'trn_temprecv';
		$primarykey = 'temprecv_id';
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
			$obj->temprecv_date = (\DateTime::createFromFormat('d/m/Y',$obj->temprecv_date))->format('Y-m-d');
			$obj->temprecv_id = strtoupper($obj->temprecv_id);
			$obj->temprecv_ref = strtoupper($obj->temprecv_ref);


			// if ($obj->temprecv_ref=='--NULL--') { unset($obj->temprecv_ref); }
			// if ($obj->jurnal_id_or=='--NULL--') { unset($obj->jurnal_id_or); }
			// if ($obj->jurnal_id_tax=='--NULL--') { unset($obj->jurnal_id_tax); }


			unset($obj->temprecv_iscommit);
			unset($obj->temprecv_commitby);
			unset($obj->temprecv_commitdate);
			unset($obj->temprecv_isverify);
			unset($obj->temprecv_verifyby);
			unset($obj->temprecv_verifydate);



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
			$sql = \FGTA4\utils\SqlUtility::Select("$tablename A" , [
				$primarykey, 'temprecv_id', 'temprecv_ref', 'temprecv_date', 'temprecv_descr', 'temprecv_bgnum', 'temprecv_isadvance', 'temprecv_validrtotal', 'temprecv_taxidrtotal', 'temprecv_iscommit', 'temprecv_commitby', 'temprecv_commitdate', 'temprecv_isverify', 'temprecv_verifyby', 'temprecv_verifydate', 'paymtype_id', 'partner_id', 'coa_id', 'empl_id', 'dept_id', 'jurnal_id_or', 'jurnal_id_tax', 'trxmodel_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'temprecv_date' => date("d/m/Y", strtotime($row['temprecv_date'])),
				'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($data->paymtype_id, $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($data->partner_id, $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($data->coa_id, $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($data->empl_id, $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($data->dept_id, $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($data->trxmodel_id, $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		
			$seqname = 'TS';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

}

$API = new DataSave();