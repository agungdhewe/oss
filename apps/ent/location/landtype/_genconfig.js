'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Land Type",
	autoid: false,

	persistent: {
		'mst_landtype' : {
			primarykeys: ['landtype_id'],
			comment: 'Master Land Type',
			data: {
				landtype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				landtype_name: {text:'Land Type Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Land Type harus diisi'}},
				landtype_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['landtype_id', 'landtype_name'],

			uniques: {
				'landtype_name' : ['landtype_name']
			},

			values: [
				{landtype_id:'MALL', landtype_name:'MALL'},
				{landtype_id:'KANTOR', landtype_name:'PERKANTORAN'},
				{landtype_id:'HOTEL', landtype_name:'HOTEL'},
				{landtype_id:'SPORTCLUB', landtype_name:'SPORTCLUB'}
			],			
		}
	},

	schema: {
		title: 'Land Type',
		header: 'mst_landtype',
		detils: {}
	}
}

