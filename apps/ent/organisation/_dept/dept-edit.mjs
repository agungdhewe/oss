var this_page_id;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')

const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_dept_id: $('#pnl_edit-txt_dept_id'),
	txt_dept_name: $('#pnl_edit-txt_dept_name'),
	txt_dept_descr: $('#pnl_edit-txt_dept_descr'),
	chk_dept_isparent: $('#pnl_edit-chk_dept_isparent'),
	chk_dept_isdisabled: $('#pnl_edit-chk_dept_isdisabled'),
	chk_dept_isbudgetmandatory: $('#pnl_edit-chk_dept_isbudgetmandatory'),
	chk_dept_issingleprojectbudget: $('#pnl_edit-chk_dept_issingleprojectbudget'),
	txt_dept_path: $('#pnl_edit-txt_dept_path'),
	txt_dept_level: $('#pnl_edit-txt_dept_level'),
	cbo_deptgroup_id: $('#pnl_edit-cbo_deptgroup_id'),
	cbo_dept_parent: $('#pnl_edit-cbo_dept_parent'),
	cbo_depttype_id: $('#pnl_edit-cbo_depttype_id'),
	cbo_deptmodel_id : $('#pnl_edit-cbo_deptmodel_id'),
	cbo_auth_id: $('#pnl_edit-cbo_auth_id'),
	cbo_project_id: $('#pnl_edit-cbo_project_id')
}


let form = {}

export async function init(opt) {
	this_page_id = opt.id


	form = new global.fgta4form(pnl_form, {
		primary: obj.txt_dept_id,
		autoid: false,
		logview: 'mst_dept',
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



	new fgta4slideselect(obj.cbo_deptgroup_id, {
		title: 'Pilih Group Department',
		returnpage: this_page_id,
		api: $ui.apis.load_deptgroup_id,
		fieldValue: 'deptgroup_id',
		fieldValueMap: 'deptgroup_id',
		fieldDisplay: 'deptgroup_name',
		fields: [
			{mapping: 'deptgroup_id', text: 'deptgroup_id'},
			{mapping: 'deptgroup_name', text: 'deptgroup_name'},
		],

		OnDataLoading: (criteria) => {
			criteria['isexselect'] = 0
		},


		OnDataLoaded : (result, options) => {
			result.records.unshift({deptgroup_id:'--NULL--', deptgroup_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			var selected_depttype_id = obj.cbo_depttype_id.combobox('getValue');
			if (selected_depttype_id=="0") {
				// langsung isi
				form.setValue(obj.cbo_depttype_id, record.depttype_id, record.depttype_name)
			} else {
				if (record.depttype_id!=selected_depttype_id) {
					$ui.ShowMessage('[QUESTION]Apakah anda akan mengubah tipe?', {
						"Ya" : () => {
							if (record.deptgroup_id!='--NULL--') {
								form.setValue(obj.cbo_depttype_id, record.depttype_id, record.depttype_name)
							} else {
								form.setValue(obj.cbo_depttype_id, '0', '-- PILIH --')
							}
						},
						"Tidak" : () => {
						}
					});
				}
			}			
		}
	})				
				
	new fgta4slideselect(obj.cbo_dept_parent, {
		title: 'Pilih Parent Department',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_parent,
		fieldValue: 'dept_parent',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			criteria['isparent'] = 1
		},
		OnDataLoaded : (result, options) => {
			
			// hapus pilihan yang sama dengan data saat ini
			var id = obj.txt_dept_id.textbox('getText')
			var i = 0; var idx = -1;
			for (var d of result.records) {
				if (d.dept_id==id) { idx = i; }
				i++;
			}
			if (idx>=0) { result.records.splice(idx, 1); }					
			
			result.records.unshift({dept_id:'--NULL--', dept_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				
				
	new fgta4slideselect(obj.cbo_depttype_id, {
		title: 'Pilih Type Department',
		returnpage: this_page_id,
		api: $ui.apis.load_depttype_id,
		fieldValue: 'depttype_id',
		fieldValueMap: 'depttype_id',
		fieldDisplay: 'depttype_name',
		fields: [
			{mapping: 'depttype_id', text: 'depttype_id'},
			{mapping: 'depttype_name', text: 'depttype_name'},
		],
		OnDataLoading: (criteria) => {},
		OnDataLoaded : (result, options) => {
			result.records.unshift({depttype_id:'--NULL--', depttype_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})				

	
	new fgta4slideselect(obj.cbo_deptmodel_id, {
		title: 'Pilih Model Department',
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
			result.records.unshift({deptmodel_id:'--NULL--', deptmodel_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {}
	})	

	new fgta4slideselect(obj.cbo_auth_id, {
		title: 'Pilih Authorisasi',
		returnpage: this_page_id,
		api: $ui.apis.load_auth_id,
		fieldValue: 'auth_id',
		fieldValueMap: 'auth_id',
		fieldDisplay: 'auth_name',
		fields: [
			{mapping: 'auth_id', text: 'auth_id'},
			{mapping: 'auth_name', text: 'auth_name'},
		],
		OnDataLoading: (criteria) => {
			criteria['disabled'] = 0
		},

		OnDataLoaded : (result, options) => {
				
		},
		OnSelected: (value, display, record) => {}
	})				
				

	new fgta4slideselect(obj.cbo_project_id, {
		title: 'Pilih Project',
		returnpage: this_page_id,
		api: $ui.apis.load_project_id,
		fieldValue: 'project_id',
		fieldValueMap: 'project_id',
		fieldDisplay: 'project_name',
		fields: [
			{mapping: 'project_id', text: 'project_id'},
			{mapping: 'project_name', text: 'project_name'},
		],

		OnPanelShowing: (args) => {
			var id = form.getValue(obj.txt_dept_id)
			if (id.trim()=='') {
				args.cancel = true;
				$ui.ShowMessage('[WARNING] untuk memilih project, silakan isi ID terlebih dahulu')
			}
		},

		OnDataLoading: (criteria) => {
			criteria.dept_id = form.getValue(obj.txt_dept_id)
			criteria.enabledonly = 1
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({project_id:'--NULL--', project_name:'NONE'});	
		},
		OnSelected: (value, display, record) => {
			form.setDisable(obj.txt_dept_id);
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



}


export function OnSizeRecalculated(width, height) {
}




export function open(data, rowid, viewmode=true, fn_callback) {


	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {

		if (result.record.dept_parent==null) { result.record.dept_parent='--NULL--'; result.record.dept_parent_name='NONE'; }
		if (result.record.project_id==null) { result.record.project_id='--NULL--'; result.record.project_name='NONE'; }
		if (result.record.deptgroup_id==null) { result.record.deptgroup_id='--NULL--'; result.record.deptgroup_name='NONE'; }
		if (result.record.depttype_id==null) { result.record.depttype_id='--NULL--'; result.record.depttype_name='NONE'; }
		if (result.record.deptmodel_id==null) { result.record.deptmodel_id='--NULL--'; result.record.deptmodel_name='NONE'; }


		form
			.fill(result.record)
			.setValue(obj.cbo_deptmodel_id, result.record.deptmodel_id, result.record.deptmodel_name)
			.setValue(obj.cbo_deptgroup_id, result.record.deptgroup_id, result.record.deptgroup_name)
			.setValue(obj.cbo_dept_parent, result.record.dept_parent, result.record.dept_parent_name)
			.setValue(obj.cbo_depttype_id, result.record.depttype_id, result.record.depttype_name)
			.setValue(obj.cbo_auth_id, result.record.auth_id, result.record.auth_name)
			.setValue(obj.cbo_project_id, result.record.project_id, result.record.project_name)
			.commit()
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid

		// tampilkan form untuk data editor
		fn_callback()


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
			data.dept_level = 0

			data.deptgroup_id = '--NULL--'
			data.deptgroup_name = 'NONE'
			data.dept_parent = '--NULL--'
			data.dept_parent_name = 'NONE'
			data.depttype_id = '--NULL--'
			data.depttype_name = 'NONE'
			data.deptmodel_id = '--NULL--'
			data.deptmodel_name = 'NONE'
			data.auth_id = '0'
			data.auth_name = '-- PILIH --'
			data.project_id = '--NULL--'
			data.project_name = 'NONE'



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
	var objid = obj.txt_dept_id
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
	if (data.dept_issingleprojectbudget && data.project_id=='--NULL--') {
		options.cancel = true
		$ui.ShowMessage("[WARNING]Default Project harus diisi");
	}

	// Modifikasi object data, apabila ingin menambahkan variabel yang akan dikirim ke server
	options.skipmappingresponse = ["dept_parent", "project_id", "deptgroup_id", "depttype_id", "deptmodel_id"];

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

	form.setValue(obj.cbo_dept_parent, result.dataresponse.dept_parent_name!=='--NULL--'?result.dataresponse.dept_parent:'--NULL--', result.dataresponse.dept_parent_name!=='--NULL--'?result.dataresponse.dept_parent_name:'NONE')
	form.setValue(obj.cbo_project_id, result.dataresponse.project_name!=='--NULL--'?result.dataresponse.project_id:'--NULL--', result.dataresponse.project_name!=='--NULL--'?result.dataresponse.project_name:'NONE')
	form.setValue(obj.cbo_deptgroup_id, result.dataresponse.deptgroup_name!=='--NULL--'?result.dataresponse.deptgroup_id:'--NULL--', result.dataresponse.deptgroup_name!=='--NULL--'?result.dataresponse.deptgroup_name:'NONE')
	form.setValue(obj.cbo_depttype_id, result.dataresponse.depttype_name!=='--NULL--'?result.dataresponse.depttype_id:'--NULL--', result.dataresponse.depttype_name!=='--NULL--'?result.dataresponse.depttype_name:'NONE')
	form.setValue(obj.cbo_deptmodel_id, result.dataresponse.deptmodel_name!=='--NULL--'?result.dataresponse.deptmodel_id:'--NULL--', result.dataresponse.deptmodel_name!=='--NULL--'?result.dataresponse.deptmodel_name:'NONE')

	
	form.rowid = $ui.getPages().ITEMS['pnl_list'].handler.updategrid(data, form.rowid)
}



async function form_deleting(data) {
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

}

