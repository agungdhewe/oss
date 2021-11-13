'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "HR Status",
	autoid: false,

	persistent: {
		'mst_hrstatus' : {
			primarykeys: ['hrstatus_id'],
			comment: 'Master Status HR',
			data: {
				hrstatus_id: {text:'ID', type: dbtype.varchar(3), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				hrstatus_name: {text:'Status', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Status harus diisi'}},
				hrstatus_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['hrstatus_id', 'hrstatus_name'],

			uniques: {
				'hrstatus_name' : ['hrstatus_name']
			},

			values: [
				{hrstatus_id:'PE', hrstatus_name:'PERMANENT'},
				{hrstatus_id:'C0', hrstatus_name:'PROBATION'},
				{hrstatus_id:'C1', hrstatus_name:'CONTRACT I'},
				{hrstatus_id:'C2', hrstatus_name:'CONTRACT II'},
				{hrstatus_id:'C3', hrstatus_name:'CONTRACT III'},
				{hrstatus_id:'T1', hrstatus_name:'TRAINEE'},
			],			
		}
	},

	schema: {
		title: 'HR Status',
		header: 'mst_hrstatus',
		detils: {}
	}
}

