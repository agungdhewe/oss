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
	txt_temprecvdetil_id: $('#pnl_editdetilform-txt_temprecvdetil_id'),
	txt_temprecvdetil_descr: $('#pnl_editdetilform-txt_temprecvdetil_descr'),
	txt_temprecvdetil_validr: $('#pnl_editdetilform-txt_temprecvdetil_validr'),
	txt_temprecvdetil_taxidr: $('#pnl_editdetilform-txt_temprecvdetil_taxidr'),
	cbo_billout_id: $('#pnl_editdetilform-cbo_billout_id'),
	cbo_coa_id_or: $('#pnl_editdetilform-cbo_coa_id_or'),
	cbo_coa_id_tax: $('#pnl_editdetilform-cbo_coa_id_tax'),
	txt_temprecv_id: $('#pnl_editdetilform-txt_temprecv_id')
}


let form = {}
let header_data = {}

var currentstate;

export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_temprecvdetil_id,
		autoid: true,
		logview: 'trn_temprecvdetil',
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


	obj.cbo_billout_id.name = 'pnl_editdetilform-cbo_billout_id'		
	new fgta4slideselect(obj.cbo_billout_id, {
		title: 'Pilih AR yang akan dibuat tanda terima sementara',
		returnpage: this_page_id,
		api: $ui.apis.load_billout_id,
		fieldValue: 'billout_id',
		fieldValueMap: 'billout_id',
		fieldDisplay: 'billout_descr',
		fields: [
			{mapping: 'billout_id', text: 'Id'},
			{mapping: 'billout_datedue', text: 'Due Date'},
			{mapping: 'billout_datedueage', text: 'Age'},
			{mapping: 'billout_descr', text: 'Descr'},
			{mapping: 'partner_name', text: 'Agency'},
			{mapping: 'billout_validr', text: 'Amout'},
			{mapping: 'billout_taxidr', text: 'Tax'},
		],
		OnDataLoading: (criteria) => {
			// console.log(currentstate.header_data);
			criteria['partner_id'] = currentstate.header_data.partner_id;
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billout_id:'--NULL--', billout_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.txt_temprecvdetil_descr, record.billout_descr)
			form.setValue(obj.txt_temprecvdetil_validr, record.billout_validr)
			form.setValue(obj.txt_temprecvdetil_taxidr, record.billout_taxidr)
		}
	})			
			
	obj.cbo_coa_id_or.name = 'pnl_editdetilform-cbo_coa_id_or'		
	new fgta4slideselect(obj.cbo_coa_id_or, {
		title: 'Pilih coa_id_or',
		returnpage: this_page_id,
		api: $ui.apis.load_coa_id_or,
		fieldValue: 'coa_id_or',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name_or',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_coa_id_tax.name = 'pnl_editdetilform-cbo_coa_id_tax'		
	new fgta4slideselect(obj.cbo_coa_id_tax, {
		title: 'Pilih coa_id_tax',
		returnpage: this_page_id,
		api: $ui.apis.load_coa_id_tax,
		fieldValue: 'coa_id_tax',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name_tax',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
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
	txt_title.html(`
		<div>${hdata.temprecv_descr}</div>
		<div>${hdata.partner_name}</div>	
	`);
	
	header_data = hdata
	currentstate = {
		header_data: header_data
	}

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.billout_id==null) { result.record.billout_id='--NULL--'; result.record.billout_descr='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_billout_id, result.record.billout_id, result.record.billout_descr)
			.setValue(obj.cbo_coa_id_or, result.record.coa_id_or, result.record.coa_name)
			.setValue(obj.cbo_coa_id_tax, result.record.coa_id_tax, result.record.coa_name)
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

	currentstate = {
		header_data: header_data
	}

	txt_title.html('Create New Row')
	form.createnew(async (data, options)=>{
		data.temprecv_id= hdata.temprecv_id
		data.detil_value = 0

			data.temprecvdetil_validr = 0
			data.temprecvdetil_taxidr = 0

			data.billout_id = '--NULL--'
			data.billout_descr = 'NONE'
			data.coa_id_or = global.setup.coa_id_or;
			data.coa_name = global.setup.coa_name_or;
			data.coa_id_tax = global.setup.coa_id_tax;
			data.coa_name = global.setup.coa_name_tax;


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`

	options.skipmappingresponse = ["billout_id"];


}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_billout_id, result.dataresponse.billout_descr!=='--NULL--' ? result.dataresponse.billout_id : '--NULL--', result.dataresponse.billout_descr!=='--NULL--'?result.dataresponse.billout_descr:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_editdetilgrid'].handler.updategrid(data, form.rowid)

	var headerupdate = {
		temprecv_validrtotal: result.dataresponse.temprecv_validrtotal,
		temprecv_taxidrtotal: result.dataresponse.temprecv_taxidrtotal
	};
	$ui.getPages().ITEMS['pnl_edit'].handler.updatesummary(headerupdate);

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
	var objid = obj.txt_temprecvdetil_id
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