<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;

/**
 * finact/budget/deptbudget/apis/list.php
 *
 * ========
 * DataList
 * ========
 * Menampilkan data-data pada tabel header deptbudget (mst_deptbudget)
 * sesuai dengan parameter yang dikirimkan melalui variable $option->criteria
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 09/06/2021
 */
$API = new class extends deptbudgetBase {

	public function execute($options) {

		$userdata = $this->auth->session_get_user();

		try {
		
			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "list", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$empl_id = $userdata->empl_id;
			$sql = "
				DROP TABLE IF EXISTS TEMP_TOAPPROVE;
				CREATE TEMPORARY TABLE 
					TEMP_TOAPPROVE ( INDEX(deptbudget_id) ) 
					ENGINE=MyISAM 
				AS (
				
					select AX.deptbudget_id
					from (
						select 
						A.deptbudget_id,
						A.docauth_order,
						A.deptbudgetappr_isapproved, 
						COALESCE ((select deptbudgetappr_isapproved from mst_deptbudgetappr where deptbudget_id=A.deptbudget_id and docauth_order<A.docauth_order order by docauth_order desc limit 1), 1) as prev_approval,  
						COALESCE ((select deptbudgetappr_isapproved from mst_deptbudgetappr where deptbudget_id=A.deptbudget_id and docauth_order>A.docauth_order order by docauth_order asc limit 1), 0) as next_approval
						from mst_deptbudgetappr A
						where 
						A.deptbudgetappr_isapproved=0
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
					"search" => " A.deptbudget_id LIKE CONCAT('%', :search, '%') OR A.deptbudget_year LIKE CONCAT('%', :search, '%') ",
					"dept_id" => " A.dept_id = :dept_id"
				]
			);

			$result = new \stdClass; 
			$maxrow = 30;
			$offset = (property_exists($options, 'offset')) ? $options->offset : 0;

			$stmt = $this->db->prepare("
					select count(*) as n 
					from mst_deptbudget A inner join TEMP_TOAPPROVE B on B.deptbudget_id = A.deptbudget_id
				" 
				. $where->sql
			);
			$stmt->execute($where->params);
			$row  = $stmt->fetch(\PDO::FETCH_ASSOC);
			$total = (float) $row['n'];

			$limit = " LIMIT $maxrow OFFSET $offset ";
			$stmt = $this->db->prepare("
					select 
					  A.deptbudget_id, A.deptbudget_year, A.deptbudget_notes, A.deptbudget_version, A.dept_id
					, A.doc_id, A.deptbudget_iscommit, A.deptbudget_commitby, A.deptbudget_commitdate
					, A.deptbudget_isapprovalprogress, A.deptbudget_isapproved, A.deptbudget_approveby
					, A.deptbudget_approvedate, A.deptbudget_isdeclined, A.deptbudget_declineby, A.deptbudget_declinedate
					, A.deptbudget_isveryfied, A.deptbudget_verifyby, A.deptbudget_verifydate
					, A._createby, A._createdate, A._modifyby, A._modifydate 
					from mst_deptbudget A inner join TEMP_TOAPPROVE B on B.deptbudget_id = A.deptbudget_id
				" 
				. $where->sql 
				. " order by A.deptbudget_year desc "
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
						'doc_name' => \FGTA4\utils\SqlUtility::Lookup($record['doc_id'], $this->db, 'mst_doc', 'doc_id', 'doc_name'),
					'deptbudget_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_approveby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_approveby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_declineby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_declineby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'deptbudget_verifyby' => \FGTA4\utils\SqlUtility::Lookup($record['deptbudget_verifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					 
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