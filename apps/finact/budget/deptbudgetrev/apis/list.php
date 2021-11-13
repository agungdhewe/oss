<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/deptbudgetrev/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header deptbudgetrev (mst_deptbudgetrev)
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
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.deptbudgetrev_id LIKE CONCAT('%', :search, '%') OR A.deptbudgetrev_year LIKE CONCAT('%', :search, '%') ",
					"dept_id" => " A.dept_id = :dept_id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_deptbudgetrev A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					deptbudgetrev_id, deptbudgetrev_year, deptbudgetrev_month, deptbudgetrev_descr, deptbudgetrev_notes, deptbudgetrev_version, dept_id, doc_id, deptbudgetrev_iscommit, deptbudgetrev_commitby, deptbudgetrev_commitdate, deptbudgetrev_isapprovalprogress, deptbudgetrev_isapproved, deptbudgetrev_approveby, deptbudgetrev_approvedate, deptbudgetrev_isdeclined, deptbudgetrev_declineby, deptbudgetrev_declinedate, deptbudgetrev_isveryfied, deptbudgetrev_verifyby, deptbudgetrev_verifydate, _createby, _createdate, _modifyby, _modifydate 
					from mst_deptbudgetrev A
				" 
				. $where->sql 
				. " order by deptbudgetrev_year desc, deptbudgetrev_month desc"
				. $limit
			);
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
					'month_name' => \FGTA4\utils\SqlUtility::getMonthName($record['deptbudgetrev_month']), 
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'deptbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudgetrev_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudgetrev_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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