'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Tanda Terima Sementara",
	autoid: true,
	idprefix: 'TS',
	printing: true,
	icon: "icon-receipt-white.svg",
	backcolor: "#9e4d53",

	persistent: {
		'trn_temprecv' : {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['temprecv_id'],
			data: {
				temprecv_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				temprecv_ref: { text: 'Ref', type: dbtype.varchar(30), null: true, uppercase: true , suppresslist: true},
				temprecv_date: { text: 'Date', type: dbtype.date, null: false },
				temprecv_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				temprecv_bgnum: { text: 'No Giro', type: dbtype.varchar(90), suppresslist: true, null: false },

				temprecv_isadvance: { text: 'Advance', type: dbtype.boolean, null: false, default: '0', options: {} },

				temprecv_validrtotal: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				temprecv_taxidrtotal: { text: 'Tax', type: dbtype.decimal(14, 2), suppresslist: true, null: false, default: 0, options: { required: true } },


				paymtype_id: {
					options:{required:true,invalidMessage:'Payment Type harus diisi', prompt:'-- PILIH --'},
					text:'Tipe Payment', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_paymtype', 
						field_value: 'paymtype_id', field_display: 'paymtype_name',  field_display_name: 'paymtype_name',
						api: 'finact/master/paymenttype/list'})
				},

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				coa_id: {
					options:{required:true,invalidMessage:'COA harus diisi', prompt:'-- PILIH --'},
					tips: 'Account AR Partner',
					text:'COA', type: dbtype.varchar(17), null:false, 
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'coa_name',
						api: 'finact/master/coa/list'})
				},

				empl_id: {
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},

				dept_id: {
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					text:'Dept', type: dbtype.varchar(30), null:false,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name',  field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'})
				},

				jurnal_id_or: {
					options:{required:true, prompt:'NONE'},
					text:'Jurnal OR', type: dbtype.varchar(14), null:true,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_jurnal', 
						field_value: 'jurnal_id', field_display: 'jurnal_descr',  field_display_name: 'jurnal_descr_or',
						api: 'finact/act/jurnal/list'})
				},

				jurnal_id_tax: {
					options:{required:true, prompt:'NONE'},
					text:'Jurnal Tax', type: dbtype.varchar(14), null:true,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_jurnal', 
						field_value: 'jurnal_id', field_display: 'jurnal_descr',  field_display_name: 'jurnal_descr_tax',
						api: 'finact/act/jurnal/list'})
				},				

				trxmodel_id: {
					options:{required:true,invalidMessage:'Model Transaksi harus diisi', prompt:'-- PILIH --'},
					text:'TrxModel', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_trxmodel', 
						field_value: 'trxmodel_id', field_display: 'trxmodel_name',  field_display_name: 'trxmodel_name',
						api: 'finact/master/trxmodel/list'})
				},
			},

			defaultsearch: ['temprecv_id', 'temprecv_descr']
		},


		'trn_temprecvdetil': {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['temprecvdetil_id'],
			data: {
				temprecvdetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },
				temprecvdetil_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				temprecvdetil_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				temprecvdetil_taxidr: { text: 'Tax', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				billout_id: {
					text: 'Tagihan Keluar', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'finact/collection/temprecv/list-tagihan'
					})
				},
				
				coa_id_or: {
					options:{required:true,invalidMessage:'COA harus diisi', prompt:'-- PILIH --'},
					text:'COA OR', type: dbtype.varchar(17), null:false, 
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'coa_name',
						api: 'finact/master/coa/list'})
				},
				
				coa_id_tax: {
					options:{required:true,invalidMessage:'COA harus diisi', prompt:'-- PILIH --'},
					text:'COA Tax', type: dbtype.varchar(17), null:false, 
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'coa_name',
						api: 'finact/master/coa/list'})
				},				

				temprecv_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
			},
			
			defaultsearch: ['billout_id', 'temprecvdetil_descr']
		}		
		
	},

	schema: {
		header: 'trn_temprecv',
		detils: {
			'detil': {title: 'Detil', table: 'trn_temprecvdetil', form: true, headerview: 'temprecv_descr' },
		}
	}


}