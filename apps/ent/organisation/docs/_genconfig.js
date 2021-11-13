
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Documents",
	autoid: false,

	persistent: {

		'mst_doc' : {
			primarykeys: ['doc_id'],
			comment: 'Daftar Dokumen',
			data: {
				doc_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},
				doc_name: {text:'Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Dokumen harus diisi'}},
				doc_code: {text:'Doc Code', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Kode Dokumen harus diisi'}},
				doc_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				doc_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				doc_config: {text:'Config', type: dbtype.varchar(2000), null:true, uppercase: false, suppresslist: true},
			},
			defaultsearch: ['doc_id', 'doc_code', 'doc_descr'],
			uniques: {
				'doc_name' : ['doc_name']
			}
		},

		'mst_docauth' : {
			primarykeys: ['docauth_id'],
			comment: 'Daftar Authorisasi dokumen.',			
			data : {
				docauth_id: {text:'ID', type: dbtype.varchar(14), null:false},
				docauth_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				docauth_order: {text:'Order', type: dbtype.int(4), null:false, default:0, suppresslist: true},
				docauth_value: {text:'Value', type: dbtype.int(4), null:false, default:100, suppresslist: true},
				docauth_min: {text:'Min', type: dbtype.int(4), null:false, default:0, suppresslist: true},

				authlevel_id: {
					text:'Level', type: dbtype.varchar(10), null:false, uppercase: true,
					options:{required:true,invalidMessage:'Level Authorisasi harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_authlevel', 
						field_value: 'authlevel_id', field_display: 'authlevel_name', 
						api: 'ent/organisation/authlevel/list'})
				},	

				auth_id: {
					text:'Authorisasi', type: dbtype.varchar(10), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_auth', 
						field_value: 'auth_id', field_display: 'auth_name', 
						api: 'ent/organisation/auth/list'})				
				},				

				doc_id: {text:'ID', type: dbtype.varchar(30), null:false, uppercase: true},
			},
			uniques: {
				'docauth_id' : ['doc_id', 'authlevel_id', 'auth_id'],
				'docauth_order' : ['doc_id', 'docauth_order'],
			}
		}
	},


	schema: {
		title: 'Document',
		header: 'mst_doc',
		detils: {
			'auth' : {title: 'Authorisasi', table:'mst_docauth', form: true, headerview:'doc_id'}, 
		}
	}

}
