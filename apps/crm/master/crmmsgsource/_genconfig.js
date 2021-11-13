'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Message Source",
	autoid: false,

	persistent: {
		'mst_crmmsgsource' : {
			primarykeys: ['crmmsgsource_id'],
			comment: 'Sumber2 perpesanan/call',
			data: {
				crmmsgsource_id: {text:'ID', type: dbtype.varchar(5), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				crmmsgsource_name: {text:'Sentiment Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
			},

			defaultsearch : ['crmmsgsource_id', 'crmmsgsource_name'],
			uniques: {
				'crmmsgsource_name' : ['crmmsgsource_name']
			},

			values: [
				{crmmsgsource_id:'S01', crmmsgsource_name: 'PHONE'},
				{crmmsgsource_id:'S02', crmmsgsource_name: 'WHATSAPP'},
				{crmmsgsource_id:'S03', crmmsgsource_name: 'OTHER'},
			],			
		}
	},

	schema: {
		title: 'Source',
		header: 'mst_crmmsgsource',
		detils: {}
	}
}

