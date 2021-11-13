'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Currency",
	autoid: false,

	persistent: {
		'mst_curr' : {
			primarykeys: ['curr_id'],
			comment: 'Master Currency',
			data: {
				curr_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				curr_name: {text:'Currency', type: dbtype.varchar(60), null:false, uppercase: true},
				curr_descr: {text:'Descr', type: dbtype.varchar(90), null:false},
				curr_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
			},

			defaultsearch : ['curr_id', 'curr_name'],

			uniques: {
				'curr_name' : ['curr_name']
			}			
		},


		'mst_currrate' : {
			primarykeys: ['currrate_id'],
			comment: 'Rate Currency historical',
			data: {
				currrate_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				currrate_date: {text:'Date', type: dbtype.date, null:false},
				currrate_value: {text:'Value', type: dbtype.decimal(6,0), null:false, default:'0'},
				curr_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
			},

			uniques: {
				'currrate_date' : ['curr_id', 'currrate_date']
			}			
		}
	},

	schema: {
		title: 'Currency',
		header: 'mst_curr',
		detils: {
			'rate' : {title: 'Currency Rate', table:'mst_currrate', form: true, headerview:'curr_name'},  
		}
	}
}



