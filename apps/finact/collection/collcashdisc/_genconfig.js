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
	doc_id: 'CASHDISC',

	persistent: {
		'trn_collcashdisc': {
			comment: 'Daftar Cash Discount',
			primarykeys: ['collcashdisc_id'],
			data: {
				collcashdisc_id: { text: 'ID', type: dbtype.varchar(14), null: false},

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


				empl_id: {
					text:'Collector', type: dbtype.varchar(30), null:true, 
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'finact/collection/collector/list-collector'})
				},
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Departemen harus diisi'},
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				collcashdisc_descr: { text: 'Description', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				collcashdisc_discprop: { text: 'Avg Disc(%) Proposed', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},

				collcashdisc_idr: { 
					section: section.Begin('Value'), 
					text: 'Total Bill Value', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				collcashdisc_discval: { text: 'Total Disc', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				collcashdisc_idrtotal: { 
					section: section.End(),
					text: 'Total IDR', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},


				doc_id: {
					section: section.Begin('Status'), 
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options: {required:true, invalidMessage:'ID harus diisi', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},					
				collcashdisc_version: { text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				collcashdisc_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				collcashdisc_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				collcashdisc_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				collcashdisc_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				collcashdisc_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				collcashdisc_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				collcashdisc_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				collcashdisc_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				collcashdisc_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				collcashdisc_declinedate: { 
					section: section.End(),
					text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				

			},
			
			defaultsearch: ['collcashdisc_id', 'collcashdisc_descr']
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
				

				var colltarget_estdisc = Number(header_data.collcashdisc_discprop);
				var billout_ppn = 0;
				var billout_ppnval = 0;
				var billout_pph = 0;
				var billout_pphval = 0;
				var billout_validr	= Number(record.billout_validr);
				var billout_idrnett = billout_validr - billout_pphval;
				var billout_discval = billout_validr * (colltarget_estdisc/100)
				var billout_idrtotal = billout_validr - billout_discval;

				form.setValue(obj.txt_billout_idr, record.billout_validr);
				form.setValue(obj.txt_billout_ppn, billout_ppn);
				form.setValue(obj.txt_billout_ppnval, billout_ppnval);
				form.setValue(obj.txt_billout_pph, billout_pph);
				form.setValue(obj.txt_billout_pphval, billout_pphval);
				form.setValue(obj.txt_billout_idrnett, billout_idrnett);
				form.setValue(obj.txt_billout_discp, colltarget_estdisc);
				form.setValue(obj.txt_billout_discval, billout_discval);
				form.setValue(obj.txt_billout_idrtotal, billout_idrtotal);

				form.setValue(obj.txt_billout_daystotarget, 0);		
						`
					})
				},


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

				collcashdiscbillout_notes: { text: 'Notes', type: dbtype.varchar(90), null: false, suppresslist: true },
				collcashdisc_id:  {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},
			}
		}		
		
		
	},

	schema: {
		header: 'trn_collcashdisc',
		scripts: {
			GlobalSetupVar : {
				dept_id: '',
				dept_name: ''
			},
			OnSaving: ``
		},
		detils: {
			'billout': {
				title: 'Bill', table: 'trn_collcashdiscbillout', form: true, headerview: 'periodemo_id', 
			},
		}
	}

}