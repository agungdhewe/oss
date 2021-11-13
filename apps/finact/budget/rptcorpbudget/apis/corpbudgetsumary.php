<?php  

require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\debug;


class CorpBudgetSummary {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}	

	function getdata($corpbudget_id) {
		//$pertanggal = $objdt->format('Y-m-d');
		//$periodemo_id = $objdt->format('Ym');	
		$id = (int)$corpbudget_id;
		$lastyear_corpbudget_id = $id - 1;	

		try {						

			$sql = $this->getSql();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':corpbudget_id' => $id, 
				':lastyear_corpbudget_id' => $lastyear_corpbudget_id
			]);
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));			

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}

	function getSql() {
		return "
			SELECT 
				 coatype_name
				,coatype_order
				,coatype_group
				,accbudget_id
				,accbudget_name
				,corpbudgetdet_descr
				,SUM(jan) AS jan, SUM(jan_lalu) AS jan_lalu
				,SUM(feb) AS feb, SUM(feb_lalu) AS feb_lalu
				,SUM(mar) AS mar, SUM(mar_lalu) AS mar_lalu
				,SUM(apr) AS apr, SUM(apr_lalu) AS apr_lalu
				,SUM(mei) AS mei, SUM(mei_lalu) AS mei_lalu
				,SUM(jun) AS jun, SUM(jun_lalu) AS jun_lalu
				,SUM(jul) AS jul, SUM(jul_lalu) AS jul_lalu
				,SUM(ags) AS ags, SUM(ags_lalu) AS ags_lalu
				,SUM(sep) AS sep, SUM(sep_lalu) AS sep_lalu
				,SUM(okt) AS okt, SUM(okt_lalu) AS okt_lalu
				,SUM(nov) AS nov, SUM(nov_lalu) AS nov_lalu
				,SUM(des) AS des, SUM(des_lalu) AS des_lalu
				,SUM(corpbudgetdet_total) AS corpbudgetdet_total
				,SUM(corpbudgetdet_total_lalu) AS corpbudgetdet_total_lalu
			FROM			
				(
					SELECT 
						 A.corpbudget_id
						,E.coatype_name
						,E.coatype_order
						,E.coatype_group
						,B.accbudget_id
						,C.accbudget_name
						,B.corpbudgetdet_descr
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_01 ELSE B.corpbudgetdet_01 END AS jan
						,0 AS jan_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_02 ELSE B.corpbudgetdet_02 END AS feb
						,0 AS feb_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_03 ELSE B.corpbudgetdet_03 END AS mar
						,0 AS mar_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_04 ELSE B.corpbudgetdet_04 END AS apr
						,0 AS apr_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_05 ELSE B.corpbudgetdet_05 END AS mei
						,0 AS mei_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_06 ELSE B.corpbudgetdet_06 END AS jun
						,0 AS jun_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_07 ELSE B.corpbudgetdet_07 END AS jul
						,0 AS jul_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_08 ELSE B.corpbudgetdet_08 END AS ags
						,0 AS ags_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_09 ELSE B.corpbudgetdet_09 END AS sep
						,0 AS sep_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_10 ELSE B.corpbudgetdet_10 END AS okt
						,0 AS okt_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_11 ELSE B.corpbudgetdet_11 END AS nov
						,0 AS nov_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_12 ELSE B.corpbudgetdet_12 END AS des
						,0 AS des_lalu
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_total ELSE B.corpbudgetdet_total END AS corpbudgetdet_total
						,0 AS corpbudgetdet_total_lalu
					FROM mst_corpbudget A 
						INNER JOIN mst_corpbudgetdet B ON A.corpbudget_id = B.corpbudget_id			
						LEFT JOIN mst_accbudget C ON C.accbudget_id = B.accbudget_id 	
						LEFT JOIN mst_coa D ON C.coa_id = D.coa_id 
						LEFT JOIN mst_coatype E ON E.coatype_id = D.coatype_id 
					WHERE A.corpbudget_id = :corpbudget_id
						AND 
							(B.corpbudgetdet_01<>0 OR B.corpbudgetdet_02<>0 OR B.corpbudgetdet_03<>0 OR B.corpbudgetdet_04<>0 OR
							B.corpbudgetdet_05<>0 OR B.corpbudgetdet_06<>0 OR B.corpbudgetdet_07<>0 OR B.corpbudgetdet_08<>0 OR
							B.corpbudgetdet_09<>0 OR B.corpbudgetdet_10<>0 OR B.corpbudgetdet_11<>0 OR B.corpbudgetdet_12<>0)		
					UNION 
					SELECT 
						 A.corpbudget_id
						,E.coatype_name
						,E.coatype_order
						,E.coatype_group
						,B.accbudget_id
						,C.accbudget_name
						,B.corpbudgetdet_descr
						,0 AS jan
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_01 ELSE B.corpbudgetdet_01 END AS jan_lalu
						,0 AS feb
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_02 ELSE B.corpbudgetdet_02 END AS feb_lalu
						,0 AS mar
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_03 ELSE B.corpbudgetdet_03 END AS mar_lalu
						,0 AS apr
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_04 ELSE B.corpbudgetdet_04 END AS apr_lalu
						,0 AS mei
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_05 ELSE B.corpbudgetdet_05 END AS mei_lalu
						,0 AS jun
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_06 ELSE B.corpbudgetdet_06 END AS jun_lalu
						,0 AS jul
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_07 ELSE B.corpbudgetdet_07 END AS jul_lalu
						,0 AS ags
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_08 ELSE B.corpbudgetdet_08 END AS ags_lalu
						,0 AS sep
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_09 ELSE B.corpbudgetdet_09 END AS sep_lalu
						,0 AS okt
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_10 ELSE B.corpbudgetdet_10 END AS okt_lalu
						,0 AS nov
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_11 ELSE B.corpbudgetdet_11 END AS nov_lalu
						,0 AS des
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_12 ELSE B.corpbudgetdet_12 END AS des_lalu
						,0 AS corpbudgetdet_total
						,CASE WHEN D.coa_dk<0 THEN -B.corpbudgetdet_total ELSE B.corpbudgetdet_total END AS corpbudgetdet_total_lalu
					FROM mst_corpbudget A 
						INNER JOIN mst_corpbudgetdet B ON A.corpbudget_id = B.corpbudget_id			
						LEFT JOIN mst_accbudget C ON C.accbudget_id = B.accbudget_id 	
						LEFT JOIN mst_coa D ON C.coa_id = D.coa_id 
						LEFT JOIN mst_coatype E ON E.coatype_id = D.coatype_id
					WHERE A.corpbudget_id = :lastyear_corpbudget_id
						AND 
							(B.corpbudgetdet_01<>0 OR B.corpbudgetdet_02<>0 OR B.corpbudgetdet_03<>0 OR B.corpbudgetdet_04<>0 OR
							B.corpbudgetdet_05<>0 OR B.corpbudgetdet_06<>0 OR B.corpbudgetdet_07<>0 OR B.corpbudgetdet_08<>0 OR
							B.corpbudgetdet_09<>0 OR B.corpbudgetdet_10<>0 OR B.corpbudgetdet_11<>0 OR B.corpbudgetdet_12<>0)
				) AS corpbudget
			GROUP BY coatype_name, accbudget_name
			ORDER BY coatype_order ASC, accbudget_id ASC;
		";
	}

}
