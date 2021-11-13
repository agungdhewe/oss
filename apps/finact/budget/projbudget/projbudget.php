<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


/**
 * finact/budget/projbudget/projbudget.php
 *
 * ===================================================================
 * Entry point Program Module projbudget
 * ===================================================================
 * Program yang akan pertama kali diakses 
 * oleh semua request untuk menampilkan modul 
 *
 * Agung Nugroho <agung@fgta.net> http://www.fgta.net
 * Tangerang, 26 Maret 2021
 *
 * digenerate dengan FGTA4 generator
 * tanggal 10/06/2021
 */
$MODULE = new class extends WebModule {

	public function LoadPage() {
		$userdata = $this->auth->session_get_user();

		// parameter=parameter yang bisa diakses langsung dari javascript module
		// dengan memanggil variable global.setup.<namavariable>
		$this->setup = (object)array(
			'print_to_new_window' => false,
			'username' => $userdata->username,
			'dept_id' => $userdata->dept_id,
			'dept_name' => $userdata->dept_name,
			'current_year' => date('Y'),
			'current_month' => (int)date('m'),
			'doc_id' => 'PROJBUDGET',
		);

		$variancename = $_GET['variancename'];
		switch ($variancename) {
			default:
				break;
		} 
	
	}


};
