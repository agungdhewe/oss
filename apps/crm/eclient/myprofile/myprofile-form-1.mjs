import * as component from '../../../../../index.php/jslibs/fgta/fgta__loader.mjs'


const pnlname = 'pnl_form_1';
const form = component.Form(document.getElementById(pnlname).getElementsByTagName('form')[0]);

const txt_partner_name = form.add(component.Textbox(pnlname + '-partner_name'));
const txt_partner_dirut = form.add(component.Textbox(pnlname + '-partner_dirut'));
const txt_partner_direktur = form.add(component.Textbox(pnlname + '-partner_direktur'));
const txt_partner_alamat = form.add(component.Textbox(pnlname + '-partner_alamat'));
const txt_partner_alamat_l2 = form.add(component.Textbox(pnlname + '-partner_alamat_l2'));
const txt_partner_alamat_l3 = form.add(component.Textbox(pnlname + '-partner_alamat_l3'));
const txt_partner_alamattagih = form.add(component.Textbox(pnlname + '-partner_alamattagih'));
const txt_partner_alamattagih_l2 = form.add(component.Textbox(pnlname + '-partner_alamattagih_l2'));
const txt_partner_alamattagih_l3 = form.add(component.Textbox(pnlname + '-partner_alamattagih_l3'));
const txt_partner_kota = form.add(component.Textbox(pnlname + '-partner_kota'));
const txt_partner_kodepos = form.add(component.Textbox(pnlname + '-partner_kodepos'));
const txt_partner_negara = component.Textbox(pnlname + '-partner_negara');
const txt_partner_telp = form.add(component.Textbox(pnlname + '-partner_telp'));
const txt_partner_telp_2 = form.add(component.Textbox(pnlname + '-partner_telp_2'));
const txt_partner_telp_3 = form.add(component.Textbox(pnlname + '-partner_telp_3'));
const txt_partner_telp_4 = form.add(component.Textbox(pnlname + '-partner_telp_4'));
const txt_partner_fax = form.add(component.Textbox(pnlname + '-partner_fax'));
const txt_partner_fax_2 = form.add(component.Textbox(pnlname + '-partner_fax_2'));
const txt_partner_email = form.add(component.Textbox(pnlname + '-partner_email'));
const txt_partner_email_2 = form.add(component.Textbox(pnlname + '-partner_email_2'));


const btn_next = component.Button(pnlname + '-btn_next');


export async function init(param) {
	form.reset();
	btn_next.addEventListener('click', (ev) => { btn_next_click(ev) });


	await myprofile_loadcurrent();
}

	



async function btn_next_click(ev) {
	try {
		await form.CheckError();

		var data = {}
		for (var obj_id in form.Items) {
			var obj = form.Items[obj_id];
			var mapping = obj.getMapping();
			data[mapping] = obj.Text;
		}



		component.Messager.Wait();
		var apiname = 'crm/eclient/myprofile/save';
		var apidata = {
			data: data
		}
		var result = await component.api.call(apiname, apidata);
		component.Messager.Wait(false);

		console.log(result);

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



async function myprofile_loadcurrent() {
	try {
		component.Messager.Wait();
		var apiname = 'crm/eclient/myprofile/loadcurrent';
		var apidata = {}
		var result = await component.api.call(apiname, apidata);

		console.log(result);
		
		for (var obj_id in form.Items) {
			var obj = form.Items[obj_id];
			var mapping = obj.getMapping();

			if (result[mapping]!==undefined) {
				obj.Text = result[mapping];
			}
		}
		
		component.Messager.Wait(false);
	} catch (err) {
		component.Messager.Wait(false);
		component.Messager.Error(err.message);
	}
}