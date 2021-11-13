'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Inquiry Model",
	autoid: false,

	persistent: {
		'mst_inquirymodel': {
			comment: 'Daftar Model Inquiry',
			primarykeys: ['inquirymodel_id'],
			data: {
				inquirymodel_id: { text: 'ID', type: dbtype.varchar(1), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				inquirymodel_name: { text: 'Model', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Model Pajak harus diisi' } },
				inquirymodel_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				inquirymodel_isqtybreakdown: { text: 'Quantity Breakdown', type: dbtype.boolean, null: false, default: '0', options: {labelWidth:'300px'} },
				inquirymodel_isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0' },
			},

			uniques: {
				'inquirymodel_name': ['inquirymodel_name']
			},
			defaultsearch: ['inquirymodel_id', 'inquirymodel_name'],

			values: [
				{inquirymodel_id:'M', inquirymodel_name:'PERMINTAAN BARANG', inquirymodel_isqtybreakdown: '1', inquirymodel_isdateinterval:'0'},
				{inquirymodel_id:'B',  inquirymodel_name:'PEMINJAMAN BARANG', inquirymodel_isqtybreakdown:'1', inquirymodel_isdateinterval:'1'},
				{inquirymodel_id:'S',  inquirymodel_name:'SERVICE', inquirymodel_isqtybreakdown:'0', inquirymodel_isdateinterval:'0'},
				{inquirymodel_id:'P',  inquirymodel_name:'PARTNER', inquirymodel_isqtybreakdown:'0', inquirymodel_isdateinterval:'1'},
			]
		},

	},

	schema: {
		header: 'mst_inquirymodel',
		detils: {
		}
	}


}