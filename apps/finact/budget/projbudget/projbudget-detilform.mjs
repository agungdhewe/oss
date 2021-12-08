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


const txt_available = $('#pnl_editdetilform-txt_accbudget_available');
const pnl_form = $('#pnl_editdetilform-form')
const obj = {
	txt_projbudgetdet_id: $('#pnl_editdetilform-txt_projbudgetdet_id'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	cbo_alloc_dept_id: $('#pnl_editdetilform-cbo_alloc_dept_id'),
	txt_projbudgetdet_descr: $('#pnl_editdetilform-txt_projbudgetdet_descr'),
	txt_projbudgetdet_qty: $('#pnl_editdetilform-txt_projbudgetdet_qty'),
	txt_projbudgetdet_days: $('#pnl_editdetilform-txt_projbudgetdet_days'),
	txt_projbudgetdet_task: $('#pnl_editdetilform-txt_projbudgetdet_task'),
	txt_projbudgetdet_rate: $('#pnl_editdetilform-txt_projbudgetdet_rate'),
	txt_projbudgetdet_valueprop: $('#pnl_editdetilform-txt_projbudgetdet_valueprop'),
	txt_projbudgetdet_value: $('#pnl_editdetilform-txt_projbudgetdet_value'),
	txt_projbudget_id: $('#pnl_editdetilform-txt_projbudget_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_projbudgetdet_id,
		autoid: true,
		logview: 'mst_projbudgetdet',
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




	obj.cbo_accbudget_id.name = 'pnl_editdetilform-cbo_accbudget_id'		
	new fgta4slideselect(obj.cbo_accbudget_id, {
		title: 'Pilih accbudget_id',
		returnpage: this_page_id,
		api: `${global.modulefullname}/get-accbudget-for-proj`,
		fieldValue: 'accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'Account'},
			{mapping: 'accbudget_name', text: 'Budget'},
			{mapping: 'deptbudgetdet_available', text:'UnAllocated', formatter: "row_format_number", style: "width: 100px; text-align: right"}
		],
		OnDataLoading: (criteria) => {
			var dept_id = header_data.dept_id
			var deptbudget_year = header_data.projbudget_year
			var deptbudget_month = header_data.projbudget_month
			var projbudget_id = header_data.projbudget_id
			var projbudgetdet_id_exclude = form.getValue(obj.txt_projbudgetdet_id)
			var current_accbudget_id = form.getOldValue(obj.cbo_accbudget_id)

			criteria.dept_id = dept_id
			criteria.deptbudget_year = deptbudget_year
			criteria.deptbudget_month = deptbudget_month
			criteria.projbudget_id = projbudget_id
			criteria.projbudgetdet_id_exclude = projbudgetdet_id_exclude

			if (header_data.projbudget_isdeptalloc) {
				criteria.isdeptalloc = 1
			} else {
				criteria.include_accbudget_id = current_accbudget_id
			}
			
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			console.log(record);
			var available = record.deptbudgetdet_available;
			var qty = form.getValue(obj.txt_projbudgetdet_qty);
			var days = form.getValue(obj.txt_projbudgetdet_days);
			var task = form.getValue(obj.txt_projbudgetdet_task);
			var current_budget_rate = form.getValue(obj.txt_projbudgetdet_rate);
			if (current_budget_rate==0) {
				var u_qty = qty!=0 ? qty : 1;
				var u_days = days!=0 ? days : 1;
				var u_task = task!=0 ? task : 1;
				current_budget_rate =  Math.floor(available / (u_qty * u_days * u_task)).toFixed(0)
				form.setValue(obj.txt_projbudgetdet_rate, current_budget_rate) 
			} 

			txt_available.numberbox('setValue', available);

			txt_projbudgetdet_composename();

		}
	})				
			

	obj.cbo_alloc_dept_id.name = 'pnl_editdetilform-cbo_alloc_dept_id'
	new fgta4slideselect(obj.cbo_alloc_dept_id, {
		title: 'Pilih Alokasi Departemen',
		returnpage: this_page_id,
		api: $ui.apis.load_alloc_dept_id,
		fieldValue: 'alloc_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
		},
		OnSelected: (value, display, record) => {
			// var old_dept_id = form.getOldValue(obj.cbo_dept_id);
			// if (value!=old_dept_id) {
			// 	form.setValue(obj.cbo_project_id, '0', '-- PILIH --')
			// }
			txt_projbudgetdet_composename();
		}
	})	


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() } })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })


	obj.txt_projbudgetdet_qty.numberbox({ onChange: (newvalue, oldvalue) => {  txt_projbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetdet_days.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetdet_task.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_projbudgetdet_rate.numberbox({ onChange: (newvalue, oldvalue) => { txt_projbudgetdet_valuechanged(newvalue, oldvalue); } })


	setTimeout(()=>{
		form.set_state_textbox(txt_available, true)
	}, 1000);

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
	txt_title.html(hdata.projbudget_name)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/detil-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		txt_available.numberbox('setValue', result.record.accbudget_available);


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_accbudget_id, result.record.accbudget_id, result.record.accbudget_name)
			.setValue(obj.cbo_alloc_dept_id, result.record.alloc_dept_id, result.record.alloc_dept_name)
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

		console.log(data);

		data.projbudget_id= hdata.projbudget_id
		data.detil_value = 0

		data.projbudgetdet_qty = 1
		data.projbudgetdet_days = 1
		data.projbudgetdet_task = 1
		data.projbudgetdet_rate = 0
		data.projbudgetdet_value = 0
		data.projbudgetdet_valueprop = 0
		data.accbudget_id = '0'
		data.accbudget_name = '-- PILIH --'
		data.alloc_dept_id = header_data.dept_id
		data.alloc_dept_name = header_data.dept_name

		txt_available.numberbox('setValue', 0);

		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	var available = parseFloat(txt_available.numberbox('getValue'));
	var proposed = parseFloat(data.projbudgetdet_valueprop);

	
	if (false === await (async (data)=>{
		return new Promise((resolve, reject) => {
			try {
				if (proposed > available) {
					throw new Error('Nilai budget yang diajukan lebih besar dari nilai yang tersedia.');
				}
				resolve(true);
			} catch (err) {
				resolve(false);
				$ui.ShowMessage(`[WARNING] ${err.message}`);
			}
		})
	})(data)) {
		options.cancel = true;
		return;
	} 
	

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
	var objid = obj.txt_projbudgetdet_id
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


function txt_projbudgetdet_valuechanged(newvalue, oldvalue) {
	var qty = obj.txt_projbudgetdet_qty.numberbox('getValue');
	var days = obj.txt_projbudgetdet_days.numberbox('getValue');
	var task = obj.txt_projbudgetdet_task.numberbox('getValue');
	var rate = obj.txt_projbudgetdet_rate.numberbox('getValue');
	var value = qty * days * task * rate;

	form.setValue(obj.txt_projbudgetdet_valueprop, value);
	form.setValue(obj.txt_projbudgetdet_value, value);
	
}


function txt_projbudgetdet_composename() {
	var dept_name = obj.cbo_alloc_dept_id.combo('getText');
	var accbudget_name = obj.cbo_accbudget_id.combo('getText');
	var projbudgetdet_descr = `${accbudget_name} - ${dept_name}`;

	console.log('ddd');
	if (dept_name!=header_data.dept_name) {
		form.setValue(obj.txt_projbudgetdet_descr, projbudgetdet_descr);
	} else {
		form.setValue(obj.txt_projbudgetdet_descr, accbudget_name);
	}

	
}