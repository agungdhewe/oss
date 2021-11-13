import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


const pnlname = 'pnl_form_1';
const form = component.Form(document.getElementById(pnlname).getElementsByTagName('form')[0]);
const txt_partner_name = component.Textbox(pnlname + '-partner_name');
const txt_partner_email = component.Textbox(pnlname + '-partner_email');
const btn_next = component.Button(pnlname + '-btn_next');


export async function init(param) {


	btn_next.addEventListener('click', (ev) => { btn_next_click(ev) });


}



async function btn_next_click(ev) {

	// Kirim data
	try {
		await form.CheckError();

		component.Messager.Wait();
		var apiname = 'crm/eclient/register/doregister';
		var apidata = {
			data: {
				partner_name: txt_partner_name.Text,
				partner_email: txt_partner_email.Text
			}
		}
		var result = await component.api.call(apiname, apidata);
		component.Messager.Wait(false);

		var pnl2handler = $fgta.getPanelHandler('pnl_form_2');
		pnl2handler.set_partnerdata(result);

		$fgta.showPanel('pnl_form_2');
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

