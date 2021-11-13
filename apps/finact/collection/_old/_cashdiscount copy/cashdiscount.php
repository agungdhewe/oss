<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

$MODULE = new class extends WebModule {

	public function LoadPage() {
		
		$this->setup = (object)array(
			'doc_id' => 'CASHDISC',
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

