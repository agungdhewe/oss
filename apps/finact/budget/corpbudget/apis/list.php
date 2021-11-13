<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/corpbudget/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header corpbudget (mst_corpbudget)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/04/2021
 */
$API = new class extends corpbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.corpbudget_id LIKE CONCAT('%', :search, '%') OR A.corpbudget_year LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_corpbudget A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  corpbudget_id, corpbudget_year, corpbudget_iscommit, corpbudget_commitby, corpbudget_commitdate
				, corpbudget_isapprovalprogress, corpbudget_isapproved, corpbudget_approveby, corpbudget_approvedate
				, corpbudget_isdeclined, corpbudget_declineby, corpbudget_declinedate, corpbudget_notes
				, corpbudget_version, dept_id, doc_id, _createby, _createdate, _modifyby, _modifydate
				, (
					select 
					  COALESCE (sum(corpbudgetdet_01), 0)
					+ COALESCE (sum(corpbudgetdet_02), 0)
					+ COALESCE (sum(corpbudgetdet_03), 0)
					+ COALESCE (sum(corpbudgetdet_04), 0)
					+ COALESCE (sum(corpbudgetdet_05), 0)
					+ COALESCE (sum(corpbudgetdet_06), 0)
					+ COALESCE (sum(corpbudgetdet_07), 0)
					+ COALESCE (sum(corpbudgetdet_08), 0)
					+ COALESCE (sum(corpbudgetdet_09), 0)
					+ COALESCE (sum(corpbudgetdet_10), 0)
					+ COALESCE (sum(corpbudgetdet_11), 0)
					+ COALESCE (sum(corpbudgetdet_12), 0)
					from mst_corpbudgetdet where corpbudget_id = A.corpbudget_id
				) as corpbudget_total

				from mst_corpbudget A
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
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					 
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