<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


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
 * tanggal 18/04/2021
 */
$API = new class extends colltarprdBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$options->criteria->exclude_selected_partner = 1;
			$options->criteria->partnertype_id = 'AGENCY';
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.partner_id LIKE CONCAT('%', :search, '%') OR A.partner_name LIKE CONCAT('%', :search, '%') ",
					"col_empl_id" => " A.col_empl_id = :col_empl_id ",
					"partnertype_id" => " A.partnertype_id = :partnertype_id ",
					"exclude_selected_partner" => " B.partner_id is null ",
					"colltarprd_id" => "--"
				]
			);


			$stmt = $this->db->prepare("call colltarprd_get_aroutstanding(:periodemo_id);");
			$stmt->execute([':periodemo_id'=>'202109']);


			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_partner A left join mst_colltarprdpartnerexc B on B.partner_id=A.partner_id and B.colltarprd_id = :colltarprd_id" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.partner_id, A.partner_name, A.partner_addressline1, A.partner_addressline2, A.partner_postcode
					, A.partner_city, A.partner_country, A.partner_phone, A.partner_mobilephone, A.partner_email, A.partner_isdisabled
					, A.partner_isparent, A.partner_parent, A.partnertype_id, A.partnerorg_id, A.partner_npwp, A.partner_isnonnpwp
					, A.empl_id, A.ae_empl_id, A.col_empl_id, A._createby,A. _createdate, A._modifyby, A._modifydate 
					from mst_partner A  left join mst_colltarprdpartnerexc B on B.partner_id=A.partner_id and B.colltarprd_id = :colltarprd_id
				" 
				. $where->sql 
				. $limit
			);


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

					'colltarprddetil_valpartnerost' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'TEMP_AR_AGENCY_RESULT', 'partner_id', 'colltarprddetil_valpartnerost'),

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