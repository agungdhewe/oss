var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_empl_id: $('#pnl_edit-txt_empl_id'),
	txt_empl_nik: $('#pnl_edit-txt_empl_nik'),
	txt_empl_name: $('#pnl_edit-txt_empl_name'),
	chk_empl_isdisabled: $('#pnl_edit-chk_empl_isdisabled'),
	dt_empl_dtjoin: $('#pnl_edit-dt_empl_dtjoin'),
	dt_empl_dtexit: $('#pnl_edit-dt_empl_dtexit'),
	txt_empl_birthplace: $('#pnl_edit-txt_empl_birthplace'),
	dt_empl_birthdate: $('#pnl_edit-dt_empl_birthdate'),
	txt_empl_address: $('#pnl_edit-txt_empl_address'),
	txt_empl_city: $('#pnl_edit-txt_empl_city'),
	txt_empl_prov: $('#pnl_edit-txt_empl_prov'),
	txt_empl_hp: $('#pnl_edit-txt_empl_hp'),
	txt_empl_email: $('#pnl_edit-txt_empl_email'),
	txt_empl_kk: $('#pnl_edit-txt_empl_kk'),
	txt_empl_ktp: $('#pnl_edit-txt_empl_ktp'),
	txt_empl_npwp: $('#pnl_edit-txt_empl_npwp'),
	txt_empl_bpjstk: $('#pnl_edit-txt_empl_bpjstk'),
	txt_empl_bpjskes: $('#pnl_edit-txt_empl_bpjskes'),
	cbo_hrjob_id: $('#pnl_edit-cbo_hrjob_id'),
	cbo_hrstatus_id: $('#pnl_edit-cbo_hrstatus_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_site_id: $('#pnl_edit-cbo_site_id'),
	cbo_auth_id: $('#pnl_edit-cbo_auth_id'),
	cbo_marital_id: $('#pnl_edit-cbo_marital_id'),
	cbo_gender_id: $('#pnl_edit-cbo_gender_id'),
	cbo_edu_id: $('#pnl_edit-cbo_edu_id'),
	cbo_religion_id: $('#pnl_edit-cbo_religion_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_empl_id,
		autoid: true,
		logview: 'mst_empl',
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



	new fgta4slideselect(obj.cbo_hrjob_id, {
		title: 'Pilih hrjob_id',
		returnpage: this_page_id,
		api: $ui.apis.load_hrjob_id,
		fieldValue: 'hrjob_id',
		fieldValueMap: 'hrjob_id',
		fieldDisplay: 'hrjob_name',
		fields: [
			{mapping: 'hrjob_id', text: 'hrjob_id'},
			{mapping: 'hrjob_name', text: 'hrjob_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_hrstatus_id, {
		title: 'Pilih hrstatus_id',
		returnpage: this_page_id,
		api: $ui.apis.load_hrstatus_id,
		fieldValue: 'hrstatus_id',
		fieldValueMap: 'hrstatus_id',
		fieldDisplay: 'hrstatus_name',
		fields: [
			{mapping: 'hrstatus_id', text: 'hrstatus_id'},
			{mapping: 'hrstatus_name', text: 'hrstatus_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
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
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
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
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
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
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({auth_id:'--NULL--', auth_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_marital_id, {
		title: 'Pilih marital_id',
		returnpage: this_page_id,
		api: $ui.apis.load_marital_id,
		fieldValue: 'marital_id',
		fieldValueMap: 'marital_id',
		fieldDisplay: 'marital_name',
		fields: [
			{mapping: 'marital_id', text: 'marital_id'},
			{mapping: 'marital_name', text: 'marital_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_gender_id, {
		title: 'Pilih gender_id',
		returnpage: this_page_id,
		api: $ui.apis.load_gender_id,
		fieldValue: 'gender_id',
		fieldValueMap: 'gender_id',
		fieldDisplay: 'gender_name',
		fields: [
			{mapping: 'gender_id', text: 'gender_id'},
			{mapping: 'gender_name', text: 'gender_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_edu_id, {
		title: 'Pilih edu_id',
		returnpage: this_page_id,
		api: $ui.apis.load_edu_id,
		fieldValue: 'edu_id',
		fieldValueMap: 'edu_id',
		fieldDisplay: 'edu_name',
		fields: [
			{mapping: 'edu_id', text: 'edu_id'},
			{mapping: 'edu_name', text: 'edu_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_religion_id, {
		title: 'Pilih religion_id',
		returnpage: this_page_id,
		api: $ui.apis.load_religion_id,
		fieldValue: 'religion_id',
		fieldValueMap: 'religion_id',
		fieldDisplay: 'religion_name',
		fields: [
			{mapping: 'religion_id', text: 'religion_id'},
			{mapping: 'religion_name', text: 'religion_name'},
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



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.auth_id==null) { result.record.auth_id='--NULL--'; result.record.auth_name='NONE'; }


		form
			.fill(result.record)
			.setValue(obj.cbo_hrjob_id, result.record.hrjob_id, result.record.hrjob_name)
			.setValue(obj.cbo_hrstatus_id, result.record.hrstatus_id, result.record.hrstatus_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.setValue(obj.cbo_site_id, result.record.site_id, result.record.site_name)
			.setValue(obj.cbo_auth_id, result.record.auth_id, result.record.auth_name)
			.setValue(obj.cbo_marital_id, result.record.marital_id, result.record.marital_name)
			.setValue(obj.cbo_gender_id, result.record.gender_id, result.record.gender_name)
			.setValue(obj.cbo_edu_id, result.record.edu_id, result.record.edu_name)
			.setValue(obj.cbo_religion_id, result.record.religion_id, result.record.religion_name)
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
			data.empl_dtjoin = global.now()
			data.empl_dtexit = global.now()
			data.empl_birthdate = global.now()

			data.hrjob_id = '0'
			data.hrjob_name = '-- PILIH --'
			data.hrstatus_id = '0'
			data.hrstatus_name = '-- PILIH --'
			data.dept_id = '0'
			data.dept_name = '-- PILIH --'
			data.site_id = '0'
			data.site_name = '-- PILIH --'
			data.auth_id = '--NULL--'
			data.auth_name = 'NONE'
			data.marital_id = '0'
			data.marital_name = '-- PILIH --'
			data.gender_id = '0'
			data.gender_name = '-- PILIH --'
			data.edu_id = '0'
			data.edu_name = '-- PILIH --'
			data.religion_id = '0'
			data.religion_name = '-- PILIH --'



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
	var objid = obj.txt_empl_id
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
	options.skipmappingresponse = ["auth_id"];

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

	form.setValue(obj.cbo_auth_id, result.dataresponse.auth_name!=='--NULL--'? result.dataresponse.auth_id : '--NULL--', 
								   result.dataresponse.auth_name!=='--NULL--'? result.dataresponse.auth_name : 'NONE');


	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

