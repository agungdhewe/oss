'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Site Model",
	autoid: false,

	persistent: {
		'mst_sitemodel' : {
			primarykeys: ['sitemodel_id'],
			comment: 'Master Site Model',
			data: {
				sitemodel_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				sitemodel_name: {text:'Site Model Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Model Site harus diisi'}},
				sitemodel_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['sitemodel_id', 'sitemodel_name'],

			uniques: {
				'sitemodel_name' : ['sitemodel_name']
			},
			
			values: [
				{sitemodel_id:"DEA", sitemodel_name:"DEALER"},
				{sitemodel_id:"DC", sitemodel_name:"DISTRIBUTION CENTER"},
				{sitemodel_id:"DSO", sitemodel_name:"DEPAPRTEMEN STORE"},
				{sitemodel_id:"FNF", sitemodel_name:"BAZAAR OR TEMPSHOP"},
				{sitemodel_id:"HO", sitemodel_name:"HEAD OFFICE"},
				{sitemodel_id:"STO", sitemodel_name:"STORE"},
				{sitemodel_id:"OL", sitemodel_name:"ONLINE CHANNEL"}
			]
		}
	},

	schema: {
		title: 'Site Model',
		header: 'mst_sitemodel',
		detils: {}
	}
}

