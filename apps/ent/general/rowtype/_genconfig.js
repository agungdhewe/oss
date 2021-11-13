'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Row Type",
	autoid: false,

	persistent: {
		'mst_rowtype' : {
			primarykeys: ['rowtype_id'],
			comment: 'Row Type',
			data: {
				rowtype_id: {text:'ID', type: dbtype.varchar(5), null:false, options:{required:true,invalidMessage:'ID harus diisi'}},
				rowtype_name: {text:'Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Row Type harus diisi'}},
				rowtype_tag: {text:'Tag', type: dbtype.varchar(20), null:false, uppercase: true, options:{required:true,invalidMessage:'Tag harus diisi'}},
			},

			defaultsearch : ['rowtype_id', 'rowtype_name'],

			uniques: {
				'rowtype_name' : ['rowtype_id', 'rowtype_name']
			},
			
			values: [
				{rowtype_id:'ITEM', rowtype_name:'ITEM', rowtype_tag:'BILL'},
				{rowtype_id:'PPN', rowtype_name:'PPN', rowtype_tag:'BILL'},
				{rowtype_id:'PPH', rowtype_name:'PPh', rowtype_tag:'BILL'},
			],			

		}

	},

	schema: {
		title: 'Row Type',
		header: 'mst_rowtype',
		detils: {}
	}
}



