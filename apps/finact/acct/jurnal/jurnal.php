<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


/**
 * finact/acct/jurnal/jurnal.php
 *
 * ===================================================================
 * Entry point Program Module jurnal
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 24/09/2021
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
				'jurnaltype_id' => 'MAN-JV',
				'jurnaltype_name' => 'MANUAL-JV',
				'jurnalsource_id' => 'MANUAL',
				'jurnalsource_name' => 'MANUAL'
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
