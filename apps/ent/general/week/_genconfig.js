'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Week",
	autoid: true,

	persistent: {
		'con_week' : {
			primarykeys: ['week_id'],
			comment: 'Daftar Week',
			data: {
				week_id: {text:'ID', type: dbtype.varchar(7), null:false},
				week_year: {text:'Year', type: dbtype.int(4), null:false, default:0},
				week_month: {text:'Month', type: dbtype.int(2), null:false, default:0},
				week_number: {text:'Number', type: dbtype.int(1), null:false, default:0},
				week_interval: {text:'Interval', type: dbtype.int(1), null:false, default:0},
				week_dtstart: {text:'Start', type: dbtype.date, null:false},
				week_dtend: {text:'End', type: dbtype.date, null:false}
			},

			defaultsearch: ['week_id'],

			uniques: {
				'week_name' : ['week_year', 'week_month', 'week_number']
			}
		},

		'con_weekdt' : {
			primarykeys: ['weekdt_id'],
			comment: 'Daftar Week',
			data: {
				weekdt_id: {text:'ID', type: dbtype.varchar(10), null:false},
				weekdt_date:  {text:'Date', type: dbtype.date, null:false},
				weekdt_dayname: {text:'Day Name', type: dbtype.varchar(15), null:false},
				weekdt_daynum: {text:'Day Number', type: dbtype.int(1), null:false, default:0},
				weekdt_year: {text:'Year', type: dbtype.int(4), null:false, default:0},
				weekdt_month: {text:'Month', type: dbtype.int(2), null:false, default:0},
				week_id: {text:'Week', type: dbtype.varchar(7), null:false}
			}
		}
	},

	schema: {
		title: 'Week',
		header: 'con_week',
		detils: {
			'date' : {title: 'Date', table:'con_weekdt', form: true, headerview:'week_id'},  
		}
	}
}


