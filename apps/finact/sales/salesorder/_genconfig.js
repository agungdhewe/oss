'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "sales Order",
	autoid: true,
	idprefix: 'SO',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'SALESORDER',


	persistent: {
		'trn_salesorder': {
			comment: 'Daftar Sales Order',
			primarykeys: ['salesorder_id'],
			data: {
				salesorder_id: { text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },


				salesorder_date: {text:'Date', type: dbtype.date, null:false},
				salesorder_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				salesorder_ref: { text: 'Ref', type: dbtype.varchar(90), null: false },

				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				},

				partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Agency harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'partner_name', 
						api: 'ent/affiliation/partner/list',
						criteria: {
							partnertype_id: 'AGENCY'
						}
					
					})
				},	

				salesorder_istax: {text:'Tax', type: dbtype.boolean, null:false, default:'1'},
				taxtype_id: { text: 'Tax', type: dbtype.varchar(10), null: false, suppresslist: true,
					options:{required:true,invalidMessage:'Kode Tax harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},
				
				salesordertype_id: { 
					text: 'Order Type', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Order Type harus diisi', disabled: true  }, 
					initialvalue: {id:'SA', display:'SALES'},
					comp: comp.Combo({
						table: 'mst_salesordertype',
						field_value: 'salesordertype_id', field_display: 'salesordertype_name',
						api: 'finact/master/salesordertype/list'
					})				
				},

				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), null: false, suppresslist: true, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi', disabled: true }, 
					initialvalue: {id:'SAL', display:'SALES'},
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list'})				
				
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departemen harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true, 
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				salesorder_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				salesorder_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				salesorder_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				salesorder_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				salesorder_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true},
				salesorder_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				salesorder_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				salesorder_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				salesorder_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				salesorder_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				salesorder_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				salesorder_notes: { text: 'Notes', type: dbtype.varchar(255), null: true, suppresslist: true, hidden: true },
				salesorder_isclose: {text:'Close', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				salesorder_closeby: {text:'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				salesorder_closedate: {text:'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			},
			
			defaultsearch: ['salesorder_id', 'salesorder_descr']
		},

		'trn_salesorderitem' : {
			comment: 'Meida Order Item',
			primarykeys: ['salesorderitem_id'],		
			data: {
				salesorderitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list',
						criteria: {
							itemmodel_id: 'ADS'
						}
					})					
				},
				salesorderitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				salesorderitem_validr: { text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				salesorderitem_discountidr: { text: 'Discount IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				salesorderitem_totalidr: { text: 'Total IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				salesorder_id: { text: 'Order', type: dbtype.varchar(30), null: false, uppercase: true },
			}	
		}


	},

	schema: {
		header: 'trn_salesorder',
		detils: {
			'items': {title: 'Items', table: 'trn_salesorderitem', form: true, headerview: 'salesorder_descr' }
		}
	}


}