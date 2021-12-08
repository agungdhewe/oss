'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In",
	autoid: true,
	icon : "icon-order-white.svg",
	backcolor : "#348183",
	idprefix: 'SO', 
	printing: true,	
	committer: true,
	doc_id: 'SALESORDER',	

	persistent: {
		'trn_orderin': {
			comment: 'Daftar Order Pembelian, Sewa, Service, Talent, dll',
			primarykeys: ['orderin_id'],
			data: {
				orderin_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				unit_id: {
					text: 'Unit', type: dbtype.varchar(10), null: true, suppresslist: true, hidden: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_unit',
						field_value: 'unit_id', field_display: 'unit_name',
						api: 'ent/organisation/unit/list'
					})
				},

				orderintype_id: {
					text:'Order Type', type: dbtype.varchar(10), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Order Type Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_orderintype', 
						field_value: 'orderintype_id', field_display: 'orderintype_name',  field_display_name: 'orderintype_name',
						api: 'finact/sales/orderintype'
					})
				},

				
				orderin_ref: { text: 'Ref', type: dbtype.varchar(90), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderin_descr: { text: 'Descr', type: dbtype.varchar(90), null: true,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				orderin_dtstart: {text:'Date Start', type: dbtype.date, null:false},
				orderin_dtend: {text:'Date End', type: dbtype.date, null:false, suppresslist: true},

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: { required: true, invalidMessage: 'Partner Harus diisi', disabled:false } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				},	

				trxmodel_id: { 
					text: 'Model Trx', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Trx harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel',
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'
					})				
				},

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: true, suppresslist: true, hidden: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list'
					})
				},

				ppn_taxtype_id: { 
					section: section.Begin('Tax'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}},


				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list'})				
			
				},

				pph_taxvalue: { 
					section: section.End(),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'PPH Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},


				// *Sub Total
				// *Discount
				// *Total
				// *PPH Value
				// *Sales Nett
				// *PPN Value
				// Outstanding Payment
				// Biaya Administrasi
				// Additional Charge (non PPN)





				sales_coa_id: { 
					section: section.Begin('Account'),  //section.Begin('Related Dept', 'defbottomborder'),
					text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppnsubsidi_coa_id: { 
					text: 'COA Subsidi PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: 'Apabila PPN include COA ini perlu diisi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppnsubsidi_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				pph_coa_id: { 
					text: 'COA PPH Prepaid', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},						



				sales_dept_id: {
					section: section.End(), 
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'sales_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},



				orderin_totalitem: { text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },

				orderin_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				orderin_payment: { text: 'Total Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },




				orderin_version: {text:'Doc Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				orderin_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {disabled: true} },
				orderin_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				orderin_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				orderin_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				orderin_isclose: { text: 'Close', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				orderin_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user'},
				orderin_closedate: { text: 'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true } , hidden: true},
				orderin_isautogenerated: { text: 'Auto Generated', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { labelWidth: '300px', disabled: true } },
			},
			
			defaultsearch: ['orderin_id', 'orderin_descr']
		},

		/*
		'trn_orderoutreq' : {
			comment: 'Item yang di request',
			primarykeys: ['orderoutreq_id'],		
			data: {
				orderoutreq_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				request_id: {
					text: 'Request', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'trn_request',
						field_value: 'request_id', field_display: 'request_descr', field_display_name: 'request_descr',
						api: 'local: list-get-request'
					})
				},

				requestitem_id: {
					text: 'Request Item', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'trn_request',
						field_value: 'request_id', field_display: 'request_descr', field_display_name: 'request_descr',
						api: 'local: list-get-requestitem'
					})
				},

				user_dept_id: {
					text: 'Item Owner Dept', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'user_dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				itemasset_id: { 
					text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemasset',
						field_value: 'itemasset_id', field_display: 'itemasset_name',
						api: 'local: list-get-itemasset'
					})				
				},

				itemstock_id: { 
					text: 'Item Stock', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_itemstock',
						field_value: 'itemstock_id', field_display: 'itemstock_name',
						api: 'local: list-get-itemstock'
					})				
				},				

				item_id: { 
					text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, 
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_item',
						field_value: 'item_id', field_display: 'item_name',
						api: 'local: list-get-item'
					})				
				},

				partner_id: {
					text:'Partner', type: dbtype.varchar(30), null:true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: list-get-partner'
					})
				},

				itemclass_id: { 
					text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_itemclass',
						field_value: 'itemclass_id', field_display: 'itemclass_name',
						api: 'local: list-get-itemclass'
					})				
				},

				requestitem__descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
				projbudgetdet_id: {
					text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_projbudgetdet',
						field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
						api: 'finact/budget/projbudget/list-accbudget-byitemclass'
					})
				},


				requestitem_isallowunrelatedbudget: { text: 'Use Unrelated Budget', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },
				requestitem_isunbudget: { text: 'UnBudgettetd', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },

				requestitem_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0, hidden: true},
				requestitem_days: { text: 'Days', type: dbtype.int(4), null:false, default:0, suppresslist: true, hidden: true},
				requestitem_task: { text: 'Task', type: dbtype.int(4), null:false, default:0, suppresslist: true, hidden: true},
				requestitem_estrate: { text: 'EstRate', type: dbtype.decimal(12,0), null:false, default:0, hidden: true},
				requestitem_estvalue: { text: 'EstValue', type: dbtype.int(14,0), null:false, default:0, suppresslist: true, hidden: true},

				accbudget_id: {
					text: 'Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true} ,
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},

				coa_id: {
					text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' , disabled: true} ,
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},

				orderout_id: { text: 'Order', type: dbtype.varchar(30), null: false },
			}
		},
		*/



		// 'trn_orderoutitem' : {
		// 	comment: 'Item yang di request',
		// 	primarykeys: ['orderoutitem_id'],		
		// 	data: {
		// 		orderoutitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

		// 		itemasset_id: { 
		// 			text: 'Item Asset', type: dbtype.varchar(14), uppercase: true, null: true, 
		// 			options: { prompt: 'NONE' }, 
		// 			comp: comp.Combo({
		// 				table: 'mst_itemasset',
		// 				field_value: 'itemasset_id', field_display: 'itemasset_name',
		// 				api: 'local: list-get-itemasset'
		// 			})				
		// 		},

		// 		itemstock_id: { 
		// 			text: 'Item Stock', type: dbtype.varchar(14), uppercase: true, null: true, 
		// 			options: { prompt: 'NONE' }, 
		// 			comp: comp.Combo({
		// 				table: 'mst_itemstock',
		// 				field_value: 'itemstock_id', field_display: 'itemstock_name',
		// 				api: 'local: list-get-itemstock'
		// 			})				
		// 		},				

		// 		item_id: { 
		// 			text: 'Item', type: dbtype.varchar(14), uppercase: true, null: true, 
		// 			options: { prompt: 'NONE' }, 
		// 			comp: comp.Combo({
		// 				table: 'mst_item',
		// 				field_value: 'item_id', field_display: 'item_name',
		// 				api: 'local: list-get-item'
		// 			})				
		// 		},

		// 		partner_id: {
		// 			text:'Partner', type: dbtype.varchar(30), null:true,
		// 			options: { prompt: 'NONE' } ,
		// 			comp: comp.Combo({
		// 				table: 'mst_partner', 
		// 				field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
		// 				api: 'local: list-get-partner'
		// 			})
		// 		},

		// 		itemclass_id: { 
		// 			text: 'Item Class', type: dbtype.varchar(14), uppercase: true, null: false, 
		// 			options: { required: true, invalidMessage: 'Itemclass harus diisi' }, 
		// 			comp: comp.Combo({
		// 				table: 'mst_itemclass',
		// 				field_value: 'itemclass_id', field_display: 'itemclass_name',
		// 				api: 'local: list-get-itemclass'
		// 			})				
		// 		},

		// 		orderout_descr: { text: 'Descr', type: dbtype.varchar(90), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },
		// 		projbudgetdet_id: {
		// 			text: 'Budget Account', type: dbtype.varchar(30), null: true, suppresslist: true,
		// 			options: { prompt: 'NONE' } ,
		// 			comp: comp.Combo({
		// 				table: 'mst_projbudgetdet',
		// 				view: 'view_projbudgetdetacc',
		// 				field_value: 'projbudgetdet_id', field_display: 'projbudgetdet_descr',
		// 				api: 'finact/budget/projbudget/list-projbudgetdetacc'
		// 			})
		// 		},
		// 		orderout_isallowunrelatedbudget: { text: 'Use Unrelated Budget', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },
		// 		orderout_isunbudget: { text: 'UnBudgettetd', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },
		// 		orderout_isallowoverbudget: { text: 'Allow Over Budget', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'200px'} },
		// 		orderout_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
		// 		orderout_days: { text: 'Days', type: dbtype.int(4), null:false, default:0, suppresslist: true},
		// 		orderout_task: { text: 'Task', type: dbtype.int(4), null:false, default:0, suppresslist: true},
		// 		orderout_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0},
		// 		orderout_value: { text: 'Value', type: dbtype.int(14,0), null:false, default:0, suppresslist: true},
		// 		curr_id: {
		// 			text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
		// 			options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
		// 			comp: comp.Combo({
		// 				table: 'mst_curr', 
		// 				field_value: 'curr_id', field_display: 'curr_name', 
		// 				api: 'ent/general/curr/list-with-currentrate'})
		// 		},
		// 		curr_rate: { text: 'Rate', type: dbtype.decimal(12,0), null:false, default:0},
		// 		orderout_idr: { text: 'IDR', type: dbtype.int(14,0), null:false, default:0, suppresslist: true},
		// 		orderout_budgetavailable: { text: 'Available Budget', type: dbtype.int(14,0), null:false, default:0, suppresslist: true},

		// 		accbudget_id: {
		// 			text: 'Budget Account', type: dbtype.varchar(20), null: true, suppresslist: true,
		// 			options: { prompt: 'NONE' , disabled: true} ,
		// 			comp: comp.Combo({
		// 				table: 'mst_accbudget',
		// 				field_value: 'accbudget_id', field_display: 'accbudget_name',
		// 				api: 'finact/master/accbudget/list'
		// 			})
		// 		},

		// 		coa_id: {
		// 			text: 'Account', type: dbtype.varchar(17), null: true, suppresslist: true,
		// 			options: { prompt: 'NONE', disabled: true } ,
		// 			comp: comp.Combo({
		// 				table: 'mst_coa',
		// 				field_value: 'coa_id', field_display: 'coa_name',
		// 				api: 'finact/master/accbudget/list'
		// 			})
		// 		},

		// 		orderout_id: { text: 'Order', type: dbtype.varchar(30), null: false },
		// 	}
		// },

	},

	schema: {
		header: 'trn_orderin',
		detils: {
			// 'request' : {title: 'Request', table: 'trn_orderoutreq', form: true, headerview: 'orderout_descr' },
			// 'items' : {title: 'Items', table: 'trn_orderoutitem', form: true, headerview: 'orderout_descr' },
		}
	}


}