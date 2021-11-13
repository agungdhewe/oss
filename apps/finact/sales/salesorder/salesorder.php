<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


/**
 * finact/sales/salesorder/salesorder.php
 *
 * ===================================================================
 * Entry point Program Module salesorder
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 22/04/2021
 */
$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();

		// parameter=parameter yang bisa diakses langsung dari javascript module
		// dengan memanggil variable global.setup.<namavariable>
		$this->setup = (object)array(
			'print_to_new_window' => false,
			'username' => $userdata->username,
			'doc_id' => 'SALESORDER',
		);

		$variancename = $_GET['variancename'];
		switch ($variancename) {
			default:
				break;
		} 
	
	}


};
