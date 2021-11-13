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
			defaultsearch: ['stockmvmodel_id', 'stockmvmodel_name'],
			values: [
				{stockmvmodel_id:'BL', stockmvmodel_name:'SALDO BALANCE', stockmvmodel_isdirout: 0, stockmvmodel_isdirin: 1, stockmvmodel_isdirtransit: 0, stockmvmodel_iscolprop: 0, stockmvmodel_iscolsend: 0, stockmvmodel_iscolrecv: 1, stockmvmodel_iscolvalue: 1, stockmvmodel_iscolsales: 0},
				{stockmvmodel_id:'RV', stockmvmodel_name:'RECEIVE', stockmvmodel_isdirout: 0, stockmvmodel_isdirin: 1, stockmvmodel_isdirtransit: 0, stockmvmodel_iscolprop: 1, stockmvmodel_iscolsend: 0, stockmvmodel_iscolrecv: 1, stockmvmodel_iscolvalue: 1, stockmvmodel_iscolsales: 0},
				{stockmvmodel_id:'TR', stockmvmodel_name:'TRANSFER', stockmvmodel_isdirout: 1, stockmvmodel_isdirin: 1, stockmvmodel_isdirtransit: 1, stockmvmodel_iscolprop: 1, stockmvmodel_iscolsend: 1, stockmvmodel_iscolrecv: 1, stockmvmodel_iscolvalue: 0, stockmvmodel_iscolsales: 0},
				{stockmvmodel_id:'SL', stockmvmodel_name:'SALES', stockmvmodel_isdirout: 1, stockmvmodel_isdirin: 0, stockmvmodel_isdirtransit: 0, stockmvmodel_iscolprop: 0, stockmvmodel_iscolsend: 1, stockmvmodel_iscolrecv: 0, stockmvmodel_iscolvalue: 1, stockmvmodel_iscolsales: 1},
				{stockmvmodel_id:'DO', stockmvmodel_name:'DIRECT OUT', stockmvmodel_isdirout: 1, stockmvmodel_isdirin: 0, stockmvmodel_isdirtransit: 0, stockmvmodel_iscolprop: 1, stockmvmodel_iscolsend: 1, stockmvmodel_iscolrecv: 0, stockmvmodel_iscolvalue: 0, stockmvmodel_iscolsales: 0},
				{stockmvmodel_id:'AJ', stockmvmodel_name:'ADJUSTMENT', stockmvmodel_isdirout: 0, stockmvmodel_isdirin: 1, stockmvmodel_isdirtransit: 0, stockmvmodel_iscolprop: 1, stockmvmodel_iscolsend: 0, stockmvmodel_iscolrecv: 1, stockmvmodel_iscolvalue: 1, stockmvmodel_iscolsales: 0},
			]
		}
	},

	schema: {
		header: 'con_stockmvmodel',
		detils: {
		}
	}
}