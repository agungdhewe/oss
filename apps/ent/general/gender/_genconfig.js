'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Gender",
	autoid: false,

	persistent: {
		'mst_gender' : {
			primarykeys: ['gender_id'],
			comment: 'Master Gender',
			data: {
				gender_id: {text:'ID', type: dbtype.varchar(7), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				gender_name: {text:'Gender', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Gender harus diisi'}},
			},

			defaultsearch : ['gender_id', 'gender_name'],

			uniques: {
				'gender_name' : ['gender_name']
			},

			values: [
				{gender_id:'M', gender_name:'MAN'},
				{gender_id:'W', gender_name:'WOMAN'},
			],			
		}
	},

	schema: {
		title: 'Gender',
		header: 'mst_gender',
		detils: {}
	}
}

