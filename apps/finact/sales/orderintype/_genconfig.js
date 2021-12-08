'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Order In Type",
	autoid: false,

	persistent: {
    	'mst_orderintype': {
			comment: 'Daftar tipe-tipe Sales Order',
			primarykeys: ['orderintype_id'],
			data: {

				orderintype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				orderintype_name: { text: 'Order Type Name', type: dbtype.varchar(30), uppercase: true, options: { required: true, invalidMessage: 'Tipe Sales Order harus diisi' } },
				orderintype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				trxmodel_id: { 
					text: 'Transaksi', type: dbtype.varchar(10), uppercase: true, null: false, 
					options: { required: true, invalidMessage: 'Model Transaksi harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name', field_display_name: 'trxmodel_name', 
						api: 'finact/master/trxmodel/list-selector',
						staticfilter: `
							criteria.trxmodel_direction='IN' 
						`
					})				
				},

				orderintype__isdateinterval: { text: 'Date Interval', type: dbtype.boolean, null: false, default: '0', suppresslist: true },


				ppn_taxtype_id: { text: 'PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'ppn_taxtype_name', 
						api: 'finact/master/taxtype/list-selector',
						staticfilter: `
							criteria.taxmodel_id='PPN' 
						`,
						OnSelectedScript: `
				form.setValue(obj.txt_ppn_taxvalue, record.taxtype_value)
				form.setValue(obj.chk_ppn_include, record.taxtype_include)						
						`			
					})				
				},
				ppn_taxvalue: { text: 'PPN Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
				ppn_include: {text:'PPN Include', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options: { disabled: true}},


				pph_taxtype_id: { text: 'PPh', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					comp: comp.Combo({
						table: 'mst_taxtype', 
						field_value: 'taxtype_id', field_display: 'taxtype_name', field_display_name: 'pph_taxtype_name', 
						api: 'finact/master/taxtype/list-selector',
						staticfilter: `
							criteria.taxmodel_id='PPH' 
						`,
						OnSelectedScript: `
				form.setValue(obj.txt_pph_taxvalue, record.taxtype_value)
						`
					})				
				},
				pph_taxvalue: { text: 'PPH Value (%)', type: dbtype.decimal(4,2), null: false, default:0, suppresslist: true, options: { disabled: true} },
	

				// AR -> Berdasar tipe pembayaran
				// Sales Disc
				// Biaya Administrasi  -> Berdasarkan data cara pembayaran via EDC, online, etc
				// Sales
				// Biaya Subsidi PPN
				// PPN Payable
				// PPH Prepaid
				// Expedisi
				// Expedisi Accru



				sales_coa_id: { 
					text: 'COA Sales', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'OrderIn Sales COA harus diisi' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'sales_coa_name', 
						api: 'finact/master/coa/list'})				
				
				},	
				
				salesdisc_coa_id: { 
					text: 'COA Disc Sales', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'salesdisc_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppn_coa_id: { 
					text: 'COA PPN Payable', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppn_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				ppnsubsidi_coa_id: { 
					text: 'COA Subsidi PPN', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: 'Apabila PPN include COA ini perlu diisi',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'ppnsubsidi_coa_name', 
						api: 'finact/master/coa/list'})				
				},

				pph_coa_id: { 
					text: 'COA PPH Prepaid', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { prompt: 'NONE' }, 
					tips: '',
					tipstype: 'visible',
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'pph_coa_name', 
						api: 'finact/master/coa/list'})				
				},				



			},
			uniques: {
				'orderintype_name': ['orderintype_name']
			},
			defaultsearch: ['orderintype_id', 'orderintype_name']
		

    	}
	},

	schema: {
		header: 'mst_orderintype',
		detils: {
		}
	}
}