
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Project Budget",
	autoid: true,
	idprefix: 'BP',
	icon: "icon-projbudget-white.svg",
	printing: true,	
	committer: true,
	approval: true,
	doc_id: 'PROJBUDGET',

	persistent: {

		'mst_projbudget': {
			primarykeys: ['projbudget_id'],
			comment: 'Data budget project bulanan',
			data: {

				projbudget_id: { text: 'ID', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departemen harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list-byuser'
					})
				},

				project_id: {
					text: 'Project', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Project harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_project',
						field_value: 'project_id', field_display: 'project_name',
						api: 'finact/master/project/list-bydept'
					})
				},

				projbudget_name: { text: 'Nama', type: dbtype.varchar(255), null: false, options: { required: true, invalidMessage: 'Nama Budget harus diisi' } },
				projbudget_descr: { text: 'Descr', type: dbtype.varchar(255), null: true},
				projbudget_year: { text: 'Year', type: dbtype.int(4), null: false, options: { required: true, invalidMessage: 'Tahun Budget harus diisi' } },
				projbudget_month: { text: 'Month', type: dbtype.int(2), null: false, options: { required: true, invalidMessage: 'Bulan Budget harus diisi' } },

				projbudget_isinheritvisibility: { text: 'Visible to All Dept', type: dbtype.boolean, null: false, default: '0' },

				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, 
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},

				projbudget_notes: { text: 'Notes', type: dbtype.varchar(255), null: true,  unset:true, suppresslist: true, hidden: true },
				projbudget_version: { text: 'Version', type: dbtype.int(4), null: false, default: '0',  unset:true, suppresslist: true, options: { disabled: true } },


				projbudget_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudget_commitby: { text: 'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true } , hidden: true, lookup:'user'},
				projbudget_commitdate: { text: 'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudget_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true, suppresslist: true},
				projbudget_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudget_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudget_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudget_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } , suppresslist: true},
				projbudget_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudget_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				projbudget_isclose: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				projbudget_closeby: { text: 'Closed By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				projbudget_closedate: { text: 'Closed Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden:true },

			},
			defaultsearch: ['projbudget_id', 'projbudget_name'],
			uniques: {
				'projbudget_name' : ['projbudget_name'],
				'projbudget_year_month': ['projbudget_year', 'projbudget_month', 'project_id']
			}
		},


		'mst_projbudgetdet': {
			primarykeys: ['projbudgetdet_id'],
			comment: 'Detil budget tahunan (per account bulanan)',
			data: {
				projbudgetdet_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				
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

				projbudgetdet_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				projbudgetdet_qty: { text: 'Qty', type: dbtype.int(6), null: false, default: 0, suppresslist: true },
				projbudgetdet_days: { text: 'Days', type: dbtype.int(4), null: false, default: 0, suppresslist: true },
				projbudgetdet_task: { text: 'Task', type: dbtype.int(4), null: false, default: 0, suppresslist: true },
				projbudgetdet_rate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true },
				projbudgetdet_valueprop: { text: 'Proposed', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true },
				projbudgetdet_value: { text: 'Budget Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true },
				projbudget_id: { text: 'BudgetID', type: dbtype.varchar(30), null: false, options: { disabled: true } }
			},
			defaultsearch: ['accbudget_id', 'projbudgetdet_descr', 'projbudgetdet_notes'],
			uniques: {
				'projbudgetdet_pair': ['projbudget_id', 'accbudget_id', 'alloc_dept_id']
			}
		},

		'mst_projbudgettask': {
			primarykeys: ['projbudgettask_id'],
			comment: 'Detil task project yang di cover oleh budget ini',
			data: {
				projbudgettask_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				projecttask_id: {
					text: 'Project Task', type: dbtype.varchar(14), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Project Task harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_projecttask',
						field_value: 'projecttask_id', field_display: 'projecttask_name',
						api: 'finact/master/projecttask/list-byproject'
					})
				},
				projecttask_notes: { text: 'Note', type: dbtype.varchar(255), suppresslist: true },
				projbudget_id: { text: 'BudgetID', type: dbtype.varchar(30), null: false, options: { disabled: true } }
			},
			uniques: {
				'projbudgettask_pair': ['projbudget_id', 'projecttask_id']
			}
		},
	},

	schema: {
		title: 'Budget Project',
		header: 'mst_projbudget',
		detils: {
			'detil': { title: 'Detil', table: 'mst_projbudgetdet', form: true, headerview: 'projbudget_name' },
			'task': { title: 'Task', table: 'mst_projbudgettask', form: true, headerview: 'projbudget_name' }
		}
	}

}



/*

projbudget_isdeptalloc
alloc_dept_id


SET FOREIGN_KEY_CHECKS=0;



ALTER TABLE `mst_projbudgetdet` MODIFY COLUMN alloc_dept_id varchar(30) NOT NULL;

CREATE UNIQUE INDEX projbudgetdet_pair ON  `mst_projbudgetdet` (`projbudget_id`, `accbudget_id`, `alloc_dept_id`);
ALTER TABLE `mst_projbudgetdet` ADD KEY `alloc_dept_id` (`alloc_dept_id`);
ALTER TABLE `mst_projbudgetdet` ADD CONSTRAINT `fk_mst_projbudgetdet_mst_dept_alloc` FOREIGN KEY (`alloc_dept_id`) REFERENCES `mst_dept` (`dept_id`);

*/