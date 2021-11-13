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
 * finact/acct/payable/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header payable (trn_jurnal)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 05/06/2021
 */
$API = new class extends payableBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_jurnal';
		$primarykey = 'jurnal_id';
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
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
			}


			$obj = new \stdClass;
			$obj->jurnal_id = $data->jurnal_id;
			$obj->jurnal_ref = $data->jurnal_ref;
			$obj->periodemo_id = $data->periodemo_id;	
			$obj->jurnal_date = (\DateTime::createFromFormat('d/m/Y',$data->jurnal_date))->format('Y-m-d');
			$obj->jurnal_datedue = (\DateTime::createFromFormat('d/m/Y',$data->jurnal_datedue))->format('Y-m-d');
			$obj->jurnal_descr = $data->jurnal_descr;
			$obj->partner_id = $data->partner_id;
			$obj->jurnal_valfrg = $data->jurnal_valfrg;
			$obj->jurnal_valfrgrate = $data->jurnal_valfrgrate;
			$obj->jurnal_validr = $data->jurnal_validr;
			$obj->curr_id = $data->curr_id;
			$obj->jurnaltype_id = $data->jurnaltype_id;
			$obj->jurnalsource_id = $data->jurnalsource_id;	
			$obj->dept_id = $data->dept_id;
			$obj->coa_id = $data->coa_id;



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


				/* Save to detil */
				$extdata = $this->Update_JurnalExtended($obj, $data, $key);
				$this->Update_Detil_D($obj, $data, $key, $extdata);
				$this->Update_Detil_K($obj, $data, $key, $extdata);




				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);





				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select("view_jurnalap" , [
					$primarykey
					, 'jurnal_id', 'jurnaltype_id', 'jurnal_ref', 'periodemo_id', 'jurnal_date', 'jurnal_datedue', 'billin_id', 'partner_id', 'jurnal_descr', 'jurnal_valfrg', 'curr_id', 'jurnal_valfrgrate', 'jurnal_validr', 'coa_id', 'dept_id', 'jurnalsource_id', 'jurnal_version', 'jurnal_iscommit', 'jurnal_commitby', 'jurnal_commitdate', 'jurnal_ispost', 'jurnal_postby', 'jurnal_postdate', 'jurnal_isclose', 'jurnal_isagingclose', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
					'jurnaltype_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnaltype_id'], $this->db, 'mst_jurnaltype', 'jurnaltype_id', 'jurnaltype_name'),
					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'jurnal_date' => date("d/m/Y", strtotime($row['jurnal_date'])),
					'jurnal_datedue' => date("d/m/Y", strtotime($row['jurnal_datedue'])),
					'billin_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billin_id'], $this->db, 'trn_billin', 'billin_id', 'billin_descr'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'jurnalsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['jurnalsource_id'], $this->db, 'mst_jurnalsource', 'jurnalsource_id', 'jurnalsource_name'),
					'jurnal_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'jurnal_postby' => \FGTA4\utils\SqlUtility::Lookup($record['jurnal_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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
		
			$seqname = 'AP';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}


	public function Update_JurnalExtended($jurnal, $data, $key) {
		
		$ret = new \stdClass;
		try {
			$tablename = "trn_jurextap";

			// cek apakah data sudah ada
			$stmt = $this->db->prepare("select jurnal_id from {$tablename} where jurnal_id = :jurnal_id");
			$stmt->execute([":jurnal_id" => $obj->jurnal_id]);
			$rows  = $stmt->fetchAll(\PDO::FETCH_ASSOC);
			if (count($rows)==0) {

				// Data Jurnal Extended
				$obj = new \stdClass;
				$obj->jurnal_id = $jurnal->jurnal_id;
				$obj->billin_id = $data->billin_id;

				$key = new \stdClass;
				$key->jurnal_id = $jurnal->jurnal_id;


				// Insert data baru
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
			} else {
				$ret->ap_jurnaldetil_id = $rows[0]['ap_jurnaldetil_id'];
			}
			
			return $ret;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function Update_Detil_K($objheader, $data, $key, $extdata) {
		try {
			if (property_exists('ap_jurnaldetil_id', $extdata)) {
				// update detil
			} else {
				// Detil belum ada
				// Insert Detil
				$jurnal_id = $objheader->jurnal_id;
				$jurnaldetil_id = uniqid();

				$obj = new \stdClass;
				$obj->jurnaldetil_id = $jurnaldetil_id ;
				$obj->jurnaldetil_descr = $objheader->jurnal_descr;
				$obj->coa_id = $objheader->coa_id;
				$obj->dept_id = $objheader->dept_id;
				$obj->partner_id = $objheader->partner_id;
				$obj->curr_id = $objheader->curr_id;
				$obj->jurnaldetil_valfrg = $objheader->jurnal_valfrg;
				$obj->jurnaldetil_valfrgrate = $objheader->jurnal_valfrgrate;
				$obj->jurnaldetil_validr = $objheader->jurnal_validr;
				$obj->jurnaldetil_dk = 'K';
				$obj->jurnal_id = $objheader->jurnal_id;
				$obj->_createby = $objheader->_createby;
				$obj->_createdate =  $objheader->_createdate;

				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				// update extended
				$obj = new \stdClass;
				$obj->jurnaldetil_id = $jurnaldetil_id ;
				$obj->billin_id = $data->billin_id;
				$obj->jurnal_id = $objheader->jurnal_id;
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurextapdetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);


				//update header ext
				$stmt = $this->db->prepare("
					update trn_jurextap
					set ap_jurnaldetil_id = :ap_jurnaldetil_id
					where
					jurnal_id = :jurnal_id
				");
				$stmt->execute([
					':jurnal_id' => $jurnal_id,
					':ap_jurnaldetil_id' => $jurnaldetil_id
				]);

			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}
	

	public function Update_Detil_D($objheader, $data, $key, $extdata) {
		try {
			if (property_exists('ap_jurnaldetil_id', $extdata)) {
				// data lama, tidak perlu sentuh debet
			} else {
				// data baru insert debet dari billin
				$stmt = $this->db->prepare("
					select 
					billin_id, billindetil_id, billindetil_descr, 
					billindetil_valfrg, coa_id, partner_id, dept_id
					from view_billindetil_for_ap_debet
					where 
					billin_id = :billin_id
				");
				$stmt->execute([
					':billin_id' => $data->billin_id,
				]);
				
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
				foreach ($rows as $row) {
					$obj = new \stdClass;
					$obj->jurnaldetil_id = uniqid();
					$obj->jurnaldetil_descr = $row['billindetil_descr'];
					$obj->coa_id = $row['coa_id'];
					$obj->dept_id = $row['dept_id'];
					$obj->partner_id = $row['partner_id'];
					$obj->curr_id = $objheader->curr_id;
					$obj->jurnaldetil_valfrg = $row['billindetil_valfrg'];
					$obj->jurnaldetil_valfrgrate = $objheader->jurnal_valfrgrate;
					$obj->jurnaldetil_validr = $obj->jurnaldetil_valfrg * $obj->jurnaldetil_valfrgrate;
					$obj->jurnaldetil_dk = 'D';
					$obj->jurnal_id = $objheader->jurnal_id;
					$obj->_createby = $objheader->_createby;
					$obj->_createdate =  $objheader->_createdate;
	
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}


			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


};