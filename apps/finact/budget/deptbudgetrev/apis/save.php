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
 * finact/budget/deptbudgetrev/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header deptbudgetrev (mst_deptbudgetrev)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetrevBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_deptbudgetrev';
		$primarykey = 'deptbudgetrev_id';
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



			// if ($obj->deptbudgetrev_notes=='--NULL--') { unset($obj->deptbudgetrev_notes); }


			unset($obj->deptbudgetrev_notes);
			unset($obj->deptbudgetrev_version);
			unset($obj->deptbudgetrev_iscommit);
			unset($obj->deptbudgetrev_commitby);
			unset($obj->deptbudgetrev_commitdate);
			unset($obj->deptbudgetrev_isapprovalprogress);
			unset($obj->deptbudgetrev_isapproved);
			unset($obj->deptbudgetrev_approveby);
			unset($obj->deptbudgetrev_approvedate);
			unset($obj->deptbudgetrev_isdeclined);
			unset($obj->deptbudgetrev_declineby);
			unset($obj->deptbudgetrev_declinedate);
			unset($obj->deptbudgetrev_isveryfied);
			unset($obj->deptbudgetrev_verifyby);
			unset($obj->deptbudgetrev_verifydate);



			/* cek data */
			// apakah udah ada budget dept di tahun ini yang di approve
			$stmt = $this->db->prepare("select count(*) as n from mst_deptbudget where dept_id=:dept_id and deptbudget_year=:year and deptbudget_isapproved=1");
			$stmt->execute([':dept_id'=>$obj->dept_id, ':year'=>$obj->deptbudgetrev_year]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);	
			if ($row['n']==0) {
				throw new \Exception('Belum ada budget yang diapprove untuk direvisi');
			}	

			// apakah sudah ada data revisi budget di bulan yang saya yang belum diapprove
			$stmt = $this->db->prepare("select count(*) as n from mst_deptbudgetrev where dept_id=:dept_id and deptbudgetrev_year=:year and deptbudgetrev_month=:month and deptbudgetrev_isapproved=0");
			$stmt->execute([':dept_id'=>$obj->dept_id, ':year'=>$obj->deptbudgetrev_year, ':month'=>$obj->deptbudgetrev_month]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);	
			if ($row['n']>0) {
				throw new \Exception('Masih ada revisi budget yang masih open di bulan yang sama, tidak bisa membuat revisi baru');
			}		


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




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'deptbudgetrev_id', 'deptbudgetrev_year', 'deptbudgetrev_month', 'deptbudgetrev_descr', 'deptbudgetrev_notes', 'deptbudgetrev_version', 'dept_id', 'doc_id', 'deptbudgetrev_iscommit', 'deptbudgetrev_commitby', 'deptbudgetrev_commitdate', 'deptbudgetrev_isapprovalprogress', 'deptbudgetrev_isapproved', 'deptbudgetrev_approveby', 'deptbudgetrev_approvedate', 'deptbudgetrev_isdeclined', 'deptbudgetrev_declineby', 'deptbudgetrev_declinedate', 'deptbudgetrev_isveryfied', 'deptbudgetrev_verifyby', 'deptbudgetrev_verifydate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'deptbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'deptbudgetrev_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);



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
		
			$seqname = 'BR01';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = 0; //$dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};