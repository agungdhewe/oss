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
 * finact/acct/jurnal/apis\detil-save.php
 *
 * ==========
 * Detil-Save
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil jurnal (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2021
 */
$API = new class extends jurnalBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_jurnaldetil';
		$primarykey = 'jurnaldetil_id';
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

			$obj->jurnaldetil_id = strtoupper($obj->jurnaldetil_id);
			$obj->dept_id = strtoupper($obj->dept_id);


			if ($obj->jurnaldetil_id_ref=='') { $obj->jurnaldetil_id_ref = '--NULL--'; }



			unset($obj->jurnaldetil_outstanding_frg);
			unset($obj->jurnaldetil_outstanding_idr);
			unset($obj->jurnaldetil_id_ref);
			unset($obj->jurnaldetil_dk);


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

				
				$header_table = 'trn_jurnal';
				$header_primarykey = 'jurnal_id';
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
					, 'jurnaldetil_id', 'jurnaldetil_descr', 'coa_id', 'dept_id', 'partner_id', 'curr_id', 'jurnaldetil_valfrg', 'jurnaldetil_valfrgrate', 'jurnaldetil_validr', 'jurnaldetil_outstanding_frg', 'jurnaldetil_outstanding_idr', 'jurnaldetil_id_ref', 'jurnaldetil_dk', 'jurnal_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);
				
				$jurnal_id = $record['jurnal_id'];
				$summary = $this->getSummary($jurnal_id);

				$this->set_jurnal_validr($jurnal_id, $summary->jurnal_total);

				$result->summary = $summary;


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

	public function getSummary($id) {

		try {
			//code...
			// TOTAL SUMMARY				
			//$jurnal_id = $record['jurnal_id'];
			$stmt = $this->db->prepare("
			select 
				sum(case when A.jurnaldetil_validr > 0 then A.jurnaldetil_validr else 0 end) as debet,
				sum(case when A.jurnaldetil_validr < 0 then A.jurnaldetil_validr else 0 end) as kredit
			from trn_jurnaldetil A
			where A.jurnal_id = :jurnal_id
			");
			$stmt->execute([':jurnal_id' => $id]);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$jurnal_variance = $row['debet'] + $row['kredit'];
			$jurnal_total = (abs($row['debet']) > abs($row['kredit'])) ? $row['debet'] : $row['kredit'];

			$summary = (object)[
				'jurnal_total' => abs($jurnal_total),
				'jurnal_variance' => $jurnal_variance
			];

			return $summary;
		} catch (\Exception $ex) {
			throw $ex;
		}

	}


	public function set_jurnal_validr($id, $validr) {
		try {			

			$sql = " 
				update $this->main_tablename
				set 
				jurnal_validr = :validr
				where
				$this->main_primarykey = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,
				":validr" => $validr
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

};