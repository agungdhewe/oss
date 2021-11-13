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
 * finact/master/periodemo/apis/save.php
 *
 * ====
 * Save
 * ====
 * Menampilkan satu baris data/record sesuai PrimaryKey,
 * dari tabel header periodemo (mst_periodemo)
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 18/05/2021
 */
$API = new class extends periodemoBase {
	
	public function execute($data, $options) {
		$tablename = 'mst_periodemo';
		$primarykey = 'periodemo_id';
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
			// $obj->periodemo_dtstart = (\DateTime::createFromFormat('d/m/Y',$obj->periodemo_dtstart))->format('Y-m-d');			$obj->periodemo_dtend = (\DateTime::createFromFormat('d/m/Y',$obj->periodemo_dtend))->format('Y-m-d');			$obj->periodemo_closedate = (\DateTime::createFromFormat('d/m/Y',$obj->periodemo_closedate))->format('Y-m-d');
			// $obj->periodemo_id = strtoupper($obj->periodemo_id);
			// $obj->periodemo_name = strtoupper($obj->periodemo_name);
			// $obj->periodemo_prev = strtoupper($obj->periodemo_prev);


			// if ($obj->periodemo_closeby=='--NULL--') { unset($obj->periodemo_closeby); }
			// if ($obj->periodemo_closedate=='--NULL--') { unset($obj->periodemo_closedate); }
			$startPeriod = '01'.'/'.$obj->periodemo_month.'/'.$obj->periodemo_year;          
			$obj->periodemo_dtstart = \DateTime::createFromFormat('d/m/Y', $startPeriod)->format('Y-m-d');
			$obj->periodemo_dtend = \DateTime::createFromFormat('d/m/Y', $startPeriod)->format('Y-m-t');
			$obj->periodemo_name = strtoupper($this->NamaBulan($this->ZeroFill($obj->periodemo_month,2))).' '.$obj->periodemo_year;

			unset($obj->periodemo_isclosed);
			unset($obj->periodemo_closeby);
			unset($obj->periodemo_closedate);

			$assigned_periodemo_id = $this->NewId($obj->periodemo_year, $obj->periodemo_month);

			// previous periode
			if ($obj->periodemo_month==1) {
				$prev_month = 12;
				$prev_year = ((int)$obj->periodemo_year) - 1;
			} else {
				$prev_month = ((int)$obj->periodemo_month) - 1;
				$prev_year = $obj->periodemo_year;
			}
			$obj->periodemo_prev = $this->NewId($prev_year, $prev_month);


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();

			try {

				$action = '';
				if ($datastate=='NEW') {
					$action = 'NEW';
					if ($autoid) {
						$obj->{$primarykey} = $assigned_periodemo_id; //$this->NewId($obj->periodemo_year, $obj->periodemo_month);
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



				$this->db->commit();
			} catch (\Exception $ex) {
				$this->db->rollBack();
				throw $ex;
			} finally {
				$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,1);
			}


			$where = \FGTA4\utils\SqlUtility::BuildCriteria((object)[$primarykey=>$obj->{$primarykey}], [$primarykey=>"$primarykey=:$primarykey"]);
			$sql = \FGTA4\utils\SqlUtility::Select($tablename , [
				$primarykey
				, 'periodemo_id', 'periodemo_name', 'periodemo_year', 'periodemo_month', 'periodemo_dtstart', 'periodemo_dtend', 'periodemo_prev', 'periodemo_isclosed', 'periodemo_closeby', 'periodemo_closedate', '_createby', '_createdate', '_modifyby', '_modifydate', '_createby', '_createdate', '_modifyby', '_modifydate'
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
				'periodemo_dtstart' => date("d/m/Y", strtotime($row['periodemo_dtstart'])),
				'periodemo_dtend' => date("d/m/Y", strtotime($row['periodemo_dtend'])),
				'periodemo_prev_name' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_prev'], $this->db, 'mst_periodemo', 'periodemo_id', 'periodemo_name'),
				'periodemo_closeby' => \FGTA4\utils\SqlUtility::Lookup($record['periodemo_closeby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'periodemo_closedate' => date("d/m/Y", strtotime($row['periodemo_closedate'])),

				'_createby' => \FGTA4\utils\SqlUtility::Lookup($record['_createby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
				'_modifyby' => \FGTA4\utils\SqlUtility::Lookup($record['_modifyby'], $this->db, $GLOBALS['MAIN_USERTABLE'], 'user_id', 'user_fullname'),
			]);

			return $result;
		} catch (\Exception $ex) {
			throw $ex;
		}
	}

	public function NewId($year, $month) {            
		$mstr = $this->ZeroFill($month, 2);
		$period = $year.$mstr;
		return $period;
	}

	function ZeroFill($value, $fillfactor){        
		$str = str_pad($value, $fillfactor, '0',  STR_PAD_LEFT);
		return $str;
	}

	function NamaBulan($value){
		$bulan = array( '01'=>'Januari', '02'=>'Februari', '03'=>'Maret', '04'=>'April', '05'=>'Mei', '06'=>'Juni', '07'=>'Juli', '08'=>'Agustus', '09'=>'September', '10'=>'Oktober', '11'=>'November','12'=>'Desember');
		return $str = $bulan[$value];
	}

};