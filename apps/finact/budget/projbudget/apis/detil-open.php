<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;



/**
 * finact/budget/projbudget/apis/detil-open.php
 *
 * ==========
 * Detil-Open
 * ==========
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel detil} projbudget (mst_projbudget)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/06/2021
 */
$API = new class extends projbudgetBase {

	public function execute($options) {
		$tablename = 'mst_projbudgetdet';
		$primarykey = 'projbudgetdet_id';
		$userdata = $this->auth->session_get_user();
		
		try {
			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"projbudgetdet_id" => " projbudgetdet_id = :projbudgetdet_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('mst_projbudgetdet A', [
				  'projbudgetdet_id', 'accbudget_id', 'alloc_dept_id', 'projbudgetdet_descr'
				, 'projbudgetdet_qty', 'projbudgetdet_days', 'projbudgetdet_task', 'projbudgetdet_rate'
				, 'projbudgetdet_valueprop', 'projbudgetdet_value', 'projbudget_id'
				, '_createby', '_createdate', '_modifyby', '_modifydate' 
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			/* Ambil data budget departemen yang available */
			$projbudgetdet_row =  \FGTA4\utils\SqlUtility::LookupRow($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id');
			$year = $projbudgetdet_row['projbudget_year'];
			$month = $projbudgetdet_row['projbudget_month'];
			$dept_id = $projbudgetdet_row['dept_id'];
			$projbudget_id = $projbudgetdet_row['projbudget_id'];
			$stmt = $this->db->prepare("call deptbudget_get_available (:dept_id, :year, :month, '', :projbudget_id_exclude)");
			$stmt->execute([
				':dept_id' => $dept_id,
				':year' => $year,
				':month' => $month,
				':projbudget_id_exclude' => $projbudget_id 
			]);			


			$result->record = array_merge($record, [
				'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
				'alloc_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['alloc_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'accbudget_available' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'TEMP_DEPTBUDGET_AVAILABLE', 'accbudget_id', 'deptbudget_available'),
				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};