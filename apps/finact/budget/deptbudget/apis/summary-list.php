<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/budget/deptbudget/apis/summary-list.php
 *
 * ================
 * Summary-DataList
 * ================
 * Menampilkan summary budget departemen
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 10 Juni 2021
 *
 */
$API = new class extends deptbudgetBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'deptbudget_id', '');

			$deptbudget_id = $options->criteria->deptbudget_id;

			$result = new \stdClass; 
			$stmt = $this->db->prepare("call deptbudget_get_summary(:deptbudget_id);");
			$stmt->execute([':deptbudget_id' => $deptbudget_id]);


			$stmt = $this->db->prepare("
				select * from TEMP_RESULT order by mo;
			");
			$stmt->execute();

			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			$total = count($rows);
			$maxrow = $total;
			$offset = 0;


			$months = [1=>'JAN','FEB','MAR','APR','MEI','JUN','JUL','AGS','SEP','OKT','NOV','DES'];
			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				array_push($records, array_merge($record, [
					'month_name' => $months[$record['mo']]
				]));
			}

			
			$deptbudgetinfo = \FGTA4\utils\SqlUtility::LookupRow($deptbudget_id, $this->db, 'mst_deptbudget', 'deptbudget_id');	
			$dept_id = $deptbudgetinfo['dept_id'];
			$year = $deptbudgetinfo['deptbudget_year'];

			$stmt = $this->db->prepare("select count(*) as n from mst_projbudget where dept_id=:dept_id and projbudget_year=:year");
			$stmt->execute([':dept_id'=>$dept_id, ':year'=>$year]);
			$row = $stmt->fetch(\PDO::FETCH_ASSOC);	
			if ($row['n']>0) {
				$result->allowdecline = false;
			} else {
				$result->allowdecline = true;
			}


			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};