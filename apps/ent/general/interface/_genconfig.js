'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Interface",
	autoid: false,

	persistent: {
		'mst_interface' : {
			primarykeys: ['interface_id'],
			comment: 'Master Interface',
			data: {
				interface_id: {text:'ID', type: dbtype.varchar(7), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				interface_name: {text:'Interface', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Interface harus diisi'}},
			},

			defaultsearch : ['interface_id', 'interface_name'],

			uniques: {
				'interface_name' : ['interface_name']
			}
		
		}
	},

	schema: {
		title: 'Interface',
		header: 'mst_interface',
		detils: {}
	}
}

