'use strict';

import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


import * as pForm1 from './register-form-1.mjs';
import * as pForm2 from './register-form-2.mjs';
import * as pForm3 from './register-form-3.mjs';
import * as pSuccess from './register-success.mjs'; 



const pnl_form1 = document.getElementById('pnl_form_1');
const pnl_form2 = document.getElementById('pnl_form_2');
const pnl_form3 = document.getElementById('pnl_form_3');
const pnl_success = document.getElementById('pnl_success');


component.api.useMessager(component.Messager);
export async function init(param) {

	await $fgta.CreatePanelPages([
		{panel: pnl_form1, handler: pForm1},  // input email
		{panel: pnl_form2, handler: pForm2},  // konfirmasi
		{panel: pnl_form3, handler: pForm3},  // input password
		{panel: pnl_success, handler: pSuccess},
	], param);


	// console.log( window.location.pathname);

	// tidak bisa back
	history.pushState(null, null, window.location.pathname);
	window.addEventListener('popstate', function(ev) {
		history.pushState(null, null, window.location.pathname);
		// $fgta.showPreviousPanel();
	}, false);


	// $fgta.showPanel('pnl_form_3');

	// console.log(txt_perusahaan.Text);
	// txt_perusahaan.handle('ngikngok', (ev)=>{
	// 	console.log(ev.detail);
	// 	// txt_perusahaan.Text = 'satu dua tiga';
	// 	// ev.preventDefault();
		
	// });

	// txt_perusahaan.handle('after_ngikngok', (ev)=>{
	// 	console.log('selesai 1');
	// 	// txt_perusahaan.Text = 'satu dua tiga';
	// 	// ev.preventDefault();
	// 	ev.stopImmediatePropagation();
		
	// });	


	// txt_perusahaan.handle('after_ngikngok', (ev)=>{
	// 	console.log('selesai 2');
	// 	// txt_perusahaan.Text = 'satu dua tiga';
	// 	// ev.preventDefault();
		
	// });	
	
	
	// txt_perusahaan.handle('after_ngikngok', (ev)=>{
	// 	console.log('selesai 3');
	// 	// txt_perusahaan.Text = 'satu dua tiga';
	// 	// ev.preventDefault();
		
	// });		

	// txt_perusahaan.RaiseEvent('ngikngok', {satu:'satu', dua:'dua'});
}


