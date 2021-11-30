'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Groups",
	autoid: false,

	persistent: {
		'fgt_group' : {
			primarykeys: ['group_id'],
			data: {
				group_id: {text:'ID', type: dbtype.varchar(13), null:false, uppercase: true, options: {required:true, invalidMessage:'ID Group harus diisi'}},
				group_name: {text:'Group', type: dbtype.varchar(30), uppercase: true, options: {required:true, invalidMessage:'Nama Group harus diisi'} },
				group_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
				group_disabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'1'},
				group_menu: {text:'Menu', type: dbtype.varchar(90), uppercase: false, suppresslist: true, options: {required:true, invalidMessage:'Menu Group harus diisi'} },

			},
			uniques: {
				'group_name' : ['group_name']
			}			
		}
	},

	schema: {
		header: 'fgt_group',
		detils: {}
	}
}



