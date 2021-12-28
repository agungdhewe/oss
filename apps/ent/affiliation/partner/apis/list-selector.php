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
 * ent/affiliation/partner/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header partner (mst_partner)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 28/12/2021
 */
$API = new class extends partnerBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		$handlerclassname = "\\FGTA4\\apis\\partner_headerHandler";
		if (class_exists($handlerclassname)) {
			$hnd = new partner_headerHandler($data, $options);
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

			\FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, 'partnertype_id', 'ALL');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.partner_id LIKE CONCAT('%', :search, '%') OR A.partner_name LIKE CONCAT('%', :search, '%') ",
					"partnertype_id" => null
				]
			);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;


			$partnertype_id = $options->criteria->partnertype_id;
			if ($partnertype_id=='ALL') {

				$stmt = $this->db->prepare("select count(*) as n from mst_partner A" . $where->sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
				$total = (float) $row['n'];
	
				$limit = " LIMIT $maxrow OFFSET $offset ";
				$stmt = $this->db->prepare("
					select 
					A.partner_id, A.partner_name, A.partner_addressline1, A.partner_addressline2, A.partner_postcode, A.partner_city, A.partner_country, A.partner_phone, A.partner_mobilephone, A.partner_email, A.partner_isdisabled, A.partner_isparent, A.partner_parent, A.partnertype_id, A.partnerorg_id, A.partner_npwp, A.partner_isnonnpwp, A.empl_id, A.ae_empl_id, A.col_empl_id, A._createby, A._createdate, A._modifyby, A._modifydate 
					from mst_partner A
				" . $where->sql . $limit);
				$stmt->execute($where->params);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
	
			} else {

				$sql = "
					DROP TABLE IF EXISTS TMP_PARTNERTYPE;
					CREATE TEMPORARY TABLE -- IF NOT EXISTS 
						TMP_PARTNERTYPE ( INDEX(partner_id) ) 
						ENGINE=MyISAM 
					AS (
						select distinct AX.partner_id 
						from (
							select A.partner_id
							from mst_partner A inner join mst_partnerastype B on B.partner_id = A.partner_id 
							WHERE 
							B.partnertype_id = '$partnertype_id'
							
							union 
							
							select partner_id
							from mst_partner 
							WHERE 
							partnertype_id = '$partnertype_id'
						) AX
					);
				";
				$this->db->query($sql);

				$stmt = $this->db->prepare("
						select count(*) as n from mst_partner A inner join TMP_PARTNERTYPE B on B.partner_id = A.partner_id
					" 
					. $where->sql
				);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
				$total = (float) $row['n'];
	
				$limit = " LIMIT $maxrow OFFSET $offset ";
				$stmt = $this->db->prepare("
						select 
						A.partner_id, A.partner_name, A.partner_addressline1, A.partner_addressline2, A.partner_postcode, A.partner_city, A.partner_country, A.partner_phone, A.partner_mobilephone, A.partner_email, A.partner_isdisabled, A.partner_isparent, A.partner_parent, A.partnertype_id, A.partnerorg_id, A.partner_npwp, A.partner_isnonnpwp, A.empl_id, A.ae_empl_id, A.col_empl_id, A._createby, A._createdate, A._modifyby, A._modifydate 
						from mst_partner A inner join TMP_PARTNERTYPE B on B.partner_id = A.partner_id
					" 
					. $where->sql 
					. $limit
				);
				$stmt->execute($where->params);
				$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);
			}





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
					'country_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_country'], $this->db, 'mst_country', 'country_id', 'country_name'),
					'partner_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_parent'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
					'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnerorg_id'], $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'col_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['col_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					 
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