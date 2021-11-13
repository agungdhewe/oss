var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_close = $('#pnl_edit-btn_close')
const btn_reopen = $('#pnl_edit-btn_reopen')





const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_periodemo_id: $('#pnl_edit-txt_periodemo_id'),
	txt_periodemo_name: $('#pnl_edit-txt_periodemo_name'),
	txt_periodemo_year: $('#pnl_edit-txt_periodemo_year'),
	txt_periodemo_month: $('#pnl_edit-txt_periodemo_month'),
	dt_periodemo_dtstart: $('#pnl_edit-dt_periodemo_dtstart'),
	dt_periodemo_dtend: $('#pnl_edit-dt_periodemo_dtend'),
	cbo_periodemo_prev: $('#pnl_edit-cbo_periodemo_prev'),
	chk_periodemo_isclosed: $('#pnl_edit-chk_periodemo_isclosed'),
	txt_periodemo_closeby: $('#pnl_edit-txt_periodemo_closeby'),
	dt_periodemo_closedate: $('#pnl_edit-dt_periodemo_closedate')
}




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
		primary: obj.txt_periodemo_id,
		autoid: true,
		logview: 'mst_periodemo',
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



	btn_close.linkbutton({ onClick: () => { btn_action_click({ action: 'close' }); } });
	btn_reopen.linkbutton({ onClick: () => { btn_action_click({ action: 'reopen' }); } });





	new fgta4slideselect(obj.cbo_periodemo_prev, {
		title: 'Pilih periodemo_prev',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_prev,
		fieldValue: 'periodemo_prev',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{mapping: 'periodemo_id', text: 'periodemo_id'},
			{mapping: 'periodemo_name', text: 'periodemo_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_periodemo_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.periodemo_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
				
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

}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);
  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_periodemo_prev, result.record.periodemo_prev, result.record.periodemo_prev_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		updatebuttonstate(result.record)
		


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
		data.periodemo_year = 0
		data.periodemo_month = 0
		data.periodemo_dtstart = global.now()
		data.periodemo_dtend = global.now()
		data.periodemo_isclosed = '0'
		data.periodemo_closedate = global.now()

		data.periodemo_prev = '0'
		data.periodemo_prev_name = '-- PILIH --'


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


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini
	var btn_close_on = false;
	var btn_reopen_on = false;

	if (record.periodemo_isclosed=="1") {
		btn_close_on = false;
		btn_reopen_on = true;
		form.lock(true);
	} else {
		btn_close_on = true;
		btn_reopen_on = false;
		form.lock(false);
	}


	btn_close.linkbutton(btn_close_on ? 'enable' : 'disable');
	btn_reopen.linkbutton(btn_reopen_on ? 'enable' : 'disable');


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
	var objid = obj.txt_periodemo_id
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

	options.skipmappingresponse = ["periodemo_prev"];

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

	form.setValue(obj.cbo_periodemo_prev, result.dataresponse.periodemo_prev_name!=='--NULL--' ? result.dataresponse.periodemo_prev : '--NULL--', result.dataresponse.periodemo_prev_name!=='--NULL--'?result.dataresponse.periodemo_prev_name:'NONE')

	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}



async function btn_action_click(args) {
	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('[WARNING]Simpan dulu perubahan data, dan tidak sedang dalam mode edit.');
		return;
	}

	Object.assign(args, {
		id: form.getCurrentId(),
		act_url: null,
		act_msg_quest: null,
		act_msg_result: null,
		act_do: null
	});

	switch (args.action) {
		case 'close' :
			args.act_url = `${global.modulefullname}/xtion-close`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Close</b> periode ${args.id} ?`;
			args.act_msg_result = `Periode ${args.id} telah di close.`;
			args.act_do = (result) => {
				btn_close.linkbutton('disable');
				btn_reopen.linkbutton('enable');
				obj.chk_periodemo_isclosed.checkbox('check');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ periodemo_isclosed: "1" }, form.rowid);
				form.lock(true);
				form.commit();
			}
			break;

		case 'reopen' :
			args.act_url = `${global.modulefullname}/xtion-reopen`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Membuka</b> kembali periode ${args.id} ?`;
			args.act_msg_result = `Periode ${args.id} telah di buka kembali.`;
			args.act_do = (result) => {
				btn_close.linkbutton('enable');
				btn_reopen.linkbutton('disable');
				obj.chk_periodemo_isclosed.checkbox('uncheck');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ periodemo_isclosed: "0" }, form.rowid);
				form.lock(false);
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
				args.act_do(result);
			}
		});
	} catch (err) {
		console.error(err);
		$ui.ShowMessage('[ERROR]' + err.message);
	} finally {
		$ui.unmask();
	}
}





