<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/fin/billout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header billout (trn_billout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 19/04/2021
 */
$API = new class extends colltargetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$options->criteria->exclude = 1;
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billout_id LIKE CONCAT('%', :search, '%') OR A.billout_descr LIKE CONCAT('%', :search, '%') ",
					"col_empl_id" => " B.col_empl_id = :col_empl_id and C.billout_id is null ",
					"partner_id" => " B.partner_id = :partner_id ",
					"exclude" => "  A.billout_id not IN (select Y.billout_id from trn_colltarget X inner join trn_colltargetbillout Y on Y.colltarget_id = X.colltarget_id where X.periodemo_id = :periodemo_id and Y.billout_id is not null) ",
					"periodemo_id" => "--"
					// "colltargetbillout_id" => " C.colltargetbillout_id <> :colltargetbillout_id  "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;


			$stmt = $this->db->prepare("
				select count(*) as n 
				from (trn_billout A inner join mst_partner B on B.partner_id = A.partner_id) left join trn_colltargetbillout C on C.billout_id = A.billout_id 
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$sql = "
				select 
				  A.billout_id, A.dept_id, A.salesorder_id, A.billout_descr, A.billout_date, A.billout_datedue, A.partner_id, A.coa_id, A.curr_id, A.billout_valfrg, A.billout_valfrgrate, A.billout_validr
				, A.billtype_id, A.trxmodel_id, A.doc_id, A.billout_version, A.billout_iscommit, A.billout_commitby, A.billout_commitdate, A.billout_ispost, A.billout_postby, A.billout_postdate
				, A._createby, A._createdate, A._modifyby, A._modifydate
				, datediff(NOW(), A.billout_datedue) as billout_age 
				from (trn_billout A inner join mst_partner B on B.partner_id = A.partner_id) left join trn_colltargetbillout C on C.billout_id = A.billout_id 
			" 
			. $where->sql 
			. " order by A.billout_datedue, A.partner_id  "
			. $limit;


			$this->log($sql);
			$this->log($where->params);

			$stmt = $this->db->prepare($sql);
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
					'dt_datedue' => date("d/m/y", strtotime($record['billout_datedue'])),
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'salesorder_descr' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_id'], $this->db, 'trn_salesorder', 'salesorder_id', 'salesorder_descr'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'cost_coa_id_name' => \FGTA4\utils\SqlUtility::Lookup($record['coa_id'], $this->db, 'mst_coa', 'coa_id', 'coa_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'billout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'billout_postby' => \FGTA4\utils\SqlUtility::Lookup($record['billout_postby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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