'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Employee",
	autoid: true,
	icon : "icon-employee-white.png",

	persistent: {
		'mst_empluser' : {
			primarykeys: ['empl_id'],
			comment: 'Master Employee',
			data: {
				empl_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},
				empl_nik: {text:'NIK', type: dbtype.varchar(30), null:false, uppercase: true,  suppresslist: true, options:{readonly:true}},
				empl_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true,  options:{readonly:true}},
				dept_name: {text:'Dept Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{readonly:true}},
				site_name: {text:'Site Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{readonly:true}},
				user_id: {
					text:'User', type: dbtype.varchar(14), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'User harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'fgt_user', 
						field_value: 'user_id', field_display: 'user_name', 
						api: 'fgta/framework/fguser/list'})					
				
				},

			},

			defaultsearch : ['empl_id', 'empl_nik', 'empl_name']
		},

		'mst_emplunit' : {
			primarykeys: ['emplunit_id'],
			comment: 'Daftar employee yang punya authorisasi di unit',
			data: {			
				emplunit_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				unit_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Unit harus diisi', prompt:'-- PILIH --'},
					text:'Unit', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', 
						api: 'ent/organisation/unit/list'})
				},			
				empl_id: {text:'Employee', type: dbtype.varchar(30), null:false}
			},

			uniques: {
				'emplunit_pair' : ['empl_id', 'unit_id']
			}	

		},

		'mst_empldept' : {
			primarykeys: ['empldept_id'],
			comment: 'Daftar employee yang punya authorisasi di dept',
				data: {				
				empldept_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				dept_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					text:'Dept', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})
				},
				empl_id: {text:'Employee', type: dbtype.varchar(30), null:false}
			},

			uniques: {
				'empldept_pair' : ['empl_id', 'dept_id']
			}	

		},
		
		'mst_emplsite' : {
			primarykeys: ['emplsite_id'],
			comment: 'Daftar employee yang punya authorisasi di site',
			data: {				
				emplsite_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},			
				empl_id: {text:'Employee', type: dbtype.varchar(30), null:false}
			},

			uniques: {
				'emplsite_pair' : ['empl_id', 'site_id']
			}	

		}

	},

	schema: {
		title: 'Employee User',
		header: 'mst_empluser',
		detils: {
			'unit' : {title: 'Owned Unit', table:'mst_emplunit', form: true, headerview:'empl_name'},  
			'dept' : {title: 'Owned Dept', table:'mst_empldept', form: true, headerview:'empl_name'},  
			'site' : {title: 'Owned Site', table:'mst_emplsite', form: true, headerview:'empl_name'}
		}
	}
}



/*

CREATE TABLE `mst_unituser` (
  `unit_id` varchar(10) NOT NULL,
  `user_id` varchar(14) NOT NULL,
  PRIMARY KEY (`unit_id`, `empl_id`),
  CONSTRAINT `mst_unituser_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`),
  CONSTRAINT `mst_unituser_fgt_user` FOREIGN KEY (`user_id`) REFERENCES `fgt_user` (`user_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar User yant punya authorisasi di unit';

*/