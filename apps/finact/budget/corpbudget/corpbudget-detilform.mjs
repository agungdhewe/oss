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
	txt_corpbudgetdet_id: $('#pnl_editdetilform-txt_corpbudgetdet_id'),
	txt_corpbudgetdet_descr: $('#pnl_editdetilform-txt_corpbudgetdet_descr'),
	txt_corpbudgetdet_01: $('#pnl_editdetilform-txt_corpbudgetdet_01'),
	txt_corpbudgetdet_02: $('#pnl_editdetilform-txt_corpbudgetdet_02'),
	txt_corpbudgetdet_03: $('#pnl_editdetilform-txt_corpbudgetdet_03'),
	txt_corpbudgetdet_04: $('#pnl_editdetilform-txt_corpbudgetdet_04'),
	txt_corpbudgetdet_05: $('#pnl_editdetilform-txt_corpbudgetdet_05'),
	txt_corpbudgetdet_06: $('#pnl_editdetilform-txt_corpbudgetdet_06'),
	txt_corpbudgetdet_07: $('#pnl_editdetilform-txt_corpbudgetdet_07'),
	txt_corpbudgetdet_08: $('#pnl_editdetilform-txt_corpbudgetdet_08'),
	txt_corpbudgetdet_09: $('#pnl_editdetilform-txt_corpbudgetdet_09'),
	txt_corpbudgetdet_10: $('#pnl_editdetilform-txt_corpbudgetdet_10'),
	txt_corpbudgetdet_11: $('#pnl_editdetilform-txt_corpbudgetdet_11'),
	txt_corpbudgetdet_12: $('#pnl_editdetilform-txt_corpbudgetdet_12'),
	txt_corpbudgetdet_total: $('#pnl_editdetilform-txt_corpbudgetdet_total'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	txt_corpbudgetdet_notes: $('#pnl_editdetilform-txt_corpbudgetdet_notes'),
	txt_corpbudget_id: $('#pnl_editdetilform-txt_corpbudget_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_corpbudgetdet_id,
		autoid: true,
		logview: 'mst_corpbudgetdet',
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
		api: $ui.apis.load_accbudget_id,
		fieldValue: 'accbudget_id',
		fieldValueMap: 'accbudget_id',
		fieldDisplay: 'accbudget_name',
		fields: [
			{mapping: 'accbudget_id', text: 'accbudget_id'},
			{mapping: 'accbudget_name', text: 'accbudget_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() } })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })


	obj.txt_corpbudgetdet_01.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_02.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_03.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_04.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_05.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_06.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_07.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_08.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_09.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_10.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_11.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })
	obj.txt_corpbudgetdet_12.numberbox({ onChange: (newvalue, oldvalue) => { txt_corpbudgetdet_valuechanged(newvalue, oldvalue); } })


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
	txt_title.html(hdata.corpbudget_id)
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
			.setValue(obj.cbo_accbudget_id, result.record.accbudget_id, result.record.accbudget_name)
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
		data.corpbudget_id= hdata.corpbudget_id
		data.detil_value = 0

		data.corpbudgetdet_01 = 0
		data.corpbudgetdet_02 = 0
		data.corpbudgetdet_03 = 0
		data.corpbudgetdet_04 = 0
		data.corpbudgetdet_05 = 0
		data.corpbudgetdet_06 = 0
		data.corpbudgetdet_07 = 0
		data.corpbudgetdet_08 = 0
		data.corpbudgetdet_09 = 0
		data.corpbudgetdet_10 = 0
		data.corpbudgetdet_11 = 0
		data.corpbudgetdet_12 = 0
		data.corpbudgetdet_total = 0

			data.accbudget_id = '0'
			data.accbudget_name = '-- PILIH --'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`



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
	var objid = obj.txt_corpbudgetdet_id
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



function txt_corpbudgetdet_valuechanged(newvalue, oldvalue) {
	if (form.isEventSuspended()) {
		return;
	}

	var corpbudgetdet_01 = parseFloat(obj.txt_corpbudgetdet_01.numberbox('getValue'));
	var corpbudgetdet_02 = parseFloat(obj.txt_corpbudgetdet_02.numberbox('getValue'));
	var corpbudgetdet_03 = parseFloat(obj.txt_corpbudgetdet_03.numberbox('getValue'));
	var corpbudgetdet_04 = parseFloat(obj.txt_corpbudgetdet_04.numberbox('getValue'));
	var corpbudgetdet_05 = parseFloat(obj.txt_corpbudgetdet_05.numberbox('getValue'));
	var corpbudgetdet_06 = parseFloat(obj.txt_corpbudgetdet_06.numberbox('getValue'));
	var corpbudgetdet_07 = parseFloat(obj.txt_corpbudgetdet_07.numberbox('getValue'));
	var corpbudgetdet_08 = parseFloat(obj.txt_corpbudgetdet_08.numberbox('getValue'));
	var corpbudgetdet_09 = parseFloat(obj.txt_corpbudgetdet_09.numberbox('getValue'));
	var corpbudgetdet_10 = parseFloat(obj.txt_corpbudgetdet_10.numberbox('getValue'));
	var corpbudgetdet_11 = parseFloat(obj.txt_corpbudgetdet_11.numberbox('getValue'));
	var corpbudgetdet_12 = parseFloat(obj.txt_corpbudgetdet_12.numberbox('getValue'));

	var total = corpbudgetdet_01 + corpbudgetdet_02 + corpbudgetdet_03 + corpbudgetdet_04 
	          + corpbudgetdet_05 + corpbudgetdet_06 + corpbudgetdet_07 + corpbudgetdet_08
			  + corpbudgetdet_09 + corpbudgetdet_10 + corpbudgetdet_11 + corpbudgetdet_12

	// obj.txt_deptbudgetdet_total.numberbox('setValue', total);
	form.setValue(obj.txt_corpbudgetdet_total, total);
	
}
