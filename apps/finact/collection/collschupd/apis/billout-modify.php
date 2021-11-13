<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


/**
 * finact/collection/colltarget/apis/billout-delete.php
 *
 * ============
 * Detil-Delete
 * ============
 * Menghapus satu baris data/record berdasarkan PrimaryKey
 * pada tabel billout colltarget (trn_colltarget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/10/2021
 */
$API = new class extends collschupdBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_colltargetbillout';
		$primarykey = 'colltargetbillout_id';

		$userdata = $this->auth->session_get_user();

		try {
			$result = new \stdClass; 
			
			

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				

				$datetarget = $options->datetarget;
				$discp = (float)$options->discp;

				foreach ($data as $row) {
					
					// if (trim($row->billout_idrnett)=="" || $row->billout_idrnett==null) {
					// 	$row->billout_idrnett = 0;
					// }	

					$obj = new \stdClass;
					$obj->colltargetbillout_id =  $row->colltargetbillout_id;
					$obj->colltargetbillout_datetarget = (\DateTime::createFromFormat('d/m/Y', $datetarget))->format('Y-m-d');
					$obj->billout_discp = "$discp";
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");	

					if ($billout_idrnett!=0) {
						$obj->billout_isdiscvalue = 0;
						$obj->billout_idrnett = (float)$row->billout_idrnett;
						$obj->billout_discval = $obj->billout_idrnett * ($discp/100);
						$obj->billout_idrtotal = $obj->billout_idrnett - $obj->billout_discval ;
						$obj->billout_idrtopay = $obj->billout_idrtotal;
					} 
			

					$key = new \stdClass;
					$key->colltargetbillout_id = $row->colltargetbillout_id;
			
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					
					$this->log($cmd->sql);
					$this->log($cmd->params);	

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