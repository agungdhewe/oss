var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

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
	dt_colltargetbillout_datetarget: $('#pnl_editbilloutform-dt_colltargetbillout_datetarget'),
	chk_colltargetbillout_iscancel: $('#pnl_editbilloutform-chk_colltargetbillout_iscancel'),
	dt_billout_datedue: $('#pnl_editbilloutform-dt_billout_datedue'),
	txt_billout_daystotarget: $('#pnl_editbilloutform-txt_billout_daystotarget'),
	txt_billout_idr: $('#pnl_editbilloutform-txt_billout_idr'),
	txt_billout_ppn: $('#pnl_editbilloutform-txt_billout_ppn'),
	txt_billout_ppnval: $('#pnl_editbilloutform-txt_billout_ppnval'),
	txt_billout_pph: $('#pnl_editbilloutform-txt_billout_pph'),
	txt_billout_pphval: $('#pnl_editbilloutform-txt_billout_pphval'),
	txt_billout_idrnett: $('#pnl_editbilloutform-txt_billout_idrnett'),
	chk_billout_isdiscvalue: $('#pnl_editbilloutform-chk_billout_isdiscvalue'),
	txt_billout_discp: $('#pnl_editbilloutform-txt_billout_discp'),
	txt_billout_discval: $('#pnl_editbilloutform-txt_billout_discval'),
	txt_billout_idrtotal: $('#pnl_editbilloutform-txt_billout_idrtotal'),
	txt_billout_idrtopay: $('#pnl_editbilloutform-txt_billout_idrtopay'),
	txt_billout_ppntopay: $('#pnl_editbilloutform-txt_billout_ppntopay'),
	dt_ori_billout_datetarget: $('#pnl_editbilloutform-dt_ori_billout_datetarget'),
	dt_ori_billout_datedue: $('#pnl_editbilloutform-dt_ori_billout_datedue'),
	txt_ori_billout_daystotarget: $('#pnl_editbilloutform-txt_ori_billout_daystotarget'),
	txt_ori_billout_idr: $('#pnl_editbilloutform-txt_ori_billout_idr'),
	txt_ori_billout_ppn: $('#pnl_editbilloutform-txt_ori_billout_ppn'),
	txt_ori_billout_ppnval: $('#pnl_editbilloutform-txt_ori_billout_ppnval'),
	txt_ori_billout_pph: $('#pnl_editbilloutform-txt_ori_billout_pph'),
	txt_ori_billout_pphval: $('#pnl_editbilloutform-txt_ori_billout_pphval'),
	txt_ori_billout_idrnett: $('#pnl_editbilloutform-txt_ori_billout_idrnett'),
	chk_ori_billout_isdiscvalue: $('#pnl_editbilloutform-chk_ori_billout_isdiscvalue'),
	txt_ori_billout_discp: $('#pnl_editbilloutform-txt_ori_billout_discp'),
	txt_ori_billout_discval: $('#pnl_editbilloutform-txt_ori_billout_discval'),
	txt_ori_billout_idrtotal: $('#pnl_editbilloutform-txt_ori_billout_idrtotal'),
	txt_ori_billout_idrtopay: $('#pnl_editbilloutform-txt_ori_billout_idrtopay'),
	txt_ori_billout_ppntopay: $('#pnl_editbilloutform-txt_ori_billout_ppntopay'),
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
	})	

	form.AllowAddRecord = true
	form.AllowRemoveRecord = true
	form.AllowEditRecord = true
	form.CreateRecordStatusPage(this_page_id)
	form.CreateLogPage(this_page_id)




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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
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
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billout_id:'--NULL--', billout_descr:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
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
		data.billout_datedue = global.now()
		data.billout_daystotarget = 0
		data.billout_idr = 0
		data.billout_ppn = 0
		data.billout_ppnval = 0
		data.billout_pph = 0
		data.billout_pphval = 0
		data.billout_idrnett = 0
		data.billout_discp = 0
		data.billout_discval = 0
		data.billout_idrtotal = 0
		data.billout_idrtopay = 0
		data.billout_ppntopay = 0
		data.ori_billout_datetarget = global.now()
		data.ori_billout_datedue = global.now()
		data.ori_billout_daystotarget = 0
		data.ori_billout_idr = 0
		data.ori_billout_ppn = 0
		data.ori_billout_ppnval = 0
		data.ori_billout_pph = 0
		data.ori_billout_pphval = 0
		data.ori_billout_idrnett = 0
		data.ori_billout_discp = 0
		data.ori_billout_discval = 0
		data.ori_billout_idrtotal = 0
		data.ori_billout_idrtopay = 0
		data.ori_billout_ppntopay = 0

			data.partner_id = '0'
			data.partner_name = '-- PILIH --'
			data.billout_id = '--NULL--'
			data.billout_descr = 'NONE'




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
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/billout-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editbilloutgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.removerow(form.rowid)
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