<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


/**
 * finact/collection/colltarget/colltarget.php
 *
 * ===================================================================
 * Entry point Program Module colltarget
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/10/2021
 */
$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();


		try {

			// parameter=parameter yang bisa diakses langsung dari javascript module
			// dengan memanggil variable global.setup.<namavariable>
			$this->setup = (object)array(
				'print_to_new_window' => false,
				'username' => $userdata->username,
				'dept_id' => '12112000',
				'dept_name' => 'Finance & Collection',
				'empl_id' => $userdata->empl_id,
				'empl_name' => $userdata->empl_name,
				'doc_id' => 'INQUIRY',
			);

			$variancename = $_GET['variancename'];
			switch ($variancename) {
				default:
					break;
			} 

		} catch (\Exception $ex) {
			$this->error($ex->getMessage());
		}			
	
	}


};
