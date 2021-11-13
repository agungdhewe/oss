<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;


/**
 * finact/items/itemassetmove/apis/open.php
 *
 * ====
 * Open
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header itemassetmove (trn_itemassetmove)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 17/09/2021
 */
$API = new class extends itemassetmoveBase {
	
	public function execute($options) {
		$tablename = 'trn_itemassetmove';
		$primarykey = 'itemassetmove_id';
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
					"itemassetmove_id" => " itemassetmove_id = :itemassetmove_id "
				]
			);

			$sql = \FGTA4\utils\SqlUtility::Select('trn_itemassetmove A', [
				'itemassetmove_id', 'inquiry_id', 'itemassetmove_dtstart', 'itemassetmove_dtend', 'itemassetmove_descr', 'from_site_id', 'to_site_id', 'user_dept_id', 'empl_id', 'project_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', '_createby', '_createdate', '_modifyby', '_modifydate'
			], $where->sql);

			$stmt = $this->db->prepare($sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);

			$record = [];
			foreach ($row as $key => $value) {
				$record[$key] = $value;
			}



			$result->record = array_merge($record, [
				'itemassetmove_dtstart' => date("d/m/Y", strtotime($record['itemassetmove_dtstart'])),
				'itemassetmove_dtend' => date("d/m/Y", strtotime($record['itemassetmove_dtend'])),
				
				// // jikalau ingin menambah atau edit field di result record, dapat dilakukan sesuai contoh sbb: 
				// 'tambahan' => 'dta',
				//'tanggal' => date("d/m/Y", strtotime($record['tanggal'])),
				//'gendername' => $record['gender']
				
				'inquiry_descr' => \FGTA4\utils\SqlUtility::Lookup($record['inquiry_id'], $this->db, 'trn_inquiry', 'inquiry_id', 'inquiry_descr'),
				'from_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['from_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'to_site_name' => \FGTA4\utils\SqlUtility::Lookup($record['to_site_id'], $this->db, 'mst_site', 'site_id', 'site_name'),
				'user_dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['user_dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
				'projecttask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projecttask_id'], $this->db, 'mst_projecttask', 'projecttask_id', 'projecttask_name'),
				'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
				'projbudgettask_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgettask_id'], $this->db, 'mst_projbudgettask', 'projbudgettask_id', 'projecttask_notes'),


				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

			]);

			// $date = DateTime::createFromFormat('d/m/Y', "24/04/2012");
			// echo $date->format('Y-m-d');

			

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

};