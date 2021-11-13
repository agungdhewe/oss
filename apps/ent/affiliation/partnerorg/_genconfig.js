'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner Organisation",
	autoid: false,

	persistent: {
		'mst_partnerorg' : {
			primarykeys: ['partnerorg_id'],
			comment: 'Daftar Tipe Partner Organisation',
			data: {
				partnerorg_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				partnerorg_name: {text:'Partner Org', type: dbtype.varchar(60), null:false, uppercase: true},
				partnerorg_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				partnerorg_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'}				
			},

			defaultsearch : ['partnertype_id', 'partnertype_name'],

			uniques: {
				'partnerorg_name' : ['partnerorg_name']
			},

			values: [
				{partnerorg_id:'PER', partnerorg_name:'INDIVIDUAL/PERORANGAN'},
				{partnerorg_id:'USH', partnerorg_name:'PERUSAHAAN'},
				{partnerorg_id:'ORG', partnerorg_name:'ORGANISASI/YAYASAN'},
				{partnerorg_id:'PDK', partnerorg_name:'SEKOLAH/LEMBAGA PENDIDIKAN'}
			]
		},
	},

	schema: {
		title: 'Partner Organisation',
		header: 'mst_partnerorg',
		detils: {}
	}
}

