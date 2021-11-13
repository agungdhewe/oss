


'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Contact",
	autoid: false,
	icon: "icon-crmcontact-white.png",

	persistent: {
		'mst_crmcontact' : {
			primarykeys: ['crmcontact_id'],
			comment: 'Master CRM Source, dari mana data customer didapatkan',
			data: {
				crmcontact_id: {text:'ID', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				crmsource_name: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Source harus diisi'}},
				crmsource_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch : ['crmcontact_id', 'crmcontact_id']

		}
	},

	schema: {
		title: 'Contact',
		header: 'mst_crmcontact',
		detils: {}
	}
}
