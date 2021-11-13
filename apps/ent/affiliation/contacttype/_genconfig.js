'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Contact Type",
	autoid: false,
	icon: "icon-contactytpe-white.png",

	persistent: {
		'mst_contacttype' : {
			primarykeys: ['contacttype_id'],
			comment: 'Master Tipe Contact',
			data: {
				contacttype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				contacttype_name: {text:'Type', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Type Contact harus diisi'}},
				contacttype_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['contacttype_id', 'contacttype_name'],

			uniques: {
				'contacttype_name' : ['contacttype_name']
			},

			values: [
				{contacttype_id:'EMAIL', contacttype_name:'EMAIL'},
				{contacttype_id:'PHONE', contacttype_name:'PHONE'},
			],			
		}
	},

	schema: {
		title: 'Contact Type',
		header: 'mst_contacttype',
		detils: {}
	}
}
