<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/approval.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use FGTA4StandartApproval;
use \FGTA4\StandartApproval;




/**
 * finact/budget/deptbudget/apis/xtion-commit.php
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
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {

	public function execute($data) {
		$userdata = $this->auth->session_get_user();

		try {

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				$this->log($data); 

				$deptbudget_id = $data->deptbudget_id;
				$year = $data->year;
				$dept_id = $data->dept_id;


				$sqlCek = "
					select * from mst_deptbudgetdet 
					where
					deptbudget_id=:deptbudget_id and accbudget_id=:accbudget_id
				";
				$stmtCek = $this->db->prepare($sqlCek);


				$sql = "
					select 
					B.* 
					from 
					mst_deptbudget A inner join mst_deptbudgetdet B on B.deptbudget_id=A.deptbudget_id
					where
					A.deptbudget_year = :deptbudget_year
					and A.dept_id = :dept_id
				";
				
				$stmt = $this->db->prepare($sql);
				$stmt->execute([
					":deptbudget_year" => $year,
					":dept_id" => $dept_id
				]);

				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

				// $this->log($sql); 
				foreach ($rows as $row) {
					$obj = new \stdClass;
					$obj->deptbudgetdet_id = \uniqid();
					$obj->deptbudgetdet_descr = $row[''];	
					$obj->deptbudgetdet_01 = $row['deptbudgetdet_01'];	
					$obj->deptbudgetdet_02 = $row['deptbudgetdet_02'];	
					$obj->deptbudgetdet_03 = $row['deptbudgetdet_03'];	
					$obj->deptbudgetdet_04 = $row['deptbudgetdet_04'];	
					$obj->deptbudgetdet_05 = $row['deptbudgetdet_05'];	
					$obj->deptbudgetdet_06 = $row['deptbudgetdet_06'];	
					$obj->deptbudgetdet_07 = $row['deptbudgetdet_07'];	
					$obj->deptbudgetdet_08 = $row['deptbudgetdet_08'];	
					$obj->deptbudgetdet_09 = $row['deptbudgetdet_09'];	
					$obj->deptbudgetdet_10 = $row['deptbudgetdet_10'];	
					$obj->deptbudgetdet_11 = $row['deptbudgetdet_11'];	
					$obj->deptbudgetdet_12 = $row['deptbudgetdet_12'];	
					$obj->deptbudgetdet_total = $row['deptbudgetdet_total'];	
					$obj->deptbudgetdet_01_prop = $row['deptbudgetdet_01'];	
					$obj->deptbudgetdet_02_prop = $row['deptbudgetdet_02'];	
					$obj->deptbudgetdet_03_prop = $row['deptbudgetdet_03'];	
					$obj->deptbudgetdet_04_prop = $row['deptbudgetdet_04'];	
					$obj->deptbudgetdet_05_prop = $row['deptbudgetdet_05'];	
					$obj->deptbudgetdet_06_prop = $row['deptbudgetdet_06'];	
					$obj->deptbudgetdet_07_prop = $row['deptbudgetdet_07'];	
					$obj->deptbudgetdet_08_prop = $row['deptbudgetdet_08'];	
					$obj->deptbudgetdet_09_prop = $row['deptbudgetdet_09'];	
					$obj->deptbudgetdet_10_prop = $row['deptbudgetdet_10'];	
					$obj->deptbudgetdet_11_prop = $row['deptbudgetdet_11'];	
					$obj->deptbudgetdet_12_prop = $row['deptbudgetdet_12'];	
					$obj->deptbudgetdet_total_prop = $row['deptbudgetdet_total_prop'];	
					$obj->accbudget_id = $row['accbudget_id'];	
					$obj->accbudget_nameshort = $row['accbudget_nameshort'];	
					$obj->deptbudgetdet_notes = $row['deptbudgetdet_notes'];	
					$obj->coa_id = $row['coa_id'];	
					$obj->coareport_id = $row['coareport_id'];	
					$obj->deptbudget_id = $deptbudget_id;	
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");



					$stmtCek->execute([
						":deptbudget_id" => $deptbudget_id,
						":accbudget_id" => $row['accbudget_id']
					]);
					$rowsCek  = $stmtCek->fetchall(\PDO::FETCH_ASSOC);
					if (count($rowsCek)==0) {
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_deptbudgetdet', $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);
					}
				}


				$this->db->commit();
				return (object)[
					'success' => true
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

};


