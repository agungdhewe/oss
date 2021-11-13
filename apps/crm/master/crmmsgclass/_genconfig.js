'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Message Classification",
	autoid: false,

	persistent: {
		'mst_crmmsgclass' : {
			primarykeys: ['crmmsgclass_id'],
			comment: 'Daftar Kalisfikasi Message',
			data: {
				crmmsgclass_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				crmmsgclass_name: {text:'Klasifikasi', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Klasifikasi harus diisi'}},
				crmmsgclass_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				crmmsgclass_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				crmmsgsentiment_id: { 
					text: 'Sentiment', type: dbtype.varchar(5), uppercase: true, null: false,   suppresslist: true,
					options: { required: true, invalidMessage: 'Sentiment harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_crmmsgsentiment',
						field_value: 'crmmsgsentiment_id', field_display: 'crmmsgsentiment_name',
						api: 'crm/master/crmmsgsentiment/list'
					})
				}				
			},

			defaultsearch : ['crmmsgclass_id', 'crmmsgclass_name'],
			uniques: {
				'crmmsgclass_name' : ['crmmsgclass_name']
			},

			values: [
				{crmmsgclass_id:'CSMC001', crmmsgclass_name:'ASK DIRECTION', crmmsgclass_order:'10', crmmsgsentiment_id:'NEU'},
				{crmmsgclass_id:'CSMC002', crmmsgclass_name:'COMPLAIN', crmmsgclass_order:'20', crmmsgsentiment_id:'NEG'},
				{crmmsgclass_id:'CSMC003', crmmsgclass_name:'ASK AFTERSALES', crmmsgclass_order:'30', crmmsgsentiment_id:'NEU'},
				{crmmsgclass_id:'CSMC004', crmmsgclass_name:'ASK ??', crmmsgclass_order:'40', crmmsgsentiment_id:'NEU'},
				{crmmsgclass_id:'CSMC005', crmmsgclass_name:'ASK ???', crmmsgclass_order:'50', crmmsgsentiment_id:'NEU'},
			],			
		}
	},

	schema: {
		title: 'Message Classification',
		header: 'mst_crmmsgclass',
		detils: {}
	}
}

