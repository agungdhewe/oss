'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Account Budget Format",
  autoid: false,
  icon: 'icon-accbudget-format.svg',

  persistent: {
    'mst_accbudgetformat': {
		comment: 'Daftar Format Report Account Budget',
		primarykeys: ['accbudgetformat_id'],
		data: {
			accbudgetformat_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			accbudgetformat_name: { text: 'Format', type: dbtype.varchar(30), options: { required: true, invalidMessage: 'Nama Format Report harus diisi' } },
			accbudgetformat_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true }
		},
		uniques: {
			'accbudgetformat_name': ['accbudgetformat_name']
		},
		defaultsearch: ['accbudgetformat_id', 'accbudgetformat_name'],
    }
  },

  schema: {
    header: 'mst_accbudgetformat',
    detils: {
    }
  }
}