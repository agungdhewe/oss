<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';



use \FGTA4\exceptions\WebException;


class DataList extends WebAPI {
	function __construct() {
		$this->debugoutput = true;
		$DB_CONFIG = DB_CONFIG[$GLOBALS['MAINDB']];
		$DB_CONFIG['param'] = DB_CONFIG_PARAM[$GLOBALS['MAINDBTYPE']];
		$this->db = new \PDO(
					$DB_CONFIG['DSN'], 
					$DB_CONFIG['user'], 
					$DB_CONFIG['pass'], 
					$DB_CONFIG['param']
		);

	}

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.billout_id LIKE CONCAT('%', :search, '%') OR A.billout_descr LIKE CONCAT('%', :search, '%') ",
					"partner_id" => " A.partner_id = :partner_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from trn_billout A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					billout_id, billout_descr, billout_date, billout_datedue, billout_iscommit, billout_commitby, billout_commitdate, billout_ispost, billout_postby, billout_postdate, billtype_id, trxmodel_id, salesorder_id, curr_id, partner_id, _createby, _createdate, _modifyby, _modifydate, 
					DATEDIFF(now(), billout_datedue) as billout_datedueage,
					(select sum(billoutdetil_validr) from trn_billoutdetil where billout_id = A.billout_id) as billout_total,
					(coalesce((select sum(cashdiscount_validr) from trn_cashdiscount where billout_id = A.billout_id and cashdiscount_isapproved=1),0)) as billout_discount,
					((select sum(billoutdetil_validr) from trn_billoutdetil where billout_id = A.billout_id)   - coalesce((select sum(cashdiscount_validr) from trn_cashdiscount where billout_id = A.billout_id and cashdiscount_isapproved=1),0)  ) as billout_validr,
					.1 * ((select sum(billoutdetil_validr) from trn_billoutdetil where billout_id = A.billout_id)   - coalesce((select sum(cashdiscount_validr) from trn_cashdiscount where billout_id = A.billout_id and cashdiscount_isapproved=1), 0)   )as billout_taxidr
					from trn_billout A
				" 
					. $where->sql 
					. " order by  billout_datedue "
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
					'billtype_name' => \FGTA4\utils\SqlUtility::Lookup($record['billtype_id'], $this->db, 'mst_billtype', 'billtype_id', 'billtype_name'),
					'trxmodel_name' => \FGTA4\utils\SqlUtility::Lookup($record['trxmodel_id'], $this->db, 'mst_trxmodel', 'trxmodel_id', 'trxmodel_name'),
					'salesorder_descr' => \FGTA4\utils\SqlUtility::Lookup($record['salesorder_id'], $this->db, 'trn_salesorder', 'salesorder_id', 'salesorder_descr'),
					'curr_name' => \FGTA4\utils\SqlUtility::Lookup($record['curr_id'], $this->db, 'mst_curr', 'curr_id', 'curr_name'),
					'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'empl_id' => $userdata->employee_id,
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup( $userdata->employee_id, $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					 
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

}

$API = new DataList();