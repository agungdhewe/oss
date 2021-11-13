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
					"periodemo_id" => null
				]
			);

			$periodemo_id = '202110';
			$sql = $this->getSQL();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':periodemo_id' => $periodemo_id]);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
				select count(*) as n 
				from
				TEMP_TARGET A
			" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select * from TEMP_TARGET A
			" 
			. $where->sql 
			. " "
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

					 'collector_initial' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_collector', 'empl_id', 'collector_initial'),

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



	function getSQL() {
		return "

			DROP TABLE IF EXISTS TEMP_TARGET;
			CREATE TEMPORARY TABLE -- IF NOT EXISTS 
				TEMP_TARGET 
				ENGINE=MyISAM 
			as (
				
				select
				AX.empl_id,
				(select empl_name from mst_empl where empl_id = AX.empl_id) as  empl_name,
				AX.partner_id,
				(select partner_name from mst_partner where partner_id = AX.partner_id) as  partner_name,
				sum(AX.billout_idrtopay) as billout_idrtopay,
				sum(AX.idrtopay_w1) as idrtopay_w1,
				sum(AX.idrtopay_w2) as idrtopay_w2,
				sum(AX.idrtopay_w3) as idrtopay_w3,
				sum(AX.idrtopay_w4) as idrtopay_w4,
				sum(AX.idrtopay_w5) as idrtopay_w5,
				sum(AX.idrtopay_w6) as idrtopay_w6,
				sum(AX.ori_billout_idr) as ori_billout_idr,
				sum(AX.billout_idrtopay_realisasi) as billout_idrtopay_realisasi
				from (
					
					
					select 
					A.empl_id,
					B.partner_id,
					B.colltargetbillout_datetarget,
					@week_number := (select week_number from view_week where weekdt_date=B.colltargetbillout_datetarget) as week_number,
					@idrtopay := B.billout_idrtopay as billout_idrtopay ,
					case when @week_number=1 then @idrtopay else 0 end as idrtopay_w1,
					case when @week_number=2 then @idrtopay else 0 end as idrtopay_w2,
					case when @week_number=3 then @idrtopay else 0 end as idrtopay_w3,
					case when @week_number=4 then @idrtopay else 0 end as idrtopay_w4,
					case when @week_number=5 then @idrtopay else 0 end as idrtopay_w5,
					case when @week_number=6 then @idrtopay else 0 end as idrtopay_w6,
					(select billout_validr from trn_billout where billout_id=B.billout_id ) ori_billout_idr,
					coalesce((select billout_idrtopay from view_colltemprecv where billout_id = B.billout_id), 0) as billout_idrtopay_realisasi 
					from 
					(trn_colltarget A inner join trn_colltargetbillout B on B.colltarget_id=A.colltarget_id)
					where
					A.periodemo_id = :periodemo_id
					
				) AX
				group by
				AX.empl_id,
				AX.partner_id
				
			);
						
		
		";
	}

};