'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Country",
	autoid: false,

	persistent: {
		'mst_country' : {
			primarykeys: ['country_id'],
			comment: 'Daftar Negara',
			data: {
				country_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				country_name: {text:'Country', type: dbtype.varchar(60), null:false, uppercase: true}			
			},

			defaultsearch : ['country_id', 'country_name'],

			uniques: {
				'country_name' : ['country_name']
			}
		},
	},

	schema: {
		title: 'Country',
		header: 'mst_country',
		detils: {}
	}
}



