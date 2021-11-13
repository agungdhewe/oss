'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Unit of Measurement",
	autoid: false,

	persistent: {
		'mst_unitmeasurement': {
			comment: 'Daftar Model',
			primarykeys: ['unitmeasurement_id'],
			data: {
				unitmeasurement_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				unitmeasurement_name: { text: 'Depre Model', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama model harus diisi' } },
				unitmeasurement_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				unitmeasurement_order: { text: 'Order', type: dbtype.int(4), null: false, default:100, suppresslist: true }
			},

			uniques: {
				'unitmeasurement_name': ['unitmeasurement_name']
			},
			defaultsearch: ['unitmeasurement_id', 'unitmeasurement_name'],

			values: [
				{unitmeasurement_id:'PCS', unitmeasurement_name:'PCS', unitmeasurement_order:0},
				{unitmeasurement_id:'UNIT', unitmeasurement_name:'UNIT', unitmeasurement_order:1},
				{unitmeasurement_id:'RIM', unitmeasurement_name:'RIM', unitmeasurement_order:2},
				{unitmeasurement_id:'BOX', unitmeasurement_name:'BOX', unitmeasurement_order:3}
			]
		},

	},

	schema: {
		header: 'mst_unitmeasurement',
		detils: {
		}
	}


}