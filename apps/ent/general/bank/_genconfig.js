'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Bank",
	autoid: true,

	persistent: {
		'mst_bank' : {
			primarykeys: ['bank_id'],
			comment: 'Daftar Brand',
			data: {
				bank_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				bank_name: {text:'Bank', type: dbtype.varchar(60), null:false, uppercase: true},
				bank_code: {text:'Code', type: dbtype.varchar(30), null:true, uppercase: true},

				bank_phone: {text:'Phone', type: dbtype.varchar(30), null:false, suppresslist: true, uppercase: true},
				bank_email: {text:'Email', type: dbtype.varchar(30), null:true, suppresslist: true},

				bank_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'},
				bank_address: {text:'Address', type: dbtype.varchar(255), null:true, suppresslist: true},
				bank_city: {text:'City', type: dbtype.varchar(90), null:true, suppresslist: true},
				bank_prov: {text:'Provincy', type: dbtype.varchar(90), null:true, suppresslist: true},
				country_id: {
					text:'Country', type: dbtype.varchar(10), null:false, uppercase: true,
					comp: comp.Combo({
						table: 'mst_country', 
						field_value: 'country_id', field_display: 'country_name', 
						api: 'ent/general/country/list'})					
				},				
			},

			defaultsearch: ['bank_id', 'bank_name'],

			uniques: {
				'bank_name' : ['bank_name']
			}
		},
	},

	schema: {
		title: 'Bank',
		header: 'mst_bank',
		detils: {}
	}
}



