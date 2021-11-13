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
 * finact/budget/projbudget/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header projbudget (mst_projbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/06/2021
 */
$API = new class extends projbudgetBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_projbudget';
		$primarykey = 'projbudget_id';
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

			$obj->projbudget_id = strtoupper($obj->projbudget_id);
			$obj->doc_id = strtoupper($obj->doc_id);


			unset($obj->projbudget_notes);
			unset($obj->projbudget_version);
			unset($obj->projbudget_iscommit);
			unset($obj->projbudget_commitby);
			unset($obj->projbudget_commitdate);
			unset($obj->projbudget_isapprovalprogress);
			unset($obj->projbudget_isapproved);
			unset($obj->projbudget_approveby);
			unset($obj->projbudget_approvedate);
			unset($obj->projbudget_isdeclined);
			unset($obj->projbudget_declineby);
			unset($obj->projbudget_declinedate);
			unset($obj->projbudget_isclose);
			unset($obj->projbudget_closeby);
			unset($obj->projbudget_closedate);


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
					, 'projbudget_id', 'dept_id', 'project_id', 'projbudget_name', 'projbudget_descr', 'projbudget_year', 'projbudget_month', 'projbudget_isinheritvisibility', 'projbudget_isdeptalloc', 'doc_id', 'projbudget_notes', 'projbudget_version', 'projbudget_iscommit', 'projbudget_commitby', 'projbudget_commitdate', 'projbudget_isapprovalprogress', 'projbudget_isapproved', 'projbudget_approveby', 'projbudget_approvedate', 'projbudget_isdeclined', 'projbudget_declineby', 'projbudget_declinedate', 'projbudget_isclose', 'projbudget_closeby', 'projbudget_closedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'projbudget_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
		
			$seqname = 'BP';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};