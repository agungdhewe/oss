<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends colltarprdBase {
	
	public function execute($data) {
		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
			
			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				
				$this->log($data);
				$stmt = $this->db->prepare("call colltarprd_get_aroutstanding(:periodemo_id);");
				$stmt->execute([':periodemo_id'=>'202109']);

				$stmt = $this->db->prepare("select * from TEMP_AR_AGENCY_RESULT");
				$stmt->execute();
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

				$stmt = $this->db->prepare("delete from mst_colltarprddetil where colltarprd_id = :colltarprd_id ");
				$stmt->execute([':colltarprd_id' => $data->colltarprd_id]);
		
				$i=0;
		
				$colltarprdpartnerexc_valpartner = 0;
				$stmtexc = $this->db->prepare("select *, (select partner_name from mst_partner where partner_id = A.partner_id) as partner_name from mst_colltarprdpartnerexc A where colltarprd_id = :colltarprd_id ");
				$stmtexc->execute([':colltarprd_id' => $data->colltarprd_id]);
				$rowsexc  = $stmtexc->fetchall(\PDO::FETCH_ASSOC);
				foreach ($rowsexc as $row) {
					$obj = new \stdClass;
					$obj->colltarprd_id = $data->colltarprd_id;
					$obj->colltarprddetil_id = \uniqid();
					$obj->colltarrowtype_id = 'PAR';
					$obj->colltarrowtype_order = 30;
					$obj->partner_id = $row['partner_id'];
					$obj->colltarprddetil_descr = $row['partner_name'];
					$obj->colltarprddetil_valpartnerost = $row['colltarprdpartnerexc_valpartnerost'];
					$obj->colltarprddetil_valpartner = $row['colltarprdpartnerexc_valpartner'];
					$obj->colltarprddetil_val = 0;
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");


					$colltarprdpartnerexc_valpartner += (float) $row['colltarprdpartnerexc_valpartner'];

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_colltarprddetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}



				$FOR = 0;
				$SALDO = 0;
				foreach ($rows as $row) {
					$exc = \FGTA4\utils\SqlUtility::LookupRow( $row['partner_id'], $this->db, 'mst_colltarprdpartnerexc', 'partner_id');
					$outstanding = (float)$row['colltarprddetil_valpartnerost'] - (float)$exc['colltarprdpartnerexc_valpartner'];


					$obj = new \stdClass;
					$obj->colltarprd_id = $data->colltarprd_id;
					$obj->colltarprddetil_id = \uniqid();
					$obj->colltarrowtype_id = $row['colltarrowtype_id'];
					$obj->colltarrowtype_order = $row['colltarrowtype_order'];
					$obj->partner_id = $row['partner_id'];
					$obj->colltarprddetil_descr = $row['colltarprddetil_descr'];
					$obj->colltarprddetil_valpartnerost = $outstanding;
					$obj->colltarprddetil_valpartner = $outstanding;

					if ( $row['colltarrowtype_id']=='SAL') {
						$SALDO = (float) $row['colltarprddetil_val'];
						$obj->colltarprddetil_val = $SALDO;
					} else if ( $row['colltarrowtype_id']=='PAR') {
						continue;
					} else if ( $row['colltarrowtype_id']=='PAS') {	
						$obj->colltarprddetil_val = $colltarprdpartnerexc_valpartner * -1;
					} else if ( $row['colltarrowtype_id']=='SAR') {
						$obj->colltarprddetil_val = $SALDO - $colltarprdpartnerexc_valpartner;
					} else if ( $row['colltarrowtype_id']=='FOR') {
						$FOR  = ($SALDO - $colltarprdpartnerexc_valpartner) * (35/100);
						$obj->colltarprddetil_val = $FOR;
					} else if ( $row['colltarrowtype_id']=='ESL') {	
						continue;
						$obj->colltarprddetil_val = $SALDO - $FOR;
					} else {
						$obj->colltarprddetil_val = $row['colltarprddetil_val'];
					}

				
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");

					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_colltarprddetil', $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

				}



				// $header_table = 'trn_colltarget';
				// $header_primarykey = 'colltarget_id';
				// $sqlrec = "update $header_table set _modifyby = :user_id, _modifydate=NOW() where $header_primarykey = :$header_primarykey";
				// $stmt = $this->db->prepare($sqlrec);
				// $stmt->execute([
				// 	":user_id" => $userdata->username,
				// 	":colltarget_id" => $options->colltarget_id
				// ]);

				// \FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $key->{$primarykey}, 'DELETE', $userdata->username, (object)[]);
				// \FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $header_table, $data->{$header_primarykey}, 'DELETE_DETIL', $userdata->username, (object)[]);

				$this->db->commit();

				$result->success = true;
			} catch (\Exception $ex) {
				$result->success = false;
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};