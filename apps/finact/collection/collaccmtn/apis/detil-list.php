<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/collection/collaccmtn/apis/detil-list.php
 *
 * ==============
 * Detil-DataList
 * ==============
 * Menampilkan data-data pada tabel detil collaccmtn (trn_collaccmtn)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/10/2021
 */
$API = new class extends collaccmtnBase {

	public function execute($options) {
		$userdata = $this->auth->session_get_user();
		
		try {

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"id" => " A.collaccmtn_id = :id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_collaccmtndet A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];


			// agar semua baris muncul
			// $maxrow = $total;

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.collaccmtndet_id, A.billout_id, A.billout_datedue, A.billout_daystotarget, A.billout_idr, A.billout_ppn, A.billout_ppnval, A.billout_pph, A.billout_pphval, A.billout_idrnett, A.billout_discval, A.billout_idrtotal, A.billout_idrtopay, A.billout_ppntopay, A.collaccmtndet_notes, A.collaccmtn_id, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_collaccmtndet A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);


			$total_discval = 0;
			$total_idrtopay = 0;
			$total_ppntopay = 0;
			$total_payment = 0;
			$total_pph = 0;
			$total_ppn = 0;
			$total_nett = 0;

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}


				$total_pph += (float)$record['billout_pphval'];
				$total_ppn += (float)$record['billout_ppnval'];
				$total_nett += (float)$record['billout_idrnett'];

				$total_discval += (float)$record['billout_discval'];
				$total_idrtopay += (float)$record['billout_idrtopay'];
				$total_ppntopay += (float)$record['billout_ppntopay'];
				$total_payment +=  (float)$record['billout_idrtopay'] + (float)$record['billout_ppntopay'];


				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'billout_totalpayment' => (float)$record['billout_idrtopay'] + (float)$record['billout_ppntopay'],
					'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
					 
				]));
			}

			// kembalikan hasilnya
			$result->total = $total;
			$result->offset = $offset + $maxrow;
			$result->maxrow = $maxrow;
			$result->records = $records;
			$result->summary = (object)[
				'total_pph' => $total_pph,
				'total_ppn' => $total_ppn,
				'total_nett' => $total_nett,
				'total_discval' => $total_discval,
				'total_idrtopay' => $total_idrtopay,
				'total_ppntopay' => $total_ppntopay,
				'total_payment' => $total_payment
			];
			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};