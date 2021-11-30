var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_coaformatset_id: $('#pnl_edit-txt_coaformatset_id'),
	txt_coaformatset_order: $('#pnl_edit-txt_coaformatset_order'),
	txt_coaformatset_name: $('#pnl_edit-txt_coaformatset_name'),
	txt_coaformatset_descr: $('#pnl_edit-txt_coaformatset_descr'),
	txt_coaformatset_indent: $('#pnl_edit-txt_coaformatset_indent'),
	chk_coaformatset_isblankline: $('#pnl_edit-chk_coaformatset_isblankline'),
	chk_coaformatset_isbold: $('#pnl_edit-chk_coaformatset_isbold'),
	chk_coaformatset_isitalic: $('#pnl_edit-chk_coaformatset_isitalic'),
	chk_coaformatset_isunderline: $('#pnl_edit-chk_coaformatset_isunderline'),
	chk_coaformatset_isparent: $('#pnl_edit-chk_coaformatset_isparent'),
	cbo_coaformatset_parent: $('#pnl_edit-cbo_coaformatset_parent'),
	txt_coaformatset_path: $('#pnl_edit-txt_coaformatset_path'),
	txt_coaformatset_pathid: $('#pnl_edit-txt_coaformatset_pathid'),
	txt_coaformatset_level: $('#pnl_edit-txt_coaformatset_level'),
	cbo_coaformat_id: $('#pnl_edit-cbo_coaformat_id')
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
		primary: obj.txt_coaformatset_id,
		autoid: true,
		logview: 'mst_coaformatset',
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








	new fgta4slideselect(obj.cbo_coaformatset_parent, {
		title: 'Pilih coaformatset_parent',
		returnpage: this_page_id,
		api: $ui.apis.load_coaformatset_parent,
		fieldValue: 'coaformatset_parent',
		fieldValueMap: 'coaformatset_id',
		fieldDisplay: 'coaformatset_parent_name',
		fields: [
			{mapping: 'coaformatset_id', text: 'coaformatset_id'},
			{mapping: 'coaformatset_name', text: 'coaformatset_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_coaformatset_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.coaformatset_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
			result.records.unshift({coaformatset_id:'--NULL--', coaformatset_name:'NONE'});	
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {				
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_coaformat_id, {
		title: 'Pilih coaformat_id',
		returnpage: this_page_id,
		api: $ui.apis.load_coaformat_id,
		fieldValue: 'coaformat_id',
		fieldValueMap: 'coaformat_id',
		fieldDisplay: 'coaformat_name',
		fields: [
			{mapping: 'coaformat_id', text: 'coaformat_id'},
			{mapping: 'coaformat_name', text: 'coaformat_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
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
		if (result.record.coaformatset_parent==null) { result.record.coaformatset_parent='--NULL--'; result.record.coaformatset_parent_name='NONE'; }

		*/
		for (var objid in obj) {
			console.log(objid)	
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
			.setValue(obj.cbo_coaformatset_parent, record.coaformatset_parent, record.coaformatset_parent_name)
			.setValue(obj.cbo_coaformat_id, record.coaformat_id, record.coaformat_name)
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


export function createnew(args) {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.coaformatset_order = 0
		data.coaformatset_indent = 0

		data.coaformatset_isbold = '0'
		data.coaformatset_isitalic = '0'
		data.coaformatset_isunderline = '0'
		data.coaformatset_isparent = '0'

		data.coaformatset_isparent = '0'

		data.coaformatset_level = 0

		data.coaformatset_parent = '--NULL--'
		data.coaformatset_parent_name = 'NONE'
		data.coaformat_id = args.coaformat_id
		data.coaformat_name = args.coaformat_name









		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editaccountgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_coaformatset_id
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
	// options.skipmappingresponse = [coaformatset_parent, ];
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
	form.setValue(obj.cbo_coaformatset_parent, result.dataresponse.coaformatset_parent_name!=='--NULL--' ? result.dataresponse.coaformatset_parent : '--NULL--', result.dataresponse.coaformatset_parent_name!=='--NULL--'?result.dataresponse.coaformatset_parent_name:'NONE')

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




