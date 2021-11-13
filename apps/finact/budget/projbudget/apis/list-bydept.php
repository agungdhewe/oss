<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends projbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'dept_id', '');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'isapproved', '1');
			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'isclose', '0');

			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.projbudget_id LIKE CONCAT('%', :search, '%') OR A.projbudget_name LIKE CONCAT('%', :search, '%') ",
					"dept_id" => " B.dept_id = :dept_id ",
					"project_id" => " A.project_id = :project_id ",
					"isapproved" => " A.projbudget_isapproved = :isapproved ",
					"isclose" => " A.projbudget_isclose = :isclose"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_projbudget A inner join view_projectdept B on B.project_id = A.project_id" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.projbudget_id, A.dept_id, A.project_id, A.projbudget_name, A.projbudget_descr, A.projbudget_year, A.projbudget_month
				, A.doc_id, A.projbudget_notes, A.projbudget_version, A.projbudget_iscommit, A.projbudget_commitby, A.projbudget_commitdate
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_projbudget A inner join view_projectdept B on B.project_id = A.project_id
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
					'month_name' => \FGTA4\utils\SqlUtility::getMonthName($record['projbudget_month']), 
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),

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