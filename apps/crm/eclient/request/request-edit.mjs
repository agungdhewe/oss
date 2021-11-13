var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_partner_id: $('#pnl_edit-txt_partner_id'),
	cbo_partnerorg_id: $('#pnl_edit-cbo_partnerorg_id'),
	cbo_partnertype_id: $('#pnl_edit-cbo_partnertype_id'),
	txt_partner_name: $('#pnl_edit-txt_partner_name'),
	txt_partner_dirut: $('#pnl_edit-txt_partner_dirut'),
	txt_partner_dir: $('#pnl_edit-txt_partner_dir'),
	txt_partner_addressline1: $('#pnl_edit-txt_partner_addressline1'),
	txt_partner_addressline2: $('#pnl_edit-txt_partner_addressline2'),
	txt_partner_addressline3: $('#pnl_edit-txt_partner_addressline3'),
	txt_partner_city: $('#pnl_edit-txt_partner_city'),
	cbo_partner_country: $('#pnl_edit-cbo_partner_country'),
	txt_partner_postcode: $('#pnl_edit-txt_partner_postcode'),
	txt_partner_billaddrline1: $('#pnl_edit-txt_partner_billaddrline1'),
	txt_partner_billaddrline2: $('#pnl_edit-txt_partner_billaddrline2'),
	txt_partner_billaddrline3: $('#pnl_edit-txt_partner_billaddrline3'),
	txt_partner_phone1: $('#pnl_edit-txt_partner_phone1'),
	txt_partner_phone2: $('#pnl_edit-txt_partner_phone2'),
	txt_partner_phone3: $('#pnl_edit-txt_partner_phone3'),
	txt_partner_phone4: $('#pnl_edit-txt_partner_phone4'),
	txt_partner_fax1: $('#pnl_edit-txt_partner_fax1'),
	txt_partner_fax2: $('#pnl_edit-txt_partner_fax2'),
	txt_partner_email1: $('#pnl_edit-txt_partner_email1'),
	txt_partner_email2: $('#pnl_edit-txt_partner_email2'),
	txt_partner_aktanoth: $('#pnl_edit-txt_partner_aktanoth'),
	txt_partner_siupno: $('#pnl_edit-txt_partner_siupno'),
	txt_partner_sk: $('#pnl_edit-txt_partner_sk'),
	txt_partner_tdp: $('#pnl_edit-txt_partner_tdp'),
	txt_partner_bank: $('#pnl_edit-txt_partner_bank'),
	txt_partner_npwp: $('#pnl_edit-txt_partner_npwp'),
	txt_partner_cf1: $('#pnl_edit-txt_partner_cf1'),
	txt_partner_cf2: $('#pnl_edit-txt_partner_cf2'),
	txt_partner_cf3: $('#pnl_edit-txt_partner_cf3'),
	txt_partner_cf4: $('#pnl_edit-txt_partner_cf4'),
	txt_partner_cf5: $('#pnl_edit-txt_partner_cf5'),
	txt_partner_cf6: $('#pnl_edit-txt_partner_cf6'),
	txt_partner_cf7: $('#pnl_edit-txt_partner_cf7'),
	chk_partner_isdisabled: $('#pnl_edit-chk_partner_isdisabled'),
	chk_partner_isapproved: $('#pnl_edit-chk_partner_isapproved'),
	txt_partner_apprby: $('#pnl_edit-txt_partner_apprby'),
	txt_partner_apprdt: $('#pnl_edit-txt_partner_apprdt')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	// switch (this_page_options.variancename) {
	// 	case 'commit' :
	//		btn_edit.linkbutton('disable');
	//		disableedit = true;
	//		break;
	// }


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_partner_id,
		autoid: true,
		logview: 'mst_partnerreg',
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
		OnViewModeChanged : (viewonly) => { form_viewmodechanged(viewonly) }
	})



	new fgta4slideselect(obj.cbo_partnerorg_id, {
		title: 'Pilih partnerorg_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partnerorg_id,
		fieldValue: 'partnerorg_id',
		fieldValueMap: 'partnerorg_id',
		fieldDisplay: 'partnerorg_name',
		fields: [
			{mapping: 'partnerorg_id', text: 'partnerorg_id'},
			{mapping: 'partnerorg_name', text: 'partnerorg_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partnerorg_id:'--NULL--', partnerorg_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_partnertype_id, {
		title: 'Pilih partnertype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partnertype_id,
		fieldValue: 'partnertype_id',
		fieldValueMap: 'partnertype_id',
		fieldDisplay: 'partnertype_name',
		fields: [
			{mapping: 'partnertype_id', text: 'partnertype_id'},
			{mapping: 'partnertype_name', text: 'partnertype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({partnertype_id:'--NULL--', partnertype_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_partner_country, {
		title: 'Pilih partner_country',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_country,
		fieldValue: 'partner_country',
		fieldValueMap: 'country_id',
		fieldDisplay: 'country_name',
		fields: [
			{mapping: 'country_id', text: 'country_id'},
			{mapping: 'country_name', text: 'country_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({country_id:'--NULL--', country_name:'NONE'});	
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

		if (result.record.partnerorg_id==null) { result.record.partnerorg_id='--NULL--'; result.record.partnerorg_name='NONE'; }
		if (result.record.partnertype_id==null) { result.record.partnertype_id='--NULL--'; result.record.partnertype_name='NONE'; }
		if (result.record.partner_country==null) { result.record.partner_country='--NULL--'; result.record.country_name='NONE'; }


		form
			.fill(result.record)
			.setValue(obj.cbo_partnerorg_id, result.record.partnerorg_id, result.record.partnerorg_name)
			.setValue(obj.cbo_partnertype_id, result.record.partnertype_id, result.record.partnertype_name)
			.setValue(obj.cbo_partner_country, result.record.partner_country, result.record.country_name)
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

			data.partnerorg_id = '--NULL--'
			data.partnerorg_name = 'NONE'
			data.partnertype_id = '--NULL--'
			data.partnertype_name = 'NONE'
			data.partner_country = '--NULL--'
			data.country_name = 'NONE'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editusergrid'].handler.createnew(data, options)


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
	var objid = obj.txt_partner_id
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

	options.skipmappingresponse = ["partnerorg_id"];
	options.skipmappingresponse = ["partnertype_id"];
	options.skipmappingresponse = ["partner_country"];

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

	form.setValue(obj.cbo_partnerorg_id, result.dataresponse.partnerorg_name!=='--NULL--' ? result.dataresponse.partnerorg_id : '--NULL--', result.dataresponse.partnerorg_name!=='--NULL--'?result.dataresponse.partnerorg_name:'NONE')
	form.setValue(obj.cbo_partnertype_id, result.dataresponse.partnertype_name!=='--NULL--' ? result.dataresponse.partnertype_id : '--NULL--', result.dataresponse.partnertype_name!=='--NULL--'?result.dataresponse.partnertype_name:'NONE')
	form.setValue(obj.cbo_partner_country, result.dataresponse.country_name!=='--NULL--' ? result.dataresponse.partner_country : '--NULL--', result.dataresponse.country_name!=='--NULL--'?result.dataresponse.country_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

