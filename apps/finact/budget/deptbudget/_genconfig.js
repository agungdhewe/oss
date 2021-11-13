
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Department",
	autoid: true,
	icon: "icon-budgetdept-white.svg",
	idprefix: 'BU',
	printing: true,
	committer: true,
	approval: true,
	doc_id: 'DEPTBUDGET',	


	persistent: {
		'mst_deptbudget': {
			primarykeys: ['deptbudget_id'],
			comment: 'Daftar Budget Departemen',
			data: {
				deptbudget_id: { text: 'ID', type: dbtype.varchar(35), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				deptbudget_year: { text: 'Year', type: dbtype.int(4), null: false, options: { required: true, invalidMessage: 'Tahun Budget harus diisi' } },
				deptbudget_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, hidden: true },
				deptbudget_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },

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

				deptbudget_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudget_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				deptbudget_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudget_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				deptbudget_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudget_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				deptbudget_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudget_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				deptbudget_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				deptbudget_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				deptbudget_isveryfied: { text: 'Verified', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				deptbudget_verifyby: { text: 'Verified By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				deptbudget_verifydate: { text: 'Verified Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


			},
			defaultsearch: ['deptbudget_id', 'deptbudget_year'],
			uniques: {
				'deptbudget_year': ['deptbudget_year', 'dept_id']
			}
		},

		'mst_deptbudgetdet': {
			primarykeys: ['deptbudgetdet_id'],
			comment: 'Detil budget department (per account bulanan)',
			data: {
				deptbudgetdet_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				deptbudgetdet_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				deptbudgetdet_01: { text: 'JAN', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_02: { text: 'FEB', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_03: { text: 'MAR', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_04: { text: 'APR', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_05: { text: 'MEI', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_06: { text: 'JUN', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_07: { text: 'JUL', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_08: { text: 'AGS', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_09: { text: 'SEP', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_10: { text: 'OKT', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_11: { text: 'NOV', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_12: { text: 'DES', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },
				deptbudgetdet_total: { text: 'Total', type: dbtype.decimal(14, 0), null: false, default: 0 },
				accbudget_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},
				deptbudgetdet_notes: { text: 'Notes', type: dbtype.varchar(255), suppresslist: true },
				deptbudget_id: { text: 'BudgetID', type: dbtype.varchar(35), null: false },
			},
			defaultsearch: ['accbudget_id', 'deptbudgetdet_descr', 'deptbudgetdet_notes'],
			uniques: {
				'deptbudget_accbudget_id': ['deptbudget_id', 'accbudget_id']
			}
		}
	

	},

	schema: {
		title: 'Budget Department',
		header: 'mst_deptbudget',
		detils: {
			'detil': { title: 'Detil', table: 'mst_deptbudgetdet', form: true, headerview: 'deptbudget_id' }
		}
	}

}
