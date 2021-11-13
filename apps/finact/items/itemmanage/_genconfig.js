'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Manage",
	autoid: false,

	persistent: {
		'mst_itemmanage': {
			comment: 'Daftar Manage Item',
			primarykeys: ['itemmanage_id'],
			data: {
				itemmanage_id: { text: 'ID', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemmanage_name: { text: 'Manage', type: dbtype.varchar(20), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Manage harus diisi' } },
			},

			uniques: {
				'itemmanage_name': ['itemmanage_name']
			},
			defaultsearch: ['itemmanage_id', 'itemmanage_name'],

			values: [
				{itemmanage_id:'AS', itemmanage_name:'ASSET'},
				{itemmanage_id:'ST', itemmanage_name:'STOCK'},
				{itemmanage_id:'NI', itemmanage_name:'NON-ITEM'},
			]
		},

	},

	schema: {
		header: 'mst_itemmanage',
		detils: {
		}
	}


}