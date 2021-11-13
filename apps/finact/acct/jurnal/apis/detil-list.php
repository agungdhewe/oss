<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/acct/jurnal/apis\detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil jurnal (trn_jurnal)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2021
 */
$API = new class extends jurnalBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.jurnal_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_jurnaldetil A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.jurnaldetil_id, A.jurnaldetil_descr, A.coa_id, A.dept_id, A.partner_id, A.curr_id, A.jurnaldetil_valfrg, A.jurnaldetil_valfrgrate, A.jurnaldetil_validr, A.jurnaldetil_outstanding_frg, A.jurnaldetil_outstanding_idr, A.jurnaldetil_id_ref, A.jurnaldetil_dk, A.jurnal_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_jurnaldetil A
			" . $where->sql . ' order by A.jurnaldetil_validr desc  ' . $limit);
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

					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					 
				]));
			}

			// TOTAL SUMMARY
			$stmt = $this->db->prepare("
					select 
					sum(case when A.jurnaldetil_validr > 0 then A.jurnaldetil_validr else 0 end) as debet,
					sum(case when A.jurnaldetil_validr < 0 then A.jurnaldetil_validr else 0 end) as kredit
					from trn_jurnaldetil A
				" 
				. $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$jurnal_variance = $row['debet'] + $row['kredit'];
			$jurnal_total = (abs($row['debet']) > abs($row['kredit'])) ? $row['debet'] : $row['kredit'];

			$summary = (object)[
				'jurnal_total' => abs($jurnal_total),
				'jurnal_variance' => $jurnal_variance
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