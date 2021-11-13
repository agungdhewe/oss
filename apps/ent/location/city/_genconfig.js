'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "City",
	autoid: false,

	persistent: {
		'mst_city' : {
			primarykeys: ['city_id'],
			comment: 'Daftar City',
			data: {
				city_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				city_name: {text:'City Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Kota harus diisi'}},
				city_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				prov_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Propinsi harus diisi', prompt:'-- PILIH --'},
					text:'Propinsi', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_prov', 
						field_value: 'prov_id', field_display: 'prov_name', 
						api: 'ent/location/prov/list'})
				},
			},

			defaultsearch : ['city_id', 'city_name'],

			uniques: {
				'city_name' : ['city_name']
			},

			values: [
				{city_id:'MDN', city_name:'MEDAN', prov_id:'02'},
				{city_id:'JKT', city_name:'JAKARTA', prov_id:'12'},
				{city_id:'BDG', city_name:'BANDUNG', prov_id:'13'},
				{city_id:'SBY', city_name:'SURABAYA', prov_id:'15'},
				{city_id:'BJM', city_name:'BANJARMASIN', prov_id:'21'},
				{city_id:'MDO', city_name:'MANADO', prov_id:'29'},
				{city_id:'MKS', city_name:'MAKASSAR', prov_id:'26'},
				{city_id:'BAL', city_name:'BALI', prov_id:'17'},
			],			
		}
	},

	schema: {
		title: 'City',
		header: 'mst_city',
		detils: {}
	}
}

