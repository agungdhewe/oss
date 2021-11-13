var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');
const btn_commit = $('#pnl_edit-btn_commit');
const btn_uncommit = $('#pnl_edit-btn_uncommit');

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_temprecv_id: $('#pnl_edit-txt_temprecv_id'),
	txt_temprecv_ref: $('#pnl_edit-txt_temprecv_ref'),
	dt_temprecv_date: $('#pnl_edit-dt_temprecv_date'),
	txt_temprecv_descr: $('#pnl_edit-txt_temprecv_descr'),
	txt_temprecv_bgnum: $('#pnl_edit-txt_temprecv_bgnum'),
	txt_temprecv_validrtotal: $('#pnl_edit-txt_temprecv_validrtotal'),
	txt_temprecv_taxidrtotal: $('#pnl_edit-txt_temprecv_taxidrtotal'),
	chk_temprecv_iscommit: $('#pnl_edit-chk_temprecv_iscommit'),
	txt_temprecv_commitby: $('#pnl_edit-txt_temprecv_commitby'),
	txt_temprecv_commitdate: $('#pnl_edit-txt_temprecv_commitdate'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_temprecv_id,
		autoid: true,
		logview: 'trn_temprecv',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih Partner',
		information: '<b>Catatan:</b><br>Partner dibatasi sesuai dengan collector yang di delegasikan pada master collector',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_name', text: 'Partner'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih Collector',
		information: '<b>Catatan:</b><br>Collector adalah data karyawan dibatasi pada master collector',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'ID', style:"width: 100px"},
			{mapping: 'empl_name', text: 'Collector'},

		],
		OnDataLoading: (criteria) => {
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				




	btn_print.linkbutton({onClick: () => { btn_print_click(); } });	
	btn_commit.linkbutton({ onClick: () => { btn_commit_click(); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_uncommit_click(); } });
	

	document.addEventListener('keydown', (ev)=>{
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (ev.code=='KeyS' && ev.ctrlKey==true) {
				if (!form.isInViewMode()) {
					form.btn_save_click();
				}
				ev.stopPropagation()
				ev.preventDefault()
			}
		}
	}, true)
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {



		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_empl_id, result.record.empl_id, result.record.empl_name)
			.commit()
			.setViewMode(viewmode)
			// .lock(result.record.temprecv_iscommit?true:false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		if (result.record.temprecv_iscommit=='1') {
			form.lock(true);
			btn_commit.linkbutton('disable');
			btn_uncommit.linkbutton('enable');
		} else {
			form.lock(false);
			btn_commit.linkbutton('enable');
			btn_uncommit.linkbutton('disable');
		}


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	btn_commit.linkbutton('enable');
	btn_uncommit.linkbutton('disable');

	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.temprecv_date = global.now()
		data.temprecv_validrtotal = 0
		data.temprecv_taxidrtotal = 0

		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.empl_id = '0'
		data.empl_name = '-- PILIH --'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		var data = Object.assign(form.getData(), {
			partner_name: obj.cbo_partner_id.combobox('getText')
		});
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(data);
	})	
}


export function updatesummary(data) {
	form.setValue(obj.txt_temprecv_validrtotal, data.temprecv_validrtotal);
	form.setValue(obj.txt_temprecv_taxidrtotal, data.temprecv_taxidrtotal);
	form.commit();
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_temprecv_id
	switch (options.action) {
		case 'fill' :
			objid.textbox('disable') 
			break;

		case 'createnew' :
			// console.log('new')
			if (form.autoid) {
				objid.textbox('disable') 
				objid.textbox('setText', '[AUTO]') 
			} else {
				objid.textbox('enable') 
			}
			break;
			
		case 'save' :
			objid.textbox('disable') 
			break;	
	}
}


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server


}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }

	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_temprecv_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/temprecv.xprint?id=' + id;

	var debug = false;
	if (debug) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	


function btn_commit_click() {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}

	var temprecv_id = obj.txt_temprecv_id.textbox('getText');
	$ui.ShowMessage("[QUESTION]Apakah anda yakin akan commit '" + temprecv_id + "' ?", {
		"OK": async () => {
			$ui.mask('wait..');
			var { Commit } = await import('./temprecv.xtion-commit.mjs');
			Commit(temprecv_id, (err, success) => {
				if (success) {
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ temprecv_iscommit: 1 }, form.rowid);
					$ui.ShowMessage("[INFO]Dokumen '" + temprecv_id + "' telah berhasil di commit");
					btn_commit.linkbutton('disable');
					btn_uncommit.linkbutton('enable');
					obj.chk_temprecv_iscommit.checkbox('check');
					form.commit();
					form.lock(true);

				}
			});
		},
		"Cancel": () => {
		}
	});

}





function btn_uncommit_click() {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}

	var temprecv_id = obj.txt_temprecv_id.textbox('getText');
	$ui.ShowMessage("[QUESTION]Apakah anda yakin akan un-commit '" + temprecv_id + "' ?", {
		"OK": async () => {
			$ui.mask('wait..');
			var { UnCommit } = await import('./temprecv.xtion-commit.mjs');
			UnCommit(temprecv_id, (err, success) => {
				if (success) {
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ temprecv_iscommit: 0 }, form.rowid);
					$ui.ShowMessage("[INFO]Dokumen '" + temprecv_id + "' telah berhasil di uncommit");
					btn_commit.linkbutton('enable');
					btn_uncommit.linkbutton('disable');
					obj.chk_temprecv_iscommit.checkbox('uncheck');
					form.commit();
					form.lock(false);
				}
			});
		},
		"Cancel": () => {
		}
	});

}