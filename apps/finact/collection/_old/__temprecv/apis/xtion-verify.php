<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';
require_once __ROOT_DIR.'/core/sequencer.php';
require_once __ROOT_DIR.'/core/currency.php';
require_once __DIR__ . '/xtion.base.php';




use \FGTA4\exceptions\WebException;
use \FGTA4\utils\Sequencer;
use \FGTA4\utils\Currency;
use \FGTA4\debug;


$API = new class extends TemprecvXtionBase {
	function __construct() {
		// $logfilepath = __LOCALDB_DIR . "/output/projbudget.txt";
		// debug::start($logfilepath, "w");
		// debug::log("start debug");

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


	public function execute($id, $param) {
		$userdata = $this->auth->session_get_user();
		try {
			$this->CURR = new Currency($this->db);

			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'detil'  => $this->get_detil_rows($id),
				'user' => $userdata
			];	

			$periodemo_id = $this->get_periode_bydate($currentdata->header->temprecv_date);


			$this->periode_check($periodemo_id);
			$this->pre_post_check($currentdata, 'commit');

			$currentdata->header->periodemo_id = $periodemo_id;
			$currentdata->header->curr_id = $this->CURR->getLocalCurrency();

			// $currentdata->header->jurnal_id_tax = $this->NewId('TP');
			$currentdata->header->curr_id = $this->CURR->getLocalCurrency();
			

			
			// Buat Jurnal OR
			if ($currentdata->header->temprecv_validrtotal > 0) {
				$currentdata->header->jurnal_id_or = $this->NewId('OR');
				$jurnal = (object)[
					'header' => $this->create_docjurnal_or_header($currentdata),
					'detil' => $this->create_docjurnal_or_detil($currentdata)
				];
				$this->save_to_jurnal($jurnal);			
			}

			// // Buat Jurnal Pajak
			if ($currentdata->header->temprecv_taxidrtotal > 0) {
				$currentdata->header->jurnal_id_tax = $this->NewId('TP');
				$jurnal = (object)[
					'header' => $this->create_docjurnal_tax_header($currentdata),
					'detil' => $this->create_docjurnal_tax_detil($currentdata)
				];
				$this->save_to_jurnal($jurnal);			
			}


			$this->save_and_set_verify_flag($currentdata);

			return (object)[
				'success' => true,
				'version' => $currentdata->header->temprecv_version
			];
		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	public function save_and_set_verify_flag($currentdata) {

		try {

			$sql = " 
				update trn_temprecv
				set 
				jurnal_id_or = case when :jurnal_id_or <> '' then :jurnal_id_or else null end,
				jurnal_id_tax = case when :jurnal_id_tax <> '' then :jurnal_id_tax else null end,
				temprecv_isverify = 1,
				temprecv_verifyby = :username,
				temprecv_verifydate = :date
				where
				temprecv_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $currentdata->header->temprecv_id,
				":username" => $currentdata->user->username,
				":date" => date("Y-m-d H:i:s"),
				":jurnal_id_or" =>  $currentdata->header->jurnal_id_or,
				":jurnal_id_tax" =>  $currentdata->header->jurnal_id_tax,
			]);

		} catch (\Exception $ex) {
			throw $ex;
		}	
	}	

	public function NewId($seqname) {
			$dt = new \DateTime();	
			$ye = $dt->format("y");
			$mo = $dt->format("m");
			$seq = new Sequencer($this->db, 'seq_generalmonthly', $seqname, ['ye', 'mo']);
			$raw = $seq->getraw(['ye'=>$ye, 'mo'=> $mo]);
			$id = $seqname . $raw['ye'] . $raw['mo'] . str_pad($raw['lastnum'], 4, '0', STR_PAD_LEFT);
			return $id;		
			
	}


	function create_docjurnal_or_header($currentdata) {
		$header = (object)[
			'jurnal_id' => $currentdata->header->jurnal_id_or,
			'jurnal_ref' => $currentdata->header->temprecv_ref,
			'jurnal_date' => $currentdata->header->temprecv_date,
			'jurnal_descr' => $currentdata->header->temprecv_descr,
			'jurnal_ispost' => 1,
			'periodemo_id' => $currentdata->header->periodemo_id,
			'curr_id' => $currentdata->header->curr_id,
			'_createby' => $currentdata->user->username,
			'jurnaltype_id' => 'ARTAGIHAN',
			'jurnalsource_id' => 'BILLOUT',
			'_createdate' => date("Y-m-d H:i:s")
		];
		return $header;
	}

	function create_docjurnal_or_detil($currentdata) {
		$records = [];

		// echo "<pre>";
		// print_r($currentdata->header->partner_id);
		// echo "</pre>";

		$total_debet = 0;
		foreach ($currentdata->detil as $data) {
			// DEBET
			$total_debet += $data->temprecvdetil_validr;
			$records[] = (object)[
				'jurnaldetil_id' => uniqid() ,
				'jurnaldetil_descr' =>  $data->temprecvdetil_descr,
				'jurnaldetil_valfrg' => $data->temprecvdetil_validr,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' =>  $data->temprecvdetil_validr,
				'coa_id' => $data->coa_id_or,
				'dept_id' => $currentdata->header->dept_id,
				'partner_id' => $currentdata->header->partner_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnal_id' => $currentdata->header->jurnal_id_or,
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")				
			];
		}

		// // KREDIT
		$records[] = (object)[
			'jurnaldetil_id' => uniqid() ,
			'jurnaldetil_descr' => $data->temprecvdetil_descr,
			'jurnaldetil_valfrg' => -$total_debet,
			'jurnaldetil_valfrgrate' => 1,
			'jurnaldetil_validr' =>  -$total_debet,
			'coa_id' => $currentdata->header->coa_id,
			'dept_id' => $currentdata->header->dept_id,
			'partner_id' => $currentdata->header->partner_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnal_id' =>  $currentdata->header->jurnal_id_or,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];


		return $records;
	}






	function create_docjurnal_tax_header($currentdata) {
		$header = (object)[
			'jurnal_id' => $currentdata->header->jurnal_id_tax,
			'jurnal_ref' => $currentdata->header->temprecv_ref,
			'jurnal_date' => $currentdata->header->temprecv_date,
			'jurnal_descr' => "[TAX] " . $currentdata->header->temprecv_descr,
			'jurnal_ispost' => 1,
			'periodemo_id' => $currentdata->header->periodemo_id,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")
		];
		return $header;
	}


	function create_docjurnal_tax_detil($currentdata) {
		$records = [];

		$total_debet = 0;
		foreach ($currentdata->detil as $data) {
			// DEBET
			$total_debet += $data->temprecvdetil_taxidr;
			$records[] = (object)[
				'jurnaldetil_id' => uniqid() ,
				'jurnaldetil_descr' =>  $data->temprecvdetil_descr,
				'jurnaldetil_valfrg' => $data->temprecvdetil_taxidr,
				'jurnaldetil_valfrgrate' => 1,
				'jurnaldetil_validr' =>  $data->temprecvdetil_taxidr,
				'coa_id' => $data->coa_id_tax,
				'dept_id' => $currentdata->header->dept_id,
				'partner_id' => $currentdata->header->partner_id,
				'curr_id' => $currentdata->header->curr_id,
				'jurnal_id' => $currentdata->header->jurnal_id_tax,
				'_createby' => $currentdata->user->username,
				'_createdate' => date("Y-m-d H:i:s")				
			];
		}

		// // KREDIT
		$records[] = (object)[
			'jurnaldetil_id' => uniqid() ,
			'jurnaldetil_descr' => $data->temprecvdetil_descr,
			'jurnaldetil_valfrg' => -$total_debet,
			'jurnaldetil_valfrgrate' => 1,
			'jurnaldetil_validr' =>  -$total_debet,
			'coa_id' => $currentdata->header->coa_id,
			'dept_id' => $currentdata->header->dept_id,
			'partner_id' => $currentdata->header->partner_id,
			'curr_id' => $currentdata->header->curr_id,
			'jurnal_id' =>  $currentdata->header->jurnal_id_tax,
			'_createby' => $currentdata->user->username,
			'_createdate' => date("Y-m-d H:i:s")				
		];


		return $records;
	}

};