<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/acct/coaformatset/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header coaformatset (mst_coaformatset)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/11/2021
 */
$API = new class extends coaformatsetBase {

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
					"search" => " A.coaformatset_id LIKE CONCAT('%', :search, '%') OR A.coaformatset_name LIKE CONCAT('%', :search, '%') ",
					"coaformat_id" => " A.coaformat_id = :coaformat_id "

				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_coaformatset A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.coaformatset_id, A.coaformatset_order, A.coaformatset_name, 
				A.coaformatset_indent,
				A.coaformatset_isbold,
				A.coaformatset_isitalic,
				A.coaformatset_isunderline,
				A.coaformatset_isblankline,
				A.coaformatset_descr, A.coaformatset_isparent, A.coaformatset_parent, A.coaformatset_path, A.coaformatset_pathid, A.coaformatset_level, A.coaformat_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_coaformatset A
			" 
			. $where->sql 
			. " order by A.coaformatset_order " 
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
					'coaformatset_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['coaformatset_parent'], $this->db, 'mst_coaformatset', 'coaformatset_id', 'coaformatset_name'),
					'coaformat_name' => \FGTA4\utils\SqlUtility::Lookup($record['coaformat_id'], $this->db, 'mst_coaformat', 'coaformat_id', 'coaformat_name'),
					 
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