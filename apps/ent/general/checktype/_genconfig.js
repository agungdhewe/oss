'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Checklist Type",
	autoid: false,

	persistent: {
		'mst_checktype' : {
			primarykeys: ['checktype_id'],
			comment: 'Daftar Checklist Type',
			data: {
				checktype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				checktype_name: {text:'Type', type: dbtype.varchar(60), null:false, uppercase: true}				
			},

			defaultsearch : ['checktype_id', 'checktype_name'],

			uniques: {
				'checktype_name' : ['checktype_name']
			}
		},
	},

	schema: {
		title: 'Checklist Type',
		header: 'mst_checktype',
		detils: {}
	}
}



