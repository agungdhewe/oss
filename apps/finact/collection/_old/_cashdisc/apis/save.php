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
 * finact/collection/cashdisc/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header cashdisc (trn_cashdiscount)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 20/04/2021
 */
$API = new class extends cashdiscBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_cashdiscount';
		$primarykey = 'cashdiscount_id';
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
			$obj->cashdiscount_date = (\DateTime::createFromFormat('d/m/Y',$obj->cashdiscount_date))->format('Y-m-d');
			$obj->cashdiscount_ref = strtoupper($obj->cashdiscount_ref);
			$obj->doc_id = strtoupper($obj->doc_id);


			// if ($obj->billout_id=='--NULL--') { unset($obj->billout_id); }
			// if ($obj->cashdiscount_ref=='--NULL--') { unset($obj->cashdiscount_ref); }


			unset($obj->cashdiscount_iscommit);
			unset($obj->cashdiscount_commitby);
			unset($obj->cashdiscount_commitdate);
			unset($obj->cashdiscount_isapprovalprogress);
			unset($obj->cashdiscount_isapproved);
			unset($obj->cashdiscount_approveby);
			unset($obj->cashdiscount_approvedate);
			unset($obj->cashdiscount_isdeclined);
			unset($obj->cashdiscount_declineby);
			unset($obj->cashdiscount_declinedate);



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
				, 'cashdiscount_id', 'billout_id', 'partner_id', 'cashdiscount_ref', 'cashdiscount_date', 'cashdiscount_descr', 'cashdiscount_percent', 'cashdiscount_validr', 'dept_id', 'doc_id', 'cashdiscount_iscommit', 'cashdiscount_commitby', 'cashdiscount_commitdate', 'cashdiscount_version', 'cashdiscount_isapprovalprogress', 'cashdiscount_isapproved', 'cashdiscount_approveby', 'cashdiscount_approvedate', 'cashdiscount_isdeclined', 'cashdiscount_declineby', 'cashdiscount_declinedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'cashdiscount_date' => date("d/m/Y", strtotime($row['cashdiscount_date'])),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'cashdiscount_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['cashdiscount_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'cashdiscount_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['cashdiscount_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'cashdiscount_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['cashdiscount_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		
			$seqname = 'CD';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};