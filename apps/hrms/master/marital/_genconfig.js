'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Marital",
	autoid: false,

	persistent: {
		'mst_marital' : {
			primarykeys: ['marital_id'],
			comment: 'Master Marital',
			data: {
				marital_id: {text:'ID', type: dbtype.varchar(2), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				marital_name: {text:'Marital Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Marital name harus diisi'}},
				marital_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				marital_ptkpval: {text:'Ptkp Tambahan', type: dbtype.decimal(8,0), null:false, default:'0'},
			},


			defaultsearch : ['marital_id', 'marital_name'],

			uniques: {
				'marital_name' : ['marital_name']
			},

			values: [
				{marital_id:'TK', marital_name:'Tidak Menikah', marital_descr:'Tidak Menikah', marital_ptkpval:0},
				{marital_id:'K0', marital_name:'Menikah - K0', marital_descr:'Menikah, Tidak ada anak', marital_ptkpval:4500000},
				{marital_id:'K1', marital_name:'Menikah - K1', marital_descr:'Menikah, Anak 1', marital_ptkpval:9000000},
				{marital_id:'K2', marital_name:'Menikah - K2', marital_descr:'Menikah, Anak 2', marital_ptkpval:13500000},
				{marital_id:'K3', marital_name:'Menikah - K3', marital_descr:'Menikah, Anak 3', marital_ptkpval:18000000}
			],			
		}
	},

	schema: {
		title: 'Marital',
		header: 'mst_marital',
		detils: {}
	}
}

