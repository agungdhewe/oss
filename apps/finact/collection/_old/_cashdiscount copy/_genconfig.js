'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collection Cash Discount",
	autoid: true,
	idprefix: 'CD',
	printing: true,
	committer: true,
	approval: true,
	dept_id_field: 'dept_id',
	doc_id: 'INQUIRY',

	persistent: {
		'trn_collcashdisc': {
			comment: 'Daftar Cash Discount',
			primarykeys: ['collcashdisc_id'],
			data: {
				cashdiscount_id: { text: 'ID', type: dbtype.varchar(14), null: false},

				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true,
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})				
				},

				collcashdisc_date: { text: 'Date', type: dbtype.date, null: false },

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				collcashdisc_descr: { text: 'Description', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },


				cashdiscount_percent:  { text: 'IDR', type: dbtype.decimal(4, 2), null: false, default: 0, options: { required: true } },
				cashdiscount_validr: { text: 'IDR', type: dbtype.decimal(14, 2), null: false, default: 0, options: { required: true } },

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				doc_id: {
					text:'Order Doc', type: dbtype.varchar(30), null:false, uppercase: true, 
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},				

			},
			
			defaultsearch: ['cashdiscount_id', 'cashdiscount_descr']
		},


		'trn_collcashdiscbillout' : {
			comment: 'Daftar Bill dari collector',
			primarykeys: ['collcashdiscbillout_id'],
			data: {
				collcashdiscbillout_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				billout_id: {
					text: 'Tagihan', type: dbtype.varchar(14), null: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'finact/fin/billout/list-untargetted',
						OnSelectedScript: `
				console.log(record);
				console.log(header_data);
				

				var colltarget_estdisc = Number(header_data.colltarget_discprop);
				var billout_pph = 0;
				var billout_ppn = 0;
				var billout_validr	= Number(record.billout_validr);
				var billout_idrnett = billout_validr - billout_pph;
				var billout_discval = billout_validr * (colltarget_estdisc/100)
				var billout_idrtopay = billout_validr - billout_discval;

				form.setValue(obj.txt_billouttotal_idr, record.billout_validr);
				form.setValue(obj.txt_billouttotal_ppnval, billout_ppn);
				form.setValue(obj.txt_billouttotal_pphval, billout_pph);
				form.setValue(obj.txt_billouttotal_idrnett, billout_idrnett);
				form.setValue(obj.txt_billouttotal_discp, colltarget_estdisc);
				form.setValue(obj.txt_billouttotal_discval, billout_discval);
				form.setValue(obj.txt_billouttotal_idrtopay, billout_idrtopay);

						`
					})
				},
				colltargetbillout_datetarget: { text: 'Target Date', type: dbtype.date, null: false },
				billouttotal_idr: { text: 'Total', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true, disabled: true } },
				billouttotal_ppnval: { text: 'PPN', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: false, options: { required: true, disabled: true } },
				billouttotal_pphval: { text: 'PPN', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true, disabled: true } },
				billouttotal_idrnett: { text: 'Total after Tax', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { required: true, disabled: true } },
				billouttotal_isdiscvalue: {text:'Disc using value', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'}},
				billouttotal_discp: { text: 'Discount (%)', type: dbtype.decimal(5,2), null:false, default:0},
				billouttotal_discval: { text: 'Discount', type: dbtype.decimal(12,0), null:false, default:0, options: { disabled: true }},
				billouttotal_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },

				colltargetbillout_notes: { text: 'Notes', type: dbtype.varchar(90), null: false, suppresslist: true },
				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},
			}
		}		
		
		
	},

	schema: {
		header: 'trn_collcashdisc',
		detils: {
		}
	}

}