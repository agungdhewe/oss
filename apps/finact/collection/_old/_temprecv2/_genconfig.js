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

				temprecv_validrtotal: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },
				temprecv_taxidrtotal: { text: 'Tax', type: dbtype.decimal(14, 2), suppresslist: true, null: false, default: 0, options: { required: true } },

				temprecv_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				temprecv_commitby: { text: 'Cimmit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true },
				temprecv_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				empl_id: {
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
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