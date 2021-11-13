'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Sentiment",
	autoid: false,

	persistent: {
		'mst_crmmsgsentiment' : {
			primarykeys: ['crmmsgsentiment_id'],
			comment: 'Penggolongan sentiment message',
			data: {
				crmmsgsentiment_id: {text:'ID', type: dbtype.varchar(5), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				crmmsgsentiment_name: {text:'Sentiment Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmmsgsentiment_value: {text:'Value', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
			},

			defaultsearch : ['crmmsgsentiment_id', 'crmmsgsentiment_id'],
			uniques: {
				'crmmsgsentiment_name' : ['crmmsgsentiment_name']
			},

			values: [
				{crmmsgsentiment_id:'NEU', crmmsgsentiment_name:'NEUTRAL', crmmsgsentiment_value:0},
				{crmmsgsentiment_id:'POS', crmmsgsentiment_name:'POSITIVE', crmmsgsentiment_value:1},
				{crmmsgsentiment_id:'NEG', crmmsgsentiment_name:'NEGATIVE', crmmsgsentiment_value:-1},
			],			
		}
	},

	schema: {
		title: 'Sentiment',
		header: 'mst_crmmsgsentiment',
		detils: {}
	}
}

