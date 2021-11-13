'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "HR Grade",
	autoid: false,

	persistent: {
		'mst_hrgrd' : {
			primarykeys: ['hrgrd_id'],
			comment: 'Master HR Grade',
			data: {
				hrgrd_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				hrgrd_name: {text:'Grade Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Grade harus diisi'}},
				hrgrd_group: {text:'Group', type: dbtype.varchar(90), null:true, suppresslist: true},
				hrgrd_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true},
				hrgrd_order: {text:'Order', type: dbtype.int(4), null:false, default:0, suppresslist: true}
			},

			defaultsearch : ['hrgrd_id', 'hrgrd_name'],

			uniques: {
				'hrgrd_name' : ['hrgrd_name']
			},

			values: [
				{hrgrd_id:'DIREC', hrgrd_name:'DIRECTOR', hrgrd_order:100},
				{hrgrd_id:'DIVHD', hrgrd_name:'DIVISION HEAD / GENERAL MANAGER', hrgrd_order:200},
				{hrgrd_id:'DEPHD', hrgrd_name:'DEPARTMENT HEAD', hrgrd_order:300},
				{hrgrd_id:'SECHD', hrgrd_name:'SECTION HEAD', hrgrd_order:400},
				{hrgrd_id:'ASSOC', hrgrd_name:'ASSOCIATE/SUPERVISOR', hrgrd_order:500},
				{hrgrd_id:'EXECV', hrgrd_name:'EXECUTIVE', hrgrd_order:600},
				{hrgrd_id:'STAFF', hrgrd_name:'STAFF', hrgrd_order:700},
				{hrgrd_id:'CLERK', hrgrd_name:'CLERK', hrgrd_order:800}
			],			
		}
	},

	schema: {
		title: 'HR Grade',
		header: 'mst_hrgrd',
		detils: {}
	}
}

