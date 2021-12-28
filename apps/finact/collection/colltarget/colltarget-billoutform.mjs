var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './colltarget-billoutform-hnd.mjs'

const reload_header_modified = true;


const txt_title = $('#pnl_editbilloutform-title')
const btn_edit = $('#pnl_editbilloutform-btn_edit')
const btn_save = $('#pnl_editbilloutform-btn_save')
const btn_delete = $('#pnl_editbilloutform-btn_delete')
const btn_prev = $('#pnl_editbilloutform-btn_prev')
const btn_next = $('#pnl_editbilloutform-btn_next')
const btn_addnew = $('#pnl_editbilloutform-btn_addnew')
const chk_autoadd = $('#pnl_editbilloutform-autoadd')


const pnl_form = $('#pnl_editbilloutform-form')
const obj = {
	txt_colltargetbillout_id: $('#pnl_editbilloutform-txt_colltargetbillout_id'),
	cbo_partner_id: $('#pnl_editbilloutform-cbo_partner_id'),
	cbo_billout_id: $('#pnl_editbilloutform-cbo_billout_id'),
	chk_billout_isunreference: $('#pnl_editbilloutform-chk_billout_isunreference'),
	dt_colltargetbillout_datetarget: $('#pnl_editbilloutform-dt_colltargetbillout_datetarget'),
	txt_colltargetbillout_notes: $('#pnl_editbilloutform-txt_colltargetbillout_notes'),
	txt_billout_idr: $('#pnl_editbilloutform-txt_billout_idr'),
	chk_billout_isdiscvalue: $('#pnl_editbilloutform-chk_billout_isdiscvalue'),
	txt_billout_discp: $('#pnl_editbilloutform-txt_billout_discp'),
	txt_billout_discval: $('#pnl_editbilloutform-txt_billout_discval'),
	txt_billout_idrtopay: $('#pnl_editbilloutform-txt_billout_idrtopay'),
	txt_billout_ppntopay: $('#pnl_editbilloutform-txt_billout_ppntopay'),
	txt_billout_idrtotal: $('#pnl_editbilloutform-txt_billout_idrtotal'),
	dt_billout_datedue: $('#pnl_editbilloutform-dt_billout_datedue'),
	txt_billout_daystotarget: $('#pnl_editbilloutform-txt_billout_daystotarget'),
	txt_billout_totalitem: $('#pnl_editbilloutform-txt_billout_totalitem'),
	txt_billout_totalqty: $('#pnl_editbilloutform-txt_billout_totalqty'),
	txt_billout_salesgross: $('#pnl_editbilloutform-txt_billout_salesgross'),
	txt_billout_discount: $('#pnl_editbilloutform-txt_billout_discount'),
	txt_billout_subtotal: $('#pnl_editbilloutform-txt_billout_subtotal'),
	txt_billout_pph: $('#pnl_editbilloutform-txt_billout_pph'),
	txt_billout_nett: $('#pnl_editbilloutform-txt_billout_nett'),
	txt_billout_ppn: $('#pnl_editbilloutform-txt_billout_ppn'),
	txt_billout_total: $('#pnl_editbilloutform-txt_billout_total'),
	txt_billout_totaladdcost: $('#pnl_editbilloutform-txt_billout_totaladdcost'),
	txt_billout_dp: $('#pnl_editbilloutform-txt_billout_dp'),
	txt_billout_payment: $('#pnl_editbilloutform-txt_billout_payment'),
	txt_billout_paid: $('#pnl_editbilloutform-txt_billout_paid'),
	txt_colltarget_id: $('#pnl_editbilloutform-txt_colltarget_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_colltargetbillout_id,
		autoid: true,
		logview: 'trn_colltargetbillout',
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
	});
	form.getHeaderData = () => {
		return header_data;
	}	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)



	obj.chk_billout_isunreference.checkbox({onChange: (checked) => { 
		if (typeof hnd.billout_isunreference_changed==='function') {hnd.billout_isunreference_changed(checked)} 
	}});
	
	obj.dt_colltargetbillout_datetarget.datebox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.colltargetbillout_datetarget_changed==='function') {hnd.colltargetbillout_datetarget_changed(newvalue, oldvalue)} 
	}});
	
	obj.chk_billout_isdiscvalue.checkbox({onChange: (checked) => { 
		if (typeof hnd.billout_isdiscvalue_changed==='function') {hnd.billout_isdiscvalue_changed(checked)} 
	}});
	
	obj.txt_billout_discp.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.billout_discp_changed==='function') {hnd.billout_discp_changed(newvalue, oldvalue)} 
	}});
	
	obj.txt_billout_discval.numberbox({onChange: (newvalue, oldvalue) => { 
		if (typeof hnd.billout_discval_changed==='function') {hnd.billout_discval_changed(newvalue, oldvalue)} 
	}});
	


	obj.cbo_partner_id.name = 'pnl_editbilloutform-cbo_partner_id'		
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_partner_id_dataloading === 'function') {
				hnd.cbo_partner_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_partner_id_dataloaded === 'function') {
				hnd.cbo_partner_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partner_id_selected === 'function') {
					hnd.cbo_partner_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_billout_id.name = 'pnl_editbilloutform-cbo_billout_id'		
	new fgta4slideselect(obj.cbo_billout_id, {
		title: 'Pilih billout_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billout_id,
		fieldValue: 'billout_id',
		fieldValueMap: 'billout_id',
		fieldDisplay: 'billout_descr',
		fields: [
			{mapping: 'billout_id', text: 'billout_id'},
			{mapping: 'billout_descr', text: 'billout_descr'},
			{mapping: 'billout_payment', text: 'Outstanding', formatter: 'row_format_number', style: 'width: 100px; text-align: right'},

		],
		OnDataLoading: (criteria, options) => {
			criteria.partner_id = form.getValue(obj.cbo_partner_id)	
			if (typeof hnd.cbo_billout_id_dataloading === 'function') {
				hnd.cbo_billout_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billout_id:'--NULL--', billout_descr:'NONE'});	
			if (typeof hnd.cbo_billout_id_dataloaded === 'function') {
				hnd.cbo_billout_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
						
				if (typeof hnd.cbo_billout_id_selected === 'function') {
					hnd.cbo_billout_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			


	btn_addnew.linkbutton({ onClick: () => { btn_addnew_click() }  })
	btn_prev.linkbutton({ onClick: () => { btn_prev_click() } })
	btn_next.linkbutton({ onClick: () => { btn_next_click() } })

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
					$ui.getPages().show('pnl_editbilloutgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editbilloutgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.scrolllast()
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

	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt
		})
	}

}


export function OnSizeRecalculated(width, height) {
}


export function getForm() {
	return form
}

export function open(data, rowid, hdata) {
	// console.log(header_data)
	txt_title.html(hdata.periodemo_id)
	header_data = hdata

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/billout-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*
		if (record.billout_id==null) { record.billout_id='--NULL--'; record.billout_descr='NONE'; }

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
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_billout_id, record.billout_id, record.billout_descr)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


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
		data.colltarget_id= hdata.colltarget_id
		data.billout_value = 0

		data.colltargetbillout_datetarget = global.now()
		data.billout_idr = 0
		data.billout_discp = 0
		data.billout_discval = 0
		data.billout_idrtopay = 0
		data.billout_ppntopay = 0
		data.billout_idrtotal = 0
		data.billout_datedue = global.now()
		data.billout_daystotarget = 0
		data.billout_totalitem = 0
		data.billout_totalqty = 0
		data.billout_salesgross = 0
		data.billout_discount = 0
		data.billout_subtotal = 0
		data.billout_pph = 0
		data.billout_nett = 0
		data.billout_ppn = 0
		data.billout_total = 0
		data.billout_totaladdcost = 0
		data.billout_dp = 0
		data.billout_payment = 0
		data.billout_paid = 0

		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.billout_id = '--NULL--'
		data.billout_descr = 'NONE'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}


		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editbilloutgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/billout-save`

	// options.skipmappingresponse = ['billout_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}	
}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	/*
	form.setValue(obj.cbo_billout_id, result.dataresponse.billout_descr!=='--NULL--' ? result.dataresponse.billout_id : '--NULL--', result.dataresponse.billout_descr!=='--NULL--'?result.dataresponse.billout_descr:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/billout-delete`
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editbilloutgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
	
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
	var objid = obj.txt_colltargetbillout_id
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
	var record = $ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}