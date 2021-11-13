<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';



use \FGTA4\exceptions\WebException;
use \FGTA4\debug;

class DataList extends WebAPI {
	function __construct() {
		$logfilepath = __LOCALDB_DIR . "/output/corpbudget.txt";
		debug::start($logfilepath, "w");
		debug::log("start debug");

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
					"search" => " A.corpbudget_id LIKE CONCAT('%', :search, '%') OR A.corpbudget_year LIKE CONCAT('%', :search, '%') ",
					"corpbudget_iscommit" => " corpbudget_iscommit = :corpbudget_iscommit ",
					"corpbudget_isapproved" => " corpbudget_isapproved = :corpbudget_isapproved "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("select count(*) as n from mst_corpbudget A" . $where->sql);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				corpbudget_id, corpbudget_year, corpbudget_iscommit, corpbudget_commitby, corpbudget_commitdate, corpbudget_isapproved, corpbudget_notes, corpbudget_version, _createby, _createdate, _modifyby, _modifydate 
				from mst_corpbudget A
			" . $where->sql . " order by A.corpbudget_id desc " . $limit);
			$stmt->execute($where->params);
			$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

			$records = [];
			foreach ($rows as $row) {
				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}

				if ($this->skiprow($row, $options, $userdata)) {
					continue;
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


	function skiprow($row, $options, $userdata) {
		$corpbudget_id = $row['corpbudget_id'];
		
		try {

			switch ($options->variancename) {

				case "approve" :

					// apakah punya otorisasi
					$sql = "
						select corpbudgetappr_id 
						from mst_corpbudgetappr 
						where 
						corpbudget_id = :corpbudget_id
						and auth_id IN (
							select auth_id from mst_auth where empl_id = (select empl_id from mst_empluser where user_id = :user_id)
						)
						order by docauth_order 
						limit 1			
					";
		
					$sqlparam = [
						':corpbudget_id' => $corpbudget_id,
						':user_id' => $userdata->username
					];

					$stmt = $this->db->prepare($sql);
					$stmt->execute($sqlparam);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);	
					if (count($rows)==0) {
						//throw new \Exception("Tidak ada otoritas untuk approve/decline budget '$corpbudget_id'");
						// debug::log(print_r("tidak ada otoritas", true));
						return true;
					}
					debug::log(print_r("otoritas OK", true));

					//apakah ada pending approve
					$sql = "
						select count(*) as pending_approve from mst_corpbudgetappr
						where
						corpbudget_id = :corpbudget_id
						and docauth_order < (
							select 
							docauth_order 
							from mst_corpbudgetappr 
							where 
							corpbudget_id = :corpbudget_id
							and auth_id IN (
								select auth_id from mst_auth where empl_id = (select empl_id from mst_empluser where user_id = :user_id)
							)
							order by docauth_order 
							limit 1
						) and corpbudgetappr_isapproved = 0
					";
		
					$sqlparam = [
						':corpbudget_id' => $corpbudget_id,
						':user_id' => $userdata->username
					];
					
					$stmt = $this->db->prepare($sql);
					$stmt->execute($sqlparam);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);	
					if (count($rows)>0) {
						$pending_approve = $rows[0]['pending_approve'];
						if ($pending_approve>0) {
							return true;
						}						
					}
					debug::log(print_r("tidak ada pending approve", true));

					// apakah sudah ambil action atas dokumen ini
					$sql = "
						select 
						* 
						from mst_corpbudgetappr 
						where 
						corpbudget_id =  :corpbudget_id
						and auth_id IN (
							select auth_id from mst_auth where empl_id = (select empl_id from mst_empluser where user_id = :user_id)
						)
						and corpbudgetappr_isapproved = 0
						and corpbudgetappr_isdeclined = 0
						order by docauth_order 					
					";
					$sqlparam = [
						':corpbudget_id' => $corpbudget_id,
						':user_id' => $userdata->username
					];
					
					$stmt = $this->db->prepare($sql);
					$stmt->execute($sqlparam);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);	
					if (count($rows)==0) {
						// sudah take action dengan dokumen ini
						return true;	
					}

					break;

			}


			return false;
		} catch (\Exception $ex) {
			throw $ex;
		}		
	}





}

$API = new DataList();