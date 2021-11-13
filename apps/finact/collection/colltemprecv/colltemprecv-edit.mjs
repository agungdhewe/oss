var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_post = $('#pnl_edit-btn_post');			



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_colltemprecv_id: $('#pnl_edit-txt_colltemprecv_id'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	dt_colltemprecv_date: $('#pnl_edit-dt_colltemprecv_date'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_colltemprecv_descr: $('#pnl_edit-txt_colltemprecv_descr'),
	cbo_collsource_id: $('#pnl_edit-cbo_collsource_id'),
	cbo_paymtype_id: $('#pnl_edit-cbo_paymtype_id'),
	cbo_bankrekening_id: $('#pnl_edit-cbo_bankrekening_id'),
	txt_paym_bankname: $('#pnl_edit-txt_paym_bankname'),
	txt_paym_bgnum: $('#pnl_edit-txt_paym_bgnum'),
	dt_paym_bgdatedue: $('#pnl_edit-dt_paym_bgdatedue'),
	dt_paym_bgdate: $('#pnl_edit-dt_paym_bgdate'),
	cbo_coa_id: $('#pnl_edit-cbo_coa_id'),
	chk_colltemprecv_isadvance: $('#pnl_edit-chk_colltemprecv_isadvance'),
	txt_colltemprecv_idrtopay: $('#pnl_edit-txt_colltemprecv_idrtopay'),
	txt_colltarget_ppntopay: $('#pnl_edit-txt_colltarget_ppntopay'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_colltemprecv_version: $('#pnl_edit-txt_colltemprecv_version'),
	chk_colltemprecv_iscommit: $('#pnl_edit-chk_colltemprecv_iscommit'),
	txt_colltemprecv_commitby: $('#pnl_edit-txt_colltemprecv_commitby'),
	txt_colltemprecv_commitdate: $('#pnl_edit-txt_colltemprecv_commitdate'),
	chk_colltemprecv_isverified: $('#pnl_edit-chk_colltemprecv_isverified'),
	txt_colltemprecv_verifyby: $('#pnl_edit-txt_colltemprecv_verifyby'),
	txt_colltemprecv_verifydate: $('#pnl_edit-txt_colltemprecv_verifydate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form;

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
		primary: obj.txt_colltemprecv_id,
		autoid: true,
		logview: 'trn_colltemprecv',
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
	})



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
	btn_post.linkbutton({ onClick: () => { btn_action_click({ action: 'post' }); } });			
			





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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
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
		OnDataLoading: (criteria) => {
			var col_empl_id = form.getValue(obj.cbo_empl_id);
			criteria.col_empl_id = col_empl_id;
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_collsource_id, {
		title: 'Pilih collsource_id',
		returnpage: this_page_id,
		api: $ui.apis.load_collsource_id,
		fieldValue: 'collsource_id',
		fieldValueMap: 'collsource_id',
		fieldDisplay: 'collsource_name',
		fields: [
			{mapping: 'collsource_id', text: 'collsource_id'},
			{mapping: 'collsource_name', text: 'collsource_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_paymtype_id, {
		title: 'Pilih paymtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_paymtype_id,
		fieldValue: 'paymtype_id',
		fieldValueMap: 'paymtype_id',
		fieldDisplay: 'paymtype_name',
		fields: [
			{mapping: 'paymtype_id', text: 'paymtype_id'},
			{mapping: 'paymtype_name', text: 'paymtype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({paymtype_id:'--NULL--', paymtype_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {	
				// console.log(value)
				if (value=='GI') {
					$ui.ShowMessage('[INFO]harap cross dua garis di sisi kanan');
				}			
			}
		}
	})				
				


	new fgta4slideselect(obj.cbo_bankrekening_id, {
		title: 'Pilih Rekening Bank',
		returnpage: this_page_id,
		api: $ui.apis.load_bankrekening_id,
		fieldValue: 'bankrekening_id',
		fieldValueMap: 'bankrekening_id',
		fieldDisplay: 'bankrekening_name',
		fields: [
			{mapping: 'bankrekening_id', text: 'bankrekening_id'},
			{mapping: 'bankrekening_name', text: 'bankrekening_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({paymtype_id:'--NULL--', paymtype_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {	
				console.log(record);
				form.setValue(obj.txt_paym_bankname, record.bank_name);
			}
		}
	})		


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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({doc_id:'--NULL--', doc_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
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

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}


export function open(data, rowid, viewmode=true, fn_callback) {

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.paymtype_id==null) { result.record.paymtype_id='--NULL--'; result.record.paymtype_name='NONE'; }
		if (result.record.coa_id==null) { result.record.coa_id='--NULL--'; result.record.coa_name='NONE'; }
		if (result.record.doc_id==null) { result.record.doc_id='--NULL--'; result.record.doc_name='NONE'; }

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
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_collsource_id, record.collsource_id, record.collsource_name)
			.setValue(obj.cbo_paymtype_id, record.paymtype_id, record.paymtype_name)
			.setValue(obj.cbo_bankrekening_id, record.bankrekening_id, record.bankrekening_name)
			.setValue(obj.cbo_coa_id, record.coa_id, record.coa_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   



		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)

		// tampilkan form untuk data editor
		fn_callback()
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
		data.colltemprecv_date = global.now()
		data.colltemprecv_isadvance = '0'
		data.colltemprecv_idrtopay = 0
		data.colltarget_ppntopay = 0
		data.colltemprecv_version = 0
		data.colltemprecv_iscommit = '0'
		data.colltemprecv_isverified = '0'
		data.colltemprecv_descr = '';

		data.paym_bgdatedue = global.now()
		data.paym_bgdate = global.now()

		data.periodemo_id = '0'
		data.periodemo_name = '-- PILIH --'
		data.empl_id = global.setup.empl_id
		data.empl_name = global.setup.empl_name
		data.dept_id = global.setup.dept_id
		data.dept_name = global.setup.dept_name
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.collsource_id = '0'
		data.collsource_name = '-- PILIH --'
		data.paymtype_id = '--NULL--'
		data.paymtype_name = 'NONE'
		data.bankrekening_id = '--NULL--'
		data.bankrekening_name = 'NONE'
		data.coa_id = '--NULL--'
		data.coa_name = 'NONE'
		data.doc_id = '--NULL--'
		data.doc_name = 'NONE'


		rec_commitby.html('');
		rec_commitdate.html('');
		

		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
			



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.createnew(data, options)


	})
}


export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	$ui.getPages().show(pnlname, () => {
		$ui.getPages().ITEMS[pnlname].handler.OpenDetil(form.getData())
	})	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}


export function updatetotal(data) {
	form.setValue(obj.txt_colltemprecv_idrtopay, data.total_billout_idrtopay);
	form.setValue(obj.txt_colltarget_ppntopay, data.total_billout_ppntopay)
	form.commit(true)
}


function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.colltemprecv_commitby);
		rec_commitdate.html(record.colltemprecv_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.colltemprecv_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			form.lock(false);
		} 
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
			
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'colltemprecv_iscommit';
	updategriddata[col_commit] = record.colltemprecv_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_colltemprecv_id
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
	// options.skipmappingresponse = ['paymtype_id', 'coa_id', 'doc_id', ];
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
	form.setValue(obj.cbo_paymtype_id, result.dataresponse.paymtype_name!=='--NULL--' ? result.dataresponse.paymtype_id : '--NULL--', result.dataresponse.paymtype_name!=='--NULL--'?result.dataresponse.paymtype_name:'NONE')
	form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')
	form.setValue(obj.cbo_doc_id, result.dataresponse.doc_name!=='--NULL--' ? result.dataresponse.doc_id : '--NULL--', result.dataresponse.doc_name!=='--NULL--'?result.dataresponse.doc_name:'NONE')

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
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_colltemprecv_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/colltemprecv.xprint?id=' + id;

	var print_to_new_window = global.setup.print_to_new_window;
	var debug = false;
	var debug = false;
	if (debug || print_to_new_window) {
		var w = window.open(printurl);
		w.onload = () => {
			window.onreadytoprint(() => {
				iframe.contentWindow.print();
			});
		}
	} else {
		$ui.mask('wait...');
		var iframe_id = 'fgta_printelement';
		var iframe = document.getElementById(iframe_id);
		if (iframe) {
			iframe.parentNode.removeChild(iframe);
			iframe = null;
		}

		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = iframe_id;
			iframe.style.visibility = 'hidden';
			iframe.style.height = '10px';
			iframe.style.widows = '10px';
			document.body.appendChild(iframe);

			iframe.onload = () => {
				$ui.unmask();
				iframe.contentWindow.OnPrintCommand(() => {
					console.log('start print');
					iframe.contentWindow.print();
				});
				iframe.contentWindow.preparemodule();
			}
		}
		iframe.src = printurl + '&iframe=1';

	}

}	






async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}


	var docname = 'Temp Receive'
	var txt_version = obj.txt_colltemprecv_version;
	var chk_iscommit = obj.chk_colltemprecv_iscommit;
	
	
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
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		case 'post' :
			args.act_url = `${global.modulefullname}/xtion-post`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
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
				updaterecordstatus(result.dataresponse);
				args.act_do(result);
				updatebuttonstate(result.dataresponse);
				updategridstate(result.dataresponse);
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
	
	