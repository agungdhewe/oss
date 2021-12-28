'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collector Target",
	icon: "icon-colltarget-white.svg",
	backcolor: "#1b7486",
	autoid: true,
	committer: true,
	approval: true,
	dept_id_field: 'dept_id',
	doc_id: 'COLTARGET',

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
						api: 'ent/organisation/dept/list-byuser'})
				},


				colltarget_discprop: { text: 'Avg Disc(%) Proposed', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true},

				colltarget_idr: { 
					section: section.Begin('Value'), 
					text: 'Total Bill Value', type: dbtype.decimal(16,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_discval: { text: 'Total Disc', type: dbtype.decimal(16,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_idrtopay: { 
					section: section.End(),
					text: 'Payment', type: dbtype.decimal(16,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},



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
				colltarget_version: { text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				colltarget_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}},
				colltarget_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				colltarget_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				colltarget_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, suppresslist: true, options:{disabled:true}, hidden: true},
				colltarget_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				colltarget_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				colltarget_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				colltarget_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, suppresslist: true, options: { disabled: true } },
				colltarget_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true, lookup:'user' },
				colltarget_declinedate: { 
					section: section.End(),
					text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },

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
						api: 'finact/fin/billout/list-outstanding',
						field_mappings: [
							`{mapping: 'billout_payment', text: 'Outstanding', formatter: 'row_format_number', style: 'width: 100px; text-align: right'}`,
						],

						staticfilter: `
				criteria.partner_id = form.getValue(obj.cbo_partner_id)	
						`,
						OnSelectedScript: `
						`
					})
				},
				billout_isunreference: {
					text:'UnReferenced', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'},
					handlers: {
						onChange: {
							params: 'checked',
							functionname: 'billout_isunreference_changed'
						}
					}
				},
	
				colltargetbillout_datetarget: { 
					text: 'Target Date', type: dbtype.date, null: false,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'colltargetbillout_datetarget_changed'
						}
					}	
				},

				colltargetbillout_notes: { text: 'Notes', type: dbtype.varchar(90), null: false, suppresslist: true },



				billout_idr: { text: 'Outstanding Payment', type: dbtype.decimal(16, 0), null: false, default: 0, options: { disabled: true } },
				billout_isdiscvalue: {
					text:'Disc using value', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'},
					handlers: {
						onChange: {
							params: 'checked',
							functionname: 'billout_isdiscvalue_changed'
						}
					}
				
				},
				
				billout_discp: { 
					text: 'Discount (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'billout_discp_changed'
						}
					} 
				},
				billout_discval: { 
					text: 'Discount', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true,
					handlers: {
						onChange: {
							params: 'newvalue, oldvalue',
							functionname: 'billout_discval_changed'
						}
					} 			
				},

				billout_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				billout_ppntopay: { text: 'Payment PPN', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true, disabled: true} },

				billout_idrtotal: { text: 'Subtotal Target', type: dbtype.decimal(14, 0), null: false, default: 0, options: { disabled: true } },


				billout_datedue: { 
					section: section.Begin('Bill Information', 'defbottomborder'), 
					text: 'Bill Due Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true} },
				billout_daystotarget: { text: 'Days to TargetDate', type: dbtype.int(6), null:false, default:0, suppresslist: true, options: { disabled: true} },

				
				billout_totalitem: { text: 'Total Item', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totalqty: { text: 'Total Qty', type: dbtype.int(5), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_salesgross: { text: 'Gross Sales', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_discount: { text: 'Dicount', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_subtotal: { text: 'Sub Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_pph: { text: 'PPh', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_nett: { text: 'Sales Nett', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_ppn: { text: 'PPN', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_total: { text: 'Total', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_totaladdcost: { text: 'Additional Cost', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_dp: { text: 'Down Payment', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true}  },
				billout_payment: { text: 'Amount Tagihan', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} },
				billout_paid: { 
					section: section.End(),
					text: 'Terbayar', type: dbtype.decimal(16,0), null: false, default:0, suppresslist: true, options: { disabled: true} 
				},


				// billout_idrnett: { text: 'IDR Nett', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				// billout_ppn: { text: 'PPN (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				// billout_ppnval: { text: 'PPN Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				// billout_pph: { text: 'PPh (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				// billout_pphval: { 
				// 	section: section.End(),
				// 	text: 'PPh Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				// billout_idr: { text: 'Bill Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },



				colltarget_id:  {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},
			}
		}
	},

	schema: {
		title: 'Collector Target',
		header: 'trn_colltarget',
		editorHandler: 'colltarget-edit-hnd.mjs',
		listHandler: 'colltarget-list-hnd.mjs',
		autoload: true,

		detils: {
			'billout': {
				title: 'Bill', table: 'trn_colltargetbillout', form: true, headerview: 'periodemo_id',
				editorHandler: 'colltarget-billoutform-hnd.mjs',
				listHandler: 'colltarget-billoutgrid-hnd.mjs',
			},
			'multiadd' : {
				title: 'Add Bill', table: 'trn_colltargetbillout', form: false, headerview: 'periodemo_id',
				tabvisible: false,
				overwrite: {
					mjs_list: false,
					phtml_list: false,
					mjs_form: false,
					phtml_form: false,
					api: false,
				}

			}
		}
	}
}


/*

	// Cek tanggal
	var datetarget = form.getValue(obj.dt_colltargetbillout_datetarget);
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