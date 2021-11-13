'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "COA Report",
  autoid: false,

  persistent: {
    'mst_coareport': {
		comment: 'Daftar Report COA',
		primarykeys: ['coareport_id'],
		data: {
			coareport_id: { text: 'ID', type: dbtype.varchar(2), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			coareport_name: { text: 'Nama Report', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Nama Report harus diisi' } },
			coareport_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true }
		},
		uniques: {
			'coareport_name': ['coareport_name']
		},
		defaultsearch: ['coareport_id', 'coareport_name'],
		values: [
			{coareport_id:'NR', coareport_name:'NERACA'},
			{coareport_id:'LR', coareport_name:'LABARUGI'},
			{coareport_id:'OF', coareport_name:'MANUAL'},
		]
    }
  },

  schema: {
    header: 'mst_coareport',
    detils: {
    }
  }
}