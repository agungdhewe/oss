'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collection Source",
	autoid: false,

	persistent: {
		'mst_collsource': {
			comment: 'Daftar Source',
			primarykeys: ['collsource_id'],
			data: {
				collsource_id: { text: 'ID', type: dbtype.varchar(10), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				collsource_name: { text: 'Name', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'Nama harus diisi' } },
				collsource_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
			},

			uniques: {
				'collsource_name': ['collsource_name']
			},
			defaultsearch: ['collsource_id', 'collsource_name'],

			values: [
				{collsource_id:'DNE', collsource_name:'Dana Effektif'},
				{collsource_id:'PPH', collsource_name:'PPH'},
				{collsource_id:'BAR', collsource_name:'BARTER/OFFSET'},
			]
		},

	},

	schema: {
		header: 'mst_collsource',
		detils: {
		}
	}


}