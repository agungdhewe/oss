
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project Budget Revisi",
	autoid: true,
	idprefix: 'BR02',
	icon: "icon-projbudget-white.svg",
	printing: true,	
	committer: true,
	approval: true,
	doc_id: 'PROJBUDGETREV',

	persistent: {

		'mst_projbudgetrev': {
			primarykeys: ['projbudgetrev_id'],
			comment: 'Data revisi budget project bulanan',
			data: {

				projbudgetrev_id: { text: 'ID', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departemen harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				projbudget_id: {
					text: 'Budget', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_projbudget',
						field_value: 'projbudget_id', field_display: 'projbudget_name',
						api: 'finact/budget/projbudget/list-selector'
					})
				},

				projbudgetrev_descr: { text: 'Descr/Reason', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Deskripsi/Alasan revisi harus diisi' } },

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --', disabled: true },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list-bydept'
					})
				},

				projbudget_year: { text: 'Year', type: dbtype.int(4), null: false, options: { required: true, invalidMessage: 'Tahun Budget harus diisi', disabled: true } },
				projbudget_month: { text: 'Month', type: dbtype.int(2), null: false, options: { required: true, invalidMessage: 'Bulan Budget harus diisi', disabled: true } },


				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, 
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				projbudgetrev_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, hidden: true },
				projbudgetrev_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },
				projbudgetrev_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudgetrev_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				projbudgetrev_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudgetrev_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				projbudgetrev_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudgetrev_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudgetrev_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudgetrev_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				projbudgetrev_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudgetrev_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudgetrev_isclose: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudgetrev_closeby: { text: 'Closed By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudgetrev_closedate: { text: 'Closed Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden:true },

			},
			defaultsearch: ['projbudgetrev_id', 'projbudget_name']
		},


		'mst_projbudgetrevdet': {
			primarykeys: ['projbudgetrevdet_id'],
			comment: 'Detil budget tahunan (per account bulanan)',
			data: {
				projbudgetrevdet_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				


				projbudgetrevdet_descr: { text: 'Descr/Reason', type: dbtype.varchar(255), suppresslist: true },
				projbudgetrevdet_qty: { text: 'Qty', type: dbtype.int(6), null: false, default: 0, suppresslist: true },
				projbudgetrevdet_days: { text: 'Days', type: dbtype.int(4), null: false, default: 0, suppresslist: true },
				projbudgetrevdet_task: { text: 'Task', type: dbtype.int(4), null: false, default: 0, suppresslist: true },
				projbudgetrevdet_rate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true }},
				projbudgetrevdet_value: { text: 'New Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true },
				projbudgetrevdet_qty_prev: { text: 'Qty', type: dbtype.int(6), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				projbudgetrevdet_days_prev: { text: 'Days', type: dbtype.int(4), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				projbudgetrevdet_task_prev: { text: 'Task', type: dbtype.int(4), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				projbudgetrevdet_rate_prev: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				projbudgetrevdet_value_prev: { text: 'New Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				projbudgetrevdet_rate_variance: { text: 'Rate Variance', type: dbtype.decimal(4, 2), null: false, default: 0 },
				projbudgetrevdet_value_variance: { text: 'Value Variance', type: dbtype.decimal(4, 2), null: false, default: 0 },


				accbudget_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/budget/projbudget/list-accbudget'
					})
				},

				alloc_dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departemen harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},


				projbudgetrev_id: { text: 'ProjectRevID', type: dbtype.varchar(30), null: false, options: { disabled: true } }
			},
			defaultsearch: ['accbudget_id', 'projbudgetrevdet_descr'],
			uniques: {
				'projbudgetrevdet_pair': ['projbudgetrev_id', 'accbudget_id']
			}
		},

	},

	schema: {
		title: 'Budget Project Revisi',
		header: 'mst_projbudgetrev',
		detils: {
			'detil': { title: 'Detil', table: 'mst_projbudgetrevdet', form: true, headerview: 'projbudgetrev_descr' }
		}
	}

}
