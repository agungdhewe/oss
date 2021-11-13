'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Site Group",
	autoid: false,

	persistent: {
		'mst_sitegroup' : {
			primarykeys: ['sitegroup_id'],
			comment: 'Master Site Group',
			data: {
				sitegroup_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				sitegroup_name: {text:'Site Group Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group Site harus diisi'}},
				sitegroup_descr: {text:'Descr', type: dbtype.varchar(90), null:true, suppresslist: true}
			},

			defaultsearch : ['sitegroup_id', 'sitegroup_name'],

			uniques: {
				'sitegroup_name' : ['sitegroup_name']
			}			
		}
	},

	schema: {
		title: 'Site Group',
		header: 'mst_sitegroup',
		detils: {}
	}
}

