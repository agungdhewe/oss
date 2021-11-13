<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;

use \FGTA4\StandartApproval;




/**
 * finact/collection/colltemprecv/apis/xtion-commit.php
 *
 * =======
 * Commit
 * =======
 * Commit dokumen, menandakan dokumen yang selesai dsunting
 * dan telah siap untuk diproses lebih lanjut
 * Pada status tercommit, dokumen akan menjadi readonly. 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/10/2021
 */
$API = new class extends colltemprecvBase {

	public function execute($id, $param) {
		$tablename = 'trn_colltemprecv';
		$primarykey = 'colltemprecv_id';
		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'commit');


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
	
				$this->post($id, $currentdata);

				
				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
					// '_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					// '_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'COMMIT', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'version' => $currentdata->header->{$this->main_field_version},
					'dataresponse' => $dataresponse
				];

				
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



	public function post($id, $currentdata) {
		try {
			$stmt = $this->db->prepare("delete from trn_jurnaldetil where jurnal_id=:jurnal_id");
			$stmt->execute([":jurnal_id"=>$id]);

			$stmt = $this->db->prepare("delete from trn_jurnal where jurnal_id=:jurnal_id");
			$stmt->execute([":jurnal_id"=>$id]);

			$header = $currentdata->header;
			
			// create header jurnal
			$obj = new \stdClass;
			$obj->jurnal_id = $id;
			$obj->jurnal_ref = $id;
			$obj->jurnal_date = $header->colltemprecv_date;
			$obj->jurnal_datedue = $header->colltemprecv_date;
			$obj->jurnal_descr = $header->colltemprecv_descr;
			$obj->periodemo_id = $header->periodemo_id;
			// $obj->coa_id = '';
			$obj->dept_id = $header->dept_id;
			$obj->partner_id = $header->partner_id;
			$obj->jurnal_valfrg = 0;
			$obj->curr_id = 'IDR';
			$obj->jurnal_valfrgrate = 0;
			$obj->jurnal_validr = 0;
			$obj->jurnaltype_id = 'MAN-JV';
			$obj->jurnalsource_id = 'MANUAL';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");

			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnal", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			// Detil
			$stmt = $this->db->prepare("
				select 
				B.billout_discval,
				B.billout_idrtopay, B.billout_ppntopay, B.billout_pphtopay,
				C.billout_descr,
				C.coa_id,
				C.dept_id,
				C.partner_id,
				B.billout_id
				from
				trn_colltemprecv A inner join trn_colltemprecvdetil B on B.colltemprecv_id=A.colltemprecv_id
								inner join trn_billout C on C.billout_id=B.billout_id                   
				where
				A.colltemprecv_id=:colltemprecv_id			
			");
			
			$stmt->execute([":colltemprecv_id"=>$id]);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$total_terima_idr = 0;
			$total_terima_value = 0;	
			$total_pph = 0;
			
			foreach ($rows as $row) {

				$this->log($row);

				$idrtopay = (float)$row['billout_idrtopay'];
				$discval = (float)$row['billout_discval'];
				$pphtopay = (float)$row['billout_pphtopay']; 
				$value_piutang = $idrtopay  + $discval;

				// Pokok
				$total_terima_idr += (float)$row['billout_idrtopay'];
				$total_terima_value +=  (float)$row['billout_idrtopay'];
				$total_pph += $pphtopay;


				$coa =  \FGTA4\utils\SqlUtility::LookupRow($row['coa_id'], $this->db, 'mst_coa', 'coa_id');
				$obj = new \stdClass;
				$obj->jurnal_id = $id;
				$obj->jurnaldetil_id = \uniqid();	
				$obj->jurnaldetil_descr	= $row['billout_descr'];
				$obj->coa_id = $row['coa_id'];
				$obj->coa_nameshort	= $coa['coa_nameshort'];
				$obj->dept_id = $row['dept_id'];
				$obj->partner_id = $row['partner_id'];	
				$obj->curr_id = 'IDR';	
				$obj->jurnaldetil_valfrg = $value_piutang * -1;	
				$obj->jurnaldetil_valfrgrate = 1;	
				$obj->jurnaldetil_validr = $value_piutang * -1;	
				$obj->jurnaldetil_dk = 'K';
				$obj->_createby =  $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				// Discount
				if ($discval>0) {
					$coa_id_disc = '6080000200';
					$coa =  \FGTA4\utils\SqlUtility::LookupRow($coa_id_disc, $this->db, 'mst_coa', 'coa_id');
					$obj = new \stdClass;
					$obj->jurnal_id = $id;
					$obj->jurnaldetil_id = \uniqid();	
					$obj->jurnaldetil_descr	= 'Discount ' . $row['billout_descr'];
					$obj->coa_id = $coa_id_disc;
					$obj->coa_nameshort	= $coa['coa_nameshort'];
					$obj->dept_id = $row['dept_id'];
					$obj->partner_id = $row['partner_id'];	
					$obj->curr_id = 'IDR';	
					$obj->jurnaldetil_valfrg = $discval;	
					$obj->jurnaldetil_valfrgrate = 1;	
					$obj->jurnaldetil_validr = $discval;	
					$obj->jurnaldetil_dk = 'K';
					$obj->_createby =  $currentdata->user->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}


				// PPH
				if ($pphtopay>0) {
					$coa_id_disc = '1102107000';
					$coa =  \FGTA4\utils\SqlUtility::LookupRow($coa_id_disc, $this->db, 'mst_coa', 'coa_id');
					$obj = new \stdClass;
					$obj->jurnal_id = $id;
					$obj->jurnaldetil_id = \uniqid();	
					$obj->jurnaldetil_descr	= 'PPh ' . $row['billout_descr'];
					$obj->coa_id = $coa_id_disc;
					$obj->coa_nameshort	= $coa['coa_nameshort'];
					$obj->dept_id = $row['dept_id'];
					$obj->partner_id = $row['partner_id'];	
					$obj->curr_id = 'IDR';	
					$obj->jurnaldetil_valfrg = $pphtopay * -1;	
					$obj->jurnaldetil_valfrgrate = 1;	
					$obj->jurnaldetil_validr = $pphtopay * -1;	
					$obj->jurnaldetil_dk = 'K';
					$obj->_createby =  $currentdata->user->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}

			}


			if ($header->paymtype_id == 'CA') {
				$coa_id = '1101014100';
			} else {
				$coa_id = '1101025010';
			}
			$coa =  \FGTA4\utils\SqlUtility::LookupRow($row['coa_id'], $this->db, 'mst_coa', 'coa_id');
			$obj = new \stdClass;
			$obj->jurnal_id = $id;
			$obj->jurnaldetil_id = \uniqid();	
			$obj->jurnaldetil_descr	= $header->colltemprecv_descr;
			$obj->coa_id = $coa_id;	
			$obj->coa_nameshort	= $coa['coa_nameshort'];
			$obj->dept_id = $header->dept_id;
			$obj->partner_id = $header->partner_id;
			$obj->curr_id = 'IDR';	
			$obj->jurnaldetil_valfrg = $total_terima_value;	
			$obj->jurnaldetil_valfrgrate = 1;	
			$obj->jurnaldetil_validr = $total_terima_idr;	
			$obj->jurnaldetil_dk = 'D';
			$obj->_createby =  $currentdata->user->username;
			$obj->_createdate = date("Y-m-d H:i:s");
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


			if ($total_pph>0) {
				$coa_id = '1105040000';
				$coa =  \FGTA4\utils\SqlUtility::LookupRow($row['coa_id'], $this->db, 'mst_coa', 'coa_id');
				$obj = new \stdClass;
				$obj->jurnal_id = $id;
				$obj->jurnaldetil_id = \uniqid();	
				$obj->jurnaldetil_descr	='PPh ' . $header->colltemprecv_descr;
				$obj->coa_id = $coa_id;	
				$obj->coa_nameshort	= $coa['coa_nameshort'];
				$obj->dept_id = $header->dept_id;
				$obj->partner_id = $header->partner_id;
				$obj->curr_id = 'IDR';	
				$obj->jurnaldetil_valfrg = $total_pph;	
				$obj->jurnaldetil_valfrgrate = 1;	
				$obj->jurnaldetil_validr = $total_pph;	
				$obj->jurnaldetil_dk = 'D';
				$obj->_createby =  $currentdata->user->username;
				$obj->_createdate = date("Y-m-d H:i:s");
				$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_jurnaldetil", $obj);
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);
	
			}

			// array_key_exists()
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	
};


