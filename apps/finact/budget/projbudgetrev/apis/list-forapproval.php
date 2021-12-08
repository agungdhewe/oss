<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/projbudgetrev/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header projbudgetrev (mst_projbudgetrev)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 06/12/2021
 */
$API = new class extends projbudgetrevBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}


			$entityname = "projbudgetrev";
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


			// \FGTA4\utils\SqlUtility::setDefaultCriteria($options->criteria, '--fieldscriteria--', '--value--');
			$where = \FGTA4\utils\SqlUtility::BuildCriteria(
				$options->criteria,
				[
					"search" => " A.projbudgetrev_id LIKE CONCAT('%', :search, '%') OR A.projbudget_name LIKE CONCAT('%', :search, '%') ",
					"dept_id" => " A.dept_id = :dept_id "
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n 
					from mst_projbudgetrev A inner join TEMP_TOAPPROVE B on B.projbudgetrev_id = A.projbudgetrev_id
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					A.projbudgetrev_id, A.dept_id, A.projbudget_id, A.projbudgetrev_descr, A.project_id, A.projbudget_year, A.projbudget_month, A.projbudget_isdeptalloc, A.doc_id, A.projbudgetrev_notes, A.projbudgetrev_version, A.projbudgetrev_iscommit, A.projbudgetrev_commitby, A.projbudgetrev_commitdate, A.projbudgetrev_isapprovalprogress, A.projbudgetrev_isapproved, A.projbudgetrev_approveby, A.projbudgetrev_approvedate, A.projbudgetrev_isdeclined, A.projbudgetrev_declineby, A.projbudgetrev_declinedate, A.projbudgetrev_isclose, A.projbudgetrev_closeby, A.projbudgetrev_closedate, A._createby, A._createdate, A._modifyby, A._modifydate 
					from mst_projbudgetrev A inner join TEMP_TOAPPROVE B on B.projbudgetrev_id = A.projbudgetrev_id
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
					'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
					'projbudget_name' => \FGTA4\utils\SqlUtility::Lookup($record['projbudget_id'], $this->db, 'mst_projbudget', 'projbudget_id', 'projbudget_name'),
					'project_name' => \FGTA4\utils\SqlUtility::Lookup($record['project_id'], $this->db, 'mst_project', 'project_id', 'project_name'),
					'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'projbudgetrev_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'projbudgetrev_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['projbudgetrev_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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