'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Room",
	autoid: false,

	persistent: {
		'mst_room' : {
			primarykeys: ['room_id'],
			comment: 'Daftar City',
			data: {
				room_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				room_name: {text:'Room Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Ruangan harus diisi'}},
				room_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				site_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					text:'Site', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})
				},
			},

			defaultsearch : ['room_id', 'room_name'],

			uniques: {
				'room_name' : ['site_id', 'room_name']
			},
		}
	},

	schema: {
		title: 'Room',
		header: 'mst_room',
		detils: {}
	}
}

