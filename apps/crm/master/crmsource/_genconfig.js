'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Source",
	autoid: false,

	persistent: {
		'mst_crmsource' : {
			primarykeys: ['crmsource_id'],
			comment: 'Master CRM Source, dari mana data customer didapatkan',
			data: {
				crmsource_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				crmsource_name: {text:'Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Source harus diisi'}},
				crmsource_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['crmsource_id', 'crmsource_name'],

			uniques: {
				'crmsource_name' : ['crmsource_name']
			},

			values: [
				{crmsource_id:'FB', crmsource_name:'FACEBOOK'},
				{crmsource_id:'IG', crmsource_name:'INSTAGRAM'},
				{crmsource_id:'GADS', crmsource_name:'GOOGLE ADS'},
				{crmsource_id:'TRANSMART', crmsource_name:'TRANSMART'},
				{crmsource_id:'METRO', crmsource_name:'METRO'},
			],			
		}
	},

	schema: {
		title: 'Source',
		header: 'mst_crmsource',
		detils: {}
	}
}
