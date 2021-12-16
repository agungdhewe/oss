<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __ROOT_DIR.'/core/debug.php';

require_once __DIR__ . '/xapi.base.php';

use \FGTA4\exceptions\WebException;


$API = new class extends logproofBase {

	public function execute($id, $data) {
		$userdata = $this->auth->session_get_user();



		try {
			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();


			$interface_id = 'LTS';

			$sql_cek_mediaorder = "
				select *
				from trn_mediaorder
				where
				mediaorder_id = :mediaorder_id		
			";

			$sql_cek_partner = "
				select A.partner_id 
				from mst_partner A inner join mst_partnerref B on B.partner_id =A.partner_id 
				WHERE 
				B.interface_id = :interface_id
				and B.partnerref_code  = :partnerref_code
			";

			$sql_cek_brand = "
				select A.brand_id 
				from mst_brand A inner join mst_brandref B on B.brand_id =A.brand_id 
				WHERE 
				B.interface_id = :interface_id
				and B.brandref_code  = :brandref_code
			";


			$stmts = (object)[
				'cek_mediaorder' => $this->db->prepare($sql_cek_mediaorder),
				'cek_partner' =>  $this->db->prepare($sql_cek_partner),
				'cek_brand' =>  $this->db->prepare($sql_cek_brand),
			];


			try {
				
				$errors = [];

				// hapus dulu logproofraw
				$stmtreset = $this->db->prepare("delete from trn_medialogproofupload where medialogproof_id = :medialogproof_id ");
				$stmtreset->execute([':medialogproof_id' => $id]);

				
				$i = 0;
				foreach ($data as $itemrow) {
					$i++;
					$itemrow->nobaris = $i;


					$MediaOrderId = $itemrow->MediaOrderId;
					$stmt = $stmts->cek_mediaorder;
					$stmt->execute([':mediaorder_id'=>$MediaOrderId]);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows)==0) {
						$errors[] = "Baris $i; Media order '$MediaOrderId' belum dibuat ";
					}

					
					// cek agency
					$AgencyCode = $itemrow->AgencyCode;
					$stmt = $stmts->cek_partner;
					$stmt->execute([':interface_id'=>$interface_id,  ':partnerref_code'=>$AgencyCode ]);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows)==0) {
						$errors[] = "Baris $i; Referensi interface agency '$AgencyCode' belum di definisikan pada master Partner ";
					}
					$agency_partner_id = $rows[0]['partner_id'];

					// Cek advertiser	
					$AdvertiserCode = $itemrow->AdvertiserCode;
					$stmt = $stmts->cek_partner;
					$stmt->execute([':interface_id'=>$interface_id,  ':partnerref_code'=>$AdvertiserCode ]);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows)==0) {
						$errors[] = "Baris $i; Referensi interface advertiser '$AdvertiserCode' belum di definisikan pada master Partner ";
					}
					$advertiser_partner_id = $rows[0]['partner_id'];
	

					// Cek brand
					$BrandCode = $itemrow->BrandCode;
					$stmt = $stmts->cek_brand;
					$stmt->execute([':interface_id'=>$interface_id,  ':brandref_code'=>$BrandCode ]);
					$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
					if (count($rows)==0) {
						$errors[] = "Baris $i; Referensi interface brand '$BrandCode' belum di definisikan pada master Brand ";
					}
					$brand_id = $rows[0]['brand_id'];
					
					$itemrow->agency_partner_id = $agency_partner_id;
					$itemrow->advertiser_partner_id = $advertiser_partner_id;
					$itemrow->brand_id = $brand_id;

					$this->CreateLogProofRaw($id, $itemrow, $userdata);
					$this->CreateLogProofDetil($id);


				}
	
				$this->db->commit();
				return (object)[
					'success' => count($errors)>0 ? false : true,
					'errormessage' => count($errors)>0 ? 'Ada satu atau lebih data yang belum di mapping' : '',
					'errors' => $errors
				];
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}

		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	function CreateLogProofRaw($id, $itemrow, $userdata) {
		try {

			$obj = new \stdClass;
			$obj->nobaris = $itemrow->nobaris;
			$obj->medialogproofupload_id = \uniqid();	
			$obj->mediaadslot_timestart	= $itemrow->SlotTimeStart;
			$obj->mediaadslot_timeend = $itemrow->SlotTimeEnd;	
			$obj->mediaadslot_duration = $itemrow->SlotDuration;	
			$obj->mediaadslot_descr	= $itemrow->SlotDescr;
			$obj->mediaadslot_code = $itemrow->SlotCode;	
			$obj->actual_timestart = $itemrow->ActualTimeStart;	
			$obj->actual_timeend = $itemrow->ActualTimeEnd;
			$obj->actual_duration = $itemrow->ActualDuration;
			$obj->spot_id = $itemrow->SpotId;	
			$obj->mediaorder_ref = 	$itemrow->MediaOrderRef;
			$obj->mediaorder_reftype = $itemrow->TypeMediaOrder;	
			$obj->mediaorder_descr = $itemrow->MediaOrderDescr;	
			$obj->mediaorder_id	= $itemrow->MediaOrderId;
			// $obj->mediaordertype_id	
			$obj->agency_code = $itemrow->AgencyCode;	
			$obj->agency_name = $itemrow->AgencyName;	
			$obj->agency_partner_id	= $itemrow->agency_partner_id;
			$obj->advertiser_code = $itemrow->AdvertiserCode;
			$obj->advertiser_name = $itemrow->AdvertiserName;
			$obj->advertiser_partner_id	= $itemrow->advertiser_partner_id;
			$obj->brand_code = $itemrow->BrandCode;	
			$obj->brand_name = $itemrow->BrandName;	
			$obj->brand_id	= $itemrow->brand_id;
			$obj->programme_code = $itemrow->ProgrammeCode;	
			$obj->programme_name = $itemrow->ProgrammeName;	
			// $obj->project_id = 	
			$obj->episode_code	= $itemrow->EpisodeCode;
			$obj->episode_name	= $itemrow->EpisodeName;
			// $obj->projecttask_id	
			//$obj->medialogproof_validr = $itemrow->Value;	
			//$obj->medialogproof_ppnidr = ((float)$itemrow->Value) * (10/100); 	
			//$obj->pph_taxtype_id = 'PPN';
			$obj->medialogproof_id	= $id;
	
			$obj->_createby =  $userdata->username;
			$obj->_createdate = date("Y-m-d H:i:s");
	
			$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_medialogproofupload", $obj);
			$stmt = $this->db->prepare($cmd->sql);
			$stmt->execute($cmd->params);


		} catch (\Exception $ex) {
			throw $ex;
		}
 
	}


	function CreateLogProofDetil($id) {
		try {


		} catch (\Exception $ex) {
			throw $ex;
		}
	}


	
};


