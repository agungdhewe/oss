<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * /ent/organisation/dept/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header dept (mst_dept)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 03/12/2021
 */
$API = new class extends deptBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.dept_id LIKE CONCAT('%', :search, '%') OR A.dept_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_dept A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.dept_id, A.dept_name, A.dept_descr, A.dept_isparent, A.dept_isdisabled, A.dept_isbudgetmandatory, A.dept_issingleprojectbudget, A.dept_path, A.dept_level, A.deptgroup_id, A.dept_parent, A.depttype_id, A.deptmodel_id, A.auth_id, A.project_id
				, (select dept_path from mst_dept where dept_id=A.dept_parent) deptparent_path
				, COALESCE((select dept_level from mst_dept where dept_id=A.dept_parent),0) deptparent_level
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_dept A
			" 
			. $where->sql 
			. " ORDER BY dept_path, deptparent_path, dept_name "
			. $limit);
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
				 	//'tambahan' => 'dta',
					'deptgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['deptgroup_id'], $this->db, 'mst_deptgroup', 'deptgroup_id', 'deptgroup_name'),
					'dept_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_parent'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'depttype_name' => \FGTA4\utils\SqlUtility::Lookup($record['depttype_id'], $this->db, 'mst_depttype', 'depttype_id', 'depttype_name'),
					'deptmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['deptmodel_id'], $this->db, 'mst_deptmodel', 'deptmodel_id', 'deptmodel_name'),
					'auth_name' => \FGTA4\utils\SqlUtility::Lookup($record['auth_id'], $this->db, 'mst_auth', 'auth_id', 'auth_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					 
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