<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';

if (is_file(__DIR__ .'/data-header-handler.php')) {
	require_once __DIR__ .'/data-header-handler.php';
}



use \FGTA4\exceptions\WebException;

/**
 * finact/procurement/inquirytype/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header inquirytype (mst_inquirytype)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/12/2021
 */
$API = new class extends inquirytypeBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\inquirytype_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new inquirytype_headerHandler($data, $options);
			$hnd->caller = $this;
			$hnd->db = $this->db;
			$hnd->auth = $this->auth;
			$hnd->reqinfo = $reqinfo->reqinfo;
		} else {
			$hnd = new \stdClass;
		}


		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.inquirytype_id LIKE CONCAT('%', :search, '%') OR A.inquirytype_name LIKE CONCAT('%', :search, '%') "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_inquirytype A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.inquirytype_id, A.inquirymodel_id, A.inquirytype_name, A.inquirytype_isdisabled, A.inquirytype_descr, A.inquiryselect_id, A.inquirytype_isperempl, A.itemmanage_id, A.inquirytype_isallowadvance, A.inquirytype_isemplaspartner, A.inquirytype_maxadvancevalue, A.related_dept_id, A.related_team_id, A.owner_dept_id, A.owner_team_id, A.site_id, A.room_id, A.orderout_dept_id, A.orderout_team_id, A.trxmodel_id, A.inquiry_title_ina, A.inquiry_title_eng, A.inquiry_doc_id, A.request_title_ina, A.request_title_eng, A.request_doc_id, A.orderout_title_ina, A.orderout_title_eng, A.orderout_doc_id, A.inquirytype_isuseqty, A.inquirytype_isusedays, A.inquirytype_isusetask, A.inquirytype_islimitqty, A.inquirytype_islimitdays, A.inquirytype_islimittask, A.inquirytype_islimitvalue, A.inquirytype_isallowoverbudget, A.inquirytype_isallowunbudget, A.inquirytype_isdeptuser, A.inquirytype_isdeptowner, A.inquirytype_isdeptmaintainer, A.inquirytype_isqtybreakdown, A.inquirytype_istoberequest, A.inquirytype_isautorequest, A.inquirytype_isautoorder, A.inquirytype_ismovinginit, A.inquirytype_isdateinterval, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_inquirytype A
			" . $where->sql . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$beforeloopdata = new \stdClass;
			if (is_object($hnd)) {
				if (method_exists(get_class($hnd), 'DataListBeforeLoop')) {
					$beforeloopdata = $hnd->DataListBeforeLoop((object[]));
				}
			}

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if (is_object($hnd)) {
					if (method_exists(get_class($hnd), 'DataListLooping')) {
						$hnd->DataListLooping($record, $beforeloopdata);
					}
				}

				array_push($records, array_merge($record, [
					// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
					//'tanggal' => date("d/m/y", strtotime($record['tanggal'])),
				 	//'tambahan' => 'dta'
					'inquirymodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquirymodel_id'], $this->db, 'mst_inquirymodel', 'inquirymodel_id', 'inquirymodel_name'),
					'inquiryselect_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiryselect_id'], $this->db, 'mst_inquiryselect', 'inquiryselect_id', 'inquiryselect_name'),
					'itemmanage_name' => \FGTA4\utils\SqlUtility::Lookup($record['itemmanage_id'], $this->db, 'mst_itemmanage', 'itemmanage_id', 'itemmanage_name'),
					'related_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'related_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['related_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'owner_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['owner_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'site_name' => \FGTA4\utils\SqlUtility::Lookup($record['site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
					'room_name' => \FGTA4\utils\SqlUtility::Lookup($record['room_id'], $this->db, 'mst_room', 'room_id', 'room_name'),
					'orderout_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'owner_team_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_team_id'], $this->db, 'mst_team', 'team_id', 'team_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'inquiry_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'request_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['request_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'orderout_doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['orderout_doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					 
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