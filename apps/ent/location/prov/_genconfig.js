'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Propinsi",
	autoid: false,

	persistent: {
		'mst_prov' : {
			primarykeys: ['prov_id'],
			comment: 'Daftar Propinsi',
			data: {
				prov_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				prov_name: {text:'Propinsi Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Propinsi harus diisi'}},
				prov_capital: {text:'Capital City', type: dbtype.varchar(60), null:false, suppresslist: true},
				area_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Area harus diisi', prompt:'-- PILIH --'},
					text:'Area', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_area', 
						field_value: 'area_id', field_display: 'area_name', 
						api: 'ent/location/area/list'})
				},
			},

			defaultsearch : ['prov_id', 'prov_name'],

			uniques: {
				'prov_name' : ['prov_name']
			},

			values: [
				{prov_id:'01', prov_name:'Nanggroe Aceh Darussalam', prov_capital:'Banda Aceh', area_id:'LK'},
				{prov_id:'02', prov_name:'Sumatera Utara', prov_capital:'Medan', area_id:'LK'},
				{prov_id:'03', prov_name:'Sumatera Barat', prov_capital:'Padang', area_id:'LK'},
				{prov_id:'04', prov_name:'Riau', prov_capital:'Pekan Baru', area_id:'LK'},
				{prov_id:'05', prov_name:'Kepulauan Riau', prov_capital:'Tanjung Pinang', area_id:'LK'},
				{prov_id:'06', prov_name:'Jambi', prov_capital:'Jambi', area_id:'LK'},
				{prov_id:'07', prov_name:'Bengkulu', prov_capital:'Bengkulu', area_id:'LK'},
				{prov_id:'08', prov_name:'Sumatera Selatan', prov_capital:'Palembang', area_id:'LK'},
				{prov_id:'09', prov_name:'Kepulauan Bangka Belitung', prov_capital:'Pangkal Pinang', area_id:'LK'},
				{prov_id:'10', prov_name:'Lampung', prov_capital:'Bandar Lampung', area_id:'LK'},
				{prov_id:'11', prov_name:'Banten', prov_capital:'Serang', area_id:'LK'},
				{prov_id:'12', prov_name:'DKI Jakarta', prov_capital:'Jakarta', area_id:'DK'},
				{prov_id:'13', prov_name:'Jawa Barat', prov_capital:'Bandung', area_id:'LK'},
				{prov_id:'14', prov_name:'Jawa Tengah', prov_capital:'Semarang', area_id:'LK'},
				{prov_id:'15', prov_name:'Jawa Timur', prov_capital:'Surabaya', area_id:'LK'},
				{prov_id:'16', prov_name:'DI Yogyakarta', prov_capital:'Yogyakarta', area_id:'LK'},
				{prov_id:'17', prov_name:'Bali', prov_capital:'Denpasar', area_id:'LK'},
				{prov_id:'18', prov_name:'Nusa Tenggara Barat', prov_capital:'Mataram', area_id:'LK'},
				{prov_id:'19', prov_name:'Nusa Tenggara Timur', prov_capital:'Kupang', area_id:'LK'},
				{prov_id:'20', prov_name:'Kalimantan Barat', prov_capital:'Pontianak', area_id:'LK'},
				{prov_id:'21', prov_name:'Kalimantan Selatan', prov_capital:'Banjarmasin', area_id:'LK'},
				{prov_id:'22', prov_name:'Kalimantan Tengah', prov_capital:'Palangkaraya', area_id:'LK'},
				{prov_id:'23', prov_name:'Kalimantan Timur', prov_capital:'Samarinda', area_id:'LK'},
				{prov_id:'24', prov_name:'Kalimantan Utara', prov_capital:'Tanjung Selor', area_id:'LK'},
				{prov_id:'25', prov_name:'Gorontalo', prov_capital:'Gorontalo', area_id:'LK'},
				{prov_id:'26', prov_name:'Sulawesi Selatan', prov_capital:'Makassar', area_id:'LK'},
				{prov_id:'27', prov_name:'Sulawesi Tenggara', prov_capital:'Kendari', area_id:'LK'},
				{prov_id:'28', prov_name:'Sulawesi Tengah', prov_capital:'Palu', area_id:'LK'},
				{prov_id:'29', prov_name:'Sulawesi Utara', prov_capital:'Manado', area_id:'LK'},
				{prov_id:'30', prov_name:'Sulawesi Barat', prov_capital:'Mamuju', area_id:'LK'},
				{prov_id:'31', prov_name:'Maluku', prov_capital:'Ambon.', area_id:'LK'},
				{prov_id:'32', prov_name:'Maluku Utara', prov_capital:'Sofifi', area_id:'LK'},
				{prov_id:'33', prov_name:'Papua', prov_capital:'Jayapura', area_id:'LK'},
				{prov_id:'34', prov_name:'Papua Barat', prov_capital:'Manokwar', area_id:'LK'},
			],			
		}
	},

	schema: {
		title: 'Propinsi',
		header: 'mst_prov',
		detils: {}
	}
}

