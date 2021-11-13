<?php  

require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\debug;


class GLSummary {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}

	function getdata($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$this->db->query("
				DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
				CREATE TEMPORARY TABLE xtp_jurnalsaldo (
					coareport_id varchar(2),
					dept_id varchar(20),
					coa_id varchar(20),
					saldoawal decimal(14,2),
					mutasi decimal(14,2),
					saldoakhir decimal(14,2)
				);
			");

			$sql = $this->get_sqljurnalsummary();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));


			$this->db->query("DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;");

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getdata_bydept($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$this->db->query("
				DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
				CREATE TEMPORARY TABLE xtp_jurnalsaldo (
					coareport_id varchar(2),
					dept_id varchar(20),
					coa_id varchar(20),
					saldoawal decimal(14,2),
					mutasi decimal(14,2),
					saldoakhir decimal(14,2)
				);
			");

			$sql = $this->get_sqljurnalsummary_bydept();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));


			$this->db->query("DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;");

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}



	function getdata_bypartner($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$this->db->query("
				DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
				CREATE TEMPORARY TABLE xtp_jurnalsaldo (
					coareport_id varchar(2),
					partner_id varchar(20),
					coa_id varchar(20),
					saldoawal decimal(14,2),
					mutasi decimal(14,2),
					saldoakhir decimal(14,2)
				);
			");

			$sql = $this->get_sqljurnalsummary_bypartner();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));


			$this->db->query("DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;");

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}




	function getdata_bydeptpartner($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$this->db->query("
				DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
				CREATE TEMPORARY TABLE xtp_jurnalsaldo (
					coareport_id varchar(2),
					dept_id varchar(20),
					partner_id varchar(20),
					coa_id varchar(20),
					saldoawal decimal(14,2),
					mutasi decimal(14,2),
					saldoakhir decimal(14,2)
				);
			");

			$sql = $this->get_sqljurnalsummary_bydeptpartner();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));


			$this->db->query("DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;");

			return $rows;
		}  catch (\Exception $ex) {
			throw $ex;
		}
	}





	function getdatadetil($objdt, $coa_id) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$this->db->query("
				DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
				CREATE TEMPORARY TABLE xtp_jurnalsaldo (
					coareport_id varchar(2),
					dept_id varchar(20),
					coa_id varchar(20),
					saldoawal decimal(14,2),
					mutasi decimal(14,2),
					saldoakhir decimal(14,2)
				);
			");

			$sql = $this->get_sqljurnalsummarydetil();
			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				':periodemo_id'=>$periodemo_id,
				':coa_id'=>$coa_id
			]);	
			$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
			debug::log('jumlah baris ' . count($rows));


			$this->db->query("DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;");

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


	function get_sqljurnalsummary() {
		return "
			select
			AX.coa_id,
			(select coa_name from mst_coa where coa_id = AX.coa_id) as coa_name,
			SUM(AX.saldoawal) as saldoawal,
			SUM(AX.mutasi) as mutasi,
			SUM(AX.saldoawal) + SUM(AX.mutasi) as saldoakhir
			from (
				
				-- masukkan saldo awal
				select
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				SUM(jurnalsaldo_awal_idr) as saldoawal,
				0 as mutasi
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				B.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
				union all
				
				-- masukkan transaksi
				select 
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				0 as saldoawal,
				SUM(jurnaldetil_validr) as mutasi
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
							left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				A.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
			) AX
			group by
			AX.coa_id		
		
		";
	}



	function get_sqljurnalsummary_bydept() {
		return "
			select
			AX.coa_id,
			(select coa_name from mst_coa where coa_id = AX.coa_id) as coa_name,
			(select dept_name from mst_dept where dept_id = AX.dept_id) as dept_name,
			SUM(AX.saldoawal) as saldoawal,
			SUM(AX.mutasi) as mutasi,
			SUM(AX.saldoawal) + SUM(AX.mutasi) as saldoakhir
			from (
				
				-- masukkan saldo awal
				select
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				SUM(jurnalsaldo_awal_idr) as saldoawal,
				0 as mutasi
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				B.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
				union all
				
				-- masukkan transaksi
				select 
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				0 as saldoawal,
				SUM(jurnaldetil_validr) as mutasi
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
							left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				A.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
			) AX
			group by
			AX.coa_id, AX.dept_id	
			order by 	
			AX.coa_id, AX.dept_id	
		";
	}





	function get_sqljurnalsummary_bypartner() {
		return "
			select
			AX.coa_id,
			(select coa_name from mst_coa where coa_id = AX.coa_id) as coa_name,
			(select partner_name from mst_partner where partner_id = AX.partner_id) as partner_name,
			SUM(AX.saldoawal) as saldoawal,
			SUM(AX.mutasi) as mutasi,
			SUM(AX.saldoawal) + SUM(AX.mutasi) as saldoakhir
			from (
				
				-- masukkan saldo awal
				select
				D.coareport_id, 
				B.partner_id,
				B.coa_id,
				SUM(jurnalsaldo_awal_idr) as saldoawal,
				0 as mutasi
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				B.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.partner_id,
				B.coa_id
				
				union all
				
				-- masukkan transaksi
				select 
				D.coareport_id, 
				B.partner_id,
				B.coa_id,
				0 as saldoawal,
				SUM(jurnaldetil_validr) as mutasi
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
							left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				A.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.partner_id,
				B.coa_id
				
			) AX
			group by
			AX.coa_id, AX.partner_id	
			order by 	
			AX.coa_id, AX.partner_id	
		";
	}






	function get_sqljurnalsummary_bydeptpartner() {
		return "
			select
			AX.coa_id,
			(select coa_name from mst_coa where coa_id = AX.coa_id) as coa_name,
			(select dept_name from mst_dept where dept_id = AX.dept_id) as dept_name,
			(select partner_name from mst_partner where partner_id = AX.partner_id) as partner_name,
			SUM(AX.saldoawal) as saldoawal,
			SUM(AX.mutasi) as mutasi,
			SUM(AX.saldoawal) + SUM(AX.mutasi) as saldoakhir
			from (
				
				-- masukkan saldo awal
				select
				D.coareport_id, 
				B.dept_id,
				B.partner_id,
				B.coa_id,
				SUM(jurnalsaldo_awal_idr) as saldoawal,
				0 as mutasi
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				B.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.partner_id,
				B.coa_id
				
				union all
				
				-- masukkan transaksi
				select 
				D.coareport_id, 
				B.dept_id,
				B.partner_id,
				B.coa_id,
				0 as saldoawal,
				SUM(jurnaldetil_validr) as mutasi
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
							left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				A.periodemo_id=:periodemo_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.partner_id,
				B.coa_id
				
			) AX
			group by
			AX.coa_id, AX.dept_id, AX.partner_id	
			order by 	
			AX.coa_id, AX.dept_id, AX.partner_id	
		";
	}




	function get_sqljurnalsummarydetil() {
		return "
			select
			AX.coa_id,
			(select dept_name from mst_dept where dept_id = AX.dept_id) as dept_name,
			FORMAT(SUM(AX.saldoawal), 0) as saldoawal,
			SUM(AX.mutasi) as mutasi,
			case when SUM(AX.mutasi) >= 0 then FORMAT(SUM(AX.mutasi), 0) else 0 end as debet,
			case when SUM(AX.mutasi) < 0 then FORMAT(SUM(AX.mutasi), 0) else 0 end as kredit,
			FORMAT(SUM(AX.saldoawal) + SUM(AX.mutasi), 0) as saldoakhir
			from (
				
				-- masukkan saldo awal
				select
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				SUM(jurnalsaldo_awal_idr) as saldoawal,
				0 as mutasi
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				    B.periodemo_id=:periodemo_id
				and B.coa_id=:coa_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
				union all
				
				-- masukkan transaksi
				select 
				D.coareport_id, 
				B.dept_id,
				B.coa_id,
				0 as saldoawal,
				SUM(jurnaldetil_validr) as mutasi
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
							left join mst_coa C on C.coa_id = B.coa_id
							left join mst_coatype D on D.coatype_id = C.coatype_id 
				where 
				    A.periodemo_id=:periodemo_id
				and B.coa_id=:coa_id
				group by
				D.coareport_id, 
				B.dept_id,
				B.coa_id
				
			) AX
			group by
			AX.coa_id		
		
		";
	}

}
