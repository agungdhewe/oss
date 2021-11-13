<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';


use \FGTA4\exceptions\WebException;



class DataOpen extends WebAPI {
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
			if (!$this->RequestIsAllowedFor($this->reqinfo, "open", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"cashdiscount_id" => " A.cashdiscount_id = :cashdiscount_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_cashdiscount A', [
				'cashdiscount_id', 'cashdiscount_ref', 'cashdiscount_date', 'cashdiscount_descr', 
				'cashdiscount_iscommit', 'cashdiscount_commitby', 'cashdiscount_commitdate', 'cashdiscount_isapproved', 'cashdiscount_approveby', 'cashdiscount_approvedate',
				'cashdiscount_percent', 'cashdiscount_validr', 'billout_id', 'partner_id', 'dept_id', 'doc_id', 
				'_createby', '_createdate', '_modifyby', '_modifydate', 
				['(select sum(billoutdetil_validr) from trn_billoutdetil where billout_id = A.billout_id) as billout_total'],
				['(coalesce((select sum(cashdiscount_validr) from trn_cashdiscount where billout_id = A.billout_id and cashdiscount_isapproved=1),0)) as billout_discount'],
				['((select sum(billoutdetil_validr) from trn_billoutdetil where billout_id = A.billout_id)   - coalesce((select sum(cashdiscount_validr) from trn_cashdiscount where billout_id = A.billout_id and cashdiscount_isapproved=1),0)  ) as billout_validr'],
				['(coalesce((select 1 from trn_cashdiscountappr where cashdiscount_id = A.cashdiscount_id and cashdiscountappr_isdeclined=1), 0)) as cashdiscount_isdeclined'],
				['(select case when sum(cashdiscountappr_isapproved) > 0 then 1 else 0 end from trn_cashdiscountappr where cashdiscount_id = A.cashdiscount_id) as cashdiscount_isapprovalprogress'],
				['(select jurnal_ispost from trn_jurnal where jurnal_id = A.cashdiscount_id) as cashdiscount_isposted']
			], $where->sql);


			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}

			$result->record = array_merge($record, [
				'cashdiscount_date' => date("d/m/Y", strtotime($record['cashdiscount_date'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'billout_descr' => \FGTA4\utils\SqlUtility::Lookup($record['billout_id'], $this->db, 'trn_billout', 'billout_id', 'billout_descr'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),

				'_createby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby_username' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

}

$API = new DataOpen();