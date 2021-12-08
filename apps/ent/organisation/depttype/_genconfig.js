'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Departement Type",
	autoid: false,

	persistent: {
		'mst_depttype' : {
			primarykeys: ['depttype_id'],
			comment: 'Daftar Tipe Departement',
			data: {
				depttype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				depttype_name: {text:'Dept Type', type: dbtype.varchar(60), null:false, uppercase: true},
				depttype_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				depttype_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				depttype_isrevenue: {text:'Has Revenue', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch: ['depttype_id', 'depttype_name'],

			uniques: {
				'depttype_name' : ['depttype_name']
            },

			values: [
                {depttype_id:'SUP', depttype_name:'SUPPORTING', depttype_descr:'hanya expense'},
                {depttype_id:'COM', depttype_name:'COMMERCIALS', depttype_descr:'punya income & expense', depttype_isrevenue: 1},
                {depttype_id:'GAL', depttype_name:'DEPT GROUP ALLOCATION', depttype_descr:'hanya expense'},
                {depttype_id:'SIT', depttype_name:'SITE ALLOCATION', depttype_descr:'hanya expense'}
			]
			
		},
	},

	schema: {
		title: 'Department Type',
		header: 'mst_depttype',
		detils: {}
	}
}

