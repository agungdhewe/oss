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
 * finact/collection/colltemprecv/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header colltemprecv (trn_colltemprecv)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/10/2021
 */
$API = new class extends colltemprecvBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_colltemprecv';
		$primarykey = 'colltemprecv_id';
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
			$obj->colltemprecv_date = (\DateTime::createFromFormat('d/m/Y',$obj->colltemprecv_date))->format('Y-m-d');
			$obj->paym_bgdatedue = (\DateTime::createFromFormat('d/m/Y',$obj->paym_bgdatedue))->format('Y-m-d');
			$obj->paym_bgdate = (\DateTime::createFromFormat('d/m/Y',$obj->paym_bgdate))->format('Y-m-d');





			unset($obj->colltemprecv_idrtopay);
			unset($obj->colltarget_ppntopay);
			unset($obj->colltemprecv_iscommit);
			unset($obj->colltemprecv_commitby);
			unset($obj->colltemprecv_commitdate);
			unset($obj->colltemprecv_isverified);
			unset($obj->colltemprecv_verifyby);
			unset($obj->colltemprecv_verifydate);



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
					, 'colltemprecv_id', 'periodemo_id', 'colltemprecv_date', 'empl_id', 'dept_id', 'partner_id', 'colltemprecv_descr', 'collsource_id'
					, 'paymtype_id', 'bankrekening_id', 'paym_bankname', 'paym_bgnum', 'paym_bgdatedue', 'paym_bgdate'
					, 'coa_id', 'colltemprecv_isadvance', 'colltemprecv_idrtopay', 'colltarget_ppntopay', 'doc_id', 'colltemprecv_version'
					, 'colltemprecv_iscommit', 'colltemprecv_commitby', 'colltemprecv_commitdate', 'colltemprecv_isverified'
					, 'colltemprecv_verifyby', 'colltemprecv_verifydate'
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
					//  untuk lookup atau modify response ditaruh disini
				
					'bankrekening_name' => \FGTA4\utils\SqlUtility::Lookup($record['bankrekening_id'], $this->db, 'mst_bankrekening', 'bankrekening_id', 'bankrekening_name'),

					'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
					'colltemprecv_date' => date("d/m/Y", strtotime($row['colltemprecv_date'])),
					'paym_bgdatedue' => date("d/m/Y", strtotime($record['paym_bgdatedue'])),
					'paym_bgdate' => date("d/m/Y", strtotime($record['paym_bgdate'])),
				

					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'collsource_name' => \FGTA4\utils\SqlUtility::Lookup($record['collsource_id'], $this->db, 'mst_collsource', 'collsource_id', 'collsource_name'),
					'paymtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['paymtype_id'], $this->db, 'mst_paymtype', 'paymtype_id', 'paymtype_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'colltemprecv_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['colltemprecv_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'colltemprecv_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['colltemprecv_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

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
		
			$seqname = 'TS';

			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}

};