var this_page_id;
var this_page_options;

import {fgta4slideselect} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import * as hnd from  './billout-edit-hnd.mjs'


const btn_edit = $('#pnl_edit-btn_edit')
const btn_save = $('#pnl_edit-btn_save')
const btn_delete = $('#pnl_edit-btn_delete')
const btn_print = $('#pnl_edit-btn_print');

const btn_commit = $('#pnl_edit-btn_commit')
const btn_uncommit = $('#pnl_edit-btn_uncommit')
			

const undefined = $('#pnl_edit-undefined')



const pnl_form = $('#pnl_edit-form')
const obj = {
	txt_billout_id: $('#pnl_edit-txt_billout_id'),
	cbo_billtype_id: $('#pnl_edit-cbo_billtype_id'),
	cbo_dept_id: $('#pnl_edit-cbo_dept_id'),
	chk_billout_isunreferenced: $('#pnl_edit-chk_billout_isunreferenced'),
	cbo_orderin_id: $('#pnl_edit-cbo_orderin_id'),
	cbo_orderinterm_id: $('#pnl_edit-cbo_orderinterm_id'),
	chk_billout_isdp: $('#pnl_edit-chk_billout_isdp'),
	txt_billout_descr: $('#pnl_edit-txt_billout_descr'),
	dt_billout_date: $('#pnl_edit-dt_billout_date'),
	dt_billout_datedue: $('#pnl_edit-dt_billout_datedue'),
	cbo_partner_id: $('#pnl_edit-cbo_partner_id'),
	txt_billout_payment: $('#pnl_edit-txt_billout_payment'),
	cbo_ppn_taxtype_id: $('#pnl_edit-cbo_ppn_taxtype_id'),
	txt_ppn_taxvalue: $('#pnl_edit-txt_ppn_taxvalue'),
	chk_ppn_include: $('#pnl_edit-chk_ppn_include'),
	cbo_pph_taxtype_id: $('#pnl_edit-cbo_pph_taxtype_id'),
	txt_pph_taxvalue: $('#pnl_edit-txt_pph_taxvalue'),
	cbo_arunbill_coa_id: $('#pnl_edit-cbo_arunbill_coa_id'),
	cbo_ar_coa_id: $('#pnl_edit-cbo_ar_coa_id'),
	cbo_dp_coa_id: $('#pnl_edit-cbo_dp_coa_id'),
	cbo_sales_coa_id: $('#pnl_edit-cbo_sales_coa_id'),
	cbo_salesdisc_coa_id: $('#pnl_edit-cbo_salesdisc_coa_id'),
	cbo_ppn_coa_id: $('#pnl_edit-cbo_ppn_coa_id'),
	cbo_ppnsubsidi_coa_id: $('#pnl_edit-cbo_ppnsubsidi_coa_id'),
	cbo_pph_coa_id: $('#pnl_edit-cbo_pph_coa_id'),
	txt_billout_totalitem: $('#pnl_edit-txt_billout_totalitem'),
	txt_billout_totalqty: $('#pnl_edit-txt_billout_totalqty'),
	txt_billout_salesgross: $('#pnl_edit-txt_billout_salesgross'),
	txt_billout_discount: $('#pnl_edit-txt_billout_discount'),
	txt_billout_subtotal: $('#pnl_edit-txt_billout_subtotal'),
	txt_billout_pph: $('#pnl_edit-txt_billout_pph'),
	txt_billout_nett: $('#pnl_edit-txt_billout_nett'),
	txt_billout_ppn: $('#pnl_edit-txt_billout_ppn'),
	txt_billout_total: $('#pnl_edit-txt_billout_total'),
	txt_billout_totaladdcost: $('#pnl_edit-txt_billout_totaladdcost'),
	txt_billout_dp: $('#pnl_edit-txt_billout_dp'),
	cbo_unit_id: $('#pnl_edit-cbo_unit_id'),
	cbo_owner_dept_id: $('#pnl_edit-cbo_owner_dept_id'),
	cbo_trxmodel_id: $('#pnl_edit-cbo_trxmodel_id'),
	cbo_doc_id: $('#pnl_edit-cbo_doc_id'),
	txt_billout_version: $('#pnl_edit-txt_billout_version'),
	chk_billout_iscommit: $('#pnl_edit-chk_billout_iscommit'),
	txt_billout_commitby: $('#pnl_edit-txt_billout_commitby'),
	txt_billout_commitdate: $('#pnl_edit-txt_billout_commitdate'),
	chk_billout_ispost: $('#pnl_edit-chk_billout_ispost'),
	txt_billout_postby: $('#pnl_edit-txt_billout_postby'),
	txt_billout_postdate: $('#pnl_edit-txt_billout_postdate')
}


const rec_commitby = $('#pnl_edit_record-commitby');
const rec_commitdate = $('#pnl_edit_record-commitdate');		
		


let form;
let rowdata;

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
		primary: obj.txt_billout_id,
		autoid: true,
		logview: 'trn_billout',
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
	});
	form.getHeaderData = () => {
		return getHeaderData();
	}


	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });	
	

	btn_commit.linkbutton({ onClick: () => { btn_action_click({ action: 'commit' }); } });
	btn_uncommit.linkbutton({ onClick: () => { btn_action_click({ action: 'uncommit' }); } });			
			

	undefined.linkbutton({ onClick: () => { btn_action_click({ action: 'post' }); } });






	new fgta4slideselect(obj.cbo_billtype_id, {
		title: 'Pilih billtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_billtype_id,
		fieldValue: 'billtype_id',
		fieldValueMap: 'billtype_id',
		fieldDisplay: 'billtype_name',
		fields: [
			{mapping: 'billtype_id', text: 'billtype_id'},
			{mapping: 'billtype_name', text: 'billtype_name'},
		],
		OnDataLoading: (criteria) => {
			criteria.billtype_direction = 'OUT'
			if (typeof hnd.cbo_billtype_id_dataloading === 'function') {
				hnd.cbo_billtype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_billtype_id_dataloaded === 'function') {
				hnd.cbo_billtype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_billtype_id_selected === 'function') {
					hnd.cbo_billtype_id_selected(value, display, record, args);
				}
			}
		}
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
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_dept_id_dataloading === 'function') {
				hnd.cbo_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_dept_id_dataloaded === 'function') {
				hnd.cbo_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dept_id_selected === 'function') {
					hnd.cbo_dept_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_orderin_id, {
		title: 'Pilih orderin_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderin_id,
		fieldValue: 'orderin_id',
		fieldValueMap: 'orderin_id',
		fieldDisplay: 'orderin_descr',
		fields: [
			{mapping: 'orderin_id', text: 'orderin_id'},
			{mapping: 'orderin_descr', text: 'orderin_descr'},
		],
		OnDataLoading: (criteria) => {
			criteria.dept_id = form.getValue(obj.cbo_dept_id);
			if (typeof hnd.cbo_orderin_id_dataloading === 'function') {
				hnd.cbo_orderin_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_orderin_id_dataloaded === 'function') {
				hnd.cbo_orderin_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				console.log(record);
				form.setValue(obj.txt_billout_descr, record.orderin_descr);
				form.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name);

				form.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id==null?'--NULL--':record.ppn_taxtype_id, record.ppn_taxtype_name);
				form.setValue(obj.txt_ppn_taxvalue, record.ppn_taxvalue);
				form.setValue(obj.chk_ppn_include, record.ppn_include);
				form.setValue(obj.cbo_pph_taxtype_id, record.pph_taxtype_id==null?'--NULL--':record.pph_taxtype_id, record.pph_taxtype_name);
				form.setValue(obj.txt_pph_taxvalue, record.pph_taxvalue);

				form.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id==null?'--NULL--':record.arunbill_coa_id, record.arunbill_coa_name);
				form.setValue(obj.cbo_ar_coa_id, record.ar_coa_id==null?'--NULL--':record.ar_coa_id, record.ar_coa_name);
				form.setValue(obj.cbo_dp_coa_id, record.dp_coa_id==null?'--NULL--':record.dp_coa_id, record.dp_coa_name);
				form.setValue(obj.cbo_sales_coa_id, record.sales_coa_id==null?'--NULL--':record.sales_coa_id, record.sales_coa_name);
				form.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id==null?'--NULL--':record.salesdisc_coa_id, record.salesdisc_coa_name);
				form.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id==null?'--NULL--':record.ppn_coa_id, record.ppn_coa_name);
				form.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id==null?'--NULL--':record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name);
				form.setValue(obj.cbo_pph_coa_id, record.pph_coa_id==null?'--NULL--':record.pph_coa_id, record.pph_coa_name);


				form.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name);
				form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name);
				form.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name);




						
				if (typeof hnd.cbo_orderin_id_selected === 'function') {
					hnd.cbo_orderin_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_orderinterm_id, {
		title: 'Pilih orderinterm_id',
		returnpage: this_page_id,
		api: $ui.apis.load_orderinterm_id,
		fieldValue: 'orderinterm_id',
		fieldValueMap: 'orderinterm_id',
		fieldDisplay: 'orderinterm_descr',
		fields: [
			{mapping: 'orderinterm_id', text: 'orderinterm_id'},
			{mapping: 'orderinterm_descr', text: 'orderinterm_descr'},
		],
		OnDataLoading: (criteria) => {
			criteria.id = form.getValue(obj.cbo_orderin_id);
			if (typeof hnd.cbo_orderinterm_id_dataloading === 'function') {
				hnd.cbo_orderinterm_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_orderinterm_id_dataloaded === 'function') {
				hnd.cbo_orderinterm_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				console.log(record);
				form.setValue(obj.chk_billout_isdp, record.orderinterm_isdp=='1' ? true : false);

						
				if (typeof hnd.cbo_orderinterm_id_selected === 'function') {
					hnd.cbo_orderinterm_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_partner_id, {
		title: 'Pilih partner_id',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,
		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{mapping: 'partner_id', text: 'partner_id'},
			{mapping: 'partner_name', text: 'partner_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_partner_id_dataloading === 'function') {
				hnd.cbo_partner_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_partner_id_dataloaded === 'function') {
				hnd.cbo_partner_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_partner_id_selected === 'function') {
					hnd.cbo_partner_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppn_taxtype_id, {
		title: 'Pilih ppn_taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppn_taxtype_id,
		fieldValue: 'ppn_taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ppn_taxtype_id_dataloading === 'function') {
				hnd.cbo_ppn_taxtype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
			if (typeof hnd.cbo_ppn_taxtype_id_dataloaded === 'function') {
				hnd.cbo_ppn_taxtype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ppn_taxtype_id_selected === 'function') {
					hnd.cbo_ppn_taxtype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_pph_taxtype_id, {
		title: 'Pilih pph_taxtype_id',
		returnpage: this_page_id,
		api: $ui.apis.load_pph_taxtype_id,
		fieldValue: 'pph_taxtype_id',
		fieldValueMap: 'taxtype_id',
		fieldDisplay: 'taxtype_name',
		fields: [
			{mapping: 'taxtype_id', text: 'taxtype_id'},
			{mapping: 'taxtype_name', text: 'taxtype_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_pph_taxtype_id_dataloading === 'function') {
				hnd.cbo_pph_taxtype_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({taxtype_id:'--NULL--', taxtype_name:'NONE'});	
			if (typeof hnd.cbo_pph_taxtype_id_dataloaded === 'function') {
				hnd.cbo_pph_taxtype_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_pph_taxtype_id_selected === 'function') {
					hnd.cbo_pph_taxtype_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_arunbill_coa_id, {
		title: 'Pilih arunbill_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_arunbill_coa_id,
		fieldValue: 'arunbill_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_arunbill_coa_id_dataloading === 'function') {
				hnd.cbo_arunbill_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_arunbill_coa_id_dataloaded === 'function') {
				hnd.cbo_arunbill_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_arunbill_coa_id_selected === 'function') {
					hnd.cbo_arunbill_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ar_coa_id, {
		title: 'Pilih ar_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ar_coa_id,
		fieldValue: 'ar_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ar_coa_id_dataloading === 'function') {
				hnd.cbo_ar_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_ar_coa_id_dataloaded === 'function') {
				hnd.cbo_ar_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ar_coa_id_selected === 'function') {
					hnd.cbo_ar_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_dp_coa_id, {
		title: 'Pilih dp_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_dp_coa_id,
		fieldValue: 'dp_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_dp_coa_id_dataloading === 'function') {
				hnd.cbo_dp_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_dp_coa_id_dataloaded === 'function') {
				hnd.cbo_dp_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_dp_coa_id_selected === 'function') {
					hnd.cbo_dp_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_sales_coa_id, {
		title: 'Pilih sales_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_sales_coa_id,
		fieldValue: 'sales_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_sales_coa_id_dataloading === 'function') {
				hnd.cbo_sales_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_sales_coa_id_dataloaded === 'function') {
				hnd.cbo_sales_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_sales_coa_id_selected === 'function') {
					hnd.cbo_sales_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_salesdisc_coa_id, {
		title: 'Pilih salesdisc_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_salesdisc_coa_id,
		fieldValue: 'salesdisc_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_salesdisc_coa_id_dataloading === 'function') {
				hnd.cbo_salesdisc_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_salesdisc_coa_id_dataloaded === 'function') {
				hnd.cbo_salesdisc_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_salesdisc_coa_id_selected === 'function') {
					hnd.cbo_salesdisc_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppn_coa_id, {
		title: 'Pilih ppn_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppn_coa_id,
		fieldValue: 'ppn_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ppn_coa_id_dataloading === 'function') {
				hnd.cbo_ppn_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_ppn_coa_id_dataloaded === 'function') {
				hnd.cbo_ppn_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ppn_coa_id_selected === 'function') {
					hnd.cbo_ppn_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_ppnsubsidi_coa_id, {
		title: 'Pilih ppnsubsidi_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_ppnsubsidi_coa_id,
		fieldValue: 'ppnsubsidi_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_ppnsubsidi_coa_id_dataloading === 'function') {
				hnd.cbo_ppnsubsidi_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_ppnsubsidi_coa_id_dataloaded === 'function') {
				hnd.cbo_ppnsubsidi_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_ppnsubsidi_coa_id_selected === 'function') {
					hnd.cbo_ppnsubsidi_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_pph_coa_id, {
		title: 'Pilih pph_coa_id',
		returnpage: this_page_id,
		api: $ui.apis.load_pph_coa_id,
		fieldValue: 'pph_coa_id',
		fieldValueMap: 'coa_id',
		fieldDisplay: 'coa_name',
		fields: [
			{mapping: 'coa_id', text: 'coa_id'},
			{mapping: 'coa_name', text: 'coa_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_pph_coa_id_dataloading === 'function') {
				hnd.cbo_pph_coa_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({coa_id:'--NULL--', coa_name:'NONE'});	
			if (typeof hnd.cbo_pph_coa_id_dataloaded === 'function') {
				hnd.cbo_pph_coa_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_pph_coa_id_selected === 'function') {
					hnd.cbo_pph_coa_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_unit_id, {
		title: 'Pilih unit_id',
		returnpage: this_page_id,
		api: $ui.apis.load_unit_id,
		fieldValue: 'unit_id',
		fieldValueMap: 'unit_id',
		fieldDisplay: 'unit_name',
		fields: [
			{mapping: 'unit_id', text: 'unit_id'},
			{mapping: 'unit_name', text: 'unit_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_unit_id_dataloading === 'function') {
				hnd.cbo_unit_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
			result.records.unshift({unit_id:'--NULL--', unit_name:'NONE'});	
			if (typeof hnd.cbo_unit_id_dataloaded === 'function') {
				hnd.cbo_unit_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_unit_id_selected === 'function') {
					hnd.cbo_unit_id_selected(value, display, record, args);
				}
			}
		}
	})				
				
	new fgta4slideselect(obj.cbo_owner_dept_id, {
		title: 'Pilih owner_dept_id',
		returnpage: this_page_id,
		api: $ui.apis.load_owner_dept_id,
		fieldValue: 'owner_dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{mapping: 'dept_id', text: 'dept_id'},
			{mapping: 'dept_name', text: 'dept_name'},
		],
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_owner_dept_id_dataloading === 'function') {
				hnd.cbo_owner_dept_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_owner_dept_id_dataloaded === 'function') {
				hnd.cbo_owner_dept_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_owner_dept_id_selected === 'function') {
					hnd.cbo_owner_dept_id_selected(value, display, record, args);
				}
			}
		}
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
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_trxmodel_id_dataloading === 'function') {
				hnd.cbo_trxmodel_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_trxmodel_id_dataloaded === 'function') {
				hnd.cbo_trxmodel_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_trxmodel_id_selected === 'function') {
					hnd.cbo_trxmodel_id_selected(value, display, record, args);
				}
			}
		}
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
		OnDataLoading: (criteria) => {
			
			if (typeof hnd.cbo_doc_id_dataloading === 'function') {
				hnd.cbo_doc_id_dataloading(criteria);
			}	
		},
		OnDataLoaded : (result, options) => {
				
			if (typeof hnd.cbo_doc_id_dataloaded === 'function') {
				hnd.cbo_doc_id_dataloaded(result, options);
			}
		},
		OnSelected: (value, display, record, args) => {
			if (value!=args.PreviousValue ) {
				if (typeof hnd.cbo_doc_id_selected === 'function') {
					hnd.cbo_doc_id_selected(value, display, record, args);
				}
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
	if (typeof hnd.init==='function') {
		hnd.init({
			form: form,
			obj: obj,
			opt: opt,
		})
	}

}

export function OnSizeRecalculated(width, height) {
}

export function getForm() {
	return form
}

export function getCurrentRowdata() {
	return rowdata;
}

export function open(data, rowid, viewmode=true, fn_callback) {

	rowdata = {
		data: data,
		rowid: rowid
	}

	var pOpt = form.getDefaultPrompt(false)
	var fn_dataopening = async (options) => {
		options.criteria[form.primary.mapping] = data[form.primary.mapping]
	}

	var fn_dataopened = async (result, options) => {
		var record = result.record;
		updatefilebox(record);

		/*
		if (result.record.ppn_taxtype_id==null) { result.record.ppn_taxtype_id='--NULL--'; result.record.ppn_taxtype_name='NONE'; }
		if (result.record.pph_taxtype_id==null) { result.record.pph_taxtype_id='--NULL--'; result.record.pph_taxtype_name='NONE'; }
		if (result.record.salesdisc_coa_id==null) { result.record.salesdisc_coa_id='--NULL--'; result.record.salesdisc_coa_name='NONE'; }
		if (result.record.ppn_coa_id==null) { result.record.ppn_coa_id='--NULL--'; result.record.ppn_coa_name='NONE'; }
		if (result.record.ppnsubsidi_coa_id==null) { result.record.ppnsubsidi_coa_id='--NULL--'; result.record.ppnsubsidi_coa_name='NONE'; }
		if (result.record.pph_coa_id==null) { result.record.pph_coa_id='--NULL--'; result.record.pph_coa_name='NONE'; }
		if (result.record.unit_id==null) { result.record.unit_id='--NULL--'; result.record.unit_name='NONE'; }

		*/
		for (var objid in obj) {
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
			.setValue(obj.cbo_billtype_id, record.billtype_id, record.billtype_name)
			.setValue(obj.cbo_dept_id, record.dept_id, record.dept_name)
			.setValue(obj.cbo_orderin_id, record.orderin_id, record.orderin_descr)
			.setValue(obj.cbo_orderinterm_id, record.orderinterm_id, record.orderinterm_descr)
			.setValue(obj.cbo_partner_id, record.partner_id, record.partner_name)
			.setValue(obj.cbo_ppn_taxtype_id, record.ppn_taxtype_id, record.ppn_taxtype_name)
			.setValue(obj.cbo_pph_taxtype_id, record.pph_taxtype_id, record.pph_taxtype_name)
			.setValue(obj.cbo_arunbill_coa_id, record.arunbill_coa_id, record.arunbill_coa_name)
			.setValue(obj.cbo_ar_coa_id, record.ar_coa_id, record.ar_coa_name)
			.setValue(obj.cbo_dp_coa_id, record.dp_coa_id, record.dp_coa_name)
			.setValue(obj.cbo_sales_coa_id, record.sales_coa_id, record.sales_coa_name)
			.setValue(obj.cbo_salesdisc_coa_id, record.salesdisc_coa_id, record.salesdisc_coa_name)
			.setValue(obj.cbo_ppn_coa_id, record.ppn_coa_id, record.ppn_coa_name)
			.setValue(obj.cbo_ppnsubsidi_coa_id, record.ppnsubsidi_coa_id, record.ppnsubsidi_coa_name)
			.setValue(obj.cbo_pph_coa_id, record.pph_coa_id, record.pph_coa_name)
			.setValue(obj.cbo_unit_id, record.unit_id, record.unit_name)
			.setValue(obj.cbo_owner_dept_id, record.owner_dept_id, record.sales_dept_name)
			.setValue(obj.cbo_trxmodel_id, record.trxmodel_id, record.trxmodel_name)
			.setValue(obj.cbo_doc_id, record.doc_id, record.doc_name)
			.setViewMode(viewmode)
			.lock(false)
			.rowid = rowid


		/* tambahkan event atau behaviour saat form dibuka
		   apabila ada rutin mengubah form dan tidak mau dijalankan pada saat opening,
		   cek dengan form.isEventSuspended()
		*/   
		if (typeof hnd.form_dataopened == 'function') {
			hnd.form_dataopened(result, options);
		}


		/* commit form */
		form.commit()
		form.SuspendEvent(false); 
		updatebuttonstate(record)


		/* update rowdata */
		for (var nv in rowdata.data) {
			if (record[nv]!=undefined) {
				rowdata.data[nv] = record[nv];
			}
		}

		// tampilkan form untuk data editor
		if (typeof fn_callback==='function') {
			fn_callback(null, rowdata.data);
		}
		
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
		data.billout_isunreferenced = '0'
		data.billout_isdp = '0'
		data.billout_date = global.now()
		data.billout_datedue = global.now()
		data.billout_payment = 0
		data.ppn_taxvalue = 0
		data.ppn_include = '0'
		data.pph_taxvalue = 0
		data.billout_totalitem = 0
		data.billout_totalqty = 0
		data.billout_salesgross = 0
		data.billout_discount = 0
		data.billout_subtotal = 0
		data.billout_pph = 0
		data.billout_nett = 0
		data.billout_ppn = 0
		data.billout_total = 0
		data.billout_totaladdcost = 0
		data.billout_dp = 0
		data.billout_version = 0
		data.billout_iscommit = '0'
		data.billout_ispost = '0'

		data.billtype_id = 'BIL'
		data.billtype_name = 'BILL'
		data.dept_id = '0'
		data.dept_name = '-- PILIH --'
		data.orderin_id = '0'
		data.orderin_descr = '-- PILIH --'
		data.orderinterm_id = '0'
		data.orderinterm_descr = '-- PILIH --'
		data.partner_id = '0'
		data.partner_name = '-- PILIH --'
		data.ppn_taxtype_id = '--NULL--'
		data.ppn_taxtype_name = 'NONE'
		data.pph_taxtype_id = '--NULL--'
		data.pph_taxtype_name = 'NONE'
		data.arunbill_coa_id = '0'
		data.arunbill_coa_name = '-- PILIH --'
		data.ar_coa_id = '0'
		data.ar_coa_name = '-- PILIH --'
		data.dp_coa_id = '0'
		data.dp_coa_name = '-- PILIH --'
		data.sales_coa_id = '0'
		data.sales_coa_name = '-- PILIH --'
		data.salesdisc_coa_id = '--NULL--'
		data.salesdisc_coa_name = 'NONE'
		data.ppn_coa_id = '--NULL--'
		data.ppn_coa_name = 'NONE'
		data.ppnsubsidi_coa_id = '--NULL--'
		data.ppnsubsidi_coa_name = 'NONE'
		data.pph_coa_id = '--NULL--'
		data.pph_coa_name = 'NONE'
		data.unit_id = '--NULL--'
		data.unit_name = 'NONE'
		data.owner_dept_id = '0'
		data.sales_dept_name = '-- PILIH --'
		data.trxmodel_id = '0'
		data.trxmodel_name = '-- PILIH --'
		data.doc_id = 'BILLOUT'
		data.doc_name = 'BILLOUT'

		if (typeof hnd.form_newdata == 'function') {
			hnd.form_newdata(data, options);
		}

		rec_commitby.html('');
		rec_commitdate.html('');
		


		var button_commit_on = true;
		var button_uncommit_on = false;
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');
		

		options.OnCanceled = () => {
			$ui.getPages().show('pnl_list')
		}

		$ui.getPages().ITEMS['pnl_editdetilgrid'].handler.createnew(data, options)


	})
}


export function getHeaderData() {
	var header_data = form.getData();
	if (typeof hnd.form_getHeaderData == 'function') {
		hnd.form_getHeaderData(header_data);
	}
	return header_data;
}

export function detil_open(pnlname) {
	if (form.isDataChanged()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.')
		return;
	}

	//$ui.getPages().show(pnlname)
	let header_data = getHeaderData();
	if (typeof hnd.form_detil_opening == 'function') {
		hnd.form_detil_opening(pnlname, (cancel)=>{
			if (cancel===true) {
				return;
			}
			$ui.getPages().show(pnlname, () => {
				$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
			})
		});
	} else {
		$ui.getPages().show(pnlname, () => {
			$ui.getPages().ITEMS[pnlname].handler.OpenDetil(header_data)
		})
	}

	
}


function updatefilebox(record) {
	// apabila ada keperluan untuk menampilkan data dari object storage

}

function updaterecordstatus(record) {
	// apabila ada keperluan untuk update status record di sini

		rec_commitby.html(record.billout_commitby);
		rec_commitdate.html(record.billout_commitdate);
		
}

function updatebuttonstate(record) {
	// apabila ada keperluan untuk update state action button di sini

		/* action button */
		var button_commit_on = false;
		var button_uncommit_on = false;	
		
		if (record.billout_iscommit=="1") {
			button_commit_on = false;
			button_uncommit_on = true;
			form.lock(true);		
		} else {
			button_commit_on = true;
			button_uncommit_on = false;
			form.lock(false);
		} 
		btn_commit.linkbutton(button_commit_on ? 'enable' : 'disable');
		btn_uncommit.linkbutton(button_uncommit_on ? 'enable' : 'disable');		
			
}

function updategridstate(record) {
	// apabila ada keperluan untuk update state grid list di sini



	var updategriddata = {}

	var col_commit = 'billout_iscommit';
	updategriddata[col_commit] = record.billout_iscommit;	
	
	$ui.getPages().ITEMS['pnl_list'].handler.updategrid(updategriddata, form.rowid);
			
}

function form_viewmodechanged(viewmode) {
	var OnViewModeChangedEvent = new CustomEvent('OnViewModeChanged', {detail: {}})
	$ui.triggerevent(OnViewModeChangedEvent, {
		viewmode: viewmode
	})
}

function form_idsetup(options) {
	var objid = obj.txt_billout_id
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
	// options.skipmappingresponse = ['ppn_taxtype_id', 'pph_taxtype_id', 'salesdisc_coa_id', 'ppn_coa_id', 'ppnsubsidi_coa_id', 'pph_coa_id', 'unit_id', ];
	options.skipmappingresponse = [];
	for (var objid in obj) {
		var o = obj[objid]
		if (o.isCombo() && !o.isRequired()) {
			var id = o.getFieldValueName()
			options.skipmappingresponse.push(id)
			console.log(id)
		}
	}

	if (typeof hnd.form_datasaving == 'function') {
		hnd.form_datasaving(data, options);
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
	form.setValue(obj.cbo_ppn_taxtype_id, result.dataresponse.ppn_taxtype_name!=='--NULL--' ? result.dataresponse.ppn_taxtype_id : '--NULL--', result.dataresponse.ppn_taxtype_name!=='--NULL--'?result.dataresponse.ppn_taxtype_name:'NONE')
	form.setValue(obj.cbo_pph_taxtype_id, result.dataresponse.pph_taxtype_name!=='--NULL--' ? result.dataresponse.pph_taxtype_id : '--NULL--', result.dataresponse.pph_taxtype_name!=='--NULL--'?result.dataresponse.pph_taxtype_name:'NONE')
	form.setValue(obj.cbo_salesdisc_coa_id, result.dataresponse.salesdisc_coa_name!=='--NULL--' ? result.dataresponse.salesdisc_coa_id : '--NULL--', result.dataresponse.salesdisc_coa_name!=='--NULL--'?result.dataresponse.salesdisc_coa_name:'NONE')
	form.setValue(obj.cbo_ppn_coa_id, result.dataresponse.ppn_coa_name!=='--NULL--' ? result.dataresponse.ppn_coa_id : '--NULL--', result.dataresponse.ppn_coa_name!=='--NULL--'?result.dataresponse.ppn_coa_name:'NONE')
	form.setValue(obj.cbo_ppnsubsidi_coa_id, result.dataresponse.ppnsubsidi_coa_name!=='--NULL--' ? result.dataresponse.ppnsubsidi_coa_id : '--NULL--', result.dataresponse.ppnsubsidi_coa_name!=='--NULL--'?result.dataresponse.ppnsubsidi_coa_name:'NONE')
	form.setValue(obj.cbo_pph_coa_id, result.dataresponse.pph_coa_name!=='--NULL--' ? result.dataresponse.pph_coa_id : '--NULL--', result.dataresponse.pph_coa_name!=='--NULL--'?result.dataresponse.pph_coa_name:'NONE')
	form.setValue(obj.cbo_unit_id, result.dataresponse.unit_name!=='--NULL--' ? result.dataresponse.unit_id : '--NULL--', result.dataresponse.unit_name!=='--NULL--'?result.dataresponse.unit_name:'NONE')

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
	rowdata = {
		data: data,
		rowid: form.rowid
	}

	if (typeof hnd.form_datasaved == 'function') {
		hnd.form_datasaved(result, rowdata, options);
	}
}



async function form_deleting(data) {
	if (typeof hnd.form_deleting == 'function') {
		hnd.form_deleting(data);
	}
}

async function form_deleted(result, options) {
	$ui.getPages().show('pnl_list')
	$ui.getPages().ITEMS['pnl_list'].handler.removerow(form.rowid)

	if (typeof hnd.form_deleted == 'function') {
		hnd.form_deleted(result, options);
	}
}



function btn_print_click() {

	if (form.isDataChanged() || !form.isInViewMode()) {
		$ui.ShowMessage('Simpan dulu perubahan datanya.');
		return;
	}

	var id = obj.txt_billout_id.textbox('getValue');
	var printurl = 'index.php/printout/' + window.global.modulefullname + '/billout.xprint?id=' + id;

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


	var docname = 'Tagihan Keluar'
	var txt_version = obj.txt_billout_version;
	var chk_iscommit = obj.chk_billout_iscommit;
	
	
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
			args.act_url = `${global.modulefullname}/xtion-commit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('check');
				
				form.commit();
			}
			break;

		case 'uncommit' :
			args.act_url = `${global.modulefullname}/xtion-uncommit`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.act_do = (result) => {
				chk_iscommit.checkbox('uncheck');
				
				form.setValue(txt_version, result.version);
				form.commit();
			}
			break;

		

		case 'post' :
			args.act_url = `${global.modulefullname}/xtion-post`;
			args.act_msg_quest = `Apakah anda yakin akan <b>${args.action}</b> ${docname} no ${args.id} ?`;
			args.act_msg_result = `${docname} no ${args.id} telah di ${args.action}.`;
			args.param = {}
			args.act_do = (result) => {
				if (typeof hnd.xtion_post_success === 'function') {
					hnd.xtion_post_success(result);
				}
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
				if (result.dataresponse!=undefined) { updaterecordstatus(result.dataresponse) };
				args.act_do(result);

				if (result.dataresponse!=undefined) {
					updatebuttonstate(result.dataresponse);
					updategridstate(result.dataresponse);
				}
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
	
	