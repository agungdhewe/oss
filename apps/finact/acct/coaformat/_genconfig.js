'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "COA Format",
  autoid: false,
  icon: 'icon-accbudget-format.svg',

  persistent: {
    'mst_coaformat': {
		comment: 'Daftar Format Report Account ',
		primarykeys: ['coaformat_id'],
		data: {
			coaformat_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			coaformat_name: { text: 'Format', type: dbtype.varchar(30), options: { required: true, invalidMessage: 'Nama Format Report harus diisi' } },
			coaformat_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true }
		},
		uniques: {
			'coaformat_name': ['coaformat_name']
		},
		defaultsearch: ['coaformat_id', 'coaformat_name'],
    }
  },

  schema: {
    header: 'mst_coaformat',
    detils: {
    }
  }
}