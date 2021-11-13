'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Model Depresiasi",
	autoid: false,

	persistent: {
		'mst_depremodel': {
			comment: 'Daftar Model',
			primarykeys: ['depremodel_id'],
			data: {
				depremodel_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				depremodel_name: { text: 'Depre Model', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama model harus diisi' } },
				depremodel_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				depremodel_formulaname: { text: 'Formula Name', type: dbtype.varchar(50), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Nama formula harus diisi' } },
			},

			uniques: {
				'depremodel_name': ['depremodel_name']
			},
			defaultsearch: ['depremodel_id', 'depremodel_name'],

			values: [
				{depremodel_id:'NO', depremodel_name:'NONE (DIRECT)', depremodel_formulaname:'DIRECT'},
				{depremodel_id:'MN', depremodel_name:'MANUAL', depremodel_formulaname:''},
				{depremodel_id:'SL', depremodel_name:'STRAIGHT LINE', depremodel_formulaname:'STRAIGHTLINE'},
				{depremodel_id:'DD', depremodel_name:'DOUBLE DECLINING BALANCE', depremodel_formulaname:''},
				{depremodel_id:'SY', depremodel_name:'SUM OF YEARS DIGIT', depremodel_formulaname:''}
			]
		},

	},

	schema: {
		header: 'mst_depremodel',
		detils: {
		}
	}


}