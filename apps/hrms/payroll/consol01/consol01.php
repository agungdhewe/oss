<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 


$MODULE = new class extends WebModule {
	public function LoadPage() {
		$this->preloadscripts = [
			'./jslibs/pouchdb.min.js',
			'./jslibs/pouchdb.find.min.js'
		];
	}
};
