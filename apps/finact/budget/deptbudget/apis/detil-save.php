<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';
//require_once __ROOT_DIR . "/core/sequencer.php";

use \FGTA4\exceptions\WebException;
//use \FGTA4\utils\Sequencer;



/**
 * finact/budget/deptbudget/apis/detil-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil deptbudget (mst_deptbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_deptbudgetdet';
		$primarykey = 'deptbudgetdet_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

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
			unset($obj->coareport_id);	


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

				
				$header_table = 'mst_deptbudget';
				$header_primarykey = 'deptbudget_id';
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
					, 'deptbudgetdet_id', 'deptbudgetdet_descr'
					, 'deptbudgetdet_01', 'deptbudgetdet_02', 'deptbudgetdet_03', 'deptbudgetdet_04'
					, 'deptbudgetdet_05', 'deptbudgetdet_06', 'deptbudgetdet_07', 'deptbudgetdet_08'
					, 'deptbudgetdet_09', 'deptbudgetdet_10', 'deptbudgetdet_11', 'deptbudgetdet_12'
					, 'deptbudgetdet_total'
					, 'coa_id', 'coareport_id'
					, 'accbudget_id', 'deptbudgetdet_notes', 'deptbudget_id'
					, '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					'coareport_id' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'view_accbudget', 'accbudget_id', 'coareport_id'),	
					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				$this->log($record);

				// summary
				$deptbudget_id = $record['deptbudget_id'];
				$stmt = $this->db->prepare("
						select 
						sum(A.deptbudgetdet_total) as deptbudgetdet_total 
						from mst_deptbudgetdet A
						where
						deptbudget_id = :deptbudget_id
				");
				$stmt->execute([':deptbudget_id'=>$deptbudget_id]);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);		
				$result->summary = (object)[
					'deptbudgetdet_total' => $row['deptbudgetdet_total']
				];


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