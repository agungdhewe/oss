'use strict'

const dbtype = global.dbtype;
const comp = global.comp;


// ini ada perubahan

module.exports = {
	title: "Area",
	autoid: false,

	persistent: {
		'mst_area' : {
			primarykeys: ['area_id'],
			comment: 'Master Area',
			data: {
				area_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				area_name: {text:'Area Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Area harus diisi'}},
				area_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['area_id', 'area_name'],

			uniques: {
				'area_name' : ['area_name']
			},

			values: [
				{area_id:'DK', area_name:'DALAM KOTA'},
				{area_id:'LK', area_name:'LUAR KOTA'},
			],			
		}
	},

	schema: {
		title: 'Area',
		header: 'mst_area',
		detils: {}
	}
}

