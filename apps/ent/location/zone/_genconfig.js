'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Zone",
	autoid: false,

	persistent: {
		'mst_zone' : {
			primarykeys: ['zone_id'],
			comment: 'Daftar Zone',
			data: {
				zone_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				zone_name: {text:'Zone Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				zone_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				zone_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				auth_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Authorisasi harus diisi', prompt:'-- PILIH --'},
					text:'Authorisation', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_auth', 
						field_value: 'auth_id', field_display: 'auth_name', 
						api: 'ent/organisation/auth/list'})
				},
			},

			defaultsearch : ['zone_id', 'zone_name'],

			uniques: {
				'zone_name' : ['zone_name']
			},

			values: [
				{zone_id:'MDN', zone_name:'MEDAN', auth_id:'ROM-MDN'},
				{zone_id:'JKT-01', zone_name:'JAKARTA-01', auth_id:'ROM-JKT-01'},
				{zone_id:'JKT-02', zone_name:'JAKARTA-02', auth_id:'ROM-JKT-02'},
				{zone_id:'BDG', zone_name:'BANDUNG', auth_id:'ROM-BDG'},
				{zone_id:'SBY', zone_name:'SURABAYA', auth_id:'ROM-SBY'},
				{zone_id:'BJM', zone_name:'BANJARMASIN', auth_id:'ROM-BJM'},
				{zone_id:'MDO', zone_name:'MANADO', auth_id:'ROM-BJM'},
				{zone_id:'MKS', zone_name:'MAKASSAR', auth_id:'ROM-MDO'},
				{zone_id:'BAL', zone_name:'BALI', auth_id:'ROM-BAL'},
			],			
		}
	},

	schema: {
		title: 'Zone',
		header: 'mst_zone',
		detils: {}
	}
}

