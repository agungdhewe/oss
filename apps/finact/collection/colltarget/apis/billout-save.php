<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";


if (is_file(__DIR__ .'/data-billout-handler.php')) {
	require_once __DIR__ .'/data-billout-handler.php';
}



use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * finact/collection/colltarget/apis/billout-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel billout colltarget (trn_colltarget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 26/12/2021
 */
$API = new class extends colltargetBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_colltargetbillout';
		$primarykey = 'colltargetbillout_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		if (class_exists('colltarget_headerHandler')) {
			$hnd = new colltarget_billoutHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}

		try {
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
			$obj->colltargetbillout_datetarget = (\DateTime::createFromFormat('d/m/Y',$obj->colltargetbillout_datetarget))->format('Y-m-d');
			$obj->billout_datedue = (\DateTime::createFromFormat('d/m/Y',$obj->billout_datedue))->format('Y-m-d');








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

				
				$header_table = 'trn_colltarget';
				$header_primarykey = 'colltarget_id';
				$sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				$stmt = $this->db->prepare($sqlrec);
				$stmt->execute([
					":user_id" => $userdata->username,
					":$header_primarykey" => $obj->{$header_primarykey}
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);
				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $obj->{$header_primarykey}, $action . "_DETIL", $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'colltargetbillout_id', 'partner_id', 'billout_id', 'billout_isunreference', 'colltargetbillout_datetarget', 'colltargetbillout_notes', 'billout_idr', 'billout_isdiscvalue', 'billout_discp', 'billout_discval', 'billout_idrtopay', 'billout_ppntopay', 'billout_idrtotal', 'billout_datedue', 'billout_daystotarget', 'billout_totalitem', 'billout_totalqty', 'billout_salesgross', 'billout_discount', 'billout_subtotal', 'billout_pph', 'billout_nett', 'billout_ppn', 'billout_total', 'billout_totaladdcost', 'billout_dp', 'billout_payment', 'billout_paid', 'colltarget_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					// untuk lookup atau modify response ditaruh disini
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
					'colltargetbillout_datetarget' => date("d/m/Y", strtotime($row['colltargetbillout_datetarget'])),
					'billout_datedue' => date("d/m/Y", strtotime($row['billout_datedue'])),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataSavedSuccess')) {
						$hnd->DataSavedSuccess($result);
					}
				}

				$this->db->commit();
				return $result;
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}
			
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		//$dt = new \DateTime();	
		//$ye = $dt->format("y");
		//$mo = $dt->format("m");
		//$seq = new Sequencer($this->db, 'seq_generalmonthly', 'TF', ['ye', 'mo']);
		//$id = $seq->get(['ye'=>$ye, 'mo'=>$mo]);
		//return $id;		
		return uniqid();
	}

};