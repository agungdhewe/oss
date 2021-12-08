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
	txt_projbudgetrevdet_id: $('#pnl_editdetilform-txt_projbudgetrevdet_id'),
	cbo_budgetrevmode_id: $('#pnl_editdetilform-cbo_budgetrevmode_id'),
	cbo_projbudgetdet_id: $('#pnl_editdetilform-cbo_projbudgetdet_id'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	cbo_alloc_dept_id: $('#pnl_editdetilform-cbo_alloc_dept_id'),
	txt_projbudgetrevdet_descr: $('#pnl_editdetilform-txt_projbudgetrevdet_descr'),
	txt_projbudgetrevdet_qty: $('#pnl_editdetilform-txt_projbudgetrevdet_qty'),
	txt_projbudgetrevdet_days: $('#pnl_editdetilform-txt_projbudgetrevdet_days'),
	txt_projbudgetrevdet_task: $('#pnl_editdetilform-txt_projbudgetrevdet_task'),
	txt_projbudgetrevdet_rate: $('#pnl_editdetilform-txt_projbudgetrevdet_rate'),
	txt_projbudgetrevdet_value: $('#pnl_editdetilform-txt_projbudgetrevdet_value'),
	txt_projbudgetrevdet_qty_prev: $('#pnl_editdetilform-txt_projbudgetrevdet_qty_prev'),
	txt_projbudgetrevdet_days_prev: $('#pnl_editdetilform-txt_projbudgetrevdet_days_prev'),
	txt_projbudgetrevdet_task_prev: $('#pnl_editdetilform-txt_projbudgetrevdet_task_prev'),
	txt_projbudgetrevdet_rate_prev: $('#pnl_editdetilform-txt_projbudgetrevdet_rate_prev'),
	txt_projbudgetrevdet_value_prev: $('#pnl_editdetilform-txt_projbudgetrevdet_value_prev'),
	txt_projbudgetrevdet_rate_variance: $('#pnl_editdetilform-txt_projbudgetrevdet_rate_variance'),
	txt_projbudgetrevdet_value_variance: $('#pnl_editdetilform-txt_projbudgetrevdet_value_variance'),
	txt_projbudgetrev_id: $('#pnl_editdetilform-txt_projbudgetrev_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_projbudgetrevdet_id,
		autoid: true,
		logview: 'mst_projbudgetrevdet',
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




	obj.cbo_budgetrevmode_id.name = 'pnl_editdetilform-cbo_budgetrevmode_id'		
	new fgta4slideselect(obj.cbo_budgetrevmode_id, {
		title: 'Pilih budgetrevmode_id',
		returnpage: this_page_id,
		api: $ui.apis.load_budgetrevmode_id,
		fieldValue: 'budgetrevmode_id',
		fieldValueMap: 'budgetrevmode_id',
		fieldDisplay: 'budgetrevmode_name',
		fields: [
			{mapping: 'budgetrevmode_id', text: 'budgetrevmode_id'},
			{mapping: 'budgetrevmode_name', text: 'budgetrevmode_name'},
		],
		OnDataLoading: (criteria, options) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				cbo_budgetrevmode_id_changed(value, display, record);
			}			
		}
	})				
			
	obj.cbo_projbudgetdet_id.name = 'pnl_editdetilform-cbo_projbudgetdet_id'		
	new fgta4slideselect(obj.cbo_projbudgetdet_id, {
		title: 'Pilih projbudgetdet_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-projbudgetdet-torevise`,
		fieldValue: 'projbudgetdet_id',
		fieldValueMap: 'projbudgetdet_id',
		fieldDisplay: 'projbudgetdet_descr',
		fields: [
			{mapping: 'projbudgetdet_id', text: 'projbudgetdet_id'},
			{mapping: 'projbudgetdet_descr', text: 'projbudgetdet_descr'},
		],
		OnDataLoading: (criteria, options) => {
			criteria.projbudget_id = header_data.projbudget_id;
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			console.log(record);
			if (value!=args.PreviousValue ) {
				form.setValue(obj.cbo_accbudget_id, record.accbudget_id, record.accbudget_name)	
				form.setValue(obj.cbo_alloc_dept_id, record.alloc_dept_id, record.alloc_dept_name)	
				
				form.setValue(obj.txt_projbudgetrevdet_qty, record.projbudgetdet_qty);
				form.setValue(obj.txt_projbudgetrevdet_days, record.projbudgetdet_days);
				form.setValue(obj.txt_projbudgetrevdet_task, record.projbudgetdet_task);
				form.setValue(obj.txt_projbudgetrevdet_rate, record.projbudgetdet_rate);
				form.setValue(obj.txt_projbudgetrevdet_value, record.projbudgetdet_value);

				// Previous Budget
				form.setValue(obj.txt_projbudgetrevdet_qty_prev, record.projbudgetdet_qty);
				form.setValue(obj.txt_projbudgetrevdet_days_prev, record.projbudgetdet_days);
				form.setValue(obj.txt_projbudgetrevdet_task_prev, record.projbudgetdet_task);
				form.setValue(obj.txt_projbudgetrevdet_rate_prev, record.projbudgetdet_rate);
				form.setValue(obj.txt_projbudgetrevdet_value_prev, record.projbudgetdet_value);

				
			}			
		}
	})				
			
	obj.cbo_accbudget_id.name = 'pnl_editdetilform-cbo_accbudget_id'		
	new fgta4slideselect(obj.cbo_accbudget_id, {
		title: 'Pilih accbudget_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-accbudget-proj-torevise-add`, //$ui.apis.load_accbudget_id,
		fieldValue: 'accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria, options) => {
			var dept_id = header_data.dept_id
			var projbudget_id = header_data.projbudget_id
			var projbudget_year = header_data.projbudget_year
			var projbudget_month = header_data.projbudget_month
			var projbudgetrev_id = header_data.projbudgetrev_id
			var current_accbudget_id = form.getOldValue(obj.cbo_accbudget_id)

			options.api = `${global.modulefullname}/get-accbudget-proj-torevise-add`;
			criteria.dept_id = dept_id
			criteria.projbudget_id = projbudget_id
			criteria.projbudget_year = projbudget_year
			criteria.projbudget_month = projbudget_month
			criteria.projbudgetrev_id = projbudgetrev_id
			criteria.include_accbudget_id = current_accbudget_id

		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			
	obj.cbo_alloc_dept_id.name = 'pnl_editdetilform-cbo_alloc_dept_id'		
	new fgta4slideselect(obj.cbo_alloc_dept_id, {
		title: 'Pilih alloc_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_alloc_dept_id,
		fieldValue: 'alloc_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria, options) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
			}			
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })


	obj.txt_projbudgetrevdet_qty.numberbox({ onChange: (newvalue, oldvalue) => {  txt_projbudgetrevdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetrevdet_days.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetrevdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetrevdet_task.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetrevdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetrevdet_value.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetrevdet_valuechanged(newvalue, oldvalue); } })


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
	txt_title.html(hdata.projbudgetrev_descr)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*

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
		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_budgetrevmode_id, record.budgetrevmode_id, record.budgetrevmode_name)
			.setValue(obj.cbo_projbudgetdet_id, record.projbudgetdet_id, record.projbudgetdet_descr)
			.setValue(obj.cbo_accbudget_id, record.accbudget_id, record.accbudget_name)
			.setValue(obj.cbo_alloc_dept_id, record.alloc_dept_id, record.dept_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		cbo_budgetrevmode_id_changed(record.budgetrevmode_id)



		form.commit()
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
		data.projbudgetrev_id= hdata.projbudgetrev_id
		data.detil_value = 0

		data.projbudgetrevdet_qty = 1
		data.projbudgetrevdet_days = 1
		data.projbudgetrevdet_task = 1
		data.projbudgetrevdet_rate = 0
		data.projbudgetrevdet_value = 0
		data.projbudgetrevdet_qty_prev = 0
		data.projbudgetrevdet_days_prev = 0
		data.projbudgetrevdet_task_prev = 0
		data.projbudgetrevdet_rate_prev = 0
		data.projbudgetrevdet_value_prev = 0
		data.projbudgetrevdet_rate_variance = 0
		data.projbudgetrevdet_value_variance = 0

		data.budgetrevmode_id = 'U'
		data.budgetrevmode_name = 'Update Existing'
		data.projbudgetdet_id = '0'
		data.projbudgetdet_descr = '-- PILIH --'
		data.accbudget_id = '0'
		data.accbudget_name = '-- PILIH --'
		data.alloc_dept_id = '0'
		data.dept_name = '-- PILIH --'

		cbo_budgetrevmode_id_changed(data.budgetrevmode_id)


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`

	// options.skipmappingresponse = [];
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

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*

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
	var objid = obj.txt_projbudgetrevdet_id
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


function cbo_budgetrevmode_id_changed(value) {

	console.log(value);
	if (value=='A') {
		// penambahan baru, 
		// Budget Line disable, kosong
		obj.cbo_projbudgetdet_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
	} else if (value=='U') {
		// update
		// Budget Line harus diisi
		obj.cbo_projbudgetdet_id.revalidate({
			required: true, invalidMessage:  'Detil budget yang akan direvisi harus dipilih', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_editdetilform-cbo_projbudgetdet_id']",
		});
	}

	if (form.isEventSuspended()) {
		return;
	}

	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)

	if (value=='A') {
		// penambahan baru, 
		form.setDisable(obj.cbo_projbudgetdet_id, true);
		form.setDisable(obj.cbo_accbudget_id, false);
		form.setDisable(obj.cbo_alloc_dept_id, false);
		
		form.setValue(obj.cbo_projbudgetdet_id, promptOptional.value, promptOptional.text);
		form.setValue(obj.cbo_alloc_dept_id, header_data.dept_id, header_data.dept_name);
	} else {
		form.setDisable(obj.cbo_projbudgetdet_id, false);
		form.setDisable(obj.cbo_accbudget_id, true);
		form.setDisable(obj.cbo_alloc_dept_id, true);

		form.setValue(obj.cbo_projbudgetdet_id, promptMandatory.value, promptMandatory.text);
		form.setValue(obj.cbo_alloc_dept_id, promptMandatory.value, promptMandatory.text);
	}

	form.setValue(obj.cbo_accbudget_id, promptMandatory.value, promptMandatory.text);
	

}


function txt_projbudgetrevdet_valuechanged(newvalue, oldvalue) {
	recalculate();
}


function recalculate() {

	var curr_days = parseInt(form.getValue(obj.txt_projbudgetrevdet_days))
	var curr_qty = parseInt(form.getValue(obj.txt_projbudgetrevdet_qty))
	var curr_task = parseInt(form.getValue(obj.txt_projbudgetrevdet_task))
	var curr_value = parseFloat(form.getValue(obj.txt_projbudgetrevdet_value))

	// var prev_days = parseInt(form.getValue(obj.txt_projbudgetrevdet_days_prev))
	// var prev_qty = parseInt(form.getValue(obj.txt_projbudgetrevdet_qty_prev))
	// var prev_task = parseInt(form.getValue(obj.txt_projbudgetrevdet_task_prev))
	var prev_rate = parseFloat(form.getValue(obj.txt_projbudgetrevdet_rate_prev))
	var prev_value = parseFloat(form.getValue(obj.txt_projbudgetrevdet_value_prev))

	// curr_days = curr_days==0 ? 1 : curr_days;
	// curr_qty = curr_qty==0 ? 1 : curr_qty;
	// curr_task = curr_task==0 ? 1 : curr_task;
	
	// prev_days = prev_days==0 ? 1 : prev_days;
	// prev_qty = prev_qty==0 ? 1 : prev_qty;
	// prev_task = curr_days==0 ? 1 : prev_task;

	// console.log('test');
	var curr_rate = curr_value / (curr_days * curr_qty * curr_task);
	var var_rate =  (100*((curr_rate-prev_rate)/prev_rate)).toFixed(2);
	var var_value =  (100*((curr_value-prev_value)/prev_value)).toFixed(2);
		
	form.setValue(obj.txt_projbudgetrevdet_rate, curr_rate);
	form.setValue(obj.txt_projbudgetrevdet_rate_variance, var_rate);
	form.setValue(obj.txt_projbudgetrevdet_value_variance, var_value);
}