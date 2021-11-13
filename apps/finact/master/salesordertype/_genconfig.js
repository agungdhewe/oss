'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
  title: "Sales Order Type",
  autoid: false,

  persistent: {
    'mst_salesordertype': {
		comment: 'Daftar tipe-tipe Sales Order',
		primarykeys: ['salesordertype_id'],
		data: {
			salesordertype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
			salesordertype_name: { text: 'Type Sales Order', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Sales Order harus diisi' } },
			salesordertype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
			trxmodel_id: { 
				text: 'Transaksi', type: dbtype.varchar(10), uppercase: true, null: false, 
				options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
				comp: comp.Combo({
					table: 'mst_trxmodel', 
					field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
					api: 'finact/master/trxmodel/list'})				
			
			},

			sales_coa_id: { 
				text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
				options: { required: true, invalidMessage: 'COA Sales harus diisi' }, 
				comp: comp.Combo({
					table: 'mst_coa', 
					field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
					api: 'finact/master/coa/list'})				
			
			},	
			
			discount_coa_id: { 
				text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
				options: { required: true, invalidMessage: 'COA Discount harus diisi' }, 
				comp: comp.Combo({
					table: 'mst_coa', 
					field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'discount_coa_name', 
					api: 'finact/master/coa/list'})				
		
			},	

			unbill_coa_id: { 
				text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
				options: { required: true, invalidMessage: 'COA Unbill harus diisi' }, 
				comp: comp.Combo({
					table: 'mst_coa', 
					field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'unbill_coa_name', 
					api: 'finact/master/coa/list'})				
		
			},			

		},
		uniques: {
       		'salesordertype_name': ['salesordertype_name']
      	},
		defaultsearch: ['salesordertype_id', 'salesordertype_name'],
		
		values: [
			{salesordertype_id:'MO', salesordertype_name:'MEDIA ORDER', trxmodel_id:'SAL', sales_coa_id:'5050001',  discount_coa_id:'5050002',  unbill_coa_id:'1051000'},
			{salesordertype_id:'SA', salesordertype_name:'SALES ORDER', trxmodel_id:'SAL', sales_coa_id:'5050001',  discount_coa_id:'5050002',  unbill_coa_id:'1051000'},
			{salesordertype_id:'WSO', salesordertype_name:'WHOLESALE ORDER', trxmodel_id:'SAL', sales_coa_id:'5050001',  discount_coa_id:'5050002',  unbill_coa_id:'1051000'}
		]
    }
  },

  schema: {
    header: 'mst_salesordertype',
    detils: {
    }
  }
}