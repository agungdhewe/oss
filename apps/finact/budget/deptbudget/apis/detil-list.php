<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/budget/deptbudget/apis/detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil deptbudget (mst_deptbudget)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.deptbudget_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_deptbudgetdet A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				deptbudgetdet_id, deptbudgetdet_descr, deptbudgetdet_01, deptbudgetdet_02, deptbudgetdet_03, deptbudgetdet_04, deptbudgetdet_05, deptbudgetdet_06, deptbudgetdet_07, deptbudgetdet_08, deptbudgetdet_09, deptbudgetdet_10, deptbudgetdet_11, deptbudgetdet_12, deptbudgetdet_total, accbudget_id, deptbudgetdet_notes, deptbudget_id, _createby, _createdate, _modifyby, _modifydate 
				from mst_deptbudgetdet A
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



			// TOTAL SUMMARY
			$stmt = $this->db->prepare("
					select 
					sum(A.deptbudgetdet_total) as deptbudgetdet_total 
					from mst_deptbudgetdet A
				" 
				. $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);		
			$summary = (object)[
				'deptbudgetdet_total' => $row['deptbudgetdet_total']
			];

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			$result->summary = $summary;
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};