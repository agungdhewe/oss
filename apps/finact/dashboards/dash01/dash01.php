<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


class Dashboard extends WebModule {
	
	public function LoadPage() {
		//$this->variable = 'ini variable yang diset dari PHP';

		$this->preloadscripts = [
			'jslibs/moment.min.js',
			'jslibs/chart.min.js',
			'jslibs/chartjs-gauge.js'
		];

	}
}

$MODULE = new Dashboard();