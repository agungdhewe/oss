'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Config",
	autoid: false,

	persistent: {
		'mst_config' : {
			primarykeys: ['config_id'],
			comment: 'Daftar Config',
			data: {
				config_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},
				config_name: {text:'Config', type: dbtype.varchar(30), null:false, uppercase: true}	,
				config_dir: {text:'Directory', type: dbtype.varchar(100), null:false},
				config_filename: {text:'File', type: dbtype.varchar(100), null:false},			
			},

			defaultsearch : ['config_id', 'config_name'],

			uniques: {
				'config_name' : ['config_name']
			},

			values: [
				{config_id:'C001', config_name:'MARIADB', config_dir:'', config_filename:''},
				{config_id:'C002', config_name:'SQLSERVER', config_dir:'', config_filename:''},
				{config_id:'C003', config_name:'POSGRE', config_dir:'', config_filename:''}
			]
		},
	},

	schema: {
		title: 'Config',
		header: 'mst_config',
		detils: {}
	}
}



