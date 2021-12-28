var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './colltarget-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')


const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const btn_approve = $('#pnl_edit-btn_approve')
const btn_decline = $('#pnl_edit-btn_decline')			
				



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_colltarget_id: $('#pnl_edit-txt_colltarget_id'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	txt_colltarget_discprop: $('#pnl_edit-txt_colltarget_discprop'),
	txt_colltarget_idr: $('#pnl_edit-txt_colltarget_idr'),
	txt_colltarget_discval: $('#pnl_edit-txt_colltarget_discval'),
	txt_colltarget_idrtopay: $('#pnl_edit-txt_colltarget_idrtopay'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_colltarget_version: $('#pnl_edit-txt_colltarget_version'),
	chk_colltarget_iscommit: $('#pnl_edit-chk_colltarget_iscommit'),
	txt_colltarget_commitby: $('#pnl_edit-txt_colltarget_commitby'),
	txt_colltarget_commitdate: $('#pnl_edit-txt_colltarget_commitdate'),
	chk_colltarget_isapprovalprogress: $('#pnl_edit-chk_colltarget_isapprovalprogress'),
	chk_colltarget_isapproved: $('#pnl_edit-chk_colltarget_isapproved'),
	txt_colltarget_approveby: $('#pnl_edit-txt_colltarget_approveby'),
	txt_colltarget_approvedate: $('#pnl_edit-txt_colltarget_approvedate'),
	chk_colltarget_isdeclined: $('#pnl_edit-chk_colltarget_isdeclined'),
	txt_colltarget_declineby: $('#pnl_edit-txt_colltarget_declineby'),
	txt_colltarget_declinedate: $('#pnl_edit-txt_colltarget_declinedate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


let form;
let rowdata;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		disableedit = true;
	//		btn_edit.linkbutton('disable');
	//		btn_save.linkbutton('disable');
	//		btn_delete.linkbutton('disable');
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_colltarget_id,
		autoid: true,
		logview: 'trn_colltarget',
		btn_edit: disableedit==true? $('<a>edit</a>') : btn_edit,
		btn_save: disableedit==true? $('<a>save</a>') : btn_save,
		btn_delete: disableedit==true? $('<a>delete</a>') : btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) },
		OnRecordStatusCreated: () => {
			
		$('#pnl_edit_record_custom').detach().appendTo("#pnl_edit_record");
		$('#pnl_edit_record_custom').show();		
					
		}		
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}



	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_decline.linkbutton({ onClick: () => {
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var reason = $(`#${id}`).textbox('getValue');
				btn_action_click({ action: 'decline', reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var obj_reason = $(`#${id}`);
			var txt = obj_reason.textbox('textbox');
			txt[0].maxLength = 255;
			txt[0].classList.add('declinereasonbox');
			txt[0].addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.css('text-align', 'center');
			txt.focus();
		})
	}});				
				






	new fgta4slideselect(obj.cbo_periodemo_id, {
		title: 'Pilih periodemo_id',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,
		fieldValue: 'periodemo_id',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{mapping: 'periodemo_id', text: 'periodemo_id'},
			{mapping: 'periodemo_name', text: 'periodemo_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_periodemo_id_dataloading === 'function') {
				hnd.cbo_periodemo_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_periodemo_id_dataloaded === 'function') {
				hnd.cbo_periodemo_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_periodemo_id_selected === 'function') {
					hnd.cbo_periodemo_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_empl_id, {
		title: 'Pilih empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{mapping: 'empl_id', text: 'empl_id'},
			{mapping: 'empl_name', text: 'empl_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_empl_id_dataloading === 'function') {
				hnd.cbo_empl_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_empl_id_dataloaded === 'function') {
				hnd.cbo_empl_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_empl_id_selected === 'function') {
					hnd.cbo_empl_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_dept_id_dataloading === 'function') {
				hnd.cbo_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_dept_id_dataloaded === 'function') {
				hnd.cbo_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dept_id_selected === 'function') {
					hnd.cbo_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldValueMap: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_doc_id_dataloading === 'function') {
				hnd.cbo_doc_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_doc_id_dataloaded === 'function') {
				hnd.cbo_doc_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_doc_id_selected === 'function') {
					hnd.cbo_doc_id_selected(value, display, record, args);
				}
			}
		}
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
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			if (form.isDataChanged()) {
				form.canceledit(()=>{
					$ui.getPages().show('pnl_list', ()=>{
						form.setViewMode()
						$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
					})
				})
			} else {
				$ui.getPages().show('pnl_list', ()=>{
					form.setViewMode()
					$ui.getPages().ITEMS['pnl_list'].handler.scrolllast()
				})
			}
		
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if (form.isDataChanged()) {
				ev.detail.cancel = true;
				$ui.ShowMessage('Anda masih dalam mode edit dengan pending data, silakan matikan mode edit untuk kembali ke halaman utama.')
			}
		}
	})

	//button state
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

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
  		updaterecordstatus(record)

		form.SuspendEvent(true);
		form
			.fill(record)
			.setValue(obj.cbo_periodemo_id, record.periodemo_id, record.periodemo_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.colltarget_discprop = 0
		data.colltarget_idr = 0
		data.colltarget_discval = 0
		data.colltarget_idrtopay = 0
		data.colltarget_version = 0
		data.colltarget_iscommit = '0'
		data.colltarget_isapprovalprogress = '0'
		data.colltarget_isapproved = '0'
		data.colltarget_isdeclined = '0'

		data.periodemo_id = '0'
		data.periodemo_name = '-- PILIH --'
		data.empl_id = '0'
		data.empl_name = '-- PILIH --'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.colltarget_commitby);
		rec_commitdate.html(record.colltarget_commitdate);
		
		rec_approveby.html(record.colltarget_approveby);
		rec_approvedate.html(record.colltarget_approvedate);
		rec_declineby.html(record.colltarget_declineby);
		rec_declinedate.html(record.colltarget_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.colltarget_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.colltarget_isdeclined=="1" || record.colltarget_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.colltarget_isapproved=="1" || record.colltarget_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.colltarget_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.colltarget_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(false);
		} 
	
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
				
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'colltarget_iscommit';
	updategriddata[col_commit] = record.colltarget_iscommit;	
	
	var col_approveprogress = 'colltarget_isapprovalprogress';
	var col_approve = 'colltarget_isapprove'
	var col_decline = "colltarget_isdeclined"
	updategriddata[col_approveprogress] = record.colltarget_isapprovalprogress;
	updategriddata[col_approve] = record.colltarget_isapproved;
	updategriddata[col_decline] = record.colltarget_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_colltarget_id
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


async function form_datasaving(data, options) {
	// cek dulu data yang akan disimpan,
	// apabila belum sesuai dengan yang diharuskan, batalkan penyimpanan
	//    options.cancel = true

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
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

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
	}

}

async function form_datasaveerror(err, options) {
	// apabila mau olah error messagenya
	// $ui.ShowMessage(err.errormessage)
	console.log(err)
}


async function form_datasaved(result, options) {
	// Apabila tidak mau munculkan dialog
	// options.suppressdialog = true

	// Apabila ingin mengganti message Data Tersimpan
	// options.savedmessage = 'Data sudah disimpan cuy!'

	// if (form.isNewData()) {
	// 	console.log('masukan ke grid')
	// 	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(form.getData())
	// } else {
	// 	console.log('update grid')
	// }


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
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}





async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Collector Target'
	var txt_version = obj.txt_colltarget_version;
	var chk_iscommit = obj.chk_colltarget_iscommit;
	
	var chk_isapprovalprogress = obj.chk_colltarget_isapprovalprogress;	
	var chk_isapprove = obj.chk_colltarget_isapproved;
	var chk_isdeclined = obj.chk_colltarget_isdeclined;
		
	
	var id = form.getCurrentId();

	Object.assign(args, {
		id: id,
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null,
		use_otp: false,
		otp_message: `Berikut adalah code yang harus anda masukkan untuk melakukan ${args.action} ${docname} dengan no id ${id}`,
	});

	switch (args.action) {
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
			chk_isapprove.checkbox('uncheck');
		
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
			chk_isapprove.checkbox('uncheck');
			chk_isdeclined.checkbox('uncheck');
		
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
				form.commit();
			}
			break;		
		

	
		

	}


	try {
		$ui.mask('wait..');
		var { doAction } = await import('../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4xtion.mjs');
		await doAction(args, (err, result) => {
			if (err) {
				$ui.ShowMessage('[WARNING]' + err.message);	
			} else {
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}
				if (args.act_msg_result!=='') $ui.ShowMessage('[INFO]' + args.act_msg_result);	
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}	
	
	