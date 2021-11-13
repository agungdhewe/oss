'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collection Followup Type",
	autoid: false,

	persistent: {
		'mst_collfuptype': {
			comment: 'Daftar Tipe Followup',
			primarykeys: ['collfuptype_id'],
			data: {
				collfuptype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				collfuptype_name: { text: 'Folloup Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Tax item harus diisi' } },
				collfuptype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				collfuptype_iscollect: {text:'Collect', type: dbtype.boolean, null:false, default:'0'},
			},

			uniques: {
				'collfuptype_name': ['collfuptype_name']
			},
			defaultsearch: ['collfuptype_id', 'collfuptype_name'],

			values: [
				{collfuptype_id:'COL', collfuptype_name:'COLLECT', collfuptype_iscollect:1},
				{collfuptype_id:'TEL', collfuptype_name:'TELPON'},
				{collfuptype_id:'IM', collfuptype_name:'INSTANT MESSAGING'},
				{collfuptype_id:'EM', collfuptype_name:'EMAIL'},
			]
		},

	},

	schema: {
		header: 'mst_collfuptype',
		detils: {
		}
	}


}