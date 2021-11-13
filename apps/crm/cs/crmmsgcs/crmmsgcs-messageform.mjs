var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editmessageform-title')
const btn_edit = $('#pnl_editmessageform-btn_edit')
const btn_save = $('#pnl_editmessageform-btn_save')
const btn_delete = $('#pnl_editmessageform-btn_delete')
const btn_prev = $('#pnl_editmessageform-btn_prev')
const btn_next = $('#pnl_editmessageform-btn_next')
const btn_addnew = $('#pnl_editmessageform-btn_addnew')
const chk_autoadd = $('#pnl_editmessageform-autoadd')

const pnl_form = $('#pnl_editmessageform-form')
const obj = {
	txt_crmmsgcsitem_id: $('#pnl_editmessageform-txt_crmmsgcsitem_id'),
	txt_crmmsgcsitem_message: $('#pnl_editmessageform-txt_crmmsgcsitem_message'),
	cbo_crmmsgclass_id: $('#pnl_editmessageform-cbo_crmmsgclass_id'),
	cbo_brand_id: $('#pnl_editmessageform-cbo_brand_id'),
	cbo_site_id: $('#pnl_editmessageform-cbo_site_id'),
	txt_crmmsgcs_id: $('#pnl_editmessageform-txt_crmmsgcs_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_crmmsgcsitem_id,
		autoid: true,
		logview: 'trn_crmmsgcsitem',
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


	obj.cbo_crmmsgclass_id.name = 'pnl_editmessageform-cbo_crmmsgclass_id'		
	new fgta4slideselect(obj.cbo_crmmsgclass_id, {
		title: 'Pilih crmmsgclass_id',
		returnpage: this_page_id,
		api: $ui.apis.load_crmmsgclass_id,
		fieldValue: 'crmmsgclass_id',
		fieldValueMap: 'crmmsgclass_id',
		fieldDisplay: 'crmmsgclass_name',
		fields: [
			{mapping: 'crmmsgclass_id', text: 'crmmsgclass_id'},
			{mapping: 'crmmsgclass_name', text: 'crmmsgclass_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_brand_id.name = 'pnl_editmessageform-cbo_brand_id'		
	new fgta4slideselect(obj.cbo_brand_id, {
		title: 'Pilih brand_id',
		returnpage: this_page_id,
		api: $ui.apis.load_brand_id,
		fieldValue: 'brand_id',
		fieldValueMap: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'brand_id'},
			{mapping: 'brand_name', text: 'brand_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({brand_id:'--NULL--', brand_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
			
	obj.cbo_site_id.name = 'pnl_editmessageform-cbo_site_id'		
	new fgta4slideselect(obj.cbo_site_id, {
		title: 'Pilih site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_site_id,
		fieldValue: 'site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({site_id:'--NULL--', site_name:'NONE'});	
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
					$ui.getPages().show('pnl_editmessagegrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editmessagegrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editmessagegrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editmessagegrid'].handler.scrolllast()
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
	txt_title.html(hdata.crmmsgcs_name)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/message-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.brand_id==null) { result.record.brand_id='--NULL--'; result.record.brand_name='NONE'; }
		if (result.record.site_id==null) { result.record.site_id='--NULL--'; result.record.site_name='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_crmmsgclass_id, result.record.crmmsgclass_id, result.record.crmmsgclass_name)
			.setValue(obj.cbo_brand_id, result.record.brand_id, result.record.brand_name)
			.setValue(obj.cbo_site_id, result.record.site_id, result.record.site_name)
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
		data.crmmsgcs_id= hdata.crmmsgcs_id
		data.message_value = 0


			data.crmmsgclass_id = '0'
			data.crmmsgclass_name = '-- PILIH --'
			data.brand_id = '--NULL--'
			data.brand_name = 'NONE'
			data.site_id = '--NULL--'
			data.site_name = 'NONE'



		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editmessagegrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/message-save`

	options.skipmappingresponse = ["brand_id"];
	options.skipmappingresponse = ["site_id"];


}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_brand_id, result.dataresponse.brand_name!=='--NULL--' ? result.dataresponse.brand_id : '--NULL--', result.dataresponse.brand_name!=='--NULL--'?result.dataresponse.brand_name:'NONE')
	form.setValue(obj.cbo_site_id, result.dataresponse.site_name!=='--NULL--' ? result.dataresponse.site_id : '--NULL--', result.dataresponse.site_name!=='--NULL--'?result.dataresponse.site_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_editmessagegrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/message-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editmessagegrid', ()=>{
		$ui.getPages().ITEMS['pnl_editmessagegrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_crmmsgcsitem_id
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
	var record = $ui.getPages().ITEMS['pnl_editmessagegrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editmessagegrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}