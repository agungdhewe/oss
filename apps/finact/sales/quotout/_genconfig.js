'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Quot",
	autoid: true,

	persistent: {
		'trn_quot': {
			comment: 'Daftar Quotation',
			primarykeys: ['quot_id'],
			data: {
				quot_id: { text: 'ID', type: dbtype.varchar(30), null: false },
				quot_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			},
			defaultsearch: ['quot_id', 'quot_descr']
		},

	},

	schema: {
		header: 'trn_quot',
		detils: {
		}
	}


}