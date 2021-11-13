'use strict';

import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


import * as pForm1 from './myprofile-form-1.mjs';

const pnl_form1 = document.getElementById('pnl_form_1');


component.api.useMessager(component.Messager);
export async function init(param) {

	await $fgta.CreatePanelPages([
		{panel: pnl_form1, handler: pForm1},  // input email
	], param);


	// console.log( window.location.pathname);

	// tidak bisa back
	history.pushState(null, null, window.location.pathname);
	window.addEventListener('popstate', function(ev) {
		history.pushState(null, null, window.location.pathname);
		// $fgta.showPreviousPanel();
	}, false);

}


