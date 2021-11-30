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
 * ent/affiliation/partner/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header partner (mst_partner)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 29/11/2021
 */
$API = new class extends partnerBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_partner';
		$primarykey = 'partner_id';
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

			$obj->partner_city = strtoupper($obj->partner_city);
			$obj->partner_country = strtoupper($obj->partner_country);
			$obj->partner_email = strtolower($obj->partner_email);




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
				$sql = \FGTA4\utils\SqlUtility::Select("$tablename A", [
					$primarykey
					, 'partner_id', 'partner_name', 'partner_addressline1', 'partner_addressline2', 'partner_postcode', 'partner_city', 'partner_country', 'partner_phone', 'partner_mobilephone', 'partner_email', 'partner_isdisabled', 'partner_isparent', 'partner_parent', 'partnertype_id', 'partnerorg_id', 'partner_npwp', 'partner_isnonnpwp', 'empl_id', 'ae_empl_id', 'col_empl_id', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
					, ['(select partnertype_isempl from mst_partnertype where partnertype_id=A.partnertype_id) as partnertype_isempl']
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
					'country_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_country'], $this->db, 'mst_country', 'country_id', 'country_name'),
					'partner_parent_name' => \FGTA4\utils\SqlUtility::Lookup($record['partner_parent'], $this->db, 'mst_partner', 'partner_id', 'partner_name'),
					'partnertype_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnertype_id'], $this->db, 'mst_partnertype', 'partnertype_id', 'partnertype_name'),
					'partnerorg_name' => \FGTA4\utils\SqlUtility::Lookup($record['partnerorg_id'], $this->db, 'mst_partnerorg', 'partnerorg_id', 'partnerorg_name'),
					'empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'ae_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['ae_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'col_empl_name' => \FGTA4\utils\SqlUtility::Lookup($record['col_empl_id'], $this->db, 'mst_empl', 'empl_id', 'empl_name'),
					'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
					'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				]);


				// Jika Karyawan, tambahkan 1 baris untuk contact
				if ($result->dataresponse->partnertype_isempl=='1') {
					$sql = "
						select * from mst_partnercontact where partner_id = :partner_id
					";
					$stmt = $this->db->prepare($sql);
					$stmt->execute(['partner_id'=>$result->dataresponse->partner_id]);
					$rows  = $stmt->fetchall(\PDO::FETCH_ASSOC);

					if (count($rows)==0) {
						$sql = "
							select 
							A.empl_name,
							(select hrjob_name from mst_hrjob where hrjob_id=A.hrjob_id) as hrjob_name
							from mst_empl A 
							where empl_id = :empl_id
						";
						$stmt = $this->db->prepare($sql);
						$stmt->execute(['empl_id' => $result->dataresponse->empl_id]);
						$row  = $stmt->fetch(\PDO::FETCH_ASSOC);	
						$hrjob_name = $row['hrjob_name'];

						$obj = new \stdClass;
						$obj->partnercontact_id = \uniqid();
						$obj->partnercontact_name = $result->dataresponse->partner_name;
						$obj->partnercontact_position = $hrjob_name;
						$obj->partnercontact_mobilephone = $result->dataresponse->partner_mobilephone;
						$obj->partnercontact_email = $result->dataresponse->partner_email;
						$obj->partner_id = $result->dataresponse->partner_id;
						$obj->_createby = $userdata->username;
						$obj->_createdate = date("Y-m-d H:i:s");
						
						$cmd = \FGTA4\utils\SqlUtility::CreateSQLInsert("mst_partnercontact", $obj);
						$stmt = $this->db->prepare($cmd->sql);
						$stmt->execute($cmd->params);

					}

				}



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