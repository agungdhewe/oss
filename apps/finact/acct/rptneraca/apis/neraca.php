<?php  

require_once __ROOT_DIR.'/core/debug.php';

use \FGTA4\debug;


class Neraca {
	function __construct($param) {
		$this->db = $param->db;
		$this->currentuser = $param->currentuser;
	}

	function getdata($objdt) {
		$pertanggal = $objdt->format('Y-m-d');
		$periodemo_id = $objdt->format('Ym');

		try {
			$periodeinfo = $this->periode_getinfo($periodemo_id, 1);
	
			
			$sql = $this->get_sqljurnalsummary($periodemo_id, $periodeinfo->prev->periodemo_id);
			$this->db->query($sql);

			$stmt = $this->db->prepare("
				select 
				*
				from (
					select 
					coareport_id, coatype_group, coatype_name, coatype_order, coagroup_id, coagroup_name, coagroup_path, SUM(saldo) as saldo
					from xtp_jurnalsaldo 
					where coareport_id = 'NR'
					group by 
					coareport_id, coatype_group, coatype_name, coatype_order, coagroup_id, coagroup_name, coagroup_path
					
					union
					
					select
					'NR', 'Ekuitas', 'RE berjalan', 1, 'RE', 'Akumulasi', '', SUM(saldo)
					from xtp_jurnalsaldo where coareport_id = 'LR'
				
				) N
				order by
				coareport_id, coatype_group, coatype_name, coatype_order, coagroup_path, coagroup_id, coagroup_name
			");

	
			$stmt->execute();	
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


	function get_sqljurnalsummary($periodemo_id, $prev_periodemo_id) {
		// insert into xtp_jurnalsaldo
		// (coareport_id, coatype_name, coatype_order, coagroup_name, coagroup_path, coa_id, coa_name, saldo)

		return "

		DROP TEMPORARY TABLE IF EXISTS xtp_jurnalsaldo;
		CREATE TEMPORARY TABLE xtp_jurnalsaldo (
			coareport_id varchar(10),
			coatype_group varchar(30),
			coatype_name varchar(90),
			coatype_order int,
			coagroup_id varchar(20),
			coagroup_name varchar(90),
			coagroup_path varchar(255),
			coa_id varchar(30),
			coa_name varchar(90),
			saldo decimal(14,2)
		);


		insert into xtp_jurnalsaldo
		(coareport_id, coatype_group, coatype_name, coatype_order, coagroup_id, coagroup_name, coagroup_path, coa_id, coa_name, saldo)
		select
		H.coareport_id ,
		H.coatype_group,
		H.coatype_name,
		H.coatype_order ,
		I.coagroup_id,
		I.coagroup_name,
		I.coagroup_path ,
		F.coa_id,
		G.coa_name, 
		F.saldo
		from (
			select
			AX.coa_id,
			SUM(AX.value) as saldo
			from (
				
				-- masukkan saldo awal
				select
				B.coa_id,
				SUM(jurnalsaldo_awal) as value
				from 
				trn_jurnalsaldo B  left join mst_coa C on C.coa_id = B.coa_id
				where 
				B.periodemo_id='$periodemo_id'
				group by
				B.coa_id
				having SUM(jurnalsaldo_awal)<>0
				
				union all
				
				-- masukkan transaksi
				select 
				B.coa_id,
				SUM(jurnaldetil_validr) as value
				from 
				(trn_jurnal A inner join trn_jurnaldetil B on B.jurnal_id = A.jurnal_id) 
				where 
				A.periodemo_id='$periodemo_id'
				group by
				B.coa_id
				having SUM(jurnaldetil_validr)<>0
				
			) AX
			group by
			AX.coa_id	
		) F left join mst_coa G on G.coa_id = F.coa_id
		    left join mst_coatype H on H.coatype_id = G.coatype_id 
		    left join mst_coagroup I on I.coagroup_id = G.coagroup_id ;
		";
	}

}
