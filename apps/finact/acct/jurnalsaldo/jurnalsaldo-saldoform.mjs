var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editsaldoform-title')
const btn_edit = $('#pnl_editsaldoform-btn_edit')
const btn_save = $('#pnl_editsaldoform-btn_save')
const btn_delete = $('#pnl_editsaldoform-btn_delete')
const btn_prev = $('#pnl_editsaldoform-btn_prev')
const btn_next = $('#pnl_editsaldoform-btn_next')
const btn_addnew = $('#pnl_editsaldoform-btn_addnew')
const chk_autoadd = $('#pnl_editsaldoform-autoadd')


const pnl_form = $('#pnl_editsaldoform-form')
const obj = {
	txt_jurnalsaldo_id: $('#pnl_editsaldoform-txt_jurnalsaldo_id'),
	txt_jurnal_id: $('#pnl_editsaldoform-txt_jurnal_id'),
	dt_jurnal_date: $('#pnl_editsaldoform-dt_jurnal_date'),
	dt_jurnal_duedate: $('#pnl_editsaldoform-dt_jurnal_duedate'),
	txt_jurnaldetil_id: $('#pnl_editsaldoform-txt_jurnaldetil_id'),
	txt_jurnaldetil_descr: $('#pnl_editsaldoform-txt_jurnaldetil_descr'),
	cbo_coamodel_id: $('#pnl_editsaldoform-cbo_coamodel_id'),
	cbo_coa_id: $('#pnl_editsaldoform-cbo_coa_id'),
	cbo_dept_id: $('#pnl_editsaldoform-cbo_dept_id'),
	cbo_partner_id: $('#pnl_editsaldoform-cbo_partner_id'),
	cbo_curr_id: $('#pnl_editsaldoform-cbo_curr_id'),
	dt_jurnalsaldo_date: $('#pnl_editsaldoform-dt_jurnalsaldo_date'),
	txt_jurnalsaldo_awal_frg: $('#pnl_editsaldoform-txt_jurnalsaldo_awal_frg'),
	txt_jurnalsaldo_awal_idr: $('#pnl_editsaldoform-txt_jurnalsaldo_awal_idr'),
	txt_periodemo_id: $('#pnl_editsaldoform-txt_periodemo_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_jurnalsaldo_id,
		autoid: true,
		logview: 'trn_jurnalsaldo',
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




	obj.cbo_coamodel_id.name = 'pnl_editsaldoform-cbo_coamodel_id'		
	new fgta4slideselect(obj.cbo_coamodel_id, {
		title: 'Pilih coamodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coamodel_id,
		fieldValue: 'coamodel_id',
		fieldValueMap: 'coamodel_id',
		fieldDisplay: 'coamodel_name',
		fields: [
			{mapping: 'coamodel_id', text: 'coamodel_id'},
			{mapping: 'coamodel_name', text: 'coamodel_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_coa_id.name = 'pnl_editsaldoform-cbo_coa_id'		
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
			
	obj.cbo_dept_id.name = 'pnl_editsaldoform-cbo_dept_id'		
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
			
	obj.cbo_partner_id.name = 'pnl_editsaldoform-cbo_partner_id'		
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
			
	obj.cbo_curr_id.name = 'pnl_editsaldoform-cbo_curr_id'		
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
					$ui.getPages().show('pnl_editsaldogrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editsaldogrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editsaldogrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editsaldogrid'].handler.scrolllast()
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
	txt_title.html(hdata.periodemo_name)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/saldo-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);



		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_coamodel_id, result.record.coamodel_id, result.record.coamodel_name)
			.setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
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
		data.periodemo_id= hdata.periodemo_id
		data.saldo_value = 0

		data.jurnal_date = global.now()
		data.jurnal_duedate = global.now()
		data.jurnalsaldo_date = global.now()
		data.jurnalsaldo_awal_frg = 0
		data.jurnalsaldo_awal_idr = 0

			data.coamodel_id = '0'
			data.coamodel_name = '-- PILIH --'
			data.coa_id = '0'
			data.coa_name = '-- PILIH --'
			data.dept_id = '0'
			data.dept_name = '-- PILIH --'
			data.partner_id = '0'
			data.partner_name = '-- PILIH --'
			data.curr_id = '0'
			data.curr_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editsaldogrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/saldo-save`



}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)


	form.rowid = $ui.getPages().ITEMS['pnl_editsaldogrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/saldo-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editsaldogrid', ()=>{
		$ui.getPages().ITEMS['pnl_editsaldogrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_jurnalsaldo_id
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
	var record = $ui.getPages().ITEMS['pnl_editsaldogrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editsaldogrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}