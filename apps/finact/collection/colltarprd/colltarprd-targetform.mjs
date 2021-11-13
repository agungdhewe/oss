var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const txt_title = $('#pnl_edittargetform-title')
const btn_edit = $('#pnl_edittargetform-btn_edit')
const btn_save = $('#pnl_edittargetform-btn_save')
const btn_delete = $('#pnl_edittargetform-btn_delete')
const btn_prev = $('#pnl_edittargetform-btn_prev')
const btn_next = $('#pnl_edittargetform-btn_next')
const btn_addnew = $('#pnl_edittargetform-btn_addnew')
const chk_autoadd = $('#pnl_edittargetform-autoadd')


const pnl_form = $('#pnl_edittargetform-form')
const obj = {
	txt_colltarprddetil_id: $('#pnl_edittargetform-txt_colltarprddetil_id'),
	cbo_colltarrowtype_id: $('#pnl_edittargetform-cbo_colltarrowtype_id'),
	txt_colltarrowtype_order: $('#pnl_edittargetform-txt_colltarrowtype_order'),
	cbo_partner_id: $('#pnl_edittargetform-cbo_partner_id'),
	txt_colltarprddetil_descr: $('#pnl_edittargetform-txt_colltarprddetil_descr'),
	txt_colltarprddetil_valpartnerost: $('#pnl_edittargetform-txt_colltarprddetil_valpartnerost'),
	txt_colltarprddetil_valpartner: $('#pnl_edittargetform-txt_colltarprddetil_valpartner'),
	txt_colltarprddetil_val: $('#pnl_edittargetform-txt_colltarprddetil_val'),
	txt_colltarprd_id: $('#pnl_edittargetform-txt_colltarprd_id')
}


let form;
let header_data;



export async function init(opt) {
	this_page_id = opt.id
	this_page_options = opt;

	
	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_colltarprddetil_id,
		autoid: true,
		logview: 'mst_colltarprddetil',
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




	obj.cbo_colltarrowtype_id.name = 'pnl_edittargetform-cbo_colltarrowtype_id'		
	new fgta4slideselect(obj.cbo_colltarrowtype_id, {
		title: 'Pilih colltarrowtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_colltarrowtype_id,
		fieldValue: 'colltarrowtype_id',
		fieldValueMap: 'colltarrowtype_id',
		fieldDisplay: 'colltarrowtype_name',
		fields: [
			{mapping: 'colltarrowtype_id', text: 'colltarrowtype_id'},
			{mapping: 'colltarrowtype_name', text: 'colltarrowtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				form.setValue(obj.txt_colltarrowtype_order, record.colltarrowtype_order);		
						
			}			
		}
	})				
			
	obj.cbo_partner_id.name = 'pnl_edittargetform-cbo_partner_id'		
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
			result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
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
					$ui.getPages().show('pnl_edittargetgrid', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_edittargetgrid'].handler.scrolllast()
					})					
				})
			} else {
				$ui.getPages().show('pnl_edittargetgrid', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_edittargetgrid'].handler.scrolllast()
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
		options.api = `${global.modulefullname}/target-open`
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(result.record);
/*
		if (record.partner_id==null) { record.partner_id='--NULL--'; record.partner_name='NONE'; }

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
			.setValue(obj.cbo_colltarrowtype_id, record.colltarrowtype_id, record.colltarrowtype_name)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setViewMode()
			.rowid = rowid



		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/ 
		console.log(result)
		switch (result.record.colltarrowtype_id) {
			case 'ALB':
			case 'PAR':
				form.setDisable(obj.txt_colltarprddetil_valpartner, false);
				form.setDisable(obj.txt_colltarprddetil_val, true);
				break;

			default:
				form.setDisable(obj.txt_colltarprddetil_valpartner, true);
				form.setDisable(obj.txt_colltarprddetil_val, true);

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
		data.colltarprd_id= hdata.colltarprd_id
		data.target_value = 0

		data.colltarrowtype_order = 0
		data.colltarprddetil_valpartnerost = 0
		data.colltarprddetil_valpartner = 0
		data.colltarprddetil_val = 0

			data.colltarrowtype_id = '0'
			data.colltarrowtype_name = '-- PILIH --'
			data.partner_id = '--NULL--'
			data.partner_name = 'NONE'




		form.rowid = null
		options.OnCanceled = () => {
			$ui.getPages().show('pnl_edittargetgrid')
		}
	})
}


async function form_datasaving(data, options) {
	options.api = `${global.modulefullname}/target-save`

	// options.skipmappingresponse = ['partner_id', ];
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
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')

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
	form.rowid = $ui.getPages().ITEMS['pnl_edittargetgrid'].handler.updategrid(data, form.rowid)

	var autoadd = chk_autoadd.prop("checked")
	if (autoadd) {
		setTimeout(()=>{
			btn_addnew_click()
		}, 1000)
	}
}

async function form_deleting(data, options) {
	options.api = `${global.modulefullname}/target-delete`
}

async function form_deleted(result, options) {
	options.suppressdialog = true
	$ui.getPages().show('pnl_edittargetgrid', ()=>{
		$ui.getPages().ITEMS['pnl_edittargetgrid'].handler.removerow(form.rowid)
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
	var objid = obj.txt_colltarprddetil_id
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
	var record = $ui.getPages().ITEMS['pnl_edittargetgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}

function btn_next_click() {
	var nextode = $(`#${form.rowid}`).next()
	if (nextode.length==0) {
		return
	} 

	var trid = nextode.attr('id')
	var dataid = nextode.attr('dataid')
	var record = $ui.getPages().ITEMS['pnl_edittargetgrid'].handler.getGrid().DATA[dataid]

	open(record, trid, header_data)
}