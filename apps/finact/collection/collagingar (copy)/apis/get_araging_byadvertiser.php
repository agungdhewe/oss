<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

$API = new class extends collagingarBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$this->log($options->criteria);
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.mediaorder_id LIKE CONCAT('%', :search, '%') OR A.mediaorder_descr LIKE CONCAT('%', :search, '%') ",
					"advertiser_partner_id" => " C.advertiser_partner_id = :advertiser_partner_id ",
					"date" => null
				]
			);


			$date = '2021-09-30';

			$stmt = $this->db->prepare("call ar_get_bydate('$date')");
			$stmt->execute();

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(*) as n 
				from
				RESULT_AR_PERIODE A left join trn_billout B on B.billout_id = A.jurnal_id
                    left join trn_mediaorder C on C.mediaorder_id = B.orderin_id
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				A.jurnal_id, 
				A.ref_jurnal_duedate,
				@days := datediff('2021-09-30', A.ref_jurnal_duedate) as days ,
				case when @days<=0 then A.outstanding_idr else 0 end as age_0,
				case when @days>0 and @days<=30 then A.outstanding_idr else 0 end as age_30,
				case when @days>30 and @days<=60 then A.outstanding_idr else 0 end as age_60,
				case when @days>60 and @days<=90 then A.outstanding_idr else 0 end as age_90,
				case when @days>90 and @days<=120 then A.outstanding_idr else 0 end as age_120,
				case when @days>120 then A.outstanding_idr else 0 end as age_120_more,
				A.outstanding_idr, 
				C.mediaorder_descr ,
				C.agency_partner_id,
				C.advertiser_partner_id,
				C.brand_id
				from 
				RESULT_AR_PERIODE A left join trn_billout B on B.billout_id = A.jurnal_id
									left join trn_mediaorder C on C.mediaorder_id = B.orderin_id
			" 
			. $where->sql 
			. " order by C.agency_partner_id, C.advertiser_partner_id, C.brand_id"
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
				 	//'tambahan' => 'dta',
					 'agency_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['agency_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					 'advertiser_partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['advertiser_partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					 'brand_name' => \FGTA4\utils\SqlUtility::Lookup($record['brand_id'], $this->db, 'mst_brand', 'brand_id', 'brand_name'),

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