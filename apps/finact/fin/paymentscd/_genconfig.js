'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jadwal Pembayaran",
	autoid: true,
	// icon: "icon-receipt-white.svg",
	// backcolor: "#9e4d53",
	// idprefix: 'PA',
	printing: true,
	// committer: true,
	// approval: true,
	// doc_id: 'BILLIN',


	persistent: {
	
		// jadwal pembayaran
		'trn_billinpaym' : {
			comment: 'Jadwal pembayaran tagihan',
			primarykeys: ['billinpaym_id'],		
			data: {
				billinpaym_id: { text: 'ID', type: dbtype.varchar(14), null: false,  suppresslist: true, },
				billin_id: { text: 'Bill ID', type: dbtype.varchar(14), null: false, suppresslist: true },

				billinpaym_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				billinpaym_descr: { text: 'Descr', type: dbtype.varchar(255), null: false,  options: { required: true, invalidMessage: 'Descr harus diisi' } },

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				billinpaym_frgrate: { text: 'Rate', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true } },


				billinpaym_itemfrg: { text: 'Item Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_itemidr: { text: 'Item IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billinpaym_ppnfrg: { text: 'PPN Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_ppnidr: { text: 'PPN IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

				billinpaym_pphfrg: { text: 'PPh Value', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: true, options: { required: true } },
				billinpaym_pphidr: { text: 'PPh IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false, options: { required: true } },

		
			}	
		},
		
	},

	schema: {
		header: 'trn_billinpaym',
		detils: {
		}
	}


}