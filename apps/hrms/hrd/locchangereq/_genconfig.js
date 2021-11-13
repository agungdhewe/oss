'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Change Location",
	autoid: true,

	persistent: {
		'mst_locchange' : {
			primarykeys: ['locchange_id'],
			comment: 'Clearance karyawan',
			data: {
				locchange_id: {text:'ID', type: dbtype.varchar(14), null:false},
				locchange_dateeff: {text:'Eff.Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal masuk harus diisi'}},
				locchange_reason: {text:'Reason', type: dbtype.varchar(255), null:false, options:{required:true,invalidMessage:'Alasan perpindahan harus diisi'}},


				site_id_from: {
					text:'Site', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Asal Lokasi harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_id_from_name', 
						api: 'ent/location/site/list'})				
				},

				site_id_to: {
					text:'Site', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Tujuan Lokasi harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_id_to_name', 
						api: 'ent/location/site/list'})				
				},

				empl_id: {
					text:'Empl', type: dbtype.varchar(14), null:true, uppercase: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name', 
						api: 'hrms/master/empl/list'})
				}					

			},

			defaultsearch : ['locchange_id', 'locchange_reason'],

			
		}
	},

	schema: {
		title: 'Change Location',
		header: 'mst_locchange',
		detils: {}
	}
}

