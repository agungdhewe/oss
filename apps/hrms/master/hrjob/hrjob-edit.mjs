var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_hrjob_id: $('#pnl_edit-txt_hrjob_id'),
	txt_hrjob_name: $('#pnl_edit-txt_hrjob_name'),
	txt_hrjob_descr: $('#pnl_edit-txt_hrjob_descr'),
	chk_hrjob_isdisabled: $('#pnl_edit-chk_hrjob_isdisabled'),
	cbo_hrgrd_id: $('#pnl_edit-cbo_hrgrd_id'),
	cbo_deptmodel_id: $('#pnl_edit-cbo_deptmodel_id'),
	cbo_hrsection_id: $('#pnl_edit-cbo_hrsection_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_hrjob_id,
		autoid: false,
		logview: 'mst_hrjob',
		btn_edit: btn_edit,
		btn_save: btn_save,
		btn_delete: btn_delete,		
		objects : obj,
		OnDataSaving: async (data, options) => { await form_datasaving(data, options) },
		OnDataSaveError: async (data, options) => { await form_datasaveerror(data, options) },
		OnDataSaved: async (result, options) => {  await form_datasaved(result, options) },
		OnDataDeleting: async (data, options) => { await form_deleting(data, options) },
		OnDataDeleted: async (result, options) => { await form_deleted(result, options) },
		OnIdSetup : (options) => { form_idsetup(options) },
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_hrgrd_id, {
		title: 'Pilih hrgrd_id',
		returnpage: this_page_id,
		api: $ui.apis.load_hrgrd_id,
		fieldValue: 'hrgrd_id',
		fieldValueMap: 'hrgrd_id',
		fieldDisplay: 'hrgrd_name',
		fields: [
			{mapping: 'hrgrd_id', text: 'hrgrd_id'},
			{mapping: 'hrgrd_name', text: 'hrgrd_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_deptmodel_id, {
		title: 'Pilih deptmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_deptmodel_id,
		fieldValue: 'deptmodel_id',
		fieldValueMap: 'deptmodel_id',
		fieldDisplay: 'deptmodel_name',
		fields: [
			{mapping: 'deptmodel_id', text: 'deptmodel_id'},
			{mapping: 'deptmodel_name', text: 'deptmodel_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_hrsection_id, {
		title: 'Pilih hrsection_id',
		returnpage: this_page_id,
		api: $ui.apis.load_hrsection_id,
		fieldValue: 'hrsection_id',
		fieldValueMap: 'hrsection_id',
		fieldDisplay: 'hrsection_name',
		fields: [
			{mapping: 'hrsection_id', text: 'hrsection_id'},
			{mapping: 'hrsection_name', text: 'hrsection_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({hrsection_id:'--NULL--', hrsection_name:'NONE'});	
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



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.hrsection_id==null) { result.record.hrsection_id='--NULL--'; result.record.hrsection_name='NONE'; }


		form
			.fill(result.record)
			.setValue(obj.cbo_hrgrd_id, result.record.hrgrd_id, result.record.hrgrd_name)
			.setValue(obj.cbo_deptmodel_id, result.record.deptmodel_id, result.record.deptmodel_name)
			.setValue(obj.cbo_hrsection_id, result.record.hrsection_id, result.record.hrsection_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()


		// fill data, bisa dilakukan secara manual dengan cara berikut:	
		// form
			// .setValue(obj.txt_id, result.record.id)
			// .setValue(obj.txt_nama, result.record.nama)
			// .setValue(obj.cbo_prov, result.record.prov_id, result.record.prov_nama)
			// .setValue(obj.chk_isdisabled, result.record.disabled)
			// .setValue(obj.txt_alamat, result.record.alamat)
			// ....... dst dst
			// .commit()
			// .setViewMode()
			// ....... dst dst

	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage(err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {
	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form

			data.hrgrd_id = '0'
			data.hrgrd_name = '-- PILIH --'
			data.deptmodel_id = '0'
			data.deptmodel_name = '-- PILIH --'
			data.hrsection_id = '--NULL--'
			data.hrsection_name = 'NONE'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}



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


function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_hrjob_id
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


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

