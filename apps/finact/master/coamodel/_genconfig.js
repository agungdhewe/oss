'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "COA Model",
	autoid: false,

	persistent: {
		'mst_coamodel': {
		comment: 'Daftar model COA',
		primarykeys: ['coamodel_id'],
			data: {
				coamodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coamodel_name: { text: 'Model COA', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Model coa harus diisi' } },
				coamodel_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				coamodel_isaging: { text: 'Manage Aging', type: dbtype.boolean, null: false, default: '0' },
				coamodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
			},
			uniques: {
				'coamodel_name': ['coamodel_name']
			},
			defaultsearch: ['coamodel_id', 'coamodel_name'],
			values: [
				{coamodel_id:'AR', coamodel_name:'RECEIVABLE', coamodel_isaging:'1', coamodel_descr:''},
				{coamodel_id:'AP', coamodel_name:'PAYABLE', coamodel_isaging:'1', coamodel_descr:''},
				{coamodel_id:'GN', coamodel_name:'GENERAL', coamodel_isaging:'0', coamodel_descr:''},
			]
		}
	},

	schema: {
		header: 'mst_coamodel',
		detils: {
		}
	}
}