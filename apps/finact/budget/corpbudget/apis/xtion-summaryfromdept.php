<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


/**
 * finact/budget/corpbudget/apis/xtion-summaryfromdept.php
 *
 * =========================
 * Summary From Departement
 * =========================
 * memsummary semua departemen pada tahun yang dimaksud
 * dan memasukkan ke data detail corporate budget
 *
 */
$API = new class extends corpbudgetBase {

	public function execute($id) {

		$userdata = $this->auth->session_get_user();

		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'summary');
			$this->getPendingBudget($currentdata);

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {
				
				$this->createSummary($currentdata);

				
				$this->db->commit();
				return (object)[
					'success' => true,
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


	public function getPendingBudget($currentdata) {
		try {
			$sql = "
				select 
				A.dept_id , A.dept_name,  case when isnull(B.dept_id) then '0' else '1' end as completed
				from 
				mst_dept A left join mst_deptbudget B on B.dept_id = A.dept_id and B.deptbudget_year = :year and B.deptbudget_isapproved =1
				where 
				A.dept_isdisabled = 0
				and A.dept_isbudgetmandatory =1
			";


			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':year' => $currentdata->header->corpbudget_year
			]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$incompleted = array();
			foreach ($rows as $row) {
				if ($row['completed']=='0') {
					$incompleted[] = $row['dept_name'];
				}	
			}

			if (count($incompleted)>0) {
				throw new \Exception("Department berikut belum selesai budgeting:<br>". implode(', ', $incompleted));
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function createSummary($currentdata) {
		try {

			$stmt_exists = $this->db->prepare("select corpbudgetdet_id from mst_corpbudgetdet where accbudget_id = :accbudget_id ");


			$sql = "
				select 
					B.accbudget_id ,
					sum(B.deptbudgetdet_01) as deptbudgetdet_01,
					sum(B.deptbudgetdet_02) as deptbudgetdet_02,
					sum(B.deptbudgetdet_03) as deptbudgetdet_03,
					sum(B.deptbudgetdet_04) as deptbudgetdet_04,
					sum(B.deptbudgetdet_05) as deptbudgetdet_05,
					sum(B.deptbudgetdet_06) as deptbudgetdet_06,
					sum(B.deptbudgetdet_07) as deptbudgetdet_07,
					sum(B.deptbudgetdet_08) as deptbudgetdet_08,
					sum(B.deptbudgetdet_09) as deptbudgetdet_09,
					sum(B.deptbudgetdet_10) as deptbudgetdet_10,
					sum(B.deptbudgetdet_11) as deptbudgetdet_11,
					sum(B.deptbudgetdet_12) as deptbudgetdet_12,
					sum(B.deptbudgetdet_01+B.deptbudgetdet_02+B.deptbudgetdet_03+B.deptbudgetdet_04+B.deptbudgetdet_05+B.deptbudgetdet_06+B.deptbudgetdet_07+B.deptbudgetdet_08+B.deptbudgetdet_09+B.deptbudgetdet_10+B.deptbudgetdet_11+B.deptbudgetdet_12) as deptbudgetdet_total
				from 
					mst_deptbudget A inner join mst_deptbudgetdet B on B.deptbudget_id = A.deptbudget_id
				WHERE
					A.deptbudget_year = :year
				group by
					B.accbudget_id			
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':year' => $currentdata->header->corpbudget_year
			]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			foreach ($rows as $row) {
				$obj = (object)[
					'corpbudgetdet_01' => $row['deptbudgetdet_01'],
					'corpbudgetdet_02' => $row['deptbudgetdet_02'],
					'corpbudgetdet_03' => $row['deptbudgetdet_03'],
					'corpbudgetdet_04' => $row['deptbudgetdet_04'],
					'corpbudgetdet_05' => $row['deptbudgetdet_05'],
					'corpbudgetdet_06' => $row['deptbudgetdet_06'],
					'corpbudgetdet_07' => $row['deptbudgetdet_07'],
					'corpbudgetdet_08' => $row['deptbudgetdet_08'],
					'corpbudgetdet_09' => $row['deptbudgetdet_09'],
					'corpbudgetdet_10' => $row['deptbudgetdet_10'],
					'corpbudgetdet_11' => $row['deptbudgetdet_11'],
					'corpbudgetdet_12' => $row['deptbudgetdet_12'],
					'corpbudgetdet_total' => $row['deptbudgetdet_total']
				];

				$stmt_exists->execute([':accbudget_id' => $row['accbudget_id']]);
				$exist = $stmt_exists->fetch(\PDO::FETCH_ASSOC);
				if (!$exist) {
					// insert
					$obj->corpbudgetdet_id = uniqid();
					$obj->accbudget_id = $row['accbudget_id'];
					$obj->corpbudget_id = $currentdata->header->corpbudget_id;
					$obj->_createby = $currentdata->user->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert('mst_corpbudgetdet', $obj);
					$stmt = $this->db->prepare($cmd->sql);	
					$stmt->execute($cmd->params);
				} else {
					// update
					$keys = (object)[
						'corpbudgetdet_id' => $exist['corpbudgetdet_id'],
						'corpbudget_id' => $currentdata->header->corpbudget_id
					];

					$obj->corpbudgetdet_id = $exist['corpbudgetdet_id'];
					$obj->corpbudget_id = $currentdata->header->corpbudget_id;
					$obj->_modifyby = $currentdata->header->username;
					$obj->_modifydate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate('mst_corpbudgetdet', $obj, $keys);


					debug::log($cmd->sql);

					$stmt = $this->db->prepare($cmd->sql);	
					$stmt->execute($cmd->params);
					
				}
			}
			
		} catch (\Exception $ex) {
			throw $ex;
		}			
	}
};


