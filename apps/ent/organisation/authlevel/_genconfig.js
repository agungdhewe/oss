'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Auth Level",
	autoid: false,

	persistent: {
		'mst_authlevel' : {
			primarykeys: ['authlevel_id'],
			comment: 'Master Level Authorisasi',
			data: {
				authlevel_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				authlevel_name: {text:'Level Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Level harus diisi'}},
				authlevel_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				authlevel_order: {text:'Order', type: dbtype.int(4), null:false, default:0, suppresslist: true}
			},

			defaultsearch : ['authlevel_id', 'authlevel_name'],

			uniques: {
				'authlevel_name' : ['authlevel_name']
			},

			values: [
				{authlevel_id:'DIREC', authlevel_name:'DIRECTOR', authlevel_order:100},
				{authlevel_id:'KADIV', authlevel_name:'HEAD OF DIVISION', authlevel_order:200},
				{authlevel_id:'KADEP', authlevel_name:'HEAD OF DEPARTMENT', authlevel_order:300},
				{authlevel_id:'KAREG', authlevel_name:'HEAD OF REGIONAL', authlevel_order:400},
			],			
		}
	},

	schema: {
		title: 'Auth Level',
		header: 'mst_authlevel',
		detils: {}
	}
}

