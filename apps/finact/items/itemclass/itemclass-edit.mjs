var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemclass_id: $('#pnl_edit-txt_itemclass_id'),
	txt_itemclass_name: $('#pnl_edit-txt_itemclass_name'),
	chk_itemclass_isdisabled: $('#pnl_edit-chk_itemclass_isdisabled'),
	chk_itemclass_isadvproces: $('#pnl_edit-chk_itemclass_isadvproces'),
	txt_itemclass_descr: $('#pnl_edit-txt_itemclass_descr'),
	cbo_itemmodel_id: $('#pnl_edit-cbo_itemmodel_id'),
	cbo_itemclassgroup_id: $('#pnl_edit-cbo_itemclassgroup_id'),
	cbo_owner_dept_id: $('#pnl_edit-cbo_owner_dept_id'),
	cbo_maintainer_dept_id: $('#pnl_edit-cbo_maintainer_dept_id'),
	cbo_unitmeasurement_id: $('#pnl_edit-cbo_unitmeasurement_id'),
	cbo_itemmanage_id: $('#pnl_edit-cbo_itemmanage_id'),
	txt_itemclass_minassetvalue: $('#pnl_edit-txt_itemclass_minassetvalue'),
	cbo_inquiry_accbudget_id: $('#pnl_edit-cbo_inquiry_accbudget_id'),
	cbo_settl_coa_id: $('#pnl_edit-cbo_settl_coa_id'),
	cbo_cost_coa_id: $('#pnl_edit-cbo_cost_coa_id'),
	cbo_depremodel_id: $('#pnl_edit-cbo_depremodel_id'),
	txt_itemclass_depreage: $('#pnl_edit-txt_itemclass_depreage'),
	txt_itemclass_depreresidu: $('#pnl_edit-txt_itemclass_depreresidu'),
	chk_itemclass_isallowoverqty: $('#pnl_edit-chk_itemclass_isallowoverqty'),
	chk_itemclass_isallowoverdays: $('#pnl_edit-chk_itemclass_isallowoverdays'),
	chk_itemclass_isallowovertask: $('#pnl_edit-chk_itemclass_isallowovertask'),
	chk_itemclass_isallowovervalue: $('#pnl_edit-chk_itemclass_isallowovervalue'),
	chk_itemclass_isallowunbudget: $('#pnl_edit-chk_itemclass_isallowunbudget')
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
		primary: obj.txt_itemclass_id,
		autoid: true,
		logview: 'mst_itemclass',
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








	new fgta4slideselect(obj.cbo_itemmodel_id, {
		title: 'Pilih itemmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmodel_id,
		fieldValue: 'itemmodel_id',
		fieldValueMap: 'itemmodel_id',
		fieldDisplay: 'itemmodel_name',
		fields: [
			{mapping: 'itemmodel_id', text: 'itemmodel_id'},
			{mapping: 'itemmodel_name', text: 'itemmodel_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemclassgroup_id, {
		title: 'Pilih itemclassgroup_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemclassgroup_id,
		fieldValue: 'itemclassgroup_id',
		fieldValueMap: 'itemclassgroup_id',
		fieldDisplay: 'itemclassgroup_name',
		fields: [
			{mapping: 'itemclassgroup_id', text: 'itemclassgroup_id'},
			{mapping: 'itemclassgroup_name', text: 'itemclassgroup_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclassgroup_id:'--NULL--', itemclassgroup_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_owner_dept_id, {
		title: 'Pilih owner_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_dept_id,
		fieldValue: 'owner_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				var maintainer_dept_id = form.getValue(obj.cbo_maintainer_dept_id);
				if (maintainer_dept_id==args.PreviousValue || maintainer_dept_id=='--NULL--' || maintainer_dept_id=='' || maintainer_dept_id==null) {
					form.setValue(obj.cbo_maintainer_dept_id, record.dept_id, record.dept_name);
				}
										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_maintainer_dept_id, {
		title: 'Pilih maintainer_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_maintainer_dept_id,
		fieldValue: 'maintainer_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unitmeasurement_id, {
		title: 'Pilih unitmeasurement_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unitmeasurement_id,
		fieldValue: 'unitmeasurement_id',
		fieldValueMap: 'unitmeasurement_id',
		fieldDisplay: 'unitmeasurement_name',
		fields: [
			{mapping: 'unitmeasurement_id', text: 'unitmeasurement_id'},
			{mapping: 'unitmeasurement_name', text: 'unitmeasurement_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_itemmanage_id, {
		title: 'Pilih itemmanage_id',
		returnpage: this_page_id,
		api: $ui.apis.load_itemmanage_id,
		fieldValue: 'itemmanage_id',
		fieldValueMap: 'itemmanage_id',
		fieldDisplay: 'itemmanage_name',
		fields: [
			{mapping: 'itemmanage_id', text: 'itemmanage_id'},
			{mapping: 'itemmanage_name', text: 'itemmanage_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_inquiry_accbudget_id, {
		title: 'Pilih inquiry_accbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiry_accbudget_id,
		fieldValue: 'inquiry_accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_settl_coa_id, {
		title: 'Pilih settl_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_settl_coa_id,
		fieldValue: 'settl_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_cost_coa_id, {
		title: 'Pilih cost_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_cost_coa_id,
		fieldValue: 'cost_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_depremodel_id, {
		title: 'Pilih depremodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_depremodel_id,
		fieldValue: 'depremodel_id',
		fieldValueMap: 'depremodel_id',
		fieldDisplay: 'depremodel_name',
		fields: [
			{mapping: 'depremodel_id', text: 'depremodel_id'},
			{mapping: 'depremodel_name', text: 'depremodel_name'},
		],
		OnDataLoading: (criteria) => {
						
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({depremodel_id:'--NULL--', depremodel_name:'NONE'});	
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
		if (result.record.itemclassgroup_id==null) { result.record.itemclassgroup_id='--NULL--'; result.record.itemclassgroup_name='NONE'; }
		if (result.record.cost_coa_id==null) { result.record.cost_coa_id='--NULL--'; result.record.cost_coa_name='NONE'; }
		if (result.record.depremodel_id==null) { result.record.depremodel_id='--NULL--'; result.record.depremodel_name='NONE'; }

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
			.setValue(obj.cbo_itemmodel_id, record.itemmodel_id, record.itemmodel_name)
			.setValue(obj.cbo_itemclassgroup_id, record.itemclassgroup_id, record.itemclassgroup_name)
			.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.owner_dept_name)
			.setValue(obj.cbo_maintainer_dept_id, record.maintainer_dept_id, record.maintainer_dept_name)
			.setValue(obj.cbo_unitmeasurement_id, record.unitmeasurement_id, record.unitmeasurement_name)
			.setValue(obj.cbo_itemmanage_id, record.itemmanage_id, record.itemmanage_name)
			.setValue(obj.cbo_inquiry_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name)
			.setValue(obj.cbo_settl_coa_id, record.settl_coa_id, record.settl_coa_name)
			.setValue(obj.cbo_cost_coa_id, record.cost_coa_id, record.cost_coa_name)
			.setValue(obj.cbo_depremodel_id, record.depremodel_id, record.depremodel_name)
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
		data.itemclass_isdisabled = '0'
		data.itemclass_isadvproces = '0'
		data.itemclass_minassetvalue = 0
		data.itemclass_depreage = 0
		data.itemclass_depreresidu = 0
		data.itemclass_isallowoverqty = '0'
		data.itemclass_isallowoverdays = '0'
		data.itemclass_isallowovertask = '0'
		data.itemclass_isallowovervalue = '0'
		data.itemclass_isallowunbudget = '0'

		data.itemmodel_id = '0'
		data.itemmodel_name = '-- PILIH --'
		data.itemclassgroup_id = '--NULL--'
		data.itemclassgroup_name = 'NONE'
		data.owner_dept_id = '0'
		data.owner_dept_name = '-- PILIH --'
		data.maintainer_dept_id = '0'
		data.maintainer_dept_name = '-- PILIH --'
		data.unitmeasurement_id = '0'
		data.unitmeasurement_name = '-- PILIH --'
		data.itemmanage_id = '0'
		data.itemmanage_name = '-- PILIH --'
		data.inquiry_accbudget_id = '0'
		data.inquiry_accbudget_name = '-- PILIH --'
		data.settl_coa_id = '0'
		data.settl_coa_name = '-- PILIH --'
		data.cost_coa_id = '--NULL--'
		data.cost_coa_name = 'NONE'
		data.depremodel_id = '--NULL--'
		data.depremodel_name = 'NONE'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editfilesgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_itemclass_id
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
	// options.skipmappingresponse = ['itemclassgroup_id', 'cost_coa_id', 'depremodel_id', ];
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
	form.setValue(obj.cbo_itemclassgroup_id, result.dataresponse.itemclassgroup_name!=='--NULL--' ? result.dataresponse.itemclassgroup_id : '--NULL--', result.dataresponse.itemclassgroup_name!=='--NULL--'?result.dataresponse.itemclassgroup_name:'NONE')
	form.setValue(obj.cbo_cost_coa_id, result.dataresponse.cost_coa_name!=='--NULL--' ? result.dataresponse.cost_coa_id : '--NULL--', result.dataresponse.cost_coa_name!=='--NULL--'?result.dataresponse.cost_coa_name:'NONE')
	form.setValue(obj.cbo_depremodel_id, result.dataresponse.depremodel_name!=='--NULL--' ? result.dataresponse.depremodel_id : '--NULL--', result.dataresponse.depremodel_name!=='--NULL--'?result.dataresponse.depremodel_name:'NONE')

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




