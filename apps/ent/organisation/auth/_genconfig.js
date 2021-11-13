
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Authorisasi",
	autoid: false,

	persistent: {
		'mst_auth' : {
			primarykeys: ['auth_id'],
			comment: 'Daftar Authorisasi',
			data: {
				auth_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				auth_name: {text:'Auth Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Authorisasi harus diisi'}},
				auth_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				auth_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},


				authlevel_id: {
					text:'Level', type: dbtype.varchar(10), null:false, uppercase: true,
					// options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_authlevel', 
						field_value: 'authlevel_id', field_display: 'authlevel_name', 
						api: 'ent/organisation/authlevel/list'})
				},	


				deptmodel_id: {
					text:'Dept Model', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Model Department harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_deptmodel', 
						field_value: 'deptmodel_id', field_display: 'deptmodel_name', 
						api: 'ent/organisation/deptmodel/list'})				
				},

				empl_id: {
					text:'Empl', type: dbtype.varchar(14), null:true, uppercase: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/master/empl/list'})
				}	

			},

			defaultsearch: ['auth_id', 'auth_name'],

			uniques: {
				'auth_name' : ['auth_name']
			}
			
		},

		'mst_authdelegate' : {
			primarykeys: ['authdelegate_id'],
			comment: 'Delegasi Authorisasi, apabila person yang ada di master authorisasi berhalangan.',			
			data : {
				authdelegate_id: {text:'ID', type: dbtype.varchar(14), null:false},
				authdelegate_portion: {text:'Porsi', type: dbtype.int(3), null:false, default:'0',options:{required:true,invalidMessage:'Porsi harus diisi angka 1 sd 100', validType:'range[1,100]'}},
				empl_id: {
					text:'Empl', type: dbtype.varchar(14), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Employee harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/master/empl/list'})
				},
				auth_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true}			
			},

			uniques: {
				'authdelegate_id' : ['auth_id', 'empl_id']
			}


		}

	},

	schema: {
		title: 'Authorisasi',
		header: 'mst_auth',
		detils: {
			'delegate' : {title: 'Delegasi', table:'mst_authdelegate', form: true, headerview:'auth_name'}, 
		}
	}

}
