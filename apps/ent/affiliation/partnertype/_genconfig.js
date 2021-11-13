'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Partner Type",
	icon : "icon-partnertype-white.png",
	autoid: false,

	persistent: {
		'mst_partnertype' : {
			primarykeys: ['partnertype_id'],
			comment: 'Daftar Tipe Partner',
			data: {
				partnertype_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true},
				partnertype_name: {text:'Partner Type', type: dbtype.varchar(60), null:false, uppercase: true},
				partnertype_descr: {text:'Descr', type: dbtype.varchar(90), null:false, uppercase: false, suppresslist: true},

				partnercategory_id: {
					text:'Category', type: dbtype.varchar(10), null:true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partnercategory', 
						field_value: 'partnercategory_id', field_display: 'partnercategory_name', field_display_name: 'partnercategory_name', 
						api: 'ent/affiliation/partnercategory/list'})					
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},


				unbill_accbudget_id: {
					text:'Budget Unbill', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'Budget Unbill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'unbill_accbudget_name', 
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_unbill_coa_id, record.coa_id, record.coa_name);
						`
					})
				},

				unbill_coa_id: {
					text:'COA Unbill', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'COA Unbill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'unbill_coa_name', 
						api: 'finact/master/coa/list'})
				},


				payable_accbudget_id: {
					text:'Budget Hutang', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'Budget Hutang harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'payable_accbudget_name', 
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_payable_coa_id, record.coa_id, record.coa_name);		`
					
					})
				},

				payable_coa_id: {
					text:'COA Hutang', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'COA Hutang harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'payable_coa_name', 
						api: 'finact/master/coa/list'})
				},

				
				partnertype_isempl: {text:'IsEmployee', type: dbtype.boolean, null:false, default:'0', suppresslist: true},	
				partnertype_ishaveae: {text:'Have AE', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'}},
				partnertype_ishavecollector: {text:'Have Collector', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: {labelWidth: '300px'}},				
				partnertype_isdisabled: {text:'Disabled', type: dbtype.boolean, null:false, default:'0'}	

			},

			defaultsearch : ['partnertype_id', 'partnertype_name'],

			uniques: {
				'partnertype_name' : ['partnertype_name']
			}
		},


		
		'mst_partnertypeaccbudget' : {
			comment: 'Account yang direlasikan ke itemclass ini',
			primarykeys: ['partnertypeaccbudget_id'],
			data: {
				partnertypeaccbudget_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				
				projectmodel_id: {
					text: 'Project Model', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'ID harus diisi' , prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_projectmodel', field_value: 'projectmodel_id', field_display: 'projectmodel_name', 
						api: 'finact/master/projectmodel/list'
					})
				},

		
				unbill_accbudget_id: {
					text:'Budget Unbill', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'Budget Unbill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'unbill_accbudget_name', 
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_unbill_coa_id, record.coa_id, record.coa_name);
						`
					})
				},

				unbill_coa_id: {
					text:'COA Unbill', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'COA Unbill harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'unbill_coa_name', 
						api: 'finact/master/coa/list'})
				},


				payable_accbudget_id: {
					text:'Budget Hutang', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'Budget Hutang harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'payable_accbudget_name', 
						api: 'finact/master/accbudget/list',
						OnSelectedScript: `
				form.setValue(obj.cbo_payable_coa_id, record.coa_id, record.coa_name);		`
					
					})
				},

				payable_coa_id: {
					text:'COA Hutang', type: dbtype.varchar(20), null:true, suppresslist: true,
					options: {required:true, invalidMessage:'COA Hutang harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'payable_coa_name', 
						api: 'finact/master/coa/list'})
				},



				partnertype_id: {text:'PartnerType', type: dbtype.varchar(14), null:false, hidden: true},	
			},

			uniques: {
				'partnertypeaccbudget_pair': ['partnertype_id', 'projectmodel_id']
			},

		},



	},

	schema: {
		title: 'Partner Type',
		header: 'mst_partnertype',
		detils: {
			'account': {title: 'Account Ovveride by Project Type', table: 'mst_partnertypeaccbudget', form: true, headerview: 'partnertype_name' },
		}
	}
}

