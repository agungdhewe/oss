<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/budget/deptbudgetrev/apis/detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil deptbudgetrev (mst_deptbudgetrev)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetrevBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			/* Ambil data budget departemen yang available */
			// $year = $options->criteria->deptbudget_year;
			// $month = $options->criteria->deptbudget_month;
			// $dept_id = $options->criteria->dept_id;
			// $stmt = $this->db->prepare("call deptbudget_get_available (:dept_id, :year, :month, '', '')");
			// $stmt->execute([
			// 	':dept_id' => $dept_id,
			// 	':year' => $year,
			// 	':month' => $month
			// ]);


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.deptbudgetrev_id = :id",
					'deptbudget_year' => null,
					'deptbudget_month' => null,
					'dept_id' => null					
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_deptbudgetrevdet A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;
			// ,  coalesce((select deptbudget_available from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id), 0) as deptbudget_available
			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				   deptbudgetrevdet_id, accbudget_id, deptbudgetrevdet_descr, deptbudgetrevdet_prev, deptbudgetrevdet_available, deptbudgetrevdet_value, deptbudgetrevdet_variance, deptbudgetrevdet_notes, deptbudgetrev_id
				, _createby, _createdate, _modifyby, _modifydate 
				from mst_deptbudgetrevdet A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'

					'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					 
				]));
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