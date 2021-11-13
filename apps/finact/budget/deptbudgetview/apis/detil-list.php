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

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'id', '');


			$deptbudget_id = $options->criteria->id;
			$deptbudget = \FGTA4\utils\SqlUtility::LookupRow($deptbudget_id, $this->db, 'mst_deptbudget', 'deptbudget_id');	


			/* Ambil data budget departemen yang available */
			$year = $deptbudget['deptbudget_year'];
			$dept_id = $deptbudget['dept_id'];
			$stmt = $this->db->prepare("call deptbudget_get_available_year (:dept_id, :year, '')");
			$stmt->execute([
				':dept_id' => $dept_id,
				':year' => $year
			]);

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
				  deptbudgetdet_id, deptbudgetdet_descr
				, deptbudgetdet_total, deptbudgetdet_total_prop
				, -(select deptbudget_allocated from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id  ) as deptbudgetdet_allocated
				, (select deptbudget_available from TEMP_DEPTBUDGET_AVAILABLE where accbudget_id = A.accbudget_id  ) as deptbudgetdet_available
				, accbudget_id, deptbudgetdet_notes, deptbudget_id
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