'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Budget Revision Mode",
	autoid: false,

	persistent: {
		'mst_budgetrevmode' : {
			primarykeys: ['budgetrevmode_id'],
			comment: 'Budget Revision Mode',
			data: {
				budgetrevmode_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				budgetrevmode_name: {text:'MODE', type: dbtype.varchar(60), null:false, uppercase: true}
			},

			defaultsearch : ['budgetrevmode_id', 'budgetrevmode_name'],

			uniques: {
				'budgetrevmode_name' : ['budgetrevmode_name']
			},

			values: [
				{budgetrevmode_id:'A', budgetrevmode_name:'Tambah Baru'},
				{budgetrevmode_id:'U', budgetrevmode_name:'Update Existing'},
			]
		}
	},

	schema: {
		title: 'Budget Revision Mode',
		header: 'mst_budgetrevmode',
		detils: {}
	}
}

