'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Event",
	autoid: true,
	icon: "icon-crmevent-white.png",

	persistent: {
		'mst_partnerreg' : {
			primarykeys: ['partner_id'],
			comment: 'Registrasi partner baru',
			data: {

				partner_id: {text:'ID', type: dbtype.varchar(14), null:false},
				partnerorg_id: {
					text:'Organisasi', type: dbtype.varchar(30), null:true, uppercase: true, 
					options:{required:true,invalidMessage:'Tipe organisasi diisi'},
					comp: comp.Combo({
						table: 'mst_partnerorg', 
						field_value: 'partnerorg_id', field_display: 'partnerorg_name', 
						api: 'ent/affiliation/partnerorg/list'})			
				},
				partnertype_id: {
					text:'Type', type: dbtype.varchar(10), null:true, uppercase: true, 
					options:{required:true,invalidMessage:'Type harus diisi'},
					comp: comp.Combo({
						table: 'mst_partnertype', 
						field_value: 'partnertype_id', field_display: 'partnertype_name', 
						api: 'ent/affiliation/partnertype/list'})					
				
				},

				partner_name: {text:'Name', type: dbtype.varchar(30), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				partner_dirut: {text:'Dirut', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Nama Direktur Utama harus diisi'}},
				partner_dir: {text:'Direktur', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true,  options:{required:true,invalidMessage:'Nama Direktur Utama harus diisi'}},

				partner_addressline1: {text:'Alamat', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Alamat harus diisi'}},
				partner_addressline2: {text:'', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true,},
				partner_addressline3: {text:'', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true, },
				partner_city: {text:'City', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Kota harus diisi'}},
				partner_country: {
					text:'Negara', type: dbtype.varchar(10), null:true, uppercase: true, suppresslist: true, 
					options:{required:true,invalidMessage:'Negara harus diisi'},
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/general/country/list'})	
				},

				partner_postcode: {text:'Kodepos', type: dbtype.varchar(10), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Kodepos harus diisi'}},
				partner_billaddrline1: {text:'Alamat Bill', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Alamat penagihan harus diisi'}},
				partner_billaddrline2: {text:'', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true},
				partner_billaddrline3: {text:'', type: dbtype.varchar(100), null:true, uppercase: true, suppresslist: true},
				partner_phone1: {text:'Phone', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'Phone harus diisi'}},	
				partner_phone2: {text:'', type: dbtype.varchar(30), uppercase: true, suppresslist: true},	
				partner_phone3: {text:'', type: dbtype.varchar(30), uppercase: true, suppresslist: true},	
				partner_phone4: {text:'', type: dbtype.varchar(30), uppercase: true, suppresslist: true},	
				partner_fax1: {text:'Fax', type: dbtype.varchar(30), null:true, uppercase: true, suppresslist: true},	
				partner_fax2: {text:'', type: dbtype.varchar(30), uppercase: true, suppresslist: true},	
				partner_email1: {text:'Email', type: dbtype.varchar(150), null:true, uppercase: true, suppresslist: true},
				partner_email2: {text:'', type: dbtype.varchar(150), null:true, uppercase: true, suppresslist: true},
				partner_aktanoth: {text:'Akta No/Tahun', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'No/tahun akta harus diisi'}},	
				partner_siupno: {text:'No SIUP', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'No SIUP harus diisi'}},	
				partner_sk: {text:'No SK', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'No SK'}},	
				partner_tdp: {text:'No TDP', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'No TDP'}},	
				partner_bank: {text:'No Rek Bank', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'No Rekening Bank'}},	
				partner_npwp: {text:'No NPWP', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true, options:{required:true,invalidMessage:'NPWP harus diisi'}},	
				partner_cf1: {text:'CF1', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf2: {text:'CF2', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf3: {text:'CF3', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf4: {text:'CF4', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf5: {text:'CF5', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf6: {text:'CF6', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},	
				partner_cf7: {text:'CF7', type: dbtype.varchar(90), null:true, uppercase: true, suppresslist: true},
				
				partner_isdisabled: {text:'Disabled', type: dbtype.boolean, null:true, default:'0'},
				partner_isapproved: {text:'Approved', type: dbtype.boolean, null:true, default:'0'},
				partner_apprby: {text:'Approve By', type: dbtype.varchar(90), null:true, suppresslist: true, options:{disabled:true}},
				partner_apprdt: {text:'Approve Date', type: dbtype.varchar(90), null:true, suppresslist: true, options:{disabled:true}},
			}
		},

		'mst_partneruser' : {
			primarykeys: ['partneruser_id'],
			comment: 'Login partner',
			data: {			
				partneruser_id: {text:'ID', type: dbtype.varchar(14), null:false},
				partneruser_email1: {text:'Email', type: dbtype.varchar(150), null:false, uppercase: true},
				partneruser_password: {text:'Password', type: dbtype.varchar(150), null:false, uppercase: true, suppresslist: true},
				partneruser_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				partner_id: {text:'Partner', type: dbtype.varchar(14), null:false, uppercase: true},
			}
		},

	},

	schema: {
		title: 'Partner Register',
		header: 'mst_partnerreg',
		detils: {
			'user' : {title: 'User', table:'mst_partneruser', form: true, headerview:'partner_name'}
		}
	}
}
