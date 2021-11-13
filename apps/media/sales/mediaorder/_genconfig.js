'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Media Order",
	autoid: true,
	idprefix: 'MO',
	printing: true,
	icon : "icon-mediaorder-white.svg",
	backcolor : "#744141",
	committer: true,
	approval: true,
	doc_id: 'MEDIAORDER',
	buttons: {
		btn_verify: {},
		btn_close: {}
	},

	persistent: {
		'trn_mediaorder': {
			comment: 'Daftar Media Order',
			primarykeys: ['mediaorder_id'],
			data: {
				mediaorder_id: { text: 'ID', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				mediaordertype_id: { 
					text: 'Media Order Type', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Media Order Type harus diisi' }, 
					// initialvalue: {id:'RTL', display:'RETAIL'},
					comp: comp.Combo({
						table: 'mst_mediaordertype',
						field_value: 'mediaordertype_id', field_display: 'mediaordertype_name',
						api: 'media/master/mediaordertype/list'
					})				
				},

				mediaorder_date: {text:'Date', type: dbtype.date, null:false},
				mediaorder_descr: { text: 'Descr', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				mediaorder_ref: { text: 'Ref', type: dbtype.varchar(90), null: false },

				ae_empl_id: {
					text:'AE', type: dbtype.varchar(14), null:true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'ae_empl_name',
						api: 'hrms/master/empl/list'})
				},

				agency_partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Agency harus diisi', prompt:'-- PILIH --'},
					text:'Agency', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'agency_partner_name', 
						api: 'ent/affiliation/partner/list',
						criteria: {
							partnertype_id: 'AGENCY'
						}
					
					})
				},	
				advertiser_partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Adveriser harus diisi', prompt:'-- PILIH --'},
					text:'Advertiser', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', field_display_name: 'advertiser_partner_name', 
						api: 'ent/affiliation/partner/list',
						criteria: {
							partnertype_id: 'ADVERTISER'
						}
					})
				},				
				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Brand harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})				
				},
				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				mediaorder_istax: {text:'Tax', type: dbtype.boolean, null:false, default:'1'},
				taxtype_id: { text: 'Tax', type: dbtype.varchar(10), null: false, suppresslist: true,
					options:{required:true,invalidMessage:'Kode Tax harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'taxtype_name', 
						api: 'finact/master/taxtype/list'})				
				
				},

				mediapackage_id: { 
					text: 'Package', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_mediapackage',
						field_value: 'mediapackage_id', field_display: 'mediapackage_descr',
						api: 'media/master/mediapackage/list'
					})				
				},
				salesordertype_id: { 
					text: 'Order Type', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Order Type harus diisi' , disabled: true }, 
					initialvalue: {id:'MO', display:'MEDIA ORDER'},
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
					initialvalue: {id:'MEDIAORDER', display:'MEDIAORDER'},
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				mediaorder_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				mediaorder_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				mediaorder_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				mediaorder_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

				mediaorder_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true},
				mediaorder_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				mediaorder_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				mediaorder_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				mediaorder_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				mediaorder_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				mediaorder_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				mediaorder_notes: { text: 'Notes', type: dbtype.varchar(255), null: true, suppresslist: true, hidden: true },

				mediaorder_isclose: {text:'Close', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				mediaorder_closeby: {text:'Close By', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				mediaorder_closedate: {text:'Close Date', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	

			},
			
			defaultsearch: ['mediaorder_id', 'mediaorder_descr']
		},

		'trn_mediaorderitem' : {
			comment: 'Meida Order Item',
			primarykeys: ['mediaorderitem_id'],		
			data: {
				mediaorderitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },

				mediaadslot_id: {
					text: 'Slot', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_mediaadslot',
						field_value: 'mediaadslot_id', field_display: 'mediaadslot_descr',
						api: 'media/master/adslot/list'
					})
				},

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

				mediaordertype_id: { 
					text: 'Media Order Type', type: dbtype.varchar(10), null: false, 
					options: { required: true, invalidMessage: 'Media Order Type harus diisi' }, 
					initialvalue: {id:'RTL', display:'RETAIL'},
					comp: comp.Combo({
						table: 'mst_mediaordertype',
						field_value: 'mediaordertype_id', field_display: 'mediaordertype_name',
						api: 'media/master/mediaordertype/list'
					})				
				},

				mediaorderitem_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				mediaorderitem_valfrg: { text: 'Valas', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				mediaorderitem_valfrgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				mediaorderitem_validr: { text: 'Value IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },

				mediaorderitem_discountidr: { text: 'Discount IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },

				mediaorderitem_totalidr: { text: 'Total IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },

				mediaorder_id: { text: 'Order', type: dbtype.varchar(30), null: false, uppercase: true },
			}	
		}


	},

	schema: {
		header: 'trn_mediaorder',
		detils: {
			'items': {title: 'Items', table: 'trn_mediaorderitem', form: true, headerview: 'mediaorder_descr' }
		}
	}


}