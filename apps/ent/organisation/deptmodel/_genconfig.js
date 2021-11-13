'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Departement Model",
	autoid: false,

	persistent: {
		'mst_deptmodel' : {
			primarykeys: ['deptmodel_id'],
			comment: 'Daftar Model Departement',
			data: {
				deptmodel_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				deptmodel_name: {text:'Dept Model', type: dbtype.varchar(60), null:false, uppercase: true},
				deptmodel_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				deptmodel_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'}				
			},

			defaultsearch: ['deptmodel_id', 'deptmodel_name'],

			uniques: {
				'deptmodel_name' : ['deptmodel_name']
            },

			values: [
				{deptmodel_id:'COM', deptmodel_name:'COMMERCIAL'},
				{deptmodel_id:'DC', deptmodel_name:'DISTRIBUTION CENTER'},
				{deptmodel_id:'FIA', deptmodel_name:'FINANCE, ACCOUNTING & ADMINISTRATION'},
				{deptmodel_id:'GMN', deptmodel_name:'GENERAL MANAGEMENT'},
				{deptmodel_id:'HR', deptmodel_name:'HUMAN RESOURCE'},
				{deptmodel_id:'MIS', deptmodel_name:'MANAGEMENT INFORMATION SUPPORT'},
				{deptmodel_id:'OPE', deptmodel_name:'OPERATIONS'},
				{deptmodel_id:'PRJ', deptmodel_name:'PROJECT'},
				{deptmodel_id:'STO', deptmodel_name:'STORE'},
			]
			
		},
	},

	schema: {
		title: 'Department Model',
		header: 'mst_deptmodel',
		detils: {}
	}
}

