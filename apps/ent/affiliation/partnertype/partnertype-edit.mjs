var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_partnertype_id: $('#pnl_edit-txt_partnertype_id'),
	txt_partnertype_name: $('#pnl_edit-txt_partnertype_name'),
	txt_partnertype_descr: $('#pnl_edit-txt_partnertype_descr'),
	cbo_partnercategory_id: $('#pnl_edit-cbo_partnercategory_id'),
	cbo_itemclass_id: $('#pnl_edit-cbo_itemclass_id'),
	cbo_unbill_accbudget_id: $('#pnl_edit-cbo_unbill_accbudget_id'),
	cbo_unbill_coa_id: $('#pnl_edit-cbo_unbill_coa_id'),
	cbo_payable_accbudget_id: $('#pnl_edit-cbo_payable_accbudget_id'),
	cbo_payable_coa_id: $('#pnl_edit-cbo_payable_coa_id'),
	chk_partnertype_isempl: $('#pnl_edit-chk_partnertype_isempl'),
	chk_partnertype_ishaveae: $('#pnl_edit-chk_partnertype_ishaveae'),
	chk_partnertype_ishavecollector: $('#pnl_edit-chk_partnertype_ishavecollector'),
	chk_partnertype_isdisabled: $('#pnl_edit-chk_partnertype_isdisabled')
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
		primary: obj.txt_partnertype_id,
		autoid: false,
		logview: 'mst_partnertype',
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








	new fgta4slideselect(obj.cbo_partnercategory_id, {
		title: 'Pilih partnercategory_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partnercategory_id,
		fieldValue: 'partnercategory_id',
		fieldValueMap: 'partnercategory_id',
		fieldDisplay: 'partnercategory_name',
		fields: [
			{mapping: 'partnercategory_id', text: 'partnercategory_id'},
			{mapping: 'partnercategory_name', text: 'partnercategory_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partnercategory_id:'--NULL--', partnercategory_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemclass_id, {
		title: 'Pilih itemclass_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclass_id,
		fieldValue: 'itemclass_id',
		fieldValueMap: 'itemclass_id',
		fieldDisplay: 'itemclass_name',
		fields: [
			{mapping: 'itemclass_id', text: 'itemclass_id'},
			{mapping: 'itemclass_name', text: 'itemclass_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclass_id:'--NULL--', itemclass_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unbill_accbudget_id, {
		title: 'Pilih unbill_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unbill_accbudget_id,
		fieldValue: 'unbill_accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_unbill_coa_id, record.coa_id, record.coa_name);
										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unbill_coa_id, {
		title: 'Pilih unbill_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unbill_coa_id,
		fieldValue: 'unbill_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_payable_accbudget_id, {
		title: 'Pilih payable_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_payable_accbudget_id,
		fieldValue: 'payable_accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_payable_coa_id, record.coa_id, record.coa_name);						
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_payable_coa_id, {
		title: 'Pilih payable_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_payable_coa_id,
		fieldValue: 'payable_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
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

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.partnercategory_id==null) { result.record.partnercategory_id='--NULL--'; result.record.partnercategory_name='NONE'; }
		if (result.record.itemclass_id==null) { result.record.itemclass_id='--NULL--'; result.record.itemclass_name='NONE'; }

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
			.setValue(obj.cbo_partnercategory_id, record.partnercategory_id, record.partnercategory_name)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_unbill_accbudget_id, record.unbill_accbudget_id, record.unbill_accbudget_name)
			.setValue(obj.cbo_unbill_coa_id, record.unbill_coa_id, record.unbill_coa_name)
			.setValue(obj.cbo_payable_accbudget_id, record.payable_accbudget_id, record.payable_accbudget_name)
			.setValue(obj.cbo_payable_coa_id, record.payable_coa_id, record.payable_coa_name)
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
		data.partnertype_isempl = '0'
		data.partnertype_ishaveae = '0'
		data.partnertype_ishavecollector = '0'
		data.partnertype_isdisabled = '0'

		data.partnercategory_id = '--NULL--'
		data.partnercategory_name = 'NONE'
		data.itemclass_id = '--NULL--'
		data.itemclass_name = 'NONE'
		data.unbill_accbudget_id = '0'
		data.unbill_accbudget_name = '-- PILIH --'
		data.unbill_coa_id = '0'
		data.unbill_coa_name = '-- PILIH --'
		data.payable_accbudget_id = '0'
		data.payable_accbudget_name = '-- PILIH --'
		data.payable_coa_id = '0'
		data.payable_coa_name = '-- PILIH --'









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
	var objid = obj.txt_partnertype_id
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
	// options.skipmappingresponse = ['partnercategory_id', 'itemclass_id', ];
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
	form.setValue(obj.cbo_partnercategory_id, result.dataresponse.partnercategory_name!=='--NULL--' ? result.dataresponse.partnercategory_id : '--NULL--', result.dataresponse.partnercategory_name!=='--NULL--'?result.dataresponse.partnercategory_name:'NONE')
	form.setValue(obj.cbo_itemclass_id, result.dataresponse.itemclass_name!=='--NULL--' ? result.dataresponse.itemclass_id : '--NULL--', result.dataresponse.itemclass_name!=='--NULL--'?result.dataresponse.itemclass_name:'NONE')

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




