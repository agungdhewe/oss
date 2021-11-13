<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;



$API = new class extends collaccmtnBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$options->criteria->periode_id = '202110';
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billout_id LIKE CONCAT('%', :search, '%') OR A.billout_descr LIKE CONCAT('%', :search, '%') ",
					"partner_id" => " A.partner_id = :partner_id ",
					"periode_id" => null
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_billout A left join trn_colltargetbillout B on B.billout_id = A.billout_id" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.billout_id, A.billout_descr
					, A.billout_datedue
					, datediff(now(), A.billout_datedue) as billout_age
					, coalesce(B.billout_idr, A.billout_validr) as billout_idr
					, coalesce(B.billout_ppn, 0) as billout_ppn
					, coalesce(B.billout_ppnval, 0) as billout_ppnval
					, coalesce( B.billout_pph, 0) as billout_pph
					, coalesce(B.billout_pphval, 0) as billout_pphval
					, coalesce(B.billout_idrnett, A.billout_validr) as billout_idrnett
					, coalesce(B.billout_discval, 0) as billout_discval
					, coalesce(B.billout_idrtotal, A.billout_validr) as billout_idrtotal
					, coalesce(B.billout_idrtopay, A.billout_validr) as billout_idrtopay
					, coalesce(B.billout_ppntopay, 0) as  billout_ppntopay
					from trn_billout A left join trn_colltargetbillout B on B.billout_id = A.billout_id
				" 
				. $where->sql 
				. " order by A.billout_datedue asc, A.partner_id "
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