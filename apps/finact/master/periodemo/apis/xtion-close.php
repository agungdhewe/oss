<?php namespace FGTA4\apis;

if (!defined('FGTA4')) {
	die('Forbiden');
}


require_once __ROOT_DIR.'/core/sqlutil.php';
require_once __DIR__ . '/xapi.base.php';



use \FGTA4\exceptions\WebException;
use \FGTA4\debug;


$API = new class extends periodemoBase {

	public function execute($id, $param) {
		$tablename = 'mst_periodemo';
		$primarykey = 'periodemo_id';
		$userdata = $this->auth->session_get_user();

		try {

			$currentdata = (object)[
				'header' => $this->get_header_row($id),
				'user' => $userdata
			];

			$this->pre_action_check($currentdata, 'close');
			$this->periode_close_check($currentdata);


			$this->db->setAttribute(\PDO::ATTR_AUTOCOMMIT,0);
			$this->db->beginTransaction();
			
			
			try {
				
				$this->save_and_set_close_flag($id, $currentdata);

				$record = []; $row = $this->get_header_row($id);
				foreach ($row as $key => $value) { $record[$key] = $value; }
				$dataresponse = (object) array_merge($record, [
					//  untuk lookup atau modify response ditaruh disini
				]);

				\FGTA4\utils\SqlUtility::WriteLog($this->db, $this->reqinfo->modulefullname, $tablename, $id, 'CLOSE', $userdata->username, (object)[]);

				$this->db->commit();
				return (object)[
					'success' => true,
					'dataresponse' => $dataresponse
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


	public function save_and_set_close_flag($id, $currentdata) {
		try {
			$sql = " 
				update mst_periodemo
				set 
				periodemo_isclosed = 1,
				periodemo_closeby = :username,
				periodemo_closedate = :date
				where
				periodemo_id = :id
			";

			$stmt = $this->db->prepare($sql);
			$stmt->execute([
				":id" => $id,
				":username" => $currentdata->user->username,
				":date" => date("Y-m-d H:i:s")
			]);
		} catch (\Exception $ex) {
			throw $ex;
		}	
	}

	function periode_close_check($currentdata) {
		try {

			// cek apakah periode sebelumnya sudah di close
			$stmt = $this->db->prepare("select * from mst_periodemo where periodemo_id = :id");
			$stmt->execute([":id" => $currentdata->header->periodemo_prev]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Data '{$currentdata->header->periodemo_prev}' tidak ditemukan"); }
			if ($rows[0]['periodemo_isclosed']==0) { throw new \Exception("Periode sebelumnya '{$currentdata->header->periodemo_prev}' belum di close"); }

			// cek apakah periode setelahya sudah dibuat
			$stmt = $this->db->prepare("select * from mst_periodemo where periodemo_prev = :id");
			$stmt->execute([":id" => $currentdata->header->periodemo_id]);
			$rows = $stmt->fetchall(\PDO::FETCH_ASSOC);
			if (!count($rows)) { throw new \Exception("Periode lanjutan dari '{$currentdata->header->periodemo_id}' belum dibuat"); }
			if ($rows[0]['periodemo_isclosed']==1) { throw new \Exception("Periode lanjutan '{$currentdata->header->periodemo_prev}' masih close"); }


		} catch (\Exception $ex) {
			throw $ex;
		}	
	}


};


