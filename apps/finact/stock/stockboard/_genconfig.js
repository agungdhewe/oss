'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Stock Move Model",
	autoid: false,

	persistent: {
		'con_stockmvmodel': {
		comment: 'Daftar model Stockmove',
		primarykeys: ['stockmvmodel_id'],
			data: {
				stockmvmodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				stockmvmodel_name: { text: 'Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Model coa harus diisi' } },
				stockmvmodel_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				stockmvmodel_isdirout: { caption:'Direction', text: 'Out', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_isdirin: { text: 'In', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_isdirtransit: { text: 'In', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_iscolprop: { caption:'Direction', text: 'Propose', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_iscolsend: { text: 'Send', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_iscolrecv: { text: 'Receive', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_iscolvalue: { text: 'Stock Value', type: dbtype.boolean, null: false, default: '0' },
				stockmvmodel_iscolsales: { text: 'Sales Value', type: dbtype.boolean, null: false, default: '0' },
			},
			uniques: {
				'stockmvmodel_name': ['stockmvmodel_name']
			},
			defaultsearch: ['stockmvmodel_id', 'stockmvmodel_name']
		}
	},

	schema: {
		header: 'con_stockmvmodel',
		detils: {
		}
	}
}