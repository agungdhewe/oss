'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Unit Group",
	autoid: false,

	persistent: {
		'mst_unitgroup' : {
			primarykeys: ['unitgroup_id'],
			comment: 'Master Group Unit',
			data: {
				unitgroup_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				unitgroup_name: {text:'Unit Group', type: dbtype.varchar(60), null:false, uppercase: true},
				unitgroup_descr: {text:'Descr', type: dbtype.varchar(90), null:false, suppresslist: true},
				unitgroup_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch : ['unitgroup_id', 'unitgroup_name'],

			uniques: {
				'unitgroup_name' : ['unitgroup_name']
			}
		}
	},

	schema: {
		title: 'Unit Group',
		header: 'mst_unitgroup',
		detils: {}
	}
}



