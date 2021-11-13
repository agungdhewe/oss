'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jurnal Source",
	autoid: false,

	persistent: {
		'mst_jurnalsource': {
			comment: 'Daftar Sumber Jurnal',
			primarykeys: ['jurnalsource_id'],
			data: {
				jurnalsource_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				jurnalsource_name: { text: 'Type Jurnal', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Jurnal harus diisi' } },
				jurnalsource_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			},
			defaultsearch: ['jurnalsource_id', 'jurnalsource_name'],
			uniques: {
				'jurnalsource_name': ['jurnalsource_name']
			},
			values: [
				{jurnalsource_id:'MANUAL', jurnalsource_name:'MANUAL'},
				{jurnalsource_id:'CASHDISC', jurnalsource_name:'CASHDISCOUNT'},
				{jurnalsource_id:'TEMPRECV', jurnalsource_name:'TEMPORARY RECEIVE'},
				{jurnalsource_id:'OFFRECV', jurnalsource_name:'OFFICIALRECEIVE'},
			]
		}
	},

	schema: {
		header: 'mst_jurnalsource',
		detils: {
		}
	}
}