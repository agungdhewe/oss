'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Assign Target Collector",
	icon: "icon-colltarget-white.svg",
	backcolor: "#1b7486",
	autoid: true,

	persistent: {
		'trn_colltarget' : {
			comment: 'Daftar Target Collector bulanan',
			primarykeys: ['colltarget_id'],
			data: {
				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false},
				colltarget_date:  {text:'Date', type: dbtype.date, null:false},
				colltarget_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				colltarget_commitby: { text: 'Commit By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden:true },
				colltarget_commitdate: { text: 'Commit Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden:true },
				partner_id: {
					options:{required:true, invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'finact/collection/collector/list-partnercollector'})
				},
				empl_id: {
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'finact/collection/collector/list-collector'})
				},							
			},
			defaultsearch: ['colltarget_id'],
			uniques: {
				'colltarget_date' : ['colltarget_date', 'partner_id']
			}
		},

		'trn_colltargetbillout' : {
			comment: 'Daftar Bill dari collector',
			primarykeys: ['colltargetbillout_id'],
			data: {
				colltargetbillout_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				colltargetbillout_notes: { text: 'Notes', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },
				billout_id: {
					text: 'Tagihan', type: dbtype.varchar(14), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'finact/fin/billout/list'
					})
				},	
				billouttotal_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },
				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false},
			}
		}
	},

	schema: {
		title: 'Assign Collector',
		header: 'trn_colltarget',
		detils: {
			'billout': {title: 'Bill', table: 'trn_colltargetbillout', form: true, headerview: 'colltarget_date' },
		}
	}
}
