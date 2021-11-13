<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/items/itemclass/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header itemclass (mst_itemclass)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 27/10/2021
 */
$API = new class extends itemclassBase {

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
					"search" => " A.itemclass_id LIKE CONCAT('%', :search, '%') OR A.itemclass_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_itemclass A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.itemclass_id, A.itemclass_name, A.itemclass_isdisabled, A.itemclass_isadvproces, A.itemclass_descr, A.itemmodel_id, A.itemclassgroup_id, A.owner_dept_id, A.maintainer_dept_id, A.unitmeasurement_id, A.itemmanage_id, A.itemclass_minassetvalue, A.inquiry_accbudget_id, A.settl_coa_id, A.cost_coa_id, A.depremodel_id, A.itemclass_depreage, A.itemclass_depreresidu, A.itemclass_isallowoverqty, A.itemclass_isallowoverdays, A.itemclass_isallowovertask, A.itemclass_isallowovervalue, A.itemclass_isallowunbudget, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_itemclass A
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
					'itemmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmodel_id'], $this->db, 'mst_itemmodel', 'itemmodel_id', 'itemmodel_name'),
					'itemclassgroup_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclassgroup_id'], $this->db, 'mst_itemclassgroup', 'itemclassgroup_id', 'itemclassgroup_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'maintainer_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['maintainer_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'unitmeasurement_name' => \FGTA4\utils\SqlUtility::Lookup($record['unitmeasurement_id'], $this->db, 'mst_unitmeasurement', 'unitmeasurement_id', 'unitmeasurement_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'inquiry_accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					'settl_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['settl_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'cost_coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['cost_coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'depremodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['depremodel_id'], $this->db, 'mst_depremodel', 'depremodel_id', 'depremodel_name'),
					 
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