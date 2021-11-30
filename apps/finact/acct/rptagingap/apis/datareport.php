<?php  

require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\debug;


class DataReport {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}




	function getdata($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {

			$sql = "
			
				call ap_get_bydate(:date);

				select 
				A.jurnal_id,
				(select jurnal_descr from trn_jurnal where jurnal_id=A.jurnal_id) as jurnal_descr,
				A.ref_jurnal_duedate,
				@days := datediff('2021-09-30', A.ref_jurnal_duedate) as days ,
				case when @days<=0 then A.outstanding_idr else 0 end as age_0,
				case when @days>0 and @days<=30 then A.outstanding_idr else 0 end as age_30,
				case when @days>30 and @days<=60 then A.outstanding_idr else 0 end as age_60,
				case when @days>60 and @days<=90 then A.outstanding_idr else 0 end as age_90,
				case when @days>90 and @days<=120 then A.outstanding_idr else 0 end as age_120,
				case when @days>120 then A.outstanding_idr else 0 end as age_120_more,
				A.outstanding_idr
				from 
				RESULT_AP_PERIODE A;		
			
			
			";
			$stmt = $this->db->prepare($sql);
			$stmt->execute([':date'=>$pertanggal]);		
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);


			// $periodeinfo = $this->periode_getinfo($periodemo_id, 1);
			// $sql = $this->get_sqlreport();
			// $stmt = $this->db->prepare($sql);
			// $stmt->execute([
			// 	':periodemo_id'=>$periodemo_id,
			// 	':coamodel_id'=>'AP'
			// ]);	
			// $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			// debug::log('jumlah baris ' . count($rows));

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}


	function getdatadetil($objdt, $partner_id) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);

			$sql = $this->get_sqlreport_detil();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id,
				':partner_id' => $partner_id,
				':coamodel_id'=>'AP'
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}

	function periode_getinfo($periodemo_id, $deep=0) {
		try {
			$stmt = $this->db->prepare("select * from mst_periodemo where periodemo_id = :periodemo_id");
			$stmt->execute([':periodemo_id'=>$periodemo_id]);
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($rows)) {
				$row = $rows[0];
				$periode = (object)[
					'created' => true,
					'periodemo_id' => $row['periodemo_id'],
					'periodemo_name' => $row['periodemo_name'],
					'periodemo_isclosed' => $row['periodemo_isclosed'],
					'periodemo_year' => $row['periodemo_year'],
					'periodemo_month' => $row['periodemo_month'], 
					'periodemo_dtstart' => $row['periodemo_dtstart'], 
					'periodemo_dtend' => $row['periodemo_dtend']
				];

				if ($deep==0) {
					return $periode;
				} else {
					$prev_periodemo_dtend = date_create($periode->periodemo_dtstart);
					date_add($prev_periodemo_dtend, date_interval_create_from_date_string("-1 days"));
	
					$next_periodemo_dtstart = date_create($periode->periodemo_dtend);
					date_add($next_periodemo_dtstart, date_interval_create_from_date_string("1 days"));
	

					$prev_periodemo_id = $prev_periodemo_dtend->format('Ym');
					$next_periodemo_id = $next_periodemo_dtstart->format('Ym');

					// debug::log($prev_periodemo_id . ' ' . $periodemo_id . ' ' .  $next_periodemo_id);
					$periode->prev = $this->periode_getinfo($prev_periodemo_id, 0);
					$periode->next = $this->periode_getinfo($next_periodemo_id, 0);

					return $periode;
				}

			} else {
				return (object)[
					'created' => false,
					'periodemo_isclosed' => 0
				];
			}
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function get_sqlreport() {

		return "
			SELECT
			DX.partner_id,
			(select partner_name from mst_partner where partner_id=DX.partner_id) AS partner_name,
			SUM(DX.value) as value,
			SUM(DX.NOTYETDUE) AS notyetdue,
			SUM(DX.DUE_030) AS due_030,
			SUM(DX.DUE_060) AS due_060,
			SUM(DX.DUE_090) AS due_090,
			SUM(DX.DUE_MORE) AS due_more
			FROM (
				
						
					SELECT
					CX.jurnal_id,
					CX.jurnal_duedate,
					DATEDIFF(NOW(), CX.jurnal_duedate) as age, 
					CX.coa_id,
					CX.partner_id,
					CX.value,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) < 0 then CX.value else 0 end as NOTYETDUE,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 1 and 30  then CX.value else 0 end as DUE_030,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 31 and 60 then CX.value else 0 end as DUE_060,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 61 and 90 then CX.value else 0 end as DUE_090,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) > 91 then CX.value else 0 end as DUE_MORE
					
					
					FROM (
						
						
						select
						B.jurnal_id,
						B.jurnal_duedate, 
						B.coa_id,
						B.partner_id, 
						jurnalsaldo_awal as value
						from 
						trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
						where 
						B.periodemo_id= :periodemo_id
						AND C.coamodel_id = :coamodel_id
						group by
						B.coa_id,
						B.partner_id 
						
						
						UNION
						
						
						SELECT
						BX.jurnal_id,
						(select jurnal_datedue from trn_jurnal where jurnal_id=BX.jurnal_id) as jurnal_datedue,
						BX.coa_id,
						BX.partner_id,
						BX.jurnaldetil_validr
						FROM (
							SELECT 
							B.jurnal_id ,
							B.coa_id ,
							B.partner_id,
							B.jurnaldetil_validr 
							FROM 
							trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id 
										inner join mst_coa C on C.coa_id = B.coa_id 
							WHERE 
							A.jurnal_ispost = 1
							and A.periodemo_id  = :periodemo_id
							and C.coamodel_id = :coamodel_id
							UNION 
							
							SELECT 
							(select jurnal_id from trn_jurnaldetil where jurnaldetil_id=B.ref_jurnaldetil_id) as jurnal_id,
							B.ref_coa_id as coa_id,
							B.ref_partner_id as partner_id,
							-B.jurnaldetil_validr as jurnaldetil_validr 
							FROM 
							trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id 
										inner join mst_coa C ON C.coa_id = B.coa_id 
							WHERE 
							A.jurnal_ispost = 1
							and A.periodemo_id  = :periodemo_id
							and C.coamodel_id = :coamodel_id
							and B.ref_jurnaldetil_id is not NULL 
						) BX
					
					) CX
					
			) DX
			GROUP BY 
			DX.partner_id
			ORDER BY 
			partner_name
		
		";
	}





	function get_sqlreport_detil() {

		return "
			SELECT
			DX.jurnal_id,
			DX.jurnal_duedate,
			DX.age,
			SUM(DX.value) as value,
			SUM(DX.NOTYETDUE) AS notyetdue,
			SUM(DX.DUE_030) AS due_030,
			SUM(DX.DUE_060) AS due_060,
			SUM(DX.DUE_090) AS due_090,
			SUM(DX.DUE_MORE) AS due_more
			FROM (
				
						
					SELECT
					CX.jurnal_id,
					CX.jurnal_duedate,
					DATEDIFF(NOW(), CX.jurnal_duedate) as age, 
					CX.coa_id,
					CX.partner_id,
					CX.value,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) < 0 then CX.value else 0 end as NOTYETDUE,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 1 and 30  then CX.value else 0 end as DUE_030,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 31 and 60 then CX.value else 0 end as DUE_060,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) between 61 and 90 then CX.value else 0 end as DUE_090,
					case when DATEDIFF(NOW(), CX.jurnal_duedate) > 91 then CX.value else 0 end as DUE_MORE
					
					
					FROM (
						
						
						select
						B.jurnal_id,
						B.jurnal_duedate, 
						B.coa_id,
						B.partner_id, 
						jurnalsaldo_awal as value
						from 
						trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
						where 
						B.periodemo_id= :periodemo_id
						and B.partner_id = :partner_id
						AND C.coamodel_id = :coamodel_id
						group by
						B.coa_id,
						B.partner_id 
						
						
						UNION
						
						
						SELECT
						BX.jurnal_id,
						(select jurnal_datedue from trn_jurnal where jurnal_id=BX.jurnal_id) as jurnal_datedue,
						BX.coa_id,
						BX.partner_id,
						BX.jurnaldetil_validr
						FROM (
							SELECT 
							B.jurnal_id ,
							B.coa_id ,
							B.partner_id,
							B.jurnaldetil_validr 
							FROM 
							trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id 
										inner join mst_coa C on C.coa_id = B.coa_id 
							WHERE 
							A.jurnal_ispost = 1
							and A.periodemo_id  = :periodemo_id
							and B.partner_id = :partner_id
							and C.coamodel_id = :coamodel_id
							UNION 
							
							SELECT 
							(select jurnal_id from trn_jurnaldetil where jurnaldetil_id=B.ref_jurnaldetil_id) as jurnal_id,
							B.ref_coa_id as coa_id,
							B.ref_partner_id as partner_id,
							-B.jurnaldetil_validr as jurnaldetil_validr 
							FROM 
							trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id 
										inner join mst_coa C ON C.coa_id = B.coa_id 
							WHERE 
							A.jurnal_ispost = 1
							and A.periodemo_id  = :periodemo_id
							and B.partner_id = :partner_id
							and C.coamodel_id = :coamodel_id
							and B.ref_jurnaldetil_id is not NULL 
						) BX
					
					) CX
					
			) DX
			GROUP BY 
			DX.jurnal_id,
			DX.jurnal_duedate,
			DX.age
			
			ORDER BY 
			DX.jurnal_id,
			DX.jurnal_duedate
		
		";
	}


}
