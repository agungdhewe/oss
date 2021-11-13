var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');
const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
const btn_approve = $('#pnl_edit-btn_approve')
const btn_unapprove = $('#pnl_edit-btn_unapprove')
const btn_decline = $('#pnl_edit-btn_decline')

const txt_validr_note =  $('#pnl_edit-txt_cashdiscount_validr_note');
const txt_cashdiscount_totaltagihan = $('#pnl_edit-txt_cashdiscount_totaltagihan');
const txt_cashdiscount_totaldiscount = $('#pnl_edit-txt_cashdiscount_totaldiscount');
const txt_cashdiscount_outstanding = $('#pnl_edit-txt_cashdiscount_outstanding');

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_cashdiscount_id: $('#pnl_edit-txt_cashdiscount_id'),
	txt_cashdiscount_ref: $('#pnl_edit-txt_cashdiscount_ref'),
	dt_cashdiscount_date: $('#pnl_edit-dt_cashdiscount_date'),
	txt_cashdiscount_descr: $('#pnl_edit-txt_cashdiscount_descr'),
	chk_cashdiscount_iscommit: $('#pnl_edit-chk_cashdiscount_iscommit'),
	txt_cashdiscount_commitby: $('#pnl_edit-txt_cashdiscount_commitby'),
	txt_cashdiscount_commitdate: $('#pnl_edit-txt_cashdiscount_commitdate'),
	chk_cashdiscount_isapproved: $('#pnl_edit-chk_cashdiscount_isapproved'),
	chk_cashdiscount_isposted: $('#pnl_edit-chk_cashdiscount_isposted'),
	txt_cashdiscount_percent: $('#pnl_edit-txt_cashdiscount_percent'),
	txt_cashdiscount_validr: $('#pnl_edit-txt_cashdiscount_validr'),
	cbo_billout_id: $('#pnl_edit-cbo_billout_id'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	txt_doc_id: $('#pnl_edit-txt_doc_id'),
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
		primary: obj.txt_cashdiscount_id,
		autoid: true,
		logview: 'trn_cashdiscount',
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

	btn_unapprove.hide();



	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });
	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_unapprove.linkbutton({ onClick: () => { btn_action_click({ action: 'unapprove' }); } });
	btn_decline.linkbutton({ onClick: () => { 
		$ui.ShowMessage(`
			<div style="display: block">
				<div style="font-weight: bold">Reason</div>
				<div>
					<input class="easyui-textbox" style="width: 300px">
				</div>
			</div>
		`, {
			'Decline': () => {
				btn_action_click({ action: 'decline' }); 
			},
			'Cancel': () => {
			} 
		})
	}});



	new fgta4slideselect(obj.cbo_billout_id, {
		title: 'Pilih AR yang akan dibuat Cash Discount',
		returnpage: this_page_id,
		api: $ui.apis.load_billout_id,
		fieldValue: 'billout_id',
		fieldValueMap: 'billout_id',
		fieldDisplay: 'billout_descr',
		fields: [
			{mapping: 'billout_id', text: 'Id'},
			{mapping: 'billout_datedue', text: 'Due Date'},
			{mapping: 'billout_datedueage', text: 'Age'},
			{mapping: 'billout_descr', text: 'Descr'},
			{mapping: 'partner_name', text: 'Agency'},
			{mapping: 'billout_validr', text: 'Amout'},
			{mapping: 'billout_taxidr', text: 'Tax'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({billout_id:'--NULL--', billout_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setValue(obj.txt_cashdiscount_descr, record.billout_descr)
			form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)	
			form.setValue(obj.txt_cashdiscount_validr, 0);
			form.setValue(obj.txt_cashdiscount_percent, 0);
			txt_validr_note.html(`Max: ${record.billout_validr}`);

			global.datastate.billout_validr = record.billout_validr;
			txt_cashdiscount_totaltagihan.numberbox('setValue', record.billout_total);
			txt_cashdiscount_totaldiscount.numberbox('setValue', record.billout_discount);
			txt_cashdiscount_outstanding.numberbox('setValue', record.billout_validr);
			
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih Partner',
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
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_dept_id, {
		title: 'Pilih Departement',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,
		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'ID'},
			{mapping: 'dept_name', text: 'Department'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
		},
		OnSelected: (value, display, record) => {
			console.log(record);
		}
	})


	obj.txt_cashdiscount_percent.numberbox({
		onChange: (newvalue) => { txt_cashdiscount_percent_changed(newvalue)}
	})

	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

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

	txt_validr_note.html('');

	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.billout_id==null) { result.record.billout_id='--NULL--'; result.record.billout_descr='NONE'; }

		txt_cashdiscount_totaltagihan.numberbox('setValue', result.record.billout_total);
		txt_cashdiscount_totaldiscount.numberbox('setValue', result.record.billout_discount);
		txt_cashdiscount_outstanding.numberbox('setValue', result.record.billout_validr);
		
		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_billout_id, result.record.billout_id, result.record.billout_descr)
			.setValue(obj.cbo_partner_id, result.record.partner_id, result.record.partner_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.commit()
			.setViewMode(viewmode)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()
		form.SuspendEvent(false);

		var btn_commit_on = false;
		var btn_uncommit_on = false;
		var btn_approve_on = false;
		var btn_decline_on = false;
		var btn_unapprove_on = false;

		console.log(result.record);

		if (result.record.cashdiscount_isposted=="1") {
			btn_commit_on = false;
			btn_uncommit_on = false;
			btn_approve_on = false;
			btn_decline_on = false;
			btn_unapprove_on = false;
			form.lock(true);
		} else if (result.record.cashdiscount_isdeclined=="1") {
			btn_commit_on = false;
			btn_uncommit_on = true;
			btn_approve_on = false;
			btn_decline_on = false;
			btn_unapprove_on = false;
			form.lock(true);
		} else if (result.record.cashdiscount_isapprovalprogress=="1") {
			btn_commit_on = false;
			btn_uncommit_on = false;
			btn_approve_on = false;
			btn_decline_on = true;
			btn_unapprove_on = true;
			form.lock(true);
		} else if (result.record.cashdiscount_iscommit=="1") {
			btn_commit_on = false;
			btn_uncommit_on = true;
			btn_approve_on = true;
			btn_decline_on = true;
			btn_unapprove_on = false;
			form.lock(true);
		} else {
			btn_commit_on = true;
			btn_uncommit_on = false;
			btn_approve_on = false;
			btn_decline_on = false;
			btn_unapprove_on = false;
			form.lock(false);
		} 

		btn_commit.linkbutton(btn_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(btn_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(btn_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(btn_decline_on ? 'enable' : 'disable');
		btn_unapprove.linkbutton(btn_unapprove_on ? 'enable' : 'disable');


	}

	var fn_dataopenerror = (err) => {
		$ui.ShowMessage('[ERROR]'+err.errormessage);
	}

	form.dataload(fn_dataopening, fn_dataopened, fn_dataopenerror)
	
}


export function createnew() {

	txt_validr_note.html('');

	form.createnew(async (data, options)=>{
		// console.log(data)
		// console.log(options)
		form.rowid = null

		// set nilai-nilai default untuk form
		data.cashdiscount_date = global.now()
		data.cashdiscount_validr = 0
		data.cashdiscount_percent = 0


		data.billout_id = '--NULL--'
		data.billout_descr = 'NONE'

		data.partner_id = '0'
		data.partner_name = '-- PILIH --';
		
		data.dept_id = global.setup.dept_id;
		data.dept_name = global.setup.dept_name;

		data.doc_id = global.setup.doc_id;



		txt_cashdiscount_totaltagihan.numberbox('setValue', 0);
		txt_cashdiscount_totaldiscount.numberbox('setValue', 0);
		txt_cashdiscount_outstanding.numberbox('setValue', 0);
		

		btn_commit.linkbutton('enable');
		btn_uncommit.linkbutton('disable');
		btn_approve.linkbutton('disable');
		btn_unapprove.linkbutton('disable');


		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editapprovalgrid'].handler.createnew(data, options)


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
	var objid = obj.txt_cashdiscount_id
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

	options.skipmappingresponse = ["billout_id"];

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

	form.setValue(obj.cbo_billout_id, result.dataresponse.billout_descr!=='--NULL--' ? result.dataresponse.billout_id : '--NULL--', result.dataresponse.billout_descr!=='--NULL--'?result.dataresponse.billout_descr:'NONE')

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

	var id = obj.txt_cashdiscount_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/cashdiscount.xprint?id=' + id;

	var debug = false;
	if (debug) {
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

function txt_cashdiscount_percent_changed(newvalue) {
	var discount_idr = (newvalue/100) * global.datastate.billout_validr;
	var outstanding = global.datastate.billout_validr - discount_idr;

	form.setValue(obj.txt_cashdiscount_validr, discount_idr)
	txt_cashdiscount_outstanding.numberbox('setValue', outstanding);
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
		case 'commit' :
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Commit</b> cashdiscount no ${args.id} ?`;
			args.act_msg_result = `Cashdiscount no ${args.id} telah di commit.`;
			args.act_do = (result) => {
				btn_commit.linkbutton('disable');
				btn_uncommit.linkbutton('enable');
				btn_approve.linkbutton('enable');
				btn_decline.linkbutton('enable');
				btn_unapprove.linkbutton('disable');
				obj.chk_cashdiscount_iscommit.checkbox('check');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_iscommit: "1" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isdeclined: "0" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapprovalprogress: "0" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapproved: "0" }, form.rowid);
				form.lock(true);
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>UnCommit</b> cashdiscount no ${args.id} ?`;
			args.act_msg_result = `Cashdiscount no ${args.id} telah di un-commit.`;
			args.act_do = (result) => {
				btn_commit.linkbutton('enable');
				btn_uncommit.linkbutton('disable');
				btn_approve.linkbutton('disable');
				btn_decline.linkbutton('disable');
				btn_unapprove.linkbutton('disable');
				obj.chk_cashdiscount_iscommit.checkbox('uncheck');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_iscommit: "0" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isdeclined: "0" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapprovalprogress: "0" }, form.rowid);
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapproved: "0" }, form.rowid);
				form.lock(false);
				form.commit();
			}

			break;
			
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>Approve</b> cashdiscount no ${args.id} ?`;
			args.act_msg_result = `Cashdiscount no ${args.id} telah di approve.`;
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				btn_commit.linkbutton('disable');
				btn_uncommit.linkbutton('disable');
				btn_approve.linkbutton('disable');
				btn_decline.linkbutton('disable');
				btn_unapprove.linkbutton('enable');
				if (result.isfinalapproval) {
					obj.chk_cashdiscount_isapproved.checkbox('check');
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isdeclined: "0" }, form.rowid);
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapprovalprogress: "1" }, form.rowid);
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapproved: "1" }, form.rowid);
				} else {
					obj.chk_cashdiscount_isapproved.checkbox('uncheck');
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isdeclined: "0" }, form.rowid);
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapprovalprogress: "1" }, form.rowid);
					$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapproved: "0" }, form.rowid);
				}
				form.commit();
			}			
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '';
			args.act_msg_result = `Cashdiscount no ${args.id} telah di approve.`;
			args.param = {
				approve: false,
				approval_note: ''			
			}
			args.act_do = (result) => {
				btn_commit.linkbutton('disable');
				btn_uncommit.linkbutton('enable');
				btn_approve.linkbutton('disable');
				btn_decline.linkbutton('disable');
				btn_unapprove.linkbutton('disable');
				obj.chk_cashdiscount_isapproved.checkbox('check');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isdeclined: "1" }, form.rowid);
				form.commit();
			}			
			break;


		case 'unapprove' :
			args.act_url = `${global.modulefullname}/xtion-unapprove`;
			args.act_msg_quest = `Apakah anda yakin akan <b>UnApprove</b> cashdiscount no ${args.id} ?`;
			args.act_msg_result = `Cashdiscount no ${args.id} telah di un-approve.`;
			args.act_do = (result) => {
				btn_commit.linkbutton('disable');
				btn_uncommit.linkbutton('enable');
				btn_approve.linkbutton('enable');
				btn_decline.linkbutton('enable');
				btn_unapprove.linkbutton('disable');
				obj.chk_cashdiscount_isapproved.checkbox('uncheck');
				$ui.getPages().ITEMS['pnl_list'].handler.updategrid({ cashdiscount_isapproved: "0" }, form.rowid);
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


