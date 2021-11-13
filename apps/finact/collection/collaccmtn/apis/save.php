<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}

require_once __ROOT_DIR.'/core/sqlutil.php';
// require_once __ROOT_DIR . "/core/sequencer.php";
require_once __DIR__ . '/xapi.base.php';


use \FGTA4\exceptions\WebException;
// use \FGTA4\utils\Sequencer;



/**
 * finact/collection/collaccmtn/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header collaccmtn (trn_collaccmtn)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/10/2021
 */
$API = new class extends collaccmtnBase {
	
	public function execute($data, $options) {
		$tablename = 'trn_collaccmtn';
		$primarykey = 'collaccmtn_id';
		$autoid = $options->autoid;
		$datastate = $data->_state;

		$userdata = $this->auth->session_get_user();

		try {

			// cek apakah user boleh mengeksekusi API ini
			if (!$this->RequestIsAllowedFor($this->reqinfo, "save", $userdata->groups)) {
				throw new \Exception('your group authority is not allowed to do this action.');
			}

			$result = new \stdClass; 
			
			$key = new \stdClass;
			$obj = new \stdClass;
			foreach ($data as $fieldname => $value) {
				if ($fieldname=='_state') { continue; }
				if ($fieldname==$primarykey) {
					$key->{$fieldname} = $value;
				}
				$obj->{$fieldname} = $value;
			}

			// apabila ada tanggal, ubah ke format sql sbb:
			// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
			$obj->collaccmtn_date = (\DateTime::createFromFormat('d/m/Y',$obj->collaccmtn_date))->format('Y-m-d');
			$obj->collaccmtn_nextactdate = (\DateTime::createFromFormat('d/m/Y',$obj->collaccmtn_nextactdate))->format('Y-m-d');

			$obj->partnercontact_upname = strtoupper($obj->partnercontact_upname);
			$obj->partnercontact_position = strtoupper($obj->partnercontact_position);
			$obj->partnercontact_upphone = strtoupper($obj->partnercontact_upphone);
			$obj->partnercontact_email = strtoupper($obj->partnercontact_email);


			if ($obj->collaccmtn_notes=='') { $obj->collaccmtn_notes = '--NULL--'; }
			if ($obj->collaccmtn_response=='') { $obj->collaccmtn_response = '--NULL--'; }
			if ($obj->collaccmtn_nextactnotes=='') { $obj->collaccmtn_nextactnotes = '--NULL--'; }


			unset($obj->collaccmtn_iscommit);
			unset($obj->collaccmtn_commitby);
			unset($obj->collaccmtn_commitdate);



			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $this->NewId([]);
					}
					$obj->_createby = $userdata->username;
					$obj->_createdate = date("Y-m-d H:i:s");
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert($tablename, $obj);
				} else {
					$action = 'MODIFY';
					$obj->_modifyby = $userdata->username;
					$obj->_modifydate = date("Y-m-d H:i:s");				
					$cmd = \FGTA4\utils\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
				}
	
				$stmt = $this->db->prepare($cmd->sql);
				$stmt->execute($cmd->params);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $obj->{$primarykey}, $action, $userdata->username, (object)[]);




				// result
				$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
				$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
					$primarykey
					, 'collaccmtn_id', 'periodemo_id', 'collaccmtn_date', 'empl_id', 'dept_id', 'partner_id', 'partnercontact_id', 'partnercontact_upname', 'partnercontact_position', 'partnercontact_upphone', 'partnercontact_email', 'collfuptype_id', 'collaccmtn_descr', 'collaccmtn_notes', 'collaccmtn_response', 'collaccmtn_nextactdate', 'collaccmtn_nextactnotes', 'collaccmtn_version', 'collaccmtn_iscommit', 'collaccmtn_commitby', 'collaccmtn_commitdate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
				], $where->sql);
				$stmt = $this->db->prepare($sql);
				$stmt->execute($where->params);
				$row  = $stmt->fetch(\PDO::FETCH_ASSOC);			

				$record = [];
				foreach ($row as $key => $value) {
					$record[$key] = $value;
				}
				$result->dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
				'periodemo_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_id'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'collaccmtn_date' => date("d/m/Y", strtotime($row['collaccmtn_date'])),
				'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
				'dept_name' => \FGTA4\utils\SqlUtility::Lookup($record['dept_id'], $this->db, 'mst_dept', 'dept_id', 'dept_name'),
				'partner_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_id'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
				'partnercontact_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnercontact_id'], $this->db, 'mst_partnercontact', 'partnercontact_id', 'partnercontact_name'),
				'collfuptype_name' => \FGTA4\utils\SqlUtility::Lookup($record['collfuptype_id'], $this->db, 'mst_collfuptype', 'collfuptype_id', 'collfuptype_name'),
				'collaccmtn_nextactdate' => date("d/m/Y", strtotime($row['collaccmtn_nextactdate'])),
				'collaccmtn_commitby' => \FGTA4\utils\SqlUtility::Lookup($record['collaccmtn_commitby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),

					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);



				$this->db->commit();
				return $result;

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

	public function NewId($param) {
					return uniqid();
	}

};