
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Acount Dept",
	autoid: false,
	descr: "Memfilter accbudget yang muncul pada suatu departemen",

	persistent: {
		'mst_dept' : {
			primarykeys: ['dept_id'],
			comment: 'Daftar Departement',
			data: {
				dept_id: {text:'ID', type: dbtype.varchar(30), null:false,  options:{disabled: true}},
				dept_name: {text:'Dept Name', type: dbtype.varchar(60), null:false, options:{disabled:true}},
				dept_isparent: {text:'Parent Dept', type: dbtype.boolean, null:false, default:'0'},
				dept_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				deptgroup_id: {
					text:'Group', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Group harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_deptgroup', 
						field_value: 'deptgroup_id', field_display: 'deptgroup_name', 
						api: 'ent/organisation/deptgroup/list'})				
				},
			},

			defaultsearch: ['dept_id', 'dept_name']			
		},


		'mst_deptbudgetacc' : {
			primarykeys: ['deptbudgetacc_id'],
			comment: 'Daftar Departement',
			data: {
				deptbudgetacc_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				accbudget_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},
				accbudget_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(255), options:{disabled:true}},				
				dept_id: {text:'Dept', type: dbtype.varchar(30), null:false},
			},
			uniques: {
				'deptbudgetacc_pair': ['dept_id', 'accbudget_id']
			}
		}

	},

	schema: {
		title: 'Department',
		header: 'mst_dept',
		detils: {
			'accbudget': { title: 'Detil', table: 'mst_deptbudgetacc', form: true, headerview: 'dept_name' }
		}
	}
}
