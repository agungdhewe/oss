<?php  

require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\debug;


class DataReport {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}




	function getdata($objdt, $partner_id) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);

			if ($partner_id=='ALL') {
				$sql = $this->get_sqlreport($pertanggal);
			} else {
				$sql = $this->get_sqlreport_partner($pertanggal, $partner_id);
			}
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id,
				':coamodel_id'=>'AR'
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));

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
				':coamodel_id'=>'AR'
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


	function get_sqlreport($pertanggal) {

		return "

		SELECT
		DX.partner_id,
		(select partner_name from mst_partner where partner_id=DX.partner_id) AS partner_name,
		DX.coa_id,
		DX.jurnal_id,
		DX.jurnaldetil_descr,
		DX.jurnal_duedate,
		DX.age,
		DX.value as value,
		DX.NOTYETDUE AS notyetdue,
		DX.DUE_030 AS due_030,
		DX.DUE_060 AS due_060,
		DX.DUE_090 AS due_090,
		DX.DUE_MORE AS due_more
		FROM (
		
		
			SELECT
			CX.partner_id,
			CX.coa_id,
			CX.jurnal_id,
			CX.jurnal_duedate,
			DATEDIFF('$pertanggal', CX.jurnal_duedate) as age, 
			CX.jurnaldetil_descr,
			CX.value,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) <= 45 then CX.value else 0 end as NOTYETDUE,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 46 and 70  then CX.value else 0 end as DUE_030,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 71 and 100 then CX.value else 0 end as DUE_060,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 101 and 130 then CX.value else 0 end as DUE_090,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) >= 131 then CX.value else 0 end as DUE_MORE
			from (
			
				select
				B.partner_id, 
				B.coa_id,
				B.jurnal_id,
				B.jurnal_date as jurnal_duedate, 
				B.jurnaldetil_descr,
				jurnalsaldo_awal_idr as value
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
				-- where 
				-- B.periodemo_id= :periodemo_id
				-- AND C.coamodel_id = :coamodel_id
				group by
				B.jurnal_id,
				B.jurnal_date, 
				B.coa_id,
				B.partner_id
					
			) CX
		
		) DX
					
					
					
				
		
		";
	}




	function get_sqlreport_partner($pertanggal, $partner_id) {

		return "

		SELECT
		DX.partner_id,
		(select partner_name from mst_partner where partner_id=DX.partner_id) AS partner_name,
		DX.coa_id,
		DX.jurnal_id,
		DX.jurnaldetil_descr,
		DX.jurnal_duedate,
		DX.age,
		DX.value as value,
		DX.NOTYETDUE AS notyetdue,
		DX.DUE_030 AS due_030,
		DX.DUE_060 AS due_060,
		DX.DUE_090 AS due_090,
		DX.DUE_MORE AS due_more
		FROM (
		
		
			SELECT
			CX.partner_id,
			CX.coa_id,
			CX.jurnal_id,
			CX.jurnal_duedate,
			DATEDIFF('$pertanggal', CX.jurnal_duedate) as age, 
			CX.jurnaldetil_descr,
			CX.value,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) <= 45 then CX.value else 0 end as NOTYETDUE,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 46 and 70  then CX.value else 0 end as DUE_030,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 71 and 100 then CX.value else 0 end as DUE_060,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) between 101 and 130 then CX.value else 0 end as DUE_090,
			case when DATEDIFF('$pertanggal', CX.jurnal_duedate) >= 131 then CX.value else 0 end as DUE_MORE
			from (
			
				select
				B.partner_id, 
				B.coa_id,
				B.jurnal_id,
				B.jurnal_date as jurnal_duedate, 
				B.jurnaldetil_descr,
				jurnalsaldo_awal_idr as value
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
				where 
				B.partner_id = '$partner_id'
				-- B.periodemo_id= :periodemo_id
				-- AND C.coamodel_id = :coamodel_id
				group by
				B.jurnal_id,
				B.jurnal_date, 
				B.coa_id,
				B.partner_id
					
			) CX
		
		) DX
					
					
					
				
		
		";
	}




}
