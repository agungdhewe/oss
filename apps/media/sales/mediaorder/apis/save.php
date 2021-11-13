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
 * media/sales/mediaorder/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header mediaorder (trn_mediaorder)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/04/2021
 */
$API = new class extends mediaorderBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_mediaorder';
		$primarykey = 'mediaorder_id';
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
			$obj->mediaorder_date = (\DateTime::createFromFormat('d/m/Y',$obj->mediaorder_date))->format('Y-m-d');
			$obj->brand_id = strtoupper($obj->brand_id);
			$obj->salesordertype_id = strtoupper($obj->salesordertype_id);
			$obj->doc_id = strtoupper($obj->doc_id);


			// if ($obj->ae_empl_id=='--NULL--') { unset($obj->ae_empl_id); }
			// if ($obj->mediapackage_id=='--NULL--') { unset($obj->mediapackage_id); }
			// if ($obj->mediaorder_notes=='--NULL--') { unset($obj->mediaorder_notes); }


			unset($obj->mediaorder_iscommit);
			unset($obj->mediaorder_commitby);
			unset($obj->mediaorder_commitdate);
			unset($obj->mediaorder_isapprovalprogress);
			unset($obj->mediaorder_isapproved);
			unset($obj->mediaorder_approveby);
			unset($obj->mediaorder_approvedate);
			unset($obj->mediaorder_isdeclined);
			unset($obj->mediaorder_declineby);
			unset($obj->mediaorder_declinedate);
			unset($obj->mediaorder_isclose);
			unset($obj->mediaorder_closeby);
			unset($obj->mediaorder_closedate);



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
				, 'mediaorder_id', 'mediaordertype_id', 'mediaorder_date', 'mediaorder_descr', 'mediaorder_ref', 'ae_empl_id', 'agency_partner_id', 'advertiser_partner_id', 'brand_id', 'curr_id', 'mediaorder_istax', 'taxtype_id', 'mediapackage_id', 'salesordertype_id', 'trxmodel_id', 'dept_id', 'doc_id', 'mediaorder_version', 'mediaorder_iscommit', 'mediaorder_commitby', 'mediaorder_commitdate', 'mediaorder_isapprovalprogress', 'mediaorder_isapproved', 'mediaorder_approveby', 'mediaorder_approvedate', 'mediaorder_isdeclined', 'mediaorder_declineby', 'mediaorder_declinedate', 'mediaorder_notes', 'mediaorder_isclose', 'mediaorder_closeby', 'mediaorder_closedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'mediaordertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['mediaordertype_id'], $this->db, 'mst_mediaordertype', 'mediaordertype_id', 'mediaordertype_name'),
				'mediaorder_date' => date("d/m/Y", strtotime($row['mediaorder_date'])),
				'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'agency_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['agency_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'advertiser_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['advertiser_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),
				'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
				'taxtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id', 'taxtype_name'),
				'mediapackage_descr' => \FGTA4\utils\SqlUtility::Lookup($record['mediapackage_id'], $this->db, 'mst_mediapackage', 'mediapackage_id', 'mediapackage_descr'),
				'salesordertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['salesordertype_id'], $this->db, 'mst_salesordertype', 'salesordertype_id', 'salesordertype_name'),
				'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'mediaorder_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'mediaorder_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['mediaorder_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($param) {
		
		$seqname = 'MO';

		$dt = new \DateTime();	
		$ye = $dt->format("y");
		$mo = $dt->format("m");
		$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
		$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
		$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
		return $id;		
			
	}

};