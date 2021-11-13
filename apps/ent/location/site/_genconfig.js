'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Site",
	autoid: false,

	persistent: {
		'mst_site' : {
			primarykeys: ['site_id'],
			comment: 'Daftar Site',
			data: {
				site_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				site_name: {text:'Site Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Site harus diisi'}},
				site_address: {text:'Address', type: dbtype.varchar(250), null:false, suppresslist: true, uppercase: true, options:{required:true,invalidMessage:'Alamat harus diisi'}},
				site_phone: {text:'Phone', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true},	
				site_email: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true, suppresslist: true, options:{validType:'email',invalidMessage:'Email harus salah'}},				
				site_sqmwide: {text:'Wide (sqm)', type: dbtype.decimal(12,2), null:false, uppercase: true, suppresslist: true, default:'0'},				
				site_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, suppresslist: false, default:'0'},
				site_geoloc: {text:'Geo Location', type: dbtype.varchar(30), null:false, suppresslist: true, default:"''"},
				site_opendate: {text:'Date', type: dbtype.date, null:false, suppresslist: true},
				sitemodel_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Sitemodel harus diisi', prompt:'-- PILIH --'},
					text:'Site Model', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_sitemodel', 
						field_value: 'sitemodel_id', field_display: 'sitemodel_name', 
						api: 'ent/location/sitemodel/list'})
				},

				sitegroup_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Zone harus diisi', prompt:'-- PILIH --'},
					text:'Site Group', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_sitegroup', 
						field_value: 'sitegroup_id', field_display: 'sitegroup_name', 
						api: 'ent/location/sitegroup/list'})
				},

				land_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Land harus diisi', prompt:'-- PILIH --'},
					text:'Land', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_land', 
						field_value: 'land_id', field_display: 'land_name', 
						api: 'ent/location/land/list'})
				},

				dept_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					text:'Dept', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})
				},

				config_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Config harus diisi', prompt:'-- PILIH --'},
					text:'Config', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_config', 
						field_value: 'config_id', field_display: 'config_name', 
						api: 'ent/general/config/list'})
				},
				
				taxtype_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Taxtype harus diisi', prompt:'-- PILIH --'},
					text:'Tax Type', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', 
						api: 'ent/general/taxtype/list'})
				}				

			},

			defaultsearch : ['site_id', 'site_name'],
			uniques: {
				'site_name' : ['site_name']
			}			
		},

		'mst_siteunit' : {
			primarykeys: ['siteunit_id'],
			comment: 'Daftar Site Unit',
			data: {
				siteunit_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				unit_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Unit harus diisi', prompt:'-- PILIH --'},
					text:'Unit', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', 
						api: 'ent/organisation/unit/list'})
				},
				dept_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					text:'Dept', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})
				},				
				site_id: {text:'Site', type: dbtype.varchar(30), null:false, uppercase: true},
			},
			defaultsearch : ['unit_id', 'dept_id'],
			uniques: {
				'siteunit_siteunit' : ['site_id', 'unit_id']
			}			

		},

		'mst_sitemapping' : {
			primarykeys: ['sitemapping_id'],
			comment: 'Daftar Site Mapping',
			data: {
				sitemapping_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				sitemapping_mapfrom: {text:'Map From', type: dbtype.varchar(60), null:false, suppresslist: false, uppercase: true, options:{required:true,invalidMessage:'Map From harus diisi'}},
				unit_id: {
					suppresslist: false,
					options:{required:true,invalidMessage:'Unit harus diisi', prompt:'-- PILIH --'},
					text:'Unit', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_unit', 
						field_value: 'unit_id', field_display: 'unit_name', 
						api: 'ent/organisation/unit/list'})
				},				
				site_id: {text:'Site', type: dbtype.varchar(30), null:false, uppercase: true},
			},
			defaultsearch : ['sitemapping_mapfrom', 'unit_id'],
			uniques: {
				'sitemapping_map' : ['sitemapping_mapfrom']
			}			
		},

		'mst_siteevent' : {
			primarykeys: ['siteevent_id'],
			comment: 'Daftar Site Event',
			data: {
				siteevent_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true},
				siteevent_name: {text:'Event Name', type: dbtype.varchar(60), null:false, suppresslist: false, uppercase: true, options:{required:true,invalidMessage:'Event Name harus diisi'}},
				siteevent_date: {text:'Date', type: dbtype.date, null:false, suppresslist: false},
				siteevent_enabling: {text:'Enabling', type: dbtype.boolean, null:false, suppresslist: true, default:'0'},
				siteevent_disabling: {text:'Disabling', type: dbtype.boolean, null:false, suppresslist: true, default:'0'},
				site_id: {text:'Site', type: dbtype.varchar(30), null:false, uppercase: true},
			},
			defaultsearch : ['siteevent_name']
		}


	},

	schema: {
		title: 'Site',
		header: 'mst_site',
		detils: {
			'unit' : {title: 'Unit', table:'mst_siteunit', form: true, headerview:'site_name'},  
			'mapping' : {title: 'Mapping', table:'mst_sitemapping', form: true, headerview:'site_name'},  
			'event' : {title: 'Event', table:'mst_siteevent', form: true, headerview:'site_name'}
		}
	}
}

