'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner Category",
	icon : "icon-partnertype-white.png",
	autoid: false,

	persistent: {
		'mst_partnercategory' : {
			primarykeys: ['partnercategory_id'],
			comment: 'Daftar Tipe Kategori Partner',
			data: {
				partnercategory_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				partnercategory_name: {text:'Partner Category', type: dbtype.varchar(60), null:false, uppercase: true},
				partnercategory_descr: {text:'Descr', type: dbtype.varchar(90), null:false, uppercase: false, suppresslist: true},
			},

			defaultsearch : ['partnercategory_id', 'partnercategory_name'],

			uniques: {
				'partnercategory_name' : ['partnercategory_name']
			}
		},
	},

	schema: {
		title: 'Partner Category',
		header: 'mst_partnercategory',
		detils: {}
	}
}

