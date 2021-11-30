var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_partner_id: $('#pnl_edit-txt_partner_id'),
	txt_partner_name: $('#pnl_edit-txt_partner_name'),
	txt_partner_addressline1: $('#pnl_edit-txt_partner_addressline1'),
	txt_partner_addressline2: $('#pnl_edit-txt_partner_addressline2'),
	txt_partner_postcode: $('#pnl_edit-txt_partner_postcode'),
	txt_partner_city: $('#pnl_edit-txt_partner_city'),
	cbo_partner_country: $('#pnl_edit-cbo_partner_country'),
	txt_partner_phone: $('#pnl_edit-txt_partner_phone'),
	txt_partner_mobilephone: $('#pnl_edit-txt_partner_mobilephone'),
	txt_partner_email: $('#pnl_edit-txt_partner_email'),
	chk_partner_isdisabled: $('#pnl_edit-chk_partner_isdisabled'),
	chk_partner_isparent: $('#pnl_edit-chk_partner_isparent'),
	cbo_partner_parent: $('#pnl_edit-cbo_partner_parent'),
	cbo_partnertype_id: $('#pnl_edit-cbo_partnertype_id'),
	cbo_partnerorg_id: $('#pnl_edit-cbo_partnerorg_id'),
	txt_partner_npwp: $('#pnl_edit-txt_partner_npwp'),
	chk_partner_isnonnpwp: $('#pnl_edit-chk_partner_isnonnpwp'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	cbo_ae_empl_id: $('#pnl_edit-cbo_ae_empl_id'),
	cbo_col_empl_id: $('#pnl_edit-cbo_col_empl_id')
}




let form;

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
		primary: obj.txt_partner_id,
		autoid: true,
		logview: 'mst_partner',
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
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			undefined			
		}		
	})








	new fgta4slideselect(obj.cbo_partner_country, {
		title: 'Pilih partner_country',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_country,
		fieldValue: 'partner_country',
		fieldValueMap: 'country_id',
		fieldDisplay: 'country_name',
		fields: [
			{mapping: 'country_id', text: 'country_id'},
			{mapping: 'country_name', text: 'country_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_parent, {
		title: 'Pilih partner_parent',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_parent,
		fieldValue: 'partner_parent',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_parent_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_partner_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.partner_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partnertype_id, {
		title: 'Pilih partnertype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partnertype_id,
		fieldValue: 'partnertype_id',
		fieldValueMap: 'partnertype_id',
		fieldDisplay: 'partnertype_name',
		fields: [
			{mapping: 'partnertype_id', text: 'partnertype_id'},
			{mapping: 'partnertype_name', text: 'partnertype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partnerorg_id, {
		title: 'Pilih partnerorg_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partnerorg_id,
		fieldValue: 'partnerorg_id',
		fieldValueMap: 'partnerorg_id',
		fieldDisplay: 'partnerorg_name',
		fields: [
			{mapping: 'partnerorg_id', text: 'partnerorg_id'},
			{mapping: 'partnerorg_name', text: 'partnerorg_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			console.log(record);
			if (value!=args.PreviousValue ) {
				form.setValue(obj.txt_partner_name, record.empl_name);
				form.setValue(obj.txt_partner_email, record.empl_email);
				form.setValue(obj.txt_partner_phone, record.empl_hp);
				form.setValue(obj.txt_partner_mobilephone, record.empl_hp);
				form.setValue(obj.txt_partner_npwp, record.empl_npwp);
				form.setValue(obj.txt_partner_addressline1, record.empl_address);
				form.setValue(obj.txt_partner_city, record.empl_city);
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ae_empl_id, {
		title: 'Pilih ae_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ae_empl_id,
		fieldValue: 'ae_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'ae_empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_col_empl_id, {
		title: 'Pilih col_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_col_empl_id,
		fieldValue: 'col_empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'col_empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				

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

	//button state

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}


export function open(data, rowid, viewmode=true, fn_callback) {

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.partner_parent==null) { result.record.partner_parent='--NULL--'; result.record.partner_parent_name='NONE'; }
		if (result.record.empl_id==null) { result.record.empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.ae_empl_id==null) { result.record.ae_empl_id='--NULL--'; result.record.ae_empl_name='NONE'; }
		if (result.record.col_empl_id==null) { result.record.col_empl_id='--NULL--'; result.record.col_empl_name='NONE'; }

		*/
		for (var objid in obj) {
			let o = obj[objid]
			if (o.isCombo() && !o.isRequired()) {
				var value =  result.record[o.getFieldValueName()];
				if (value==null ) {
					record[o.getFieldValueName()] = pOpt.value;
					record[o.getFieldDisplayName()] = pOpt.text;
				}
			}
		}
  		updaterecordstatus(record)

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_partner_country, record.partner_country, record.country_name)
			.setValue(obj.cbo_partner_parent, record.partner_parent, record.partner_parent_name)
			.setValue(obj.cbo_partnertype_id, record.partnertype_id, record.partnertype_name)
			.setValue(obj.cbo_partnerorg_id, record.partnerorg_id, record.partnerorg_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_ae_empl_id, record.ae_empl_id, record.ae_empl_name)
			.setValue(obj.cbo_col_empl_id, record.col_empl_id, record.col_empl_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   



		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)

		// tampilkan form untuk data editor
		fn_callback()
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.partner_isdisabled = '0'
		data.partner_isparent = '0'
		data.partner_isnonnpwp = '0'

		data.partner_country = '0'
		data.country_name = '-- PILIH --'
		data.partner_parent = '--NULL--'
		data.partner_parent_name = 'NONE'
		data.partnertype_id = '0'
		data.partnertype_name = '-- PILIH --'
		data.partnerorg_id = '--NULL--'
		data.partnerorg_name = 'NONE'
		data.empl_id = '--NULL--'
		data.empl_name = 'NONE'
		data.ae_empl_id = '--NULL--'
		data.ae_empl_name = 'NONE'
		data.col_empl_id = '--NULL--'
		data.col_empl_name = 'NONE'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edittypegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editbankgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editcontactgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editsitegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmodeltransaksigrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editrefgrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_partner_id
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
	// options.skipmappingresponse = [partner_parent, 'empl_id', 'ae_empl_id', 'col_empl_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

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
	/*
	form.setValue(obj.cbo_partner_parent, result.dataresponse.partner_parent_name!=='--NULL--' ? result.dataresponse.partner_parent : '--NULL--', result.dataresponse.partner_parent_name!=='--NULL--'?result.dataresponse.partner_parent_name:'NONE')
	form.setValue(obj.cbo_empl_id, result.dataresponse.empl_name!=='--NULL--' ? result.dataresponse.empl_id : '--NULL--', result.dataresponse.empl_name!=='--NULL--'?result.dataresponse.empl_name:'NONE')
	form.setValue(obj.cbo_ae_empl_id, result.dataresponse.ae_empl_name!=='--NULL--' ? result.dataresponse.ae_empl_id : '--NULL--', result.dataresponse.ae_empl_name!=='--NULL--'?result.dataresponse.ae_empl_name:'NONE')
	form.setValue(obj.cbo_col_empl_id, result.dataresponse.col_empl_name!=='--NULL--' ? result.dataresponse.col_empl_id : '--NULL--', result.dataresponse.col_empl_name!=='--NULL--'?result.dataresponse.col_empl_name:'NONE')

	*/

	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldDisplayName()];
			if (value==null ) {
				value = pOpt.value;
				text = pOpt.text;
			}
			form.setValue(o, value, text);
		}
	}
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}




