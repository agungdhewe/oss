'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Brand Type",
	autoid: false,

	persistent: {
		'mst_brandtype' : {
			primarykeys: ['brandtype_id'],
			comment: 'Daftar Tipe Brand',
			data: {
				brandtype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				brandtype_name: {text:'Brand Type', type: dbtype.varchar(60), null:false, uppercase: true},
				brandtype_descr: {text:'Descr', type: dbtype.varchar(90), null:false, suppresslist: true}
			},
			
			uniques: {
				'brandtype_name' : ['brandtype_name']
			},

			values: [
				{brandtype_id:'ACS', brandtype_name:'ACCESSORIES', brandtype_descr:'Fashion Accessories Brands'},
				{brandtype_id:'MEN', brandtype_name:'MEN', brandtype_descr: 'Fashion Men Brands'}
			]			

		},
	},

	schema: {
		title: 'Brand Type',
		header: 'mst_brandtype',
		detils: {}
	}
}

