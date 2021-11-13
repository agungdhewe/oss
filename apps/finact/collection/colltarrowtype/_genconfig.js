'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Target Row Type",
	autoid: false,

	persistent: {
		'mst_colltarrowtype': {
			comment: 'Daftar Source',
			primarykeys: ['colltarrowtype_id'],
			data: {
				colltarrowtype_id: { text: 'ID', type: dbtype.varchar(10), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				colltarrowtype_name: { text: 'Name', type: dbtype.varchar(30), null: false, options: { required: true, invalidMessage: 'Nama harus diisi' } },
				colltarrowtype_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				colltarrowtype_order: { text: 'RowType Order', type: dbtype.int(4), null: false, default: 0, options: { required: true } },
			},

			uniques: {
				'colltarrowtype_name': ['colltarrowtype_name']
			},
			defaultsearch: ['colltarrowtype_id', 'colltarrowtype_name'],

			values: [
				{colltarrowtype_id:'SAL', colltarrowtype_name:'Saldo', colltarrowtype_order:10},
				{colltarrowtype_id:'ALB', colltarrowtype_name:'Allowance Bad Deb', colltarrowtype_order:20},
				{colltarrowtype_id:'PAR', colltarrowtype_name:'Agency', colltarrowtype_order:30},
				{colltarrowtype_id:'SAR', colltarrowtype_name:'Saldo AR Adjusted', colltarrowtype_order:40},
				{colltarrowtype_id:'FOR', colltarrowtype_name:'Formulasi Target (35%)', colltarrowtype_order:50},
				{colltarrowtype_id:'ESL', colltarrowtype_name:'Saldo Ending', colltarrowtype_order:50},
			]
		},

	},

	schema: {
		header: 'mst_colltarrowtype',
		detils: {
		}
	}


}