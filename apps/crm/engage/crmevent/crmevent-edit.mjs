var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const btn_commit = $('#pnl_edit-btn_commit')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_crmevent_id: $('#pnl_edit-txt_crmevent_id'),
	txt_crmevent_name: $('#pnl_edit-txt_crmevent_name'),
	txt_crmevent_descr: $('#pnl_edit-txt_crmevent_descr'),
	dt_crmevent_dtstart: $('#pnl_edit-dt_crmevent_dtstart'),
	dt_crmevent_dtend: $('#pnl_edit-dt_crmevent_dtend'),
	dt_crmevent_dtaffected: $('#pnl_edit-dt_crmevent_dtaffected'),
	txt_crmevent_message: $('#pnl_edit-txt_crmevent_message'),
	chk_crmevent_iscommit: $('#pnl_edit-chk_crmevent_iscommit'),
	chk_crmevent_isdisabled: $('#pnl_edit-chk_crmevent_isdisabled'),
	chk_crmevent_isunlimit: $('#pnl_edit-chk_crmevent_isunlimit'),
	chk_crmevent_isclose: $('#pnl_edit-chk_crmevent_isclose'),
	txt_crmevent_targetinvited: $('#pnl_edit-txt_crmevent_targetinvited'),
	txt_crmevent_targetattendant: $('#pnl_edit-txt_crmevent_targetattendant'),
	txt_crmevent_targetnewcontact: $('#pnl_edit-txt_crmevent_targetnewcontact'),
	txt_crmevent_targettx: $('#pnl_edit-txt_crmevent_targettx'),
	txt_crmevent_targettxnew: $('#pnl_edit-txt_crmevent_targettxnew'),
	txt_crmevent_targetbuyer: $('#pnl_edit-txt_crmevent_targetbuyer'),
	txt_crmevent_targetbuyernew: $('#pnl_edit-txt_crmevent_targetbuyernew'),
	txt_crmevent_targetsales: $('#pnl_edit-txt_crmevent_targetsales'),
	txt_crmevent_targetsalesnew: $('#pnl_edit-txt_crmevent_targetsalesnew'),
	txt_crmevent_totalinvited: $('#pnl_edit-txt_crmevent_totalinvited'),
	txt_crmevent_totalattendant: $('#pnl_edit-txt_crmevent_totalattendant'),
	txt_crmevent_totalnewcontact: $('#pnl_edit-txt_crmevent_totalnewcontact'),
	txt_crmevent_totaltx: $('#pnl_edit-txt_crmevent_totaltx'),
	txt_crmevent_totaltxnew: $('#pnl_edit-txt_crmevent_totaltxnew'),
	txt_crmevent_totalbuyer: $('#pnl_edit-txt_crmevent_totalbuyer'),
	txt_crmevent_totalbuyernew: $('#pnl_edit-txt_crmevent_totalbuyernew'),
	txt_crmevent_totalsales: $('#pnl_edit-txt_crmevent_totalsales'),
	txt_crmevent_totalsalesnew: $('#pnl_edit-txt_crmevent_totalsalesnew'),
	cbo_crmsource_id: $('#pnl_edit-cbo_crmsource_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;


	var disableedit = false;
	switch (this_page_options.variancename) {
		case 'commit' :
		case 'uncommit' :				
			btn_edit.linkbutton('disable');
			btn_save.linkbutton('disable');
			btn_delete.linkbutton('disable');
			disableedit = true;
			break;
	}


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_crmevent_id,
		autoid: true,
		logview: 'trn_crmevent',
		btn_edit: disableedit==true? $('<a >edit</a>') : btn_edit,
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



	new fgta4slideselect(obj.cbo_crmsource_id, {
		title: 'Pilih crmsource_id',
		returnpage: this_page_id,
		api: $ui.apis.load_crmsource_id,
		fieldValue: 'crmsource_id',
		fieldValueMap: 'crmsource_id',
		fieldDisplay: 'crmsource_name',
		fields: [
			{mapping: 'crmsource_id', text: 'crmsource_id'},
			{mapping: 'crmsource_name', text: 'crmsource_name'},
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


	if (this_page_options.variancename=='commit') {
		btn_commit.linkbutton({onClick: ()=>{
			btn_commit_click();
		}});
	}
}


function btn_commit_click() {
	console.log('commit');
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
			.setValue(obj.cbo_crmsource_id, result.record.crmsource_id, result.record.crmsource_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()


		if (this_page_options.variancename=='commit') {
			console.log(result.record)
			if (result.record.crmevent_iscommit=="1") {
				btn_commit.linkbutton('disable')
			} else {
				btn_commit.linkbutton('enable')
			}
		}

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
			data.crmevent_dtstart = global.now()
			data.crmevent_dtend = global.now()
			data.crmevent_dtaffected = global.now()
			data.crmevent_targetinvited = 0
			data.crmevent_targetattendant = 0
			data.crmevent_targetnewcontact = 0
			data.crmevent_targettx = 0
			data.crmevent_targettxnew = 0
			data.crmevent_targetbuyer = 0
			data.crmevent_targetbuyernew = 0
			data.crmevent_targetsales = 0
			data.crmevent_targetsalesnew = 0
			data.crmevent_totalinvited = 0
			data.crmevent_totalattendant = 0
			data.crmevent_totalnewcontact = 0
			data.crmevent_totaltx = 0
			data.crmevent_totaltxnew = 0
			data.crmevent_totalbuyer = 0
			data.crmevent_totalbuyernew = 0
			data.crmevent_totalsales = 0
			data.crmevent_totalsalesnew = 0

			data.crmsource_id = '0'
			data.crmsource_name = '-- PILIH --'



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editinvitedgrid'].handler.createnew(data, options)
		$ui.getPages().ITEMS['pnl_editattendantgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_crmevent_id
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

