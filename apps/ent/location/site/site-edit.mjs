var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_site_id: $('#pnl_edit-txt_site_id'),
	txt_site_name: $('#pnl_edit-txt_site_name'),
	txt_site_address: $('#pnl_edit-txt_site_address'),
	txt_site_phone: $('#pnl_edit-txt_site_phone'),
	txt_site_email: $('#pnl_edit-txt_site_email'),
	txt_site_sqmwide: $('#pnl_edit-txt_site_sqmwide'),
	chk_site_isdisabled: $('#pnl_edit-chk_site_isdisabled'),
	txt_site_geoloc: $('#pnl_edit-txt_site_geoloc'),
	dt_site_opendate: $('#pnl_edit-dt_site_opendate'),
	cbo_sitemodel_id: $('#pnl_edit-cbo_sitemodel_id'),
	cbo_sitegroup_id: $('#pnl_edit-cbo_sitegroup_id'),
	cbo_land_id: $('#pnl_edit-cbo_land_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_config_id: $('#pnl_edit-cbo_config_id'),
	cbo_taxtype_id: $('#pnl_edit-cbo_taxtype_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_site_id,
		autoid: false,
		logview: 'mst_site',
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



	new fgta4slideselect(obj.cbo_sitemodel_id, {
		title: 'Pilih sitemodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sitemodel_id,
		fieldValue: 'sitemodel_id',
		fieldValueMap: 'sitemodel_id',
		fieldDisplay: 'sitemodel_name',
		fields: [
			{mapping: 'sitemodel_id', text: 'sitemodel_id'},
			{mapping: 'sitemodel_name', text: 'sitemodel_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_sitegroup_id, {
		title: 'Pilih sitegroup_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sitegroup_id,
		fieldValue: 'sitegroup_id',
		fieldValueMap: 'sitegroup_id',
		fieldDisplay: 'sitegroup_name',
		fields: [
			{mapping: 'sitegroup_id', text: 'sitegroup_id'},
			{mapping: 'sitegroup_name', text: 'sitegroup_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_land_id, {
		title: 'Pilih land_id',
		returnpage: this_page_id,
		api: $ui.apis.load_land_id,
		fieldValue: 'land_id',
		fieldValueMap: 'land_id',
		fieldDisplay: 'land_name',
		fields: [
			{mapping: 'land_id', text: 'land_id'},
			{mapping: 'land_name', text: 'land_name'},
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

	new fgta4slideselect(obj.cbo_config_id, {
		title: 'Pilih config_id',
		returnpage: this_page_id,
		api: $ui.apis.load_config_id,
		fieldValue: 'config_id',
		fieldValueMap: 'config_id',
		fieldDisplay: 'config_name',
		fields: [
			{mapping: 'config_id', text: 'config_id'},
			{mapping: 'config_name', text: 'config_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})	
	
				
	new fgta4slideselect(obj.cbo_taxtype_id, {
		title: 'Pilih taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_taxtype_id,
		fieldValue: 'taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
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



		form
			.fill(result.record)
			.setValue(obj.cbo_sitemodel_id, result.record.sitemodel_id, result.record.sitemodel_name)
			.setValue(obj.cbo_sitegroup_id, result.record.sitegroup_id, result.record.sitegroup_name)
			.setValue(obj.cbo_land_id, result.record.land_id, result.record.land_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
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
			data.site_sqmwide = 0
			data.site_opendate = global.now()

			data.sitemodel_id = '0'
			data.sitemodel_name = '-- PILIH --'
			data.sitegroup_id = '0'
			data.sitegroup_name = '-- PILIH --'
			data.land_id = '0'
			data.land_name = '-- PILIH --'
			data.dept_id = '0'
			data.dept_name = '-- PILIH --'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editunitgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editmappinggrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editeventgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_site_id
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

