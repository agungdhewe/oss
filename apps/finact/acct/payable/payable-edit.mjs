var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const pnl_entry = $('#pnl_edit-entry')
const pnl_billin_id = $('#pnl_edit-billin_id')
const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_jurnal_id: $('#pnl_edit-txt_jurnal_id'),
	cbo_billin_id: $('#pnl_edit-cbo_billin_id'),
	cbo_jurnaltype_id: $('#pnl_edit-cbo_jurnaltype_id'),
	txt_jurnal_ref: $('#pnl_edit-txt_jurnal_ref'),
	cbo_periodemo_id: $('#pnl_edit-cbo_periodemo_id'),
	dt_jurnal_date: $('#pnl_edit-dt_jurnal_date'),
	dt_jurnal_datedue: $('#pnl_edit-dt_jurnal_datedue'),
	
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_jurnal_descr: $('#pnl_edit-txt_jurnal_descr'),
	txt_jurnal_valfrg: $('#pnl_edit-txt_jurnal_valfrg'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	txt_jurnal_valfrgrate: $('#pnl_edit-txt_jurnal_valfrgrate'),
	txt_jurnal_validr: $('#pnl_edit-txt_jurnal_validr'),
	cbo_coa_id: $('#pnl_edit-cbo_coa_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_jurnalsource_id: $('#pnl_edit-cbo_jurnalsource_id'),
	txt_jurnal_version: $('#pnl_edit-txt_jurnal_version'),
	chk_jurnal_iscommit: $('#pnl_edit-chk_jurnal_iscommit'),
	txt_jurnal_commitby: $('#pnl_edit-txt_jurnal_commitby'),
	txt_jurnal_commitdate: $('#pnl_edit-txt_jurnal_commitdate'),
	chk_jurnal_ispost: $('#pnl_edit-chk_jurnal_ispost'),
	txt_jurnal_postby: $('#pnl_edit-txt_jurnal_postby'),
	txt_jurnal_postdate: $('#pnl_edit-txt_jurnal_postdate'),
	chk_jurnal_isclose: $('#pnl_edit-chk_jurnal_isclose'),
	chk_jurnal_isagingclose: $('#pnl_edit-chk_jurnal_isagingclose')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form = {}

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
		primary: obj.txt_jurnal_id,
		autoid: true,
		logview: 'trn_jurnal',
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



	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			

	obj.txt_jurnal_valfrg.numberbox({ onChange: (newvalue, oldvalue) =>  { txt_jurnal_valfrg_valuechanged(newvalue, oldvalue); } })
	obj.txt_jurnal_valfrgrate.numberbox({ onChange: (newvalue, oldvalue) =>  { txt_jurnal_valfrgrate_valuechanged(newvalue, oldvalue); } })




	new fgta4slideselect(obj.cbo_jurnaltype_id, {
		title: 'Pilih jurnaltype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_jurnaltype_id,
		fieldValue: 'jurnaltype_id',
		fieldValueMap: 'jurnaltype_id',
		fieldDisplay: 'jurnaltype_name',
		fields: [
			{mapping: 'jurnaltype_id', text: 'jurnaltype_id'},
			{mapping: 'jurnaltype_name', text: 'jurnaltype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.jurnaltype_isdisabled = '0';
			criteria.jurnalmodel_id = 'AP';
		},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {
			var opt = obj.cbo_billin_id.combo('options');
			var res = formatform_byjurnaltype(record.jurnaltype_id)
			if (res.view_billin_id==false) {
				form.setValue(obj.cbo_billin_id, '--NULL--', 'NONE');
				obj.cbo_billin_id.revalidate({
					required: false,
					invalidMessage:  null,
					validType: null,
					prompt: 'NONE'
				});
			} else {
				if (form.getValue(obj.cbo_billin_id)=='--NULL--') {
					form.setValue(obj.cbo_billin_id, '0', '-- PILIH --');
				}
				obj.cbo_billin_id.revalidate({
					required: true,
					invalidMessage:  'Tagihan harus diisi',
					validType: "requiredcombo['pnl_edit-cbo_billin_id']",
					prompt: '-- PILIH --'
				});

			} 
			
		}
	})				
				
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
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_billin_id, {
		title: 'Pilih billin_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billin_id,
		fieldValue: 'billin_id',
		fieldValueMap: 'billin_id',
		fieldDisplay: 'billin_descr',
		fields: [
			{mapping: 'billin_id', text: 'billin_id'},
			{mapping: 'billin_descr', text: 'billin_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			var opt = obj.cbo_billin_id.combo('options')
			if (!opt.required) {
				result.records.unshift({billin_id:'--NULL--', billin_descr:'NONE'});	
			}
		},
		OnSelected: (value, display, record) => {
			// console.log(record);
			form.setValue(obj.dt_jurnal_datedue, record.billin_datedue_dt);
			form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name);
			form.setValue(obj.txt_jurnal_descr, record.billin_descr);
			form.setValue(obj.cbo_curr_id, record.curr_id, record.curr_name);
			form.setValue(obj.cbo_dept_id, record.dept_id), record.dept_name;
			
			var value = record.billin_valfrg
			var rate = record.curr_rate
			var idr = rate * value
			form.setValue(obj.txt_jurnal_valfrg, value);
			form.setValue(obj.txt_jurnal_valfrgrate, rate);
			form.setValue(obj.txt_jurnal_validr, idr);
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			// result.records.unshift({partner_id:'--NULL--', partner_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_curr_id, {
		title: 'Pilih curr_id',
		returnpage: this_page_id,
		api: $ui.apis.load_curr_id,
		fieldValue: 'curr_id',
		fieldValueMap: 'curr_id',
		fieldDisplay: 'curr_name',
		fields: [
			{mapping: 'curr_name', text: 'curr_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {},
		OnSelected: (value, display, record) => {
			if (record.curr_islocal=='1') {
				form.setDisable(obj.txt_jurnal_valfrgrate, true);
			} else {
				form.setDisable(obj.txt_jurnal_valfrgrate, false);
			}
			form.setValue(obj.txt_jurnal_valfrgrate, record.curr_rate);
			recalculate_value_idr();
		}
	})				
				
	new fgta4slideselect(obj.cbo_coa_id, {
		title: 'Pilih Account AP',
		returnpage: this_page_id,
		api: $ui.apis.load_coa_id_ap,
		fieldValue: 'coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.coa_isdisabled = 0;
		},
		OnDataLoaded : (result, options) => {
			// result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
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
			// result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_jurnalsource_id, {
		title: 'Pilih jurnalsource_id',
		returnpage: this_page_id,
		api: $ui.apis.load_jurnalsource_id,
		fieldValue: 'jurnalsource_id',
		fieldValueMap: 'jurnalsource_id',
		fieldDisplay: 'jurnalsource_name',
		fields: [
			{mapping: 'jurnalsource_id', text: 'jurnalsource_id'},
			{mapping: 'jurnalsource_name', text: 'jurnalsource_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
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
	// console.log(obj.cbo_jurnaltype_id.combo('options').validType);
}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.billin_id==null) { result.record.billin_id='--NULL--'; result.record.billin_descr='NONE'; }
		// if (result.record.partner_id==null) { result.record.partner_id='--NULL--'; result.record.partner_name='NONE'; }
		// if (result.record.coa_id==null) { result.record.coa_id='--NULL--'; result.record.coa_name='NONE'; }
		// if (result.record.dept_id==null) { result.record.dept_id='--NULL--'; result.record.dept_name='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_jurnaltype_id, result.record.jurnaltype_id, result.record.jurnaltype_name)
			.setValue(obj.cbo_periodemo_id, result.record.periodemo_id, result.record.periodemo_name)
			.setValue(obj.cbo_billin_id, result.record.billin_id, result.record.billin_descr)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_coa_id, result.record.coa_id, result.record.coa_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.setValue(obj.cbo_jurnalsource_id, result.record.jurnalsource_id, result.record.jurnalsource_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()

		formatform_byjurnaltype(result.record.jurnaltype_id);
		form.setDisable(obj.cbo_jurnaltype_id, true);
		form.setDisable(obj.cbo_billin_id, true);


		form.SuspendEvent(false);

		updatebuttonstate(result.record)
		
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
		data.jurnal_date = global.setup.jurnal_date
		data.jurnal_datedue = global.now()
		data.jurnal_valfrg = 0
		data.jurnal_valfrgrate = 0
		data.jurnal_validr = 0
		data.jurnal_version = 0
		data.jurnal_iscommit = '0'
		data.jurnal_ispost = '0'
		data.jurnal_isclose = '0'
		data.jurnal_isagingclose = '0'

		data.jurnaltype_id = '0'
		data.jurnaltype_name = '-- PILIH --'
		data.periodemo_id = global.setup.periodemo_id
		data.periodemo_name = global.setup.periodemo_name
		data.billin_id = '--NULL--'
		data.billin_descr = 'NONE'
		data.curr_id = global.setup.curr_id
		data.curr_name = global.setup.curr_name
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.coa_id = '0'
		data.coa_name = '-- PILIH --'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.jurnalsource_id = global.setup.jurnalsource_id
		data.jurnalsource_name = global.setup.jurnalsource_name


		formatform_byjurnaltype();
		form.setDisable(obj.cbo_jurnaltype_id, false);
		form.setDisable(obj.cbo_billin_id, false);
		

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
		$ui.getPages().ITEMS['pnl_editreferencegrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editresponsegrid'].handler.createnew(data, options)


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

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.jurnal_commitby);
		rec_commitdate.html(record.jurnal_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.jurnal_iscommit=="1") {
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

	var col_commit = 'jurnal_iscommit';
	updategriddata[col_commit] = record.jurnal_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_jurnal_id
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
	options.skipmappingresponse = ['billin_id', 'partner_id', 'coa_id', 'dept_id', ];
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

	form.setValue(obj.cbo_billin_id, result.dataresponse.billin_descr!=='--NULL--' ? result.dataresponse.billin_id : '--NULL--', result.dataresponse.billin_descr!=='--NULL--'?result.dataresponse.billin_descr:'NONE')
	form.setValue(obj.cbo_partner_id, result.dataresponse.partner_name!=='--NULL--' ? result.dataresponse.partner_id : '--NULL--', result.dataresponse.partner_name!=='--NULL--'?result.dataresponse.partner_name:'NONE')
	form.setValue(obj.cbo_coa_id, result.dataresponse.coa_name!=='--NULL--' ? result.dataresponse.coa_id : '--NULL--', result.dataresponse.coa_name!=='--NULL--'?result.dataresponse.coa_name:'NONE')
	form.setValue(obj.cbo_dept_id, result.dataresponse.dept_name!=='--NULL--' ? result.dataresponse.dept_id : '--NULL--', result.dataresponse.dept_name!=='--NULL--'?result.dataresponse.dept_name:'NONE')

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

	var id = obj.txt_jurnal_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/payable.xprint?id=' + id;

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


	var docname = 'undefined'
	var txt_version = obj.txt_jurnal_version;
	var chk_iscommit = obj.chk_jurnal_iscommit;
	
	
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
	
function formatform_byjurnaltype(jurnaltype_id) {
	var res = {
		view_billin_id: true, 
		disable_partner_id: false,
		disable_jurnal_valfrg : false,
		disable_curr_id: false,
		disable_dept_id: false
	}

	if (jurnaltype_id==null) {
		pnl_entry.hide();
	} else {
		pnl_entry.show();
		if (jurnaltype_id=='AP-BILL') {
			res.view_billin_id = true;
			res.disable_partner_id = true;
			res.disable_jurnal_valfrg = true;
			res.disable_curr_id = true;
			res.disable_dept_id = true;

		} else {
			res.view_billin_id = false;

		}
	}


	if (res.view_billin_id) {
		form.setDisable(obj.cbo_billin_id, false);
		// 	pnl_billin_id.show();
	} else {
		form.setDisable(obj.cbo_billin_id, true);
	// 	pnl_billin_id.hide();
	}

	form.setDisable(obj.cbo_partner_id, res.disable_partner_id);
	form.setDisable(obj.txt_jurnal_valfrg, res.disable_jurnal_valfrg);
	form.setDisable(obj.cbo_curr_id, res.disable_curr_id);
	form.setDisable(obj.cbo_dept_id, res.disable_dept_id);

	return res;
}



function txt_jurnal_valfrg_valuechanged(newvalue, oldvalue) {
	recalculate_value_idr();
}

function txt_jurnal_valfrgrate_valuechanged(newvalue, oldvalue) {
	recalculate_value_idr();
}


function recalculate_value_idr() {
	var value = form.getValue(obj.txt_jurnal_valfrg);
	var rate = form.getValue(obj.txt_jurnal_valfrgrate);
	var idr = value * rate;
	form.setValue(obj.txt_jurnal_validr, idr);
}