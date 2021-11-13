'use strict';

import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


const pnlname = 'pnl_login';
const form = component.Form(document.getElementById(pnlname).getElementsByTagName('form')[0]);
const txt_username = component.Textbox('txt_username');
const txt_password = component.Textbox('txt_password');
const btn_login = component.Button('btn_login');


component.api.useMessager(component.Messager);
export async function init(param) {
	btn_login.addEventListener('click', (ev) => { btn_login_click(ev) });
}




async function btn_login_click(ev) {

	// Kirim data
	try {

		component.Messager.Wait();
		var apiname = 'crm/eclient/login/dologin';
		var apidata = {
			data: {
				username: txt_username.Text,
				password: txt_password.Text
			}
		}
		var result = await component.api.call(apiname, apidata);
		component.Messager.Wait(false);

		console.log(result);
		location.href = 'index.php/module/crm/eclient/home';
	} catch (err) {
		component.Messager.Wait(false);
		if (err.isInvalidForm===true) {
			component.Messager.Warning(err.message, {
				'Ok': function(elmask) {
					err.CheckedElement.focus();
					elmask.Close();
				}
			});
		} else if (err.debuging!==true) {
			component.Messager.Error(err.message);
		}
	}

		
}
