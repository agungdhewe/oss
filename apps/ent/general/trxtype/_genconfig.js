'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tipe Transaksi",
	autoid: false,

	persistent: {
		'mst_trxtype' : {
			primarykeys: ['trxtype_id'],
			comment: 'Master Tupe Transaksi',
			data: {
				trxtype_id: {text:'ID', type: dbtype.varchar(3), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				trxtype_name: {text:'Type Transaksi', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Tipe Transaksi Name harus diisi'}}
			},

			defaultsearch : ['religion_id', 'religion_name'],

			uniques: {
				'religion_name' : ['religion_name']
			},
			
			values: [
				{religion_id:'R01', religion_name:'ISLAM'},
				{religion_id:'R02', religion_name:'KRISTEN'},
				{religion_id:'R03', religion_name:'KATHOLIK'},
				{religion_id:'R04', religion_name:'HINDU'},
				{religion_id:'R05', religion_name:'BUDHA'},
				{religion_id:'R06', religion_name:'KONGHUCHU'},
				{religion_id:'R07', religion_name:'KEPERCAYAAN TERHADAP TUHAN YME'}
			],			

		}

	},

	schema: {
		title: 'Religion',
		header: 'mst_religion',
		detils: {}
	}
}



