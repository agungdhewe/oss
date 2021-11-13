<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/accbudgetformatset/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header accbudgetformatset (mst_accbudgetformatset)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/09/2021
 */
$API = new class extends accbudgetformatsetBase {

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
					"search" => " A.accbudgetformatset_id LIKE CONCAT('%', :search, '%') OR A.accbudgetformatset_name LIKE CONCAT('%', :search, '%') ",
					"accbudgetformat_id" => " A.accbudgetformat_id = :accbudgetformat_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_accbudgetformatset A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				accbudgetformatset_id, accbudgetformatset_order, accbudgetformatset_name, accbudgetformatset_descr, accbudgetformatset_isbold, accbudgetformatset_isitalic, accbudgetformatset_isunderline, accbudgetformatset_isparent, accbudgetformatset_parent, accbudgetformatset_path, accbudgetformatset_pathid, accbudgetformatset_level, accbudgetformat_id, _createby, _createdate, _modifyby, _modifydate 
				from mst_accbudgetformatset A
			" 
			. $where->sql 
			. " order by accbudgetformatset_order "
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
				 	//'tambahan' => 'dta'
					'accbudgetformatset_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetformatset_parent'], $this->db, 'mst_accbudgetformatset', 'accbudgetformatset_id', 'accbudgetformatset_name'),
					'accbudgetformat_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudgetformat_id'], $this->db, 'mst_accbudgetformat', 'accbudgetformat_id', 'accbudgetformat_name'),
					 
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