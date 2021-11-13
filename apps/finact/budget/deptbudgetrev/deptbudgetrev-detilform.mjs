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


const pnl_entry = $('#pnl_editdetilform-entry');
const pnl_form = $('#pnl_editdetilform-form')
const obj = {
	txt_deptbudgetrevdet_id: $('#pnl_editdetilform-txt_deptbudgetrevdet_id'),
	cbo_deptbudgetrevdet_mode: $('#pnl_editdetilform-cbo_deptbudgetrevdet_mode'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	txt_deptbudgetrevdet_descr: $('#pnl_editdetilform-txt_deptbudgetrevdet_descr'),
	txt_deptbudgetrevdet_prev: $('#pnl_editdetilform-txt_deptbudgetrevdet_prev'),
	txt_deptbudgetrevdet_available: $('#pnl_editdetilform-txt_deptbudgetrevdet_available'),
	txt_deptbudgetrevdet_value: $('#pnl_editdetilform-txt_deptbudgetrevdet_value'),
	txt_deptbudgetrevdet_variance: $('#pnl_editdetilform-txt_deptbudgetrevdet_variance'),
	txt_deptbudgetrevdet_notes: $('#pnl_editdetilform-txt_deptbudgetrevdet_notes'),
	txt_deptbudgetrev_id: $('#pnl_editdetilform-txt_deptbudgetrev_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_deptbudgetrevdet_id,
		autoid: true,
		logview: 'mst_deptbudgetrevdet',
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


	obj.cbo_deptbudgetrevdet_mode.name = 'pnl_editdetilform-cbo_deptbudgetrevdet_mode'		
	new fgta4slideselect(obj.cbo_deptbudgetrevdet_mode, {
		title: 'Pilih Mode Revisi',
		returnpage: this_page_id,
		fieldValue: 'id',
		fieldValueMap: 'id',
		fieldDisplay: 'text',
		fields: [
			{mapping: 'text', text: 'Mode'}
		],
		data: global.setup.mode,
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {
			pnl_entry.show();
		}
	})

	obj.cbo_accbudget_id.name = 'pnl_editdetilform-cbo_accbudget_id'		
	new fgta4slideselect(obj.cbo_accbudget_id, {
		title: 'Pilih accbudget_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-accbudget-torevise`,
		fieldValue: 'accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'ID', style: "width: 100px;"},
			{mapping: 'accbudget_name', text: 'Budget'},
			{mapping: 'deptbudgetdet_value', text: 'Current Budgetted', formatter: "row_format_number", style: "width: 100px; text-align: right"},
			{mapping: 'deptbudgetdet_available', text: 'UnAllocated', formatter: "row_format_number", style: "width: 100px; text-align: right" }
		],
		OnDataLoading: (criteria, options) => {
			var dept_id = header_data.dept_id
			var deptbudget_year = header_data.deptbudgetrev_year
			var deptbudget_month = header_data.deptbudgetrev_month
			var deptbudgetrev_id = header_data.deptbudgetrev_id
			var current_accbudget_id = form.getOldValue(obj.cbo_accbudget_id)
			var mode = form.getValue(obj.cbo_deptbudgetrevdet_mode);

			if (mode=='I') {
				// tambah baru
				options.api = `${global.modulefullname}/get-accbudget-torevise-add`;
				criteria.dept_id = dept_id
				criteria.deptbudget_year = deptbudget_year
				criteria.deptbudget_month = deptbudget_month
				criteria.deptbudgetrev_id = deptbudgetrev_id
				criteria.include_accbudget_id = current_accbudget_id
			} else {
				// update
				options.api = `${global.modulefullname}/get-accbudget-torevise-update`;
				criteria.dept_id = dept_id
				criteria.deptbudget_year = deptbudget_year
				criteria.deptbudget_month = deptbudget_month
				criteria.deptbudgetrev_id = deptbudgetrev_id
				criteria.include_accbudget_id = current_accbudget_id
			}

		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			form.setDisable(obj.cbo_deptbudgetrevdet_mode, true);

			console.log(record);

			var prevvalue = record.deptbudgetdet_value
			var available = record.deptbudgetdet_available;
			form.setValue(obj.txt_deptbudgetrevdet_prev, prevvalue)
			form.setValue(obj.txt_deptbudgetrevdet_value, prevvalue)
			form.setValue(obj.txt_deptbudgetrevdet_available, available)
			variance_recalculate();
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() } })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })


	obj.txt_deptbudgetrevdet_value.numberbox({ onChange: (newvalue, oldvalue) => { txt_deptbudgetrevdet_valuechanged(newvalue, oldvalue); } })


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
	txt_title.html(hdata.deptbudgetrev_id)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_deptbudgetrevdet_mode, result.record.deptbudgetrevdet_mode, result.record.deptbudgetrevdet_modename)
			.setValue(obj.cbo_accbudget_id, result.record.accbudget_id, result.record.accbudget_name)
			.commit()
			.setViewMode()
			.rowid = rowid

		form.setDisable(obj.cbo_deptbudgetrevdet_mode, true);

		form.SuspendEvent(false);


		pnl_entry.show();

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
		data.deptbudgetrev_id= hdata.deptbudgetrev_id
		data.detil_value = 0

		data.deptbudgetrevdet_prev = 0
		data.deptbudgetrevdet_available = 0
		data.deptbudgetrevdet_value = 0
		data.deptbudgetrevdet_variance = 0

		data.accbudget_id = '0'
		data.accbudget_name = '-- PILIH --'

		data.deptbudgetrevdet_mode = global.setup.mode[1].id;
		data.deptbudgetrevdet_modename = global.setup.mode[1].text;

		pnl_entry.show();

		form.setDisable(obj.cbo_deptbudgetrevdet_mode, false);

		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`

	options.skipmappingresponse = [];
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)


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
	var objid = obj.txt_deptbudgetrevdet_id
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


function txt_deptbudgetrevdet_valuechanged(newvalue, oldvalue) {
	variance_recalculate();
}


function variance_recalculate() {
	var prevvalue = parseFloat(obj.txt_deptbudgetrevdet_prev.numberbox('getValue'));
	var newvalue = parseFloat(obj.txt_deptbudgetrevdet_value.numberbox('getValue'));
	var variance = prevvalue==0 ? 0 : (100*((newvalue-prevvalue)/prevvalue)).toFixed(2);
	form.setValue(obj.txt_deptbudgetrevdet_variance, variance);

}