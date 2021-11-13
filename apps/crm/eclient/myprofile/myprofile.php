<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 
if (__TEMPLATE!='fgta-content') die('Module ini hanya bisa menggunakan template fgta-content');

class MyProfile extends WebModule {
	
	public function LoadPage() {
		$this->useminiheader = true;
		$this->preloadsstyles = array(
			'index.php/jslibs/fgta/fgta__component.css'
		);
	}
}

$MODULE = new MyProfile();