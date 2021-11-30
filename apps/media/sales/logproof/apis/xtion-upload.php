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

			try {

				$i = 0;
				foreach ($data as $itemrow) {
					$i++;
					$obj = new \stdClass;
					$obj->nobaris = $i;
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
					// $obj->mediaorder_id	
					// $obj->mediaordertype_id	
					$obj->agency_code = $itemrow->AgencyCode;	
					$obj->agency_name = $itemrow->AgencyName;	
					// $obj->agency_partner_id	
					$obj->advertiser_code = $itemrow->AdvertiserCode;
					$obj->advertiser_name = $itemrow->AdvertiserName;
					// $obj->advertiser_partner_id	
					$obj->brand_code = $itemrow->BrandCode;	
					$obj->brand_name = $itemrow->BrandName;	
					// $obj->brand_id	
					$obj->programme_code = $itemrow->ProgrammeCode;	
					$obj->programme_name = $itemrow->ProgrammeName;	
					// $obj->project_id = 	
					$obj->episode_code	= $itemrow->EpisodeCode;
					$obj->episode_name	= $itemrow->EpisodeName;
					// $obj->projecttask_id	
					$obj->medialogproof_validr = $itemrow->Value;	
					$obj->medialogproof_ppnidr = ((float)$itemrow->Value) * (10/100); 	
					$obj->pph_taxtype_id = 'PPN';
					$obj->medialogproof_id	= $id;

					$obj->_createby =  $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
		
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("trn_medialogproofupload", $obj);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);

				}
	
				$this->db->commit();
				return (object)[
					'success' => true,
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



	
};


