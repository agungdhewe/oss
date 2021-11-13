'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Message",
	autoid: true,

	persistent: {
		'trn_crmmsgcs' : {
			primarykeys: ['crmmsgcs_id'],
			comment: 'Sumber2 perpesanan/call',
			data: {
				crmmsgcs_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmmsgcs_phonenumber: {text:'Phone Number', type: dbtype.varchar(60), null:true, uppercase: true},
				crmmsgcs_email: {text:'Email', type: dbtype.varchar(60), null:true, lowercase: true},
				crmmsgcs_name: {text:'Nama', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama harus diisi'}},
				crmmsgsource_id: { 
					text: 'Source', type: dbtype.varchar(5), uppercase: true, null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Source harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_crmmsgsource',
						field_value: 'crmmsgsource_id', field_display: 'crmmsgsource_name',
						api: 'crm/master/crmmsgsource/list'
					})
				}				
			},
			defaultsearch : ['crmmsgcs_id', 'crmmsgcs_name'],
		},

		'trn_crmmsgcsitem' : {
			primarykeys: ['crmmsgcsitem_id'],
			comment: 'Sumber2 perpesanan/call',
			data: {
				crmmsgcsitem_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmmsgcsitem_message: {text:'Message', type: dbtype.varchar(5000), suppresslist: true},

				crmmsgclass_id: { 
					text: 'Klasifikasi', type: dbtype.varchar(10), uppercase: true, null: false,
					options: { required: true, invalidMessage: 'Klasifikasi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_crmmsgclass',
						field_value: 'crmmsgclass_id', field_display: 'crmmsgclass_name',
						api: 'crm/master/crmmsgclass/list'
					})
				},				

				brand_id: { 
					text: 'Brand', type: dbtype.varchar(14), null: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_brand',
						field_value: 'brand_id', field_display: 'brand_name',
						api: 'ent/affiliation/brand/list'
					})
				},
				
				site_id: { 
					text: 'Site', type: dbtype.varchar(30), null: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_site',
						field_value: 'site_id', field_display: 'site_name',
						api: 'ent/location/site/list'
					})
				},

				crmmsgcs_id: {text:'Msg.ID', type: dbtype.varchar(14), null:false},
			},
			
			defaultsearch : ['crmmsgcs_id', 'crmmsgcs_name'],
		},


		'trn_crmmsgcstx': {
			comment: 'Log Failure Item Asset',
			primarykeys: ['crmmsgcstx_id'],
			data: {
				crmmsgcstx_id: {text:'ID', type: dbtype.varchar(14), null:false},
				crmmsgcstx_date: {text:'Date', type: dbtype.date, null:false},
				crmmsgcstx_value: { text: 'Value', type: dbtype.varchar(30), null: true, uppercase: true }
			}
		},

	},

	schema: {
		title: 'Source',
		header: 'trn_crmmsgcs',
		detils: {
			'message' : {title: 'Message', table:'trn_crmmsgcsitem', form: true, headerview:'crmmsgcs_name'},
			'tx' : {title: 'Transactions', table:'trn_crmmsgcstx', form: true, headerview:'crmmsgcs_name'}
		}
	}
}

