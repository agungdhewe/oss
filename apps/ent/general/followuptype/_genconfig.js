'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Followup Type",
	autoid: false,

	persistent: {
		'mst_followuptype': {
			comment: 'Daftar Tipe Followup',
			primarykeys: ['followuptype_id'],
			data: {
				followuptype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				followuptype_name: { text: 'Tax Type', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Tipe Tax item harus diisi' } },
				followuptype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				followuptype_isusephone: {text:'Use Phone Number', type: dbtype.boolean, null:false, default:'0'},
				followuptype_isuseemail: {text:'Use Email', type: dbtype.boolean, null:false, default:'0'},
			},

			uniques: {
				'followuptype_name': ['followuptype_name']
			},
			defaultsearch: ['followuptype_id', 'followuptype_name'],

			values: [
				{followuptype_id:'TEL', followuptype_name:'TELPON', followuptype_isusephone:1},
				{followuptype_id:'IM', followuptype_name:'INSTANT MESSAGING', followuptype_isusephone:1},
				{followuptype_id:'EM', followuptype_name:'EMAIL',followuptype_isuseemail:1},
			]
		},

	},

	schema: {
		header: 'mst_followuptype',
		detils: {
		}
	}


}