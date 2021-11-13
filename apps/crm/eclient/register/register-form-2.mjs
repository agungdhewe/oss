import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


const pnlname = 'pnl_form_2';
const form = component.Form(document.getElementById(pnlname).getElementsByTagName('form')[0]);
const txt_confirmkode = component.Textbox(pnlname + '-kode');

const btn_next = component.Button(pnlname + '-btn_next');


var partner = null;


component.api.useMessager(component.Messager);
export async function init(param) {
	btn_next.addEventListener('click', (ev) => { btn_next_click(ev) });
}


async function btn_next_click(ev) {
	try {
		await form.CheckError();

		component.Messager.Wait();
		var apiname = 'crm/eclient/register/confirm';
		var apidata = {
			data: {
				partner_id: partner.partner_id,
				confirmcode: txt_confirmkode.Text
			}
		}

		console.log(apidata);

		var result = await component.api.call(apiname, apidata);
		component.Messager.Wait(false);

		var pnl3handler = $fgta.getPanelHandler('pnl_form_3');
		pnl3handler.set_partnerdata(result);
		$fgta.showPanel('pnl_form_3');

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



export function set_partnerdata(data) {
	console.log(data);
	partner = data;
}