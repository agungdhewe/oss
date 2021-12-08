<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/projbudget/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header projbudget (mst_projbudget)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/06/2021
 */
$API = new class extends projbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$entityname = "projbudget";
			$empl_id = $userdata->empl_id;
			$sql = "
				DROP TABLE IF EXISTS TEMP_TOAPPROVE;
				CREATE TEMPORARY TABLE 
					TEMP_TOAPPROVE ( INDEX(${entityname}_id) ) 
					ENGINE=MyISAM 
				AS (
				
					select AX.${entityname}_id
					from (
						select 
						A.${entityname}_id,
						A.docauth_order,
						A.${entityname}appr_isapproved, 
						COALESCE ((select ${entityname}appr_isapproved from mst_${entityname}appr where ${entityname}_id=A.${entityname}_id and docauth_order<A.docauth_order order by docauth_order desc limit 1), 1) as prev_approval,  
						COALESCE ((select ${entityname}appr_isapproved from mst_${entityname}appr where ${entityname}_id=A.${entityname}_id and docauth_order>A.docauth_order order by docauth_order asc limit 1), 0) as next_approval
						from mst_${entityname}appr A
						where 
						A.${entityname}appr_isapproved=0
						AND A.auth_id IN (
							select auth_id from mst_auth where empl_id = '$empl_id'
						)
					) AX
					WHERE 
					AX.prev_approval = 1
				);
			";
			$this->db->query($sql);	


			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.projbudget_id LIKE CONCAT('%', :search, '%') OR A.projbudget_name LIKE CONCAT('%', :search, '%') ",
					"dept_id" => " A.dept_id = :dept_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n from 
					mst_projbudget A inner join TEMP_TOAPPROVE B on B.projbudget_id = A.projbudget_id
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
				select 
				  A.projbudget_id, A.dept_id, A.project_id, A.projbudget_name, A.projbudget_descr
				, A.projbudget_year, A.projbudget_month, A.projbudget_isinheritvisibility
				, A.projbudget_isdeptalloc, A.doc_id, A.projbudget_notes, A.projbudget_version
				, A.projbudget_iscommit, A.projbudget_commitby, A.projbudget_commitdate
				, A.projbudget_isapprovalprogress, A.projbudget_isapproved, A.projbudget_approveby
				, A.projbudget_approvedate, A.projbudget_isdeclined, A.projbudget_declineby, A.projbudget_declinedate
				, A.projbudget_isclose, A.projbudget_closeby, A.projbudget_closedate
				, A._createby, A._createdate, A._modifyby, A._modifydate 
				from mst_projbudget A inner join TEMP_TOAPPROVE B on B.projbudget_id = A.projbudget_id
			" . $where->sql . $limit);
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
					'month_name' => \FGTA4\utils\SqlUtility::getMonthName($record['projbudget_month']), 
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'projbudget_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudget_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
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