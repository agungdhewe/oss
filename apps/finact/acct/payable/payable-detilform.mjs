var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editdetilform-title')
const btn_edit = $('#pnl_editdetilform-btn_edit')
const btn_save = $('#pnl_editdetilform-btn_save')
const btn_delete = $('#pnl_editdetilform-btn_delete')
const btn_prev = $('#pnl_editdetilform-btn_prev')
const btn_next = $('#pnl_editdetilform-btn_next')
const btn_addnew = $('#pnl_editdetilform-btn_addnew')
const chk_autoadd = $('#pnl_editdetilform-autoadd')


const pnl_form = $('#pnl_editdetilform-form')
const obj = {
	txt_jurnaldetil_id: $('#pnl_editdetilform-txt_jurnaldetil_id'),
	cbo_billin_id: $('#pnl_editdetilform-cbo_billin_id'),
	cbo_billindetil_id: $('#pnl_editdetilform-cbo_billindetil_id'),
	cbo_partner_id: $('#pnl_editdetilform-cbo_partner_id'),
	txt_jurnaldetil_descr: $('#pnl_editdetilform-txt_jurnaldetil_descr'),
	txt_jurnaldetil_valfrg: $('#pnl_editdetilform-txt_jurnaldetil_valfrg'),
	cbo_curr_id: $('#pnl_editdetilform-cbo_curr_id'),
	txt_jurnaldetil_valfrgrate: $('#pnl_editdetilform-txt_jurnaldetil_valfrgrate'),
	txt_jurnaldetil_validr: $('#pnl_editdetilform-txt_jurnaldetil_validr'),
	cbo_coa_id: $('#pnl_editdetilform-cbo_coa_id'),
	cbo_dept_id: $('#pnl_editdetilform-cbo_dept_id'),
	txt_jurnal_id: $('#pnl_editdetilform-txt_jurnal_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_jurnaldetil_id,
		autoid: true,
		logview: 'trn_jurnaldetil',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)




	obj.cbo_billin_id.name = 'pnl_editdetilform-cbo_billin_id'		
	new fgta4slideselect(obj.cbo_billin_id, {
		title: 'Pilih billin_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billin_id,
		fieldValue: 'billin_id',
		fieldValueMap: 'billin_id',
		fieldDisplay: 'billin_descr',
		fields: [
			{mapping: 'billin_id', text: 'billin_id'},
			{mapping: 'billin_descr', text: 'billin_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billin_id:'--NULL--', billin_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_billindetil_id.name = 'pnl_editdetilform-cbo_billindetil_id'		
	new fgta4slideselect(obj.cbo_billindetil_id, {
		title: 'Pilih billindetil_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billindetil_id,
		fieldValue: 'billindetil_id',
		fieldValueMap: 'billindetil_id',
		fieldDisplay: 'billindetil_descr',
		fields: [
			{mapping: 'billindetil_id', text: 'billindetil_id'},
			{mapping: 'billindetil_descr', text: 'billindetil_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billindetil_id:'--NULL--', billindetil_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_partner_id.name = 'pnl_editdetilform-cbo_partner_id'		
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_curr_id.name = 'pnl_editdetilform-cbo_curr_id'		
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_coa_id.name = 'pnl_editdetilform-cbo_coa_id'		
	new fgta4slideselect(obj.cbo_coa_id, {
		title: 'Pilih coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coa_id,
		fieldValue: 'coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_dept_id.name = 'pnl_editdetilform-cbo_dept_id'		
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			


	btn_addnew.linkbutton({
		onClick: () => { btn_addnew_click() }
	})

	btn_prev.linkbutton({
		onClick: () => { btn_prev_click() }
	})

	btn_next.linkbutton({
		onClick: () => { btn_next_click() }
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
	
	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_editdetilgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editdetilgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.scrolllast()
				})
			}
		
		}		
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})
	
	
	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			form.lock(true)
			btn_addnew.allow = false
			btn_addnew.linkbutton('disable')
			chk_autoadd.attr("disabled", true);	
			chk_autoadd.prop("checked", false);			
		} else {
			form.lock(false)
			btn_addnew.allow = true
			btn_addnew.linkbutton('enable')
			chk_autoadd.removeAttr("disabled");
			chk_autoadd.prop("checked", false);
		}
	})
}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.jurnal_descr)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.billin_id==null) { result.record.billin_id='--NULL--'; result.record.billin_descr='NONE'; }
		if (result.record.billindetil_id==null) { result.record.billindetil_id='--NULL--'; result.record.billindetil_descr='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_billin_id, result.record.billin_id, result.record.billin_descr)
			.setValue(obj.cbo_billindetil_id, result.record.billindetil_id, result.record.billindetil_descr)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.commit()
			.setViewMode()
			.rowid = rowid

		form.SuspendEvent(false);


		// Editable
		if (form.AllowEditRecord!=true) {
			btn_edit.hide();
			btn_save.hide();
			btn_delete.hide();
		}
		

		// tambah baris
		if (form.AllowAddRecord) {
			btn_addnew.show()
		} else {
			btn_addnew.hide()
		}	

		// hapus baris
		if (form.AllowRemoveRecord) {
			btn_delete.show()
		} else {
			btn_delete.hide()
		}

		var prevnode = $(`#${rowid}`).prev()
		if (prevnode.length>0) {
			btn_prev.linkbutton('enable')
		} else {
			btn_prev.linkbutton('disable')
		}

		var nextode = $(`#${rowid}`).next()
		if (nextode.length>0) {
			btn_next.linkbutton('enable')
		} else {
			btn_next.linkbutton('disable')
		}		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)	
}

export function createnew(hdata) {
	header_data = hdata

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.jurnal_id= hdata.jurnal_id
		data.detil_value = 0

		data.jurnaldetil_valfrg = 0
		data.jurnaldetil_valfrgrate = 0
		data.jurnaldetil_validr = 0

			data.billin_id = '--NULL--'
			data.billin_descr = 'NONE'
			data.billindetil_id = '--NULL--'
			data.billindetil_descr = 'NONE'
			data.partner_id = '0'
			data.partner_name = '-- PILIH --'
			data.curr_id = '0'
			data.curr_name = '-- PILIH --'
			data.coa_id = '0'
			data.coa_name = '-- PILIH --'
			data.dept_id = '0'
			data.dept_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`

	options.skipmappingresponse = [billin_id, billindetil_id, ];
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_billin_id, result.dataresponse.billin_descr!=='--NULL--' ? result.dataresponse.billin_id : '--NULL--', result.dataresponse.billin_descr!=='--NULL--'?result.dataresponse.billin_descr:'NONE')
	form.setValue(obj.cbo_billindetil_id, result.dataresponse.billindetil_descr!=='--NULL--' ? result.dataresponse.billindetil_id : '--NULL--', result.dataresponse.billindetil_descr!=='--NULL--'?result.dataresponse.billindetil_descr:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/detil-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editdetilgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.removerow(form.rowid)
	})
	
}

function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function form_viewmodechanged(viewonly) {
	if (viewonly) {
		btn_prev.linkbutton('enable')
		btn_next.linkbutton('enable')
		if (btn_addnew.allow) {
			btn_addnew.linkbutton('enable')
		} else {
			btn_addnew.linkbutton('disable')
		}
	} else {
		btn_prev.linkbutton('disable')
		btn_next.linkbutton('disable')
		btn_addnew.linkbutton('disable')
	}
}


function form_idsetup(options) {
	var objid = obj.txt_jurnaldetil_id
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

function btn_addnew_click() {
	createnew(header_data)
}


function btn_prev_click() {
	var prevode = $(`#${form.rowid}`).prev()
	if (prevode.length==0) {
		return
	} 
	
	var trid = prevode.attr('id')
	var dataid = prevode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}