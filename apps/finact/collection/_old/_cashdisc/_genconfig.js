'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Cash Discount",
	autoid: true,
	idprefix: 'CD',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'CASHDISC',


	persistent: {
		'trn_cashdiscount': {
			comment: 'Daftar Cash Discount',
			primarykeys: ['cashdiscount_id'],
			data: {
				cashdiscount_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				billout_id: {
					text: 'Tagihan Keluar', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'finact/fin/billout/list-outstanding'
					})
				},	

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				cashdiscount_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true , suppresslist: true},
				cashdiscount_date: { text: 'Date', type: dbtype.date, null: false },
				cashdiscount_descr: { text: 'Description', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				cashdiscount_percent:  { text: 'IDR', type: dbtype.decimal(4, 2), null: false, default: 0, options: { required: true } },
				cashdiscount_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },



				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, uppercase: true, 
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},		
				
				
				cashdiscount_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				cashdiscount_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				cashdiscount_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				cashdiscount_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				cashdiscount_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true},
				cashdiscount_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				cashdiscount_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				cashdiscount_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				cashdiscount_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				cashdiscount_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				cashdiscount_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },



			},
			
			defaultsearch: ['cashdiscount_id', 'cashdiscount_descr']
		},
		
		'trn_cashdiscountappr': {
			primarykeys: ['cashdiscountappr_id'],
			comment: 'Approval budget project',
			data: {
				cashdiscountappr_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				docauth_descr: { text: 'Descr', type: dbtype.varchar(90), null: true, uppercase: false, suppresslist: true, options: { disabled: true } },
				docauth_order: { text: 'Order', type: dbtype.int(4), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				docauth_value: { text: 'Value', type: dbtype.int(4), null: false, default: 100, suppresslist: true, options: { disabled: true } },
				docauth_min: { text: 'Min', type: dbtype.int(4), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				authlevel_id: { text: 'LevelId', type: dbtype.varchar(10), null: false, suppresslist: true, options: { disabled: true } },
				authlevel_name: { text: 'Level', type: dbtype.varchar(60), null: true, options: { disabled: true } },
				auth_id: { text: 'AuthorisasiId', type: dbtype.varchar(10), null: true, suppresslist: true, options: { disabled: true } },
				auth_name: { text: 'Authorisasi', type: dbtype.varchar(60), null: true, options: { disabled: true } },
				cashdiscountappr_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
				cashdiscountappr_by: { text: 'Approved By', type: dbtype.varchar(14), options: { disabled: true } },
				cashdiscountappr_date: { text: 'Approved Date', type: dbtype.datetime, suppresslist: true, comp: comp.Textbox(), options: { disabled: true } },
				cashdiscount_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0', suppresslist: true, options: { disabled: true } },
				cashdiscountappr_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
				cashdiscountappr_declinedby: { text: 'Declined By', type: dbtype.varchar(14), suppresslist: true, options: { disabled: true } },
				cashdiscountappr_declineddate: { text: 'Declined Date', type: dbtype.datetime, suppresslist: true, comp: comp.Textbox(), options: { disabled: true } },
				cashdiscountappr_notes: { text: 'Notes', type: dbtype.varchar(255), suppresslist: true },
				cashdiscount_id: { text: 'BudgetID', type: dbtype.varchar(30), null: false },
			},
			uniques: {
				'cashdiscountappr_pair': ['cashdiscount_id', 'auth_id']
			}
		}		
		
	},

	schema: {
		header: 'trn_cashdiscount',
		detils: {
			'approval': { title: 'Approval', table: 'trn_cashdiscountappr', form: true, headerview: 'cashdiscount_descr' }
		}
	}

}