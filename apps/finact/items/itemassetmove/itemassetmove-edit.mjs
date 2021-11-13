var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');




const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_itemassetmove_id: $('#pnl_edit-txt_itemassetmove_id'),
	cbo_inquiry_id: $('#pnl_edit-cbo_inquiry_id'),
	dt_itemassetmove_dtstart: $('#pnl_edit-dt_itemassetmove_dtstart'),
	dt_itemassetmove_dtend: $('#pnl_edit-dt_itemassetmove_dtend'),
	txt_itemassetmove_descr: $('#pnl_edit-txt_itemassetmove_descr'),
	cbo_from_site_id: $('#pnl_edit-cbo_from_site_id'),
	cbo_to_site_id: $('#pnl_edit-cbo_to_site_id'),
	cbo_user_dept_id: $('#pnl_edit-cbo_user_dept_id'),
	cbo_empl_id: $('#pnl_edit-cbo_empl_id'),
	cbo_project_id: $('#pnl_edit-cbo_project_id'),
	cbo_projecttask_id: $('#pnl_edit-cbo_projecttask_id'),
	cbo_projbudget_id: $('#pnl_edit-cbo_projbudget_id'),
	cbo_projbudgettask_id: $('#pnl_edit-cbo_projbudgettask_id')
}




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
		primary: obj.txt_itemassetmove_id,
		autoid: true,
		logview: 'trn_itemassetmove',
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
			undefined			
		}		
	})



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	






	new fgta4slideselect(obj.cbo_inquiry_id, {
		title: 'Pilih inquiry_id',
		returnpage: this_page_id,
		api: $ui.apis.load_inquiry_id,
		fieldValue: 'inquiry_id',
		fieldValueMap: 'inquiry_id',
		fieldDisplay: 'inquiry_descr',
		fields: [
			{mapping: 'inquiry_id', text: 'inquiry_id'},
			{mapping: 'inquiry_descr', text: 'inquiry_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({inquiry_id:'--NULL--', inquiry_descr:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
							console.log(record);
			
							if (record.projecttask_id==null || record.projecttask_id=='--NULL--') { record.projecttask_id='--NULL--'; record.projecttask_name='NONE'; }
							if (record.projbudget_id==null || record.projbudget_id=='--NULL--') { record.projbudget_id='--NULL--'; record.projbudget_name='NONE'; }
							if (record.projbudgettask_id==null || record.projbudgettask_id=='--NULL--') { record.projbudgettask_id='--NULL--'; record.projbudgettask_name='NONE'; }
					
							form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
							form.setValue(obj.txt_itemassetmove_descr, record.inquiry_descr)
							form.setValue(obj.dt_itemassetmove_dtstart, global.now(from_sql_date(record.inquiry_dtstart)));
							form.setValue(obj.dt_itemassetmove_dtend, global.now(from_sql_date(record.inquiry_dtend)));
			
							form.setValue(obj.cbo_from_site_id, record.site_id, record.site_name);
							form.setValue(obj.cbo_to_site_id, record.site_id, record.site_name);
							form.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name);
			
			
							form.setValue(obj.cbo_project_id, record.project_id, record.project_name);
							form.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name);
							form.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name);
							form.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name);						
						
										
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_from_site_id, {
		title: 'Pilih from_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_from_site_id,
		fieldValue: 'from_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_to_site_id, {
		title: 'Pilih to_site_id',
		returnpage: this_page_id,
		api: $ui.apis.load_to_site_id,
		fieldValue: 'to_site_id',
		fieldValueMap: 'site_id',
		fieldDisplay: 'site_name',
		fields: [
			{mapping: 'site_id', text: 'site_id'},
			{mapping: 'site_name', text: 'site_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_user_dept_id, {
		title: 'Pilih user_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_user_dept_id,
		fieldValue: 'user_dept_id',
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
			result.records.unshift({empl_id:'--NULL--', empl_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih project_id',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projecttask_id, {
		title: 'Pilih projecttask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projecttask_id,
		fieldValue: 'projecttask_id',
		fieldValueMap: 'projecttask_id',
		fieldDisplay: 'projecttask_name',
		fields: [
			{mapping: 'projecttask_id', text: 'projecttask_id'},
			{mapping: 'projecttask_name', text: 'projecttask_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projecttask_id:'--NULL--', projecttask_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projbudget_id, {
		title: 'Pilih projbudget_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudget_id,
		fieldValue: 'projbudget_id',
		fieldValueMap: 'projbudget_id',
		fieldDisplay: 'projbudget_name',
		fields: [
			{mapping: 'projbudget_id', text: 'projbudget_id'},
			{mapping: 'projbudget_name', text: 'projbudget_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudget_id:'--NULL--', projbudget_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_projbudgettask_id, {
		title: 'Pilih projbudgettask_id',
		returnpage: this_page_id,
		api: $ui.apis.load_projbudgettask_id,
		fieldValue: 'projbudgettask_id',
		fieldValueMap: 'projbudgettask_id',
		fieldDisplay: 'projecttask_notes',
		fields: [
			{mapping: 'projbudgettask_id', text: 'projbudgettask_id'},
			{mapping: 'projecttask_notes', text: 'projecttask_notes'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({projbudgettask_id:'--NULL--', projecttask_notes:'NONE'});	
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
		if (result.record.inquiry_id==null) { result.record.inquiry_id='--NULL--'; result.record.inquiry_descr='NONE'; }
		if (result.record.empl_id==null) { result.record.empl_id='--NULL--'; result.record.empl_name='NONE'; }
		if (result.record.projecttask_id==null) { result.record.projecttask_id='--NULL--'; result.record.projecttask_name='NONE'; }
		if (result.record.projbudget_id==null) { result.record.projbudget_id='--NULL--'; result.record.projbudget_name='NONE'; }
		if (result.record.projbudgettask_id==null) { result.record.projbudgettask_id='--NULL--'; result.record.projbudgettask_name='NONE'; }

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
			.setValue(obj.cbo_inquiry_id, record.inquiry_id, record.inquiry_descr)
			.setValue(obj.cbo_from_site_id, record.from_site_id, record.from_site_name)
			.setValue(obj.cbo_to_site_id, record.to_site_id, record.to_site_name)
			.setValue(obj.cbo_user_dept_id, record.user_dept_id, record.user_dept_name)
			.setValue(obj.cbo_empl_id, record.empl_id, record.empl_name)
			.setValue(obj.cbo_project_id, record.project_id, record.project_name)
			.setValue(obj.cbo_projecttask_id, record.projecttask_id, record.projecttask_name)
			.setValue(obj.cbo_projbudget_id, record.projbudget_id, record.projbudget_name)
			.setValue(obj.cbo_projbudgettask_id, record.projbudgettask_id, record.projbudgettask_name)
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
		data.itemassetmove_dtstart = global.now()
		data.itemassetmove_dtend = global.now()

		data.inquiry_id = '--NULL--'
		data.inquiry_descr = 'NONE'
		data.from_site_id = '0'
		data.from_site_name = '-- PILIH --'
		data.to_site_id = '0'
		data.to_site_name = '-- PILIH --'
		data.user_dept_id = '0'
		data.user_dept_name = '-- PILIH --'
		data.empl_id = '--NULL--'
		data.empl_name = 'NONE'
		data.project_id = '0'
		data.project_name = '-- PILIH --'
		data.projecttask_id = '--NULL--'
		data.projecttask_name = 'NONE'
		data.projbudget_id = '--NULL--'
		data.projbudget_name = 'NONE'
		data.projbudgettask_id = '--NULL--'
		data.projbudgettask_name = 'NONE'









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.createnew(data, options)


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

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini
	
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_itemassetmove_id
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
	// options.skipmappingresponse = ['inquiry_id', 'empl_id', 'projecttask_id', 'projbudget_id', 'projbudgettask_id', ];
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
	form.setValue(obj.cbo_inquiry_id, result.dataresponse.inquiry_descr!=='--NULL--' ? result.dataresponse.inquiry_id : '--NULL--', result.dataresponse.inquiry_descr!=='--NULL--'?result.dataresponse.inquiry_descr:'NONE')
	form.setValue(obj.cbo_empl_id, result.dataresponse.empl_name!=='--NULL--' ? result.dataresponse.empl_id : '--NULL--', result.dataresponse.empl_name!=='--NULL--'?result.dataresponse.empl_name:'NONE')
	form.setValue(obj.cbo_projecttask_id, result.dataresponse.projecttask_name!=='--NULL--' ? result.dataresponse.projecttask_id : '--NULL--', result.dataresponse.projecttask_name!=='--NULL--'?result.dataresponse.projecttask_name:'NONE')
	form.setValue(obj.cbo_projbudget_id, result.dataresponse.projbudget_name!=='--NULL--' ? result.dataresponse.projbudget_id : '--NULL--', result.dataresponse.projbudget_name!=='--NULL--'?result.dataresponse.projbudget_name:'NONE')
	form.setValue(obj.cbo_projbudgettask_id, result.dataresponse.projbudgettask_name!=='--NULL--' ? result.dataresponse.projbudgettask_id : '--NULL--', result.dataresponse.projbudgettask_name!=='--NULL--'?result.dataresponse.projbudgettask_name:'NONE')

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

	var id = obj.txt_itemassetmove_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/itemassetmove.xprint?id=' + id;

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





