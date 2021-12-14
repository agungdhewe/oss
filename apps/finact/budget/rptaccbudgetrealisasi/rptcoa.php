<?php namespace FGTA4\module; if (!defined('FGTA4')) { die('Forbiden'); } 

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
			'current_date' => date('d/m/Y'),
		);

		$this->preloadscripts = [
			'jslibs/tabletoexcel.js'
		];

	}
};
