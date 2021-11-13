'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Teams",
	autoid: true,

	persistent: {
		'mst_team' : {
			primarykeys: ['team_id'],
			comment: 'Master Education',
			data: {
				team_id: {text:'ID', type: dbtype.varchar(14), null:false},
				team_name: {text:'Team Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Team harus diisi'}},
				team_descr: {text:'Descr', type: dbtype.varchar(255), null:true, suppresslist: true},
				dept_id: {
					text:'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},
				team_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch : ['team_id', 'team_name'],

			uniques: {
				'team_name' : ['team_name']
			}		
		},

		'mst_teamempl' : {
			comment: 'Personil anggota team',
			primarykeys: ['teamempl_id'],		
			data: {
				teamempl_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				empl_id: {
					text:'Employee', type: dbtype.varchar(14), null:false, uppercase: true,
					options: { required: true, invalidMessage: 'Employee harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', field_display_name: 'empl_name', 
						api: 'hrms/master/empl/list'})
				},				
				team_id: {text:'Project', type: dbtype.varchar(14), null:false, uppercase: true},		
			}			
		}
	},

	schema: {
		title: 'Education',
		header: 'mst_team',
		detils: {
			'member' : {title: 'Member', table: 'mst_teamempl', form: true, headerview: 'team_name' },
		}
	}
}

