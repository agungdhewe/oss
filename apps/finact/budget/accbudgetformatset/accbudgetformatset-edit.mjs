var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')




const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_accbudgetformatset_id: $('#pnl_edit-txt_accbudgetformatset_id'),
	txt_accbudgetformatset_order: $('#pnl_edit-txt_accbudgetformatset_order'),
	txt_accbudgetformatset_name: $('#pnl_edit-txt_accbudgetformatset_name'),
	txt_accbudgetformatset_descr: $('#pnl_edit-txt_accbudgetformatset_descr'),

	chk_accbudgetformatset_isbold: $('#pnl_edit-chk_accbudgetformatset_isbold'),
	chk_accbudgetformatset_isitalic: $('#pnl_edit-chk_accbudgetformatset_isitalic'),
	chk_accbudgetformatset_isunderline: $('#pnl_edit-chk_accbudgetformatset_isunderline'),

	chk_accbudgetformatset_isparent: $('#pnl_edit-chk_accbudgetformatset_isparent'),
	cbo_accbudgetformatset_parent: $('#pnl_edit-cbo_accbudgetformatset_parent'),
	txt_accbudgetformatset_path: $('#pnl_edit-txt_accbudgetformatset_path'),
	txt_accbudgetformatset_pathid: $('#pnl_edit-txt_accbudgetformatset_pathid'),
	txt_accbudgetformatset_level: $('#pnl_edit-txt_accbudgetformatset_level'),
	cbo_accbudgetformat_id: $('#pnl_edit-cbo_accbudgetformat_id')
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
		primary: obj.txt_accbudgetformatset_id,
		autoid: true,
		logview: 'mst_accbudgetformatset',
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








	new fgta4slideselect(obj.cbo_accbudgetformatset_parent, {
		title: 'Pilih accbudgetformatset_parent',
		returnpage: this_page_id,
		api: $ui.apis.load_accbudgetformatset_parent,
		fieldValue: 'accbudgetformatset_parent',
		fieldValueMap: 'accbudgetformatset_id',
		fieldDisplay: 'accbudgetformatset_name',
		fields: [
			{mapping: 'accbudgetformatset_id', text: 'accbudgetformatset_id'},
			{mapping: 'accbudgetformatset_name', text: 'accbudgetformatset_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_accbudgetformatset_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.accbudgetformatset_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
			result.records.unshift({accbudgetformatset_id:'--NULL--', accbudgetformatset_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_accbudgetformat_id, {
		title: 'Pilih accbudgetformat_id',
		returnpage: this_page_id,
		api: $ui.apis.load_accbudgetformat_id,
		fieldValue: 'accbudgetformat_id',
		fieldValueMap: 'accbudgetformat_id',
		fieldDisplay: 'accbudgetformat_name',
		fields: [
			{mapping: 'accbudgetformat_id', text: 'accbudgetformat_id'},
			{mapping: 'accbudgetformat_name', text: 'accbudgetformat_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
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


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.accbudgetformatset_parent==null) { result.record.accbudgetformatset_parent='--NULL--'; result.record.accbudgetformatset_parent_name='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_accbudgetformatset_parent, result.record.accbudgetformatset_parent, result.record.accbudgetformatset_parent_name)
			.setValue(obj.cbo_accbudgetformat_id, result.record.accbudgetformat_id, result.record.accbudgetformat_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		updatebuttonstate(result.record)
		


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
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.accbudgetformatset_order = 0
		data.accbudgetformatset_isparent = '0'
		data.accbudgetformatset_level = 0


		data.accbudgetformatset_parent = '--NULL--'
		data.accbudgetformatset_parent_name = 'NONE'
		
		var cbo_search_format = $('#pnl_list-cbo_search_format');
		var accbudgetformat_id = cbo_search_format.combo('getValue');
		var accbudgetformat_name = cbo_search_format.combo('getText');
		data.accbudgetformat_id = accbudgetformat_id;
		data.accbudgetformat_name = accbudgetformat_name;



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_accbudgetformatset_id
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
	// options.skipmappingresponse = ['accbudgetformatset_parent'];
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
	form.setValue(obj.cbo_accbudgetformatset_parent, result.dataresponse.accbudgetformatset_parent_name!=='--NULL--' ? result.dataresponse.accbudgetformatset_parent : '--NULL--', result.dataresponse.accbudgetformatset_parent_name!=='--NULL--'?result.dataresponse.accbudgetformatset_parent_name:'NONE')
	*/
	var pOpt = form.getDefaultPrompt(false)
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var value =  result.dataresponse[o.getFieldValueName()];
			var text = result.dataresponse[o.getFieldValueName()];
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




