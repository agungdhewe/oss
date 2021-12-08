<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/projbudgetrev/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header projbudgetrev (mst_projbudgetrev)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 13/06/2021
 */
$API = new class extends projbudgetrevBase {

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
					"search" => " A.projbudgetrev_id LIKE CONCAT('%', :search, '%') OR A.projbudget_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_projbudgetrev A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				projbudgetrev_id, dept_id, projbudget_id, projbudgetrev_descr, project_id, projbudget_year, projbudget_month, doc_id, projbudgetrev_notes, projbudgetrev_version, projbudgetrev_iscommit, projbudgetrev_commitby, projbudgetrev_commitdate, projbudgetrev_isapprovalprogress, projbudgetrev_isapproved, projbudgetrev_approveby, projbudgetrev_approvedate, projbudgetrev_isdeclined, projbudgetrev_declineby, projbudgetrev_declinedate, projbudgetrev_isclose, projbudgetrev_closeby, projbudgetrev_closedate, _createby, _createdate, _modifyby, _modifydate 
				from mst_projbudgetrev A
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
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
				'projbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'projbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'projbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'projbudgetrev_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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