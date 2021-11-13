'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Land",
	autoid: false,

	persistent: {
		'mst_land' : {
			primarykeys: ['land_id'],
			comment: 'Daftar Land',
			data: {
				land_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				land_name: {text:'Land Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Land harus diisi'}},

				land_address: {text:'Address', type: dbtype.varchar(250), null:false, suppresslist: true, uppercase: true, options:{required:true,invalidMessage:'Alamat harus diisi'}},

				land_phone: {text:'Phone', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Phone harus diisi'},},	
				land_email: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true, suppresslist: true},				

				land_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, suppresslist: true, default:'0'},

				land_geoloc: {text:'Geo Location', type: dbtype.varchar(30), null:false, suppresslist: true, default:"''"},


				landtype_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Type Land harus diisi', prompt:'-- PILIH --'},
					text:'Land Type', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_landtype', 
						field_value: 'landtype_id', field_display: 'landtype_name', 
						api: 'ent/location/landtype/list'})
				},


				zone_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Zone harus diisi', prompt:'-- PILIH --'},
					text:'Zone', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_zone', 
						field_value: 'zone_id', field_display: 'zone_name', 
						api: 'ent/location/zone/list'})
				},

				city_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'City harus diisi', prompt:'-- PILIH --'},
					text:'City', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_city', 
						field_value: 'city_id', field_display: 'city_name', 
						api: 'ent/location/city/list'})
				},				


				partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},	

			},

			defaultsearch : ['land_id', 'land_name'],

			uniques: {
				'land_name' : ['land_name']
			}			
		}


	},

	schema: {
		title: 'Land',
		header: 'mst_land',
		detils: {}
	}
}

