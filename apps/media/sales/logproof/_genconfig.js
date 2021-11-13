'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Log Proof",
	autoid: true,

	persistent: {
		'trn_medialogproof' : {
			comment: 'Daftar Schedule harian',
			primarykeys: ['medialogproof_id'],
			data: {
				medialogproof_id:  {text:'ID', type: dbtype.varchar(14), null:false},
				medialogproof_date:  {text:'Date', type: dbtype.date, null:false},
				medialogproof_iscommit: { text: 'Commit', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
			},
			defaultsearch: ['medialogproof_id', 'medialogproof_date'],
			uniques: {
				'medialogproof_date' : ['medialogproof_date']
			}
		},

		'trn_medialogproofitem' : {
			comment: 'Daftar Schedule harian',
			primarykeys: ['medialogproofitem_id'],
			data: {
				medialogproofitem_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				mediaadslot_timestart: { text: 'Mulai', type: dbtype.varchar(90), suppresslist: true, null: false, uppercase: true, options: { required: true, invalidMessage: 'Waktu Mulai harus diisi' } },
				mediaadslot_timeend: { text: 'Selesai', type: dbtype.varchar(90), suppresslist: true, null: false, uppercase: true, options: { required: true, invalidMessage: 'Waktu Selesai harus diisi' } },
				mediaadslot_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: false },
				actual_timestart: { text: 'Mulai', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Waktu Actual Mulai harus diisi' } },
				actual_timeend: { text: 'Selesai', type: dbtype.varchar(90), null: false, uppercase: true, options: { required: true, invalidMessage: 'Waktu Actual Selesai harus diisi' } },
				actual_duration: { text: 'Durasi', type: dbtype.decimal(5,2), null: false, uppercase: true, options: { required: true, invalidMessage: 'Durasi' } },
				medialogproofitem_spot: { text: 'Spot', type: dbtype.varchar(10), suppresslist: true },

				mediaorderitem_id: {
					text: 'Media Order', type: dbtype.varchar(14), null: true, suppresslist: false,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_mediaorderitem',
						field_value: 'mediaorderitem_id', field_display: 'mediaorderitem_descr',
						api: 'media/sales/mediaorder/item-list'
					})
				},	
				medialogproof_id:  {text:'ID', type: dbtype.varchar(14), null:false},
			}
		}
	},

	schema: {
		title: 'Log Proof',
		header: 'trn_medialogproof',
		detils: {
			'item': {title: 'Item', table: 'trn_medialogproofitem', form: true, headerview: 'medialogproof_date' },
		}
	}
}
