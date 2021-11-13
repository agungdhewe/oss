<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class extends WebModule {

	public function LoadPage() {
		
		$this->setup = (object)array(
			'coa_id_or' => '1002174',
			'coa_name_or' => 'Bank Permata-2-Rp',
			'coa_id_tax' => '1202131',
			'coa_name_tax' => 'Persd. Prog Lokal - Tax',
			'trxmodel_id' => 'SAL',
			'trxmodel_name' => 'SALES',
			'dept_id' => 'COLL',
			'dept_name' => 'COLLECTION'
		);

		$variancename = $_GET['variancename'];
		switch ($variancename) {
			default:
				/* purchase request */
				break;
		} 
		
	}


};

