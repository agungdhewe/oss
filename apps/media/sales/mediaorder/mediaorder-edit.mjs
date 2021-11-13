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
const btn_decline = $('#pnl_edit-btn_decline')			
				


const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_mediaorder_id: $('#pnl_edit-txt_mediaorder_id'),
	cbo_mediaordertype_id: $('#pnl_edit-cbo_mediaordertype_id'),
	dt_mediaorder_date: $('#pnl_edit-dt_mediaorder_date'),
	txt_mediaorder_descr: $('#pnl_edit-txt_mediaorder_descr'),
	txt_mediaorder_ref: $('#pnl_edit-txt_mediaorder_ref'),
	cbo_ae_empl_id: $('#pnl_edit-cbo_ae_empl_id'),
	cbo_agency_partner_id: $('#pnl_edit-cbo_agency_partner_id'),
	cbo_advertiser_partner_id: $('#pnl_edit-cbo_advertiser_partner_id'),
	cbo_brand_id: $('#pnl_edit-cbo_brand_id'),
	cbo_curr_id: $('#pnl_edit-cbo_curr_id'),
	chk_mediaorder_istax: $('#pnl_edit-chk_mediaorder_istax'),
	cbo_taxtype_id: $('#pnl_edit-cbo_taxtype_id'),
	cbo_mediapackage_id: $('#pnl_edit-cbo_mediapackage_id'),
	cbo_salesordertype_id: $('#pnl_edit-cbo_salesordertype_id'),
	cbo_trxmodel_id: $('#pnl_edit-cbo_trxmodel_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_mediaorder_version: $('#pnl_edit-txt_mediaorder_version'),
	chk_mediaorder_iscommit: $('#pnl_edit-chk_mediaorder_iscommit'),
	txt_mediaorder_commitby: $('#pnl_edit-txt_mediaorder_commitby'),
	txt_mediaorder_commitdate: $('#pnl_edit-txt_mediaorder_commitdate'),
	chk_mediaorder_isapprovalprogress: $('#pnl_edit-chk_mediaorder_isapprovalprogress'),
	chk_mediaorder_isapproved: $('#pnl_edit-chk_mediaorder_isapproved'),
	txt_mediaorder_approveby: $('#pnl_edit-txt_mediaorder_approveby'),
	txt_mediaorder_approvedate: $('#pnl_edit-txt_mediaorder_approvedate'),
	chk_mediaorder_isdeclined: $('#pnl_edit-chk_mediaorder_isdeclined'),
	txt_mediaorder_declineby: $('#pnl_edit-txt_mediaorder_declineby'),
	txt_mediaorder_declinedate: $('#pnl_edit-txt_mediaorder_declinedate'),
	txt_mediaorder_notes: $('#pnl_edit-txt_mediaorder_notes'),
	chk_mediaorder_isclose: $('#pnl_edit-chk_mediaorder_isclose'),
	txt_mediaorder_closeby: $('#pnl_edit-txt_mediaorder_closeby'),
	txt_mediaorder_closedate: $('#pnl_edit-txt_mediaorder_closedate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		
const rec_approveby = $('#pnl_edit_record-approveby');
const rec_approvedate = $('#pnl_edit_record-approvedate');			
const rec_declineby = $('#pnl_edit_record-declineby');
const rec_declinedate = $('#pnl_edit_record-declinedate');			
			


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
		primary: obj.txt_mediaorder_id,
		autoid: true,
		logview: 'trn_mediaorder',
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



	btn_print.linkbutton({
		onClick: () => {
			btn_print_click();
		}
	});	
	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	btn_approve.linkbutton({ onClick: () => { btn_action_click({ action: 'approve' }); } });
	btn_decline.linkbutton({ onClick: () => {
		var id = 'pnl_edit-reason_' + Date.now().toString();
		$ui.ShowMessage(`
			<div style="display: block;  margin-bottom: 10px">
				<div style="font-weight: bold; margin-bottom: 10px">Reason</div>
				<div">
					<input id="${id}" class="easyui-textbox" style="width: 300px; height: 60px;" data-options="multiline: true">
				</div>
			</div>
		`, {
			'Decline': () => {
				var reason = $(`#${id}`).textbox('getValue');
				btn_action_click({ action: 'decline', reason: reason }); 
			},
			'Cancel': () => {
			} 
		}, ()=>{
			var obj_reason = $(`#${id}`);
			var txt = obj_reason.textbox('textbox');
			txt[0].maxLength = 255;
			txt[0].classList.add('declinereasonbox');
			txt[0].addEventListener('keyup', (ev)=>{
				if (ev.key=='Enter') {
					ev.stopPropagation();
				}
			});
			txt.css('text-align', 'center');
			txt.focus();
		})
	}});				
				




	new fgta4slideselect(obj.cbo_mediaordertype_id, {
		title: 'Pilih mediaordertype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_mediaordertype_id,
		fieldValue: 'mediaordertype_id',
		fieldValueMap: 'mediaordertype_id',
		fieldDisplay: 'mediaordertype_name',
		fields: [
			{mapping: 'mediaordertype_id', text: 'mediaordertype_id'},
			{mapping: 'mediaordertype_name', text: 'mediaordertype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_ae_empl_id, {
		title: 'Pilih ae_empl_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ae_empl_id,
		fieldValue: 'ae_empl_id',
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
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_agency_partner_id, {
		title: 'Pilih agency_partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_agency_partner_id,
		fieldValue: 'agency_partner_id',
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
				
	new fgta4slideselect(obj.cbo_advertiser_partner_id, {
		title: 'Pilih advertiser_partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_advertiser_partner_id,
		fieldValue: 'advertiser_partner_id',
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
				
	new fgta4slideselect(obj.cbo_brand_id, {
		title: 'Pilih brand_id',
		returnpage: this_page_id,
		api: $ui.apis.load_brand_id,
		fieldValue: 'brand_id',
		fieldValueMap: 'brand_id',
		fieldDisplay: 'brand_name',
		fields: [
			{mapping: 'brand_id', text: 'brand_id'},
			{mapping: 'brand_name', text: 'brand_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
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
			{mapping: 'curr_id', text: 'curr_id'},
			{mapping: 'curr_name', text: 'curr_name'},
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
				
	new fgta4slideselect(obj.cbo_mediapackage_id, {
		title: 'Pilih mediapackage_id',
		returnpage: this_page_id,
		api: $ui.apis.load_mediapackage_id,
		fieldValue: 'mediapackage_id',
		fieldValueMap: 'mediapackage_id',
		fieldDisplay: 'mediapackage_descr',
		fields: [
			{mapping: 'mediapackage_id', text: 'mediapackage_id'},
			{mapping: 'mediapackage_descr', text: 'mediapackage_descr'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({mediapackage_id:'--NULL--', mediapackage_descr:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_salesordertype_id, {
		title: 'Pilih salesordertype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_salesordertype_id,
		fieldValue: 'salesordertype_id',
		fieldValueMap: 'salesordertype_id',
		fieldDisplay: 'salesordertype_name',
		fields: [
			{mapping: 'salesordertype_id', text: 'salesordertype_id'},
			{mapping: 'salesordertype_name', text: 'salesordertype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_trxmodel_id, {
		title: 'Pilih trxmodel_id',
		returnpage: this_page_id,
		api: $ui.apis.load_trxmodel_id,
		fieldValue: 'trxmodel_id',
		fieldValueMap: 'trxmodel_id',
		fieldDisplay: 'trxmodel_name',
		fields: [
			{mapping: 'trxmodel_id', text: 'trxmodel_id'},
			{mapping: 'trxmodel_name', text: 'trxmodel_name'},
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
				
	new fgta4slideselect(obj.cbo_doc_id, {
		title: 'Pilih doc_id',
		returnpage: this_page_id,
		api: $ui.apis.load_doc_id,
		fieldValue: 'doc_id',
		fieldValueMap: 'doc_id',
		fieldDisplay: 'doc_name',
		fields: [
			{mapping: 'doc_id', text: 'doc_id'},
			{mapping: 'doc_name', text: 'doc_name'},
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

}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		updatefilebox(result.record);

		if (result.record.ae_empl_id==null) { result.record.ae_empl_id='--NULL--'; result.record.ae_empl_name='NONE'; }
		if (result.record.mediapackage_id==null) { result.record.mediapackage_id='--NULL--'; result.record.mediapackage_descr='NONE'; }

  		updaterecordstatus(result.record)

		form.SuspendEvent(true);
		form
			.fill(result.record)
			.setValue(obj.cbo_mediaordertype_id, result.record.mediaordertype_id, result.record.mediaordertype_name)
			.setValue(obj.cbo_ae_empl_id, result.record.ae_empl_id, result.record.ae_empl_name)
			.setValue(obj.cbo_agency_partner_id, result.record.agency_partner_id, result.record.agency_partner_name)
			.setValue(obj.cbo_advertiser_partner_id, result.record.advertiser_partner_id, result.record.advertiser_partner_name)
			.setValue(obj.cbo_brand_id, result.record.brand_id, result.record.brand_name)
			.setValue(obj.cbo_curr_id, result.record.curr_id, result.record.curr_name)
			.setValue(obj.cbo_taxtype_id, result.record.taxtype_id, result.record.taxtype_name)
			.setValue(obj.cbo_mediapackage_id, result.record.mediapackage_id, result.record.mediapackage_descr)
			.setValue(obj.cbo_salesordertype_id, result.record.salesordertype_id, result.record.salesordertype_name)
			.setValue(obj.cbo_trxmodel_id, result.record.trxmodel_id, result.record.trxmodel_name)
			.setValue(obj.cbo_dept_id, result.record.dept_id, result.record.dept_name)
			.setValue(obj.cbo_doc_id, result.record.doc_id, result.record.doc_name)
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
		data.mediaorder_date = global.now()
		data.mediaorder_istax = '1'
		data.mediaorder_version = 0
		data.mediaorder_iscommit = '0'
		data.mediaorder_isapprovalprogress = '0'
		data.mediaorder_isapproved = '0'
		data.mediaorder_isdeclined = '0'
		data.mediaorder_isclose = '0'

		data.mediaordertype_id = '0'
		data.mediaordertype_name = '-- PILIH --'
		data.ae_empl_id = '--NULL--'
		data.ae_empl_name = 'NONE'
		data.agency_partner_id = '0'
		data.agency_partner_name = '-- PILIH --'
		data.advertiser_partner_id = '0'
		data.advertiser_partner_name = '-- PILIH --'
		data.brand_id = '0'
		data.brand_name = '-- PILIH --'
		data.curr_id = '0'
		data.curr_name = '-- PILIH --'
		data.taxtype_id = '0'
		data.taxtype_name = '-- PILIH --'
		data.mediapackage_id = '--NULL--'
		data.mediapackage_descr = 'NONE'
		data.salesordertype_id = 'MO'
		data.salesordertype_name = 'MEDIA ORDER'
		data.trxmodel_id = 'SAL'
		data.trxmodel_name = 'SALES'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.doc_id = global.setup.doc_id
		data.doc_name = global.setup.doc_id


		rec_commitby.html('');
		rec_commitdate.html('');
		
		rec_approveby.html('');
		rec_approvedate.html('');
		rec_declineby.html('');
		rec_declinedate.html('');
		




		var button_commit_on = true;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');
			



		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_edititemsgrid'].handler.createnew(data, options)
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


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.mediaorder_commitby);
		rec_commitdate.html(record.mediaorder_commitdate);
		
		rec_approveby.html(record.mediaorder_approveby);
		rec_approvedate.html(record.mediaorder_approvedate);
		rec_declineby.html(record.mediaorder_declineby);
		rec_declinedate.html(record.mediaorder_declinedate);
			
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;
		var button_approve_on = false;
		var button_decline_on = false;

		
		if (record.mediaorder_isfirm=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.mediaorder_isdeclined=="1" || record.mediaorder_isuseralreadydeclined=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = false;
			form.lock(true);	
		} else if (record.mediaorder_isapproved=="1" || record.mediaorder_isuseralreadyapproved=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = true;	
			form.lock(true);	
		} else if (record.mediaorder_isapprovalprogress=="1") {
			button_commit_on = false;
			button_uncommit_on = false;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);	
		} else if (record.mediaorder_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			button_approve_on = true;
			button_decline_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			button_approve_on = false;
			button_decline_on = false;
			form.lock(false);
		} 
	
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		btn_approve.linkbutton(button_approve_on ? 'enable' : 'disable');
		btn_decline.linkbutton(button_decline_on ? 'enable' : 'disable');		
				
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'mediaorder_iscommit';
	updategriddata[col_commit] = record.mediaorder_iscommit;	
	
	var col_approveprogress = 'mediaorder_isapprovalprogress';
	var col_approve = 'mediaorder_isapprove'
	var col_decline = "mediaorder_isdeclined"
	updategriddata[col_approveprogress] = record.mediaorder_isapprovalprogress;
	updategriddata[col_approve] = record.mediaorder_isapproved;
	updategriddata[col_decline] = record.mediaorder_isdeclined;				
			
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_mediaorder_id
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

	options.skipmappingresponse = ["ae_empl_id"];
	options.skipmappingresponse = ["mediapackage_id"];

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

	form.setValue(obj.cbo_ae_empl_id, result.dataresponse.ae_empl_name!=='--NULL--' ? result.dataresponse.ae_empl_id : '--NULL--', result.dataresponse.ae_empl_name!=='--NULL--'?result.dataresponse.ae_empl_name:'NONE')
	form.setValue(obj.cbo_mediapackage_id, result.dataresponse.mediapackage_descr!=='--NULL--' ? result.dataresponse.mediapackage_id : '--NULL--', result.dataresponse.mediapackage_descr!=='--NULL--'?result.dataresponse.mediapackage_descr:'NONE')

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

	var id = obj.txt_mediaorder_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/mediaorder.xprint?id=' + id;

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
	var txt_version = obj.txt_mediaorder_version;
	var chk_iscommit = obj.chk_mediaorder_iscommit;
	
	var chk_isapprovalprogress = obj.chk_mediaorder_isapprovalprogress;	
	var chk_isapprove = obj.chk_mediaorder_isapproved;
	var chk_isdeclined = obj.chk_mediaorder_isdeclined;
		
	
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
				
			chk_isapprove.checkbox('uncheck');
		
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-${args.action}`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
			chk_isapprove.checkbox('uncheck');
			chk_isdeclined.checkbox('uncheck');
		
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		
		case 'approve' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Approval Code';
			args.param = {
				approve: true,
				approval_note: ''
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprovalprogress.checkbox('check');
				chk_isapprove.checkbox(result.isfinalapproval ? "check" : "uncheck");
				chk_isdeclined.checkbox('uncheck');
				form.commit();
			}
			break;

		case 'decline' :
			args.act_url = `${global.modulefullname}/xtion-approve`;
			args.act_msg_quest = '', //`Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.use_otp = true;
			args.otp_title = 'Decline Code';
			args.param = {
				approve: false,
				approval_note: args.reason
			}
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				chk_isapprove.checkbox('uncheck');
				chk_isdeclined.checkbox('check');
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
	
	