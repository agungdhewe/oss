<?php namespace FGTA4;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR . '/apps/finact/acct/jurnal/apis/xlib-jurnal.php';

require_once __DIR__ . '/xapi.base.php';


class SalesOrder {

	function __construct($params) {
		$this->auth = $params->auth;
		$this->reqinfo = $params->reqinfo;
		$this->db = $params->db;
	}


	/*
	Masukkan sales ke Jurnal
	cara pakai:
	$so = new \FGTA4\SalesOrder((object)[
		'auth' => $this->auth,
		'reqinfo' => $this->reqinfo,
		'db' => $this->db
	]);

	// dieksekusi di dalam transaksi
	$so->SaveToJurnal($currentdata);
	*/

	function SaveToJurnal($currentdata) {
		try {
			$jur = new \FGTA4\ActJurnal((object)[
				'auth' => $this->auth,
				'reqinfo' => $this->reqinfo,
				'db' => $this->db
			]);

			$jurnal_id = $currentdata->header->salesorder_id;
			$periodemo_id = $jur->GetPeriodeByDate($currentdata->header->salesorder_date);	

			$jur->CheckPeriode($periodemo_id);
			$jur->RemoveJurnal($jurnal_id);	
		

			$obj = (object)[
				'jurnal_id' => $jurnal_id,
				'jurnal_ref' => '',
				'jurnal_date' => $currentdata->header->salesorder_date,
				'jurnal_descr' => $currentdata->header->salesorder_descr,
				'jurnal_iscommit' => 1,
				'jurnal_ispost' => 0,
				'periodemo_id' => $periodemo_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnaltype_id' => 'SALES',
				'jurnalsource_id' => 'SALESORDER',
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")				
			];
			$jur->InsertJurnalHeader($obj);


			$total_idr = 0;
			$total_discount_idr = 0;
			foreach ($currentdata->items as $item) {
				$total_discount_idr += $item['salesorderitem_discountidr'];
				$total_idr += $item['salesorderitem_totalidr'];
			}

			$sales_gross_idr = $total_idr + $total_discount_idr;


			// Sales Nett before Tax
			$obj = (object)[
				'jurnaldetil_id' => uniqid(),
				'jurnaldetil_descr' =>  $currentdata->header->salesorder_descr,
				'jurnaldetil_valfrg' => -$sales_gross_idr,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' =>  -$sales_gross_idr,
				'coa_id' => $detil['coa_id'],
				'dept_id' => $currentdata->header->dept_id,
				'partner_id' => $currentdata->header->partner_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnal_id' => $jurnal_id,
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")
			];
			$jur->InsertJurnalDetil($obj);


			// Sales Discount





		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function SaveToSalesOrderHeader($data) {

	}

	function SaveToSalesOrderItem($data) {

	}



}

