'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collector Schedule Update",
	autoid: true,
	printing: true,


	persistent: {
		'trn_colltarget' : {
			comment: 'Daftar Target Collector bulanan',
			primarykeys: ['colltarget_id'],
			data: {
				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false},
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true,
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})				
				},				
				empl_id: {
					text:'Collector', type: dbtype.varchar(30), null:true, 
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'finact/collection/collector/list-collector'})
				},

				dept_id: {
					text:'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{required:true, invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name',  field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'})
				},

				colltarget_discprop: { text: 'Avg Disc(%) Proposed', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},

				colltarget_idr: { 
					section: section.Begin('Value'), 
					text: 'Total Bill Value', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_discval: { text: 'Total Disc', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_idrtotal: { text: 'Total IDR', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_idrtopay: { 
					section: section.End(),
					text: 'Payment', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},

			},
			defaultsearch: ['colltarget_id'],
			uniques: {
				'colltarget_emplperiodemo' : ['periodemo_id', 'empl_id']
			}
		},

		'trn_colltargetbillout' : {
			comment: 'Daftar Bill dari collector',
			primarykeys: ['colltargetbillout_id'],
			data: {
				colltargetbillout_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-byempl'})
				},

				billout_id: {
					text: 'Tagihan', type: dbtype.varchar(14), null: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'finact/fin/billout/list-untargetted'
					})
				},
				colltargetbillout_datetarget: { text: 'Target Date', type: dbtype.date, null: false },
				colltargetbillout_iscancel: {text:'Cancel', type: dbtype.boolean, null:false, default:'0', options:{labelWidth:'200px'}},

				billout_datedue: { 
					section: section.Begin('Bill Information', 'defbottomborder'), 
					text: 'Bill Due Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true} },
				billout_daystotarget: { text: 'Days to TargetDate', type: dbtype.int(6), null:false, default:0, suppresslist: true, options: { disabled: true} },
				billout_idr: { text: 'Bill Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_ppn: { text: 'PPN (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_ppnval: { text: 'PPN Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_pph: { text: 'PPh (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_pphval: { 
					section: section.End(),
					text: 'PPh Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },

				billout_idrnett: { text: 'IDR Nett', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_isdiscvalue: {text:'Disc using value', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'}},
				billout_discp: { text: 'Discount (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				billout_discval: { text: 'Discount', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_idrtotal: { text: 'IDR Total', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },

				billout_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				billout_ppntopay: { text: 'Payment PPN', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true} },

				

				ori_billout_datetarget: { 
					section: section.Begin('Setup Value', 'defbottomborder'),
					text: 'Target Date', type: dbtype.date, null: false 
				},
				ori_billout_datedue: { text: 'Bill Due Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true} },
				ori_billout_daystotarget: { text: 'Days to TargetDate', type: dbtype.int(6), null:false, default:0, suppresslist: true, options: { disabled: true} },
				ori_billout_idr: { text: 'Bill Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				ori_billout_ppn: { text: 'PPN (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				ori_billout_ppnval: { text: 'PPN Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				ori_billout_pph: { text: 'PPh (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				ori_billout_pphval: { text: 'PPh Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				ori_billout_idrnett: { text: 'IDR Nett', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				ori_billout_isdiscvalue: {text:'Disc using value', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'}},
				ori_billout_discp: { text: 'Discount (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},
				ori_billout_discval: { text: 'Discount', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: { disabled: true }},
				ori_billout_idrtotal: { text: 'IDR Total', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				ori_billout_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				ori_billout_ppntopay: { 
					section: section.End(),
					text: 'Payment PPN', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true} 
				},


				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},
			}
		}
	},

	schema: {
		title: 'Collector Shedule Update',
		header: 'trn_colltarget',
		detils: {
			'billout': {title: 'Bill', table: 'trn_colltargetbillout', form: true, headerview: 'periodemo_id' },
		}
	}
}


/*

	// Cek tanggal
	var datetarget = form.getValue(obj.dt_collschupdbillout_datetarget);
	var periodemo_id = header_data.periodemo_id;

	console.log(periodemo_id, datetarget)
	var periodemo_year = periodemo_id.substring(0, 4);
	var periodemo_month = periodemo_id.substring(4, 6);
	var datetarget_year = datetarget.substring(6,10);
	var datetarget_month = datetarget.substring(3, 5);


	console.log(periodemo_year, datetarget_year)
	console.log(periodemo_month, datetarget_month)
	if (periodemo_year!=datetarget_year || periodemo_month!=datetarget_month) {
		options.cancel = true;
		$ui.ShowMessage('[WARNING]Tanggal tidak sesuai dengan periode');
		return;
	}

*/