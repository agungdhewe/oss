<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/procurement/orderout/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header orderout (trn_orderout)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends recvBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'orderout_isoutstanding', '1');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.orderout_id LIKE CONCAT('%', :search, '%') OR A.orderout_descr LIKE CONCAT('%', :search, '%') ",
					"orderout_isoutstanding" => " A.orderout_isapproved=1 AND A.orderout_isclose=0 "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_orderout A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.orderout_id, A.unit_id, A.orderout_quot, A.orderout_isunref, A.request_id, A.inquiry_id, A.orderout_ismultirequest, A.inquirytype_id
				, A.user_dept_id, A.orderout_descr, A.trxmodel_id, A.orderout_dtstart, A.orderout_dtend, A.project_id, A.projecttask_id, A.projbudget_id
				, A.projbudgettask_id, A.orderout_isunbudgetted, A.partner_id, A.ordercontract_id, A.partnerbank_id, A.partnerbank_name
				, A.partnerbank_bankacc, A.partnerbank_bankaccname, A.partnerbank_bankname, A.partnercontact_id, A.partnercontact_upname
				, A.partnercontact_position, A.partnercontact_upphone, A.partnercontact_email, A.curr_id, A.curr_rate, A.ppn_taxtype_id
				, A.pph_taxtype_id, A.site_id, A.recv_dept_id, A.deliver_siteaddress, A.deliver_city, A.deliver_upname, A.deliver_uptelp
				, A.inquirymodel_id, A.inquiryselect_id, A.itemmanage_id, A.owner_dept_id, A.request_dept_id, A.orderout_dept_id, A.doc_id
				, A.orderout_version, A.orderout_isdateinterval, A.orderout_iscommit, A.orderout_commitby, A.orderout_commitdate
				, A.orderout_isapprovalprogress, A.orderout_isapproved, A.orderout_approveby, A.orderout_approvedate, A.orderout_isdeclined
				, A.orderout_declineby, A.orderout_declinedate, A.orderout_isclose, A.orderout_closeby, A.orderout_closedate, A.orderout_isadvance
				, A.orderout_isautogenerated, A.orderout_isitemdeptuser, A.orderout_isitemdeptowner
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from trn_orderout A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				$record['curr_rate'] = $this->getCurrentRate($record['curr_id']);
				$ppn = \FGTA4\utils\SqlUtility::LookupRow($record['ppn_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id');			
				$record['ppn_value'] = (float)$ppn['taxtype_value'];
				$record['ppn_isinclude'] = (int)$ppn['taxtype_include'];

				$pph = \FGTA4\utils\SqlUtility::LookupRow($record['pph_taxtype_id'], $this->db, 'mst_taxtype', 'taxtype_id');
				$record['pph_value'] = (float)$pph['taxtype_value'];
				$record['pph_isinclude'] = (int)$pph['taxtype_include'];

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'unit_name' => \FGTA4\utils\SqlUtility::Lookup($record['unit_id'], $this->db, 'mst_unit', 'unit_id', 'unit_name'),
					'request_descr' => \FGTA4\utils\SqlUtility::Lookup($record['request_id'], $this->db, 'trn_request', 'request_id', 'request_descr'),
					'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
					'inquirytype_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirytype_id'], $this->db, 'mst_inquirytype', 'inquirytype_id', 'inquirytype_name'),
					'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'view_projbudgettask', 'projbudgettask_id', 'projbudgettask_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'ordercontract_descr' => \FGTA4\utils\SqlUtility::Lookup($record['ordercontract_id'], $this->db, 'trn_ordercontract', 'ordercontract_id', 'ordercontract_descr'),
					'partnerbank_accnum' => \FGTA4\utils\SqlUtility::Lookup($record['partnerbank_id'], $this->db, 'mst_partnerbank', 'partnerbank_id', 'partnerbank_accnum'),
					'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'recv_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['recv_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'orderout_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'orderout_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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



	function getCurrentRate($curr_id) {
		if ($curr_id==__LOCAL_CURR) {
			return 1;
		}

		$stmt = $this->db->prepare("
			select currrate_value 
			from mst_currrate 
			where curr_id=:curr_id
			order by currrate_date desc
			limit 1
		");
		$stmt->execute([
			':curr_id' => $curr_id
		]);
		$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
		if (count($rows)) {
			return $rows[0]['currrate_value'];
		} else {
			return 1;
		}

	}

};