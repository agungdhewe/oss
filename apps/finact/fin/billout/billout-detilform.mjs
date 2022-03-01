var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const reload_header_modified = true;


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
	txt_billoutdetil_id: $('#pnl_editdetilform-txt_billoutdetil_id'),
	cbo_billoutrowtype_id: $('#pnl_editdetilform-cbo_billoutrowtype_id'),
	cbo_orderindelv_id: $('#pnl_editdetilform-cbo_orderindelv_id'),
	cbo_itemclass_id: $('#pnl_editdetilform-cbo_itemclass_id'),
	txt_billoutdetil_descr: $('#pnl_editdetilform-txt_billoutdetil_descr'),
	txt_billoutdetil_totalitem: $('#pnl_editdetilform-txt_billoutdetil_totalitem'),
	txt_billoutdetil_totalqty: $('#pnl_editdetilform-txt_billoutdetil_totalqty'),
	txt_billoutdetil_salesgross: $('#pnl_editdetilform-txt_billoutdetil_salesgross'),
	txt_billoutdetil_discount: $('#pnl_editdetilform-txt_billoutdetil_discount'),
	txt_billoutdetil_subtotal: $('#pnl_editdetilform-txt_billoutdetil_subtotal'),
	txt_billoutdetil_pph: $('#pnl_editdetilform-txt_billoutdetil_pph'),
	txt_billoutdetil_nett: $('#pnl_editdetilform-txt_billoutdetil_nett'),
	txt_billoutdetil_ppn: $('#pnl_editdetilform-txt_billoutdetil_ppn'),
	txt_billoutdetil_total: $('#pnl_editdetilform-txt_billoutdetil_total'),
	txt_billoutdetil_totaladdcost: $('#pnl_editdetilform-txt_billoutdetil_totaladdcost'),
	txt_billoutdetil_dp: $('#pnl_editdetilform-txt_billoutdetil_dp'),
	txt_billoutdetil_payment: $('#pnl_editdetilform-txt_billoutdetil_payment'),
	cbo_accbudget_id: $('#pnl_editdetilform-cbo_accbudget_id'),
	cbo_coa_id: $('#pnl_editdetilform-cbo_coa_id'),
	txt_billout_id: $('#pnl_editdetilform-txt_billout_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_billoutdetil_id,
		autoid: true,
		logview: 'trn_billoutdetil',
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





	obj.cbo_billoutrowtype_id.name = 'pnl_editdetilform-cbo_billoutrowtype_id'		
	new fgta4slideselect(obj.cbo_billoutrowtype_id, {
		title: 'Pilih billoutrowtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billoutrowtype_id,
		fieldValue: 'billoutrowtype_id',
		fieldValueMap: 'billoutrowtype_id',
		fieldDisplay: 'billoutrowtype_name',
		fields: [
			{mapping: 'billoutrowtype_id', text: 'billoutrowtype_id'},
			{mapping: 'billoutrowtype_name', text: 'billoutrowtype_name'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_billoutrowtype_id_dataloading === 'function') {
				hnd.cbo_billoutrowtype_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_billoutrowtype_id_dataloaded === 'function') {
				hnd.cbo_billoutrowtype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_billoutrowtype_id_selected === 'function') {
					hnd.cbo_billoutrowtype_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_orderindelv_id.name = 'pnl_editdetilform-cbo_orderindelv_id'		
	new fgta4slideselect(obj.cbo_orderindelv_id, {
		title: 'Pilih orderindelv_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderindelv_id,
		fieldValue: 'orderindelv_id',
		fieldValueMap: 'orderindelv_id',
		fieldDisplay: 'orderindelv_descr',
		fields: [
			{mapping: 'orderindelv_id', text: 'orderindelv_id'},
			{mapping: 'orderindelv_descr', text: 'orderindelv_descr'},
		],
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_orderindelv_id_dataloading === 'function') {
				hnd.cbo_orderindelv_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({orderindelv_id:'--NULL--', orderindelv_descr:'NONE'});	
			if (typeof hnd.cbo_orderindelv_id_dataloaded === 'function') {
				hnd.cbo_orderindelv_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				console.log(record);

				if (record.orderindelv_id=='--NULL--')	{

					record.orderindelv_descr = '';
					record.orderindelv_totalitem = 0
					record.orderindevl_totalqty = 0
					record.orderindelv_salesgross = 0
					record.orderindelv_discount = 0
					record.orderindelv_subtotal = 0
					record.orderindelv_pph = 0
					record.orderindelv_nett = 0
					record.orderindelv_ppn = 0
					record.orderindelv_total = 0
					record.orderindelv_totaladdcost = 0
					record.orderindelv_payment = 0

				}	

				form.setValue(obj.txt_billoutdetil_descr, record.orderindelv_descr);


				form.setValue(obj.txt_billoutdetil_totalitem, record.orderindelv_totalitem);
				form.setValue(obj.txt_billoutdetil_totalqty, record.orderindevl_totalqty);
				form.setValue(obj.txt_billoutdetil_salesgross, record.orderindelv_salesgross);
				form.setValue(obj.txt_billoutdetil_discount, record.orderindelv_discount);
				form.setValue(obj.txt_billoutdetil_subtotal, record.orderindelv_subtotal);
				form.setValue(obj.txt_billoutdetil_pph, record.orderindelv_pph);
				form.setValue(obj.txt_billoutdetil_nett, record.orderindelv_nett);
				form.setValue(obj.txt_billoutdetil_ppn, record.orderindelv_ppn);
				form.setValue(obj.txt_billoutdetil_total, record.orderindelv_total);
				form.setValue(obj.txt_billoutdetil_totaladdcost, record.orderindelv_totaladdcost);
				form.setValue(obj.txt_billoutdetil_payment, record.orderindelv_payment);
				
						
				if (typeof hnd.cbo_orderindelv_id_selected === 'function') {
					hnd.cbo_orderindelv_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
	obj.cbo_itemclass_id.name = 'pnl_editdetilform-cbo_itemclass_id'		
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_itemclass_id_dataloading === 'function') {
				hnd.cbo_itemclass_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({itemclass_id:'--NULL--', itemclass_name:'NONE'});	
			if (typeof hnd.cbo_itemclass_id_dataloaded === 'function') {
				hnd.cbo_itemclass_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				console.log(record);

				form.setValue(obj.txt_billoutdetil_descr, record.itemclass_name);

				form.setValue(obj.cbo_accbudget_id, record.inquiry_accbudget_id, record.inquiry_accbudget_name );
				form.setValue(obj.cbo_coa_id, record.settl_coa_id, record.settl_coa_name );
							
						
				if (typeof hnd.cbo_itemclass_id_selected === 'function') {
					hnd.cbo_itemclass_id_selected(value, display, record, args);
				}
			}			
		}
	})				
			
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_accbudget_id_dataloading === 'function') {
				hnd.cbo_accbudget_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({accbudget_id:'--NULL--', accbudget_name:'NONE'});	
			if (typeof hnd.cbo_accbudget_id_dataloaded === 'function') {
				hnd.cbo_accbudget_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_accbudget_id_selected === 'function') {
					hnd.cbo_accbudget_id_selected(value, display, record, args);
				}
			}			
		}
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
		OnDataLoading: (criteria, options) => {
				
			if (typeof hnd.cbo_coa_id_dataloading === 'function') {
				hnd.cbo_coa_id_dataloading(criteria);
			}
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_coa_id_dataloaded === 'function') {
				hnd.cbo_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_coa_id_selected === 'function') {
					hnd.cbo_coa_id_selected(value, display, record, args);
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
	txt_title.html(hdata.billout_descr)
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
		if (record.orderindelv_id==null) { record.orderindelv_id='--NULL--'; record.orderindelv_descr='NONE'; }
		if (record.itemclass_id==null) { record.itemclass_id='--NULL--'; record.itemclass_name='NONE'; }
		if (record.accbudget_id==null) { record.accbudget_id='--NULL--'; record.accbudget_name='NONE'; }
		if (record.coa_id==null) { record.coa_id='--NULL--'; record.coa_name='NONE'; }

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
			.setValue(obj.cbo_billoutrowtype_id, record.billoutrowtype_id, record.billoutrowtype_name)
			.setValue(obj.cbo_orderindelv_id, record.orderindelv_id, record.orderindelv_descr)
			.setValue(obj.cbo_itemclass_id, record.itemclass_id, record.itemclass_name)
			.setValue(obj.cbo_accbudget_id, record.accbudget_id, record.accbudget_name)
			.setValue(obj.cbo_coa_id, record.coa_id, record.coa_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		


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
		data.billout_id= hdata.billout_id
		data.detil_value = 0

		data.billoutdetil_totalitem = 0
		data.billoutdetil_totalqty = 0
		data.billoutdetil_salesgross = 0
		data.billoutdetil_discount = 0
		data.billoutdetil_subtotal = 0
		data.billoutdetil_pph = 0
		data.billoutdetil_nett = 0
		data.billoutdetil_ppn = 0
		data.billoutdetil_total = 0
		data.billoutdetil_totaladdcost = 0
		data.billoutdetil_dp = 0
		data.billoutdetil_payment = 0

		data.billoutrowtype_id = '0'
		data.billoutrowtype_name = '-- PILIH --'
		data.orderindelv_id = '--NULL--'
		data.orderindelv_descr = 'NONE'
		data.itemclass_id = '--NULL--'
		data.itemclass_name = 'NONE'
		data.accbudget_id = '--NULL--'
		data.accbudget_name = 'NONE'
		data.coa_id = '--NULL--'
		data.coa_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editdetilgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/detil-save`

	// options.skipmappingresponse = ['orderindelv_id', 'itemclass_id', 'accbudget_id', 'coa_id', ];
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
	form.setValue(obj.cbo_orderindelv_id, result.dataresponse.orderindelv_descr!=='--NULL--' ? result.dataresponse.orderindelv_id : '--NULL--', result.dataresponse.orderindelv_descr!=='--NULL--'?result.dataresponse.orderindelv_descr:'NONE')
	form.setValue(obj.cbo_itemclass_id, result.dataresponse.itemclass_name!=='--NULL--' ? result.dataresponse.itemclass_id : '--NULL--', result.dataresponse.itemclass_name!=='--NULL--'?result.dataresponse.itemclass_name:'NONE')
	form.setValue(obj.cbo_accbudget_id, result.dataresponse.accbudget_name!=='--NULL--' ? result.dataresponse.accbudget_id : '--NULL--', result.dataresponse.accbudget_name!=='--NULL--'?result.dataresponse.accbudget_name:'NONE')
	form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')

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

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
	}

	

}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/detil-delete`
	
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editdetilgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.removerow(form.rowid)
	});

	if (reload_header_modified) {
		var currentRowdata =  $ui.getPages().ITEMS['pnl_edit'].handler.getCurrentRowdata();
		$ui.getPages().ITEMS['pnl_edit'].handler.open(currentRowdata.data, currentRowdata.rowid, false, (err, data)=>{
			$ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, currentRowdata.rowid);
		});	
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
	var objid = obj.txt_billoutdetil_id
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