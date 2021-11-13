'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "HR Section",
	autoid: false,
	notes: ``,

	persistent: {
		'mst_hrsection' : {
			primarykeys: ['hrsection_id'],
			comment: 'Daftar Section yang merupakan unit kerja terkecil sebagai pecahan department',
			data: {

				hrsection_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				hrsection_name: {text:'Section', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Section harus diisi'}},
				hrsection_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				hrsection_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
	
				deptmodel_id: {
					text:'Dept Model', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Model Department harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_deptmodel', 
						field_value: 'deptmodel_id', field_display: 'deptmodel_name', 
						api: 'ent/organisation/deptmodel/list'})				
				},

			},

			defaultsearch: ['hrsection_id', 'hrsection_name'],

			uniques: {
				'hrsection_name' : ['hrsection_name']
			},


			values: [
				{hrsection_id:'FIA-GACT', hrsection_name:'FA - ACCOUNTING', deptmodel_id:'FIA'},
				{hrsection_id:'FIA-COST', hrsection_name:'FA - COSTING', deptmodel_id:'FIA'},
				{hrsection_id:'FIA-FIN', hrsection_name:'FA - FINANCE & TREASURY', deptmodel_id:'FIA'},
				{hrsection_id:'FIA-GAPRO', hrsection_name:'GA - GA & PROCUREMENT', deptmodel_id:'FIA'},
				{hrsection_id:'FIA-GAREC', hrsection_name:'GA - RECEIPTION', deptmodel_id:'FIA'},
				{hrsection_id:'MIS-INRA', hrsection_name:'IT - INFRASTRUCTURE', deptmodel_id:'MIS'},
				{hrsection_id:'MIS-OPS', hrsection_name:'IT - OPERATION SUPPORT', deptmodel_id:'MIS'},
				{hrsection_id:'MIS-SD', hrsection_name:'IT - SOFTWARE DEVELOPMENT', deptmodel_id:'MIS'},
			],


		},

		'mst_hrdeptsection' : {
			primarykeys: ['hrdeptsection_id'],
			comment: 'Relasi dari mst_hrsection ke mst_dept',
			data: {
				hrdeptsection_id: {text:'ID', type: dbtype.varchar(14), null:false},
				dept_id: {
					text:'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},				
				auth_id: {
					text:'Authorisasi', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Authorisasi harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_auth', 
						field_value: 'auth_id', field_display: 'auth_name', 
						api: 'ent/organisation/auth/list'})				
				},				
				hrsection_id: {text:'Section', type: dbtype.varchar(10), null:false},
			},

			uniques: {
				'hrdeptsection_id' : ['dept_id', 'hrsection_id']
			}		
		
		}
	},

	schema: {
		title: 'HR Section',
		header: 'mst_hrsection',
		detils: {
			'dept' : {title: 'Dept', table:'mst_hrdeptsection', form: true, headerview:'hrsection_name'},
		}
	}
}


