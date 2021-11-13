<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;



/**
 * finact/sales/salesorder/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header salesorder (trn_salesorder)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/04/2021
 */
$API = new class extends salesorderBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_salesorder';
		$primarykey = 'salesorder_id';
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
			$obj->salesorder_date = (\DateTime::createFromFormat('d/m/Y',$obj->salesorder_date))->format('Y-m-d');
			$obj->salesordertype_id = strtoupper($obj->salesordertype_id);
			$obj->doc_id = strtoupper($obj->doc_id);


			// if ($obj->ae_empl_id=='--NULL--') { unset($obj->ae_empl_id); }
			// if ($obj->salesorder_notes=='--NULL--') { unset($obj->salesorder_notes); }


			unset($obj->salesorder_iscommit);
			unset($obj->salesorder_commitby);
			unset($obj->salesorder_commitdate);
			unset($obj->salesorder_isapprovalprogress);
			unset($obj->salesorder_isapproved);
			unset($obj->salesorder_approveby);
			unset($obj->salesorder_approvedate);
			unset($obj->salesorder_isdeclined);
			unset($obj->salesorder_declineby);
			unset($obj->salesorder_declinedate);
			unset($obj->salesorder_isclose);
			unset($obj->salesorder_closeby);
			unset($obj->salesorder_closedate);



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
				, 'salesorder_id', 'salesorder_date', 'salesorder_descr', 'salesorder_ref', 'ae_empl_id', 'partner_id', 'salesorder_istax', 'taxtype_id', 'curr_id', 'salesordertype_id', 'trxmodel_id', 'dept_id', 'doc_id', 'salesorder_version', 'salesorder_iscommit', 'salesorder_commitby', 'salesorder_commitdate', 'salesorder_isapprovalprogress', 'salesorder_isapproved', 'salesorder_approveby', 'salesorder_approvedate', 'salesorder_isdeclined', 'salesorder_declineby', 'salesorder_declinedate', 'salesorder_notes', 'salesorder_isclose', 'salesorder_closeby', 'salesorder_closedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);
			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}
			$result->dataresponse = (object) array_merge($record, [
				//  untuk lookup atau modify response ditaruh disini
				'salesorder_date' => date("d/m/Y", strtotime($row['salesorder_date'])),
				'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'salesordertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['salesordertype_id'], $this->db, 'mst_salesordertype', 'salesordertype_id', 'salesordertype_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'salesorder_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'salesorder_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'salesorder_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'salesorder_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		
			$seqname = 'SO';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};