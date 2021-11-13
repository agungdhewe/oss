var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_editauthform-title')
const btn_edit = $('#pnl_editauthform-btn_edit')
const btn_save = $('#pnl_editauthform-btn_save')
const btn_delete = $('#pnl_editauthform-btn_delete')
const btn_prev = $('#pnl_editauthform-btn_prev')
const btn_next = $('#pnl_editauthform-btn_next')
const btn_addnew = $('#pnl_editauthform-btn_addnew')
const chk_autoadd = $('#pnl_editauthform-autoadd')


const pnl_form = $('#pnl_editauthform-form')
const obj = {
	txt_docauth_id: $('#pnl_editauthform-txt_docauth_id'),
	txt_docauth_descr: $('#pnl_editauthform-txt_docauth_descr'),
	txt_docauth_order: $('#pnl_editauthform-txt_docauth_order'),
	txt_docauth_value: $('#pnl_editauthform-txt_docauth_value'),
	txt_docauth_min: $('#pnl_editauthform-txt_docauth_min'),
	cbo_authlevel_id: $('#pnl_editauthform-cbo_authlevel_id'),
	cbo_auth_id: $('#pnl_editauthform-cbo_auth_id'),
	txt_doc_id: $('#pnl_editauthform-txt_doc_id')
}


let form = {}
let header_data = {}



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_docauth_id,
		autoid: true,
		logview: 'mst_docauth',
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




	obj.cbo_authlevel_id.name = 'pnl_editauthform-cbo_authlevel_id'		
	new fgta4slideselect(obj.cbo_authlevel_id, {
		title: 'Pilih authlevel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_authlevel_id,
		fieldValue: 'authlevel_id',
		fieldValueMap: 'authlevel_id',
		fieldDisplay: 'authlevel_name',
		fields: [
			{mapping: 'authlevel_id', text: 'authlevel_id'},
			{mapping: 'authlevel_name', text: 'authlevel_name'},
		],
		OnDataLoading: (criteria) => {
			obj.cbo_authlevel_id.prevval = form.getValue(obj.cbo_authlevel_id)
		},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {
			if (value!=obj.cbo_authlevel_id.prevval) {
				form.setValue(obj.cbo_auth_id, '--NULL--', 'NONE')
			}
		}
	})				
			
	obj.cbo_auth_id.name = 'pnl_editauthform-cbo_auth_id'		
	new fgta4slideselect(obj.cbo_auth_id, {
		title: 'Pilih auth_id',
		returnpage: this_page_id,
		api: $ui.apis.load_auth_id,
		fieldValue: 'auth_id',
		fieldValueMap: 'auth_id',
		fieldDisplay: 'auth_name',
		fields: [
			{mapping: 'auth_id', text: 'auth_id'},
			{mapping: 'auth_name', text: 'auth_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.disabled = 0;
			criteria.authlevel_id = form.getValue(obj.cbo_authlevel_id)
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({auth_id:'--NULL--', auth_name:'NONE'});	
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
					$ui.getPages().show('pnl_editauthgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_editauthgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_editauthgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_editauthgrid'].handler.scrolllast()
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
	txt_title.html(hdata.doc_id)
	header_data = hdata

	var fn_dataopening = async (options) => {
		options.api = `${global.modulefullname}/auth-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.auth_id==null) { result.record.auth_id='--NULL--'; result.record.auth_name='NONE'; }


		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_authlevel_id, result.record.authlevel_id, result.record.authlevel_name)
			.setValue(obj.cbo_auth_id, result.record.auth_id, result.record.auth_name)
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
		data.doc_id= hdata.doc_id
		data.auth_value = 0

		data.docauth_order = 0
		data.docauth_value = 0
		data.docauth_min = 0

			data.authlevel_id = '0'
			data.authlevel_name = '-- PILIH --'
			data.auth_id = '--NULL--'
			data.auth_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_editauthgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/auth-save`

	options.skipmappingresponse = ["auth_id"];


}

async function form_datasaved(result, options) {
	var data = {}
	Object.assign(data, form.getData(), result.dataresponse)

	form.setValue(obj.cbo_auth_id, result.dataresponse.auth_name!=='--NULL--' ? result.dataresponse.auth_id : '--NULL--', result.dataresponse.auth_name!=='--NULL--'?result.dataresponse.auth_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_editauthgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/auth-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_editauthgrid', ()=>{
		$ui.getPages().ITEMS['pnl_editauthgrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_docauth_id
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
	var record = $ui.getPages().ITEMS['pnl_editauthgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_editauthgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}