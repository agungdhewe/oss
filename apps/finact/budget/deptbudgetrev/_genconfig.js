
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Department Revisi",
	autoid: true,
	icon: "icon-budgetdept-white.svg",
	idprefix: 'BR',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'DEPTBUDGETREV',	


	persistent: {
		'mst_deptbudgetrev': {
			primarykeys: ['deptbudgetrev_id'],
			comment: 'Daftar Budget Departemen',
			data: {
				deptbudgetrev_id: { text: 'ID', type: dbtype.varchar(35), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				deptbudgetrev_year: { text: 'Year', type: dbtype.int(4), null: false, options: { required: true, invalidMessage: 'Tahun Budget harus diisi' } },
				deptbudgetrev_month: { text: 'Month', type: dbtype.int(2), null: false, options: { required: true, invalidMessage: 'Bulan Budget harus diisi' } },
				deptbudgetrev_descr: { text: 'Descr/Reason', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Nama/Deskripsi Budget harus diisi' } },
				deptbudgetrev_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, hidden: true },
				deptbudgetrev_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departmen Harus diisi', prompt: '-- PILIH --', disabled: true },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, suppresslist: true, 
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				deptbudgetrev_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudgetrev_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				deptbudgetrev_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudgetrev_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				deptbudgetrev_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudgetrev_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				deptbudgetrev_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudgetrev_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				deptbudgetrev_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				deptbudgetrev_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudgetrev_isveryfied: { text: 'Verified', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudgetrev_verifyby: { text: 'Verified By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				deptbudgetrev_verifydate: { text: 'Verified Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


			},
			defaultsearch: ['deptbudgetrev_id', 'deptbudgetrev_year'],
		},

		'mst_deptbudgetrevdet': {
			primarykeys: ['deptbudgetrevdet_id'],
			comment: 'Detil revisi budget department ',
			data: {
				deptbudgetrevdet_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				accbudget_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},
				deptbudgetrevdet_descr: { text: 'Descr/Reason', type: dbtype.varchar(255), suppresslist: true },
				deptbudgetrevdet_prev: { text: 'Previous', type: dbtype.decimal(14, 0), null: false, default: 0 },
				deptbudgetrevdet_value: { text: 'New Value', type: dbtype.decimal(14, 0), null: false, default: 0 },
				deptbudgetrevdet_variance: { text: 'Variance', type: dbtype.decimal(4, 2), null: false, default: 0 },
				deptbudgetrevdet_notes: { text: 'Notes', type: dbtype.varchar(255), suppresslist: true, hidden: false },
				deptbudgetrev_id: { text: 'BudgetRevID', type: dbtype.varchar(35), null: false },
			},
			defaultsearch: ['accbudget_id', 'deptbudgetrevdet_descr', 'deptbudgetdet_notes'],
			uniques: {
				'deptbudgetrev_accbudget_id': ['deptbudgetrev_id', 'accbudget_id']
			}
		}
	

	},

	schema: {
		title: 'Budget Department Revisi',
		header: 'mst_deptbudgetrev',
		detils: {
			'detil': { title: 'Detil', table: 'mst_deptbudgetrevdet', form: true, headerview: 'deptbudgetrev_id' }
		}
	}

}
