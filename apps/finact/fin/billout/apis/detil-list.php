<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-detil-handler.php')) {
	require_once __DIR__ .'/data-detil-handler.php';
}

use \FGTA4\exceptions\WebException;


/**
 * finact/fin/billout/apis/detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil billout (trn_billout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/12/2021
 */
$API = new class extends billoutBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		$handlerclassname = "\\FGTA4\\apis\\billout_detilHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new billout_detilHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.billout_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_billoutdetil A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.billoutdetil_id, A.billoutrowtype_id, A.orderindelv_id, A.itemclass_id, A.billoutdetil_descr, A.billoutdetil_totalitem, A.billoutdetil_totalqty, A.billoutdetil_salesgross, A.billoutdetil_discount, A.billoutdetil_subtotal, A.billoutdetil_pph, A.billoutdetil_nett, A.billoutdetil_ppn, A.billoutdetil_total, A.billoutdetil_totaladdcost, A.billoutdetil_dp, A.billoutdetil_payment, A.accbudget_id, A.coa_id, A.billout_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_billoutdetil A
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

					'billoutrowtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billoutrowtype_id'], $this->db, 'mst_billoutrowtype', 'billoutrowtype_id', 'billoutrowtype_name'),
					'orderindelv_descr' => \FGTA4\utils\SqlUtility::Lookup($record['orderindelv_id'], $this->db, 'trn_orderindelv', 'orderindelv_id', 'orderindelv_descr'),
					'itemclass_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemclass_id'], $this->db, 'mst_itemclass', 'itemclass_id', 'itemclass_name'),
					'accbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['accbudget_id'], $this->db, 'mst_accbudget', 'accbudget_id', 'accbudget_name'),
					'coa_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					 
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