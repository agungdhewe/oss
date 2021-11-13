'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Document Type",
	autoid: false,

	persistent: {
		'mst_doctype' : {
			primarykeys: ['doctype_id'],
			comment: 'Master Document Type',
			data: {
				doctype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				doctype_name: {text:'Gender', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Tipe Dokumen harus diisi'}},
			},
			defaultsearch : ['doctype_id', 'doctype_name'],
			uniques: {
				'doctype_name' : ['doctype_name']
			},

			values: [
				{doctype_id:'QUOT', doctype_name:'QUOTATION'},
				{doctype_id:'PO', doctype_name:'PURCHASE ORDER'},
			],			
		}
	},

	schema: {
		title: 'Document Type',
		header: 'mst_doctype',
		detils: {}
	}
}

