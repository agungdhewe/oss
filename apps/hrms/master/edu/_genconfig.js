'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Education",
	autoid: false,

	persistent: {
		'mst_edu' : {
			primarykeys: ['edu_id'],
			comment: 'Master Education',
			data: {
				edu_id: {text:'ID', type: dbtype.varchar(7), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				edu_name: {text:'Education Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Education harus diisi'}},
				edu_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['edu_id', 'edu_name'],

			uniques: {
				'edu_name' : ['edu_name']
			},

			values: [
				{edu_id:'SD', edu_name:'SD'},
				{edu_id:'SMP', edu_name:'SMP / Sederajat'},
				{edu_id:'SMA', edu_name:'SMA / Sederajat'},
				{edu_id:'D1', edu_name:'Diploma 1'},
				{edu_id:'D3', edu_name:'Diploma 2'},
				{edu_id:'S1', edu_name:'Strata 1'},
				{edu_id:'S2', edu_name:'Starta 2'},
				{edu_id:'S3', edu_name:'Starta 3'},
			],			
		}
	},

	schema: {
		title: 'Education',
		header: 'mst_edu',
		detils: {}
	}
}

