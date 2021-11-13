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
	committer: true,
	dept_id_field: 'dept_id',
	doc_id: 'INQUIRY',

	persistent: {
		'trn_colltemprecv' : {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['colltemprecv_id'],
			data: {
				colltemprecv_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true,
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})				
				},
				colltemprecv_date: { text: 'Date', type: dbtype.date, null: false },

				empl_id: {
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false,  suppresslist: true,
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list-collector'})
				},

				dept_id: {
					text:'Dept', type: dbtype.varchar(30), null:true, suppresslist: true, 
					options:{required:true, invalidMessage:'Departemen harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name',  field_display_name: 'dept_name',
						api: 'ent/organisation/dept/list'})
				},

				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list-byempl'})
				},


				colltemprecv_descr: { text: 'Descr', type: dbtype.varchar(90), null: false, options: { required: true, invalidMessage: 'Descr harus diisi' } },


				collsource_id: {
					text:'Source', type: dbtype.varchar(10), null:false, suppresslist: true, 
					options:{required:true,invalidMessage:'Source harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_collsource', 
						field_value: 'collsource_id', field_display: 'collsource_name',  field_display_name: 'collsource_name',
						api: 'finact/collection/collsource/list'})
				},

				paymtype_id: {
					text:'Tipe Payment', type: dbtype.varchar(10), null:true, suppresslist: true, 
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_paymtype', 
						field_value: 'paymtype_id', field_display: 'paymtype_name',  field_display_name: 'paymtype_name',
						api: 'finact/master/paymtype/list'})
				},






				coa_id: {
					section: section.Begin('Receive'), 
					text:'COA', type: dbtype.varchar(17), null:true, suppresslist: true,
					// tips: 'Account AR Partner',
					// options:{required:true,invalidMessage:'COA harus diisi', prompt:'-- PILIH --'},
					options:{prompt: 'NONE'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name',  field_display_name: 'coa_name',
						api: 'finact/master/coa/list'})
				},
				colltemprecv_isadvance: { text: 'Advance', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {} },
				colltemprecv_idrtopay: { 
					text: 'Total Payment', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},
				colltarget_ppntopay: { 
					section: section.End(),
					text: 'Total PPN', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, unset:true, options:{disabled:true}},




				doc_id: {
					section: section.Begin('Status'), 
					text:'Doc', type: dbtype.varchar(30), null:true, suppresslist: true,
					options: {prompt:'NONE', disabled: true },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},
				colltemprecv_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				colltemprecv_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				colltemprecv_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				colltemprecv_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				colltemprecv_isverified: {text:'Verified', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				colltemprecv_verifyby: {text:'VerifyBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				colltemprecv_verifydate: {
					section: section.End(),	
					text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true
				},	

			},

			defaultsearch: ['colltemprecv_id', 'colltemprecv_descr']
		},


		'trn_colltemprecvdetil': {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['colltemprecvdetil_id'],
			data: {
				colltemprecvdetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, suppresslist: true, },

				billout_id: {
					text: 'Tagihan', type: dbtype.varchar(14), null: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'local: get-billout',
						OnSelectedScript: `
				console.log(record);
				console.log(header_data);
				

				var colltarget_estdisc = 5;
				var billout_ppn = 0;
				var billout_ppnval = 0;
				var billout_pph = 0;
				var billout_pphval = 0;
				var billout_validr	= Number(record.billout_idr);
				var billout_idrnett = billout_validr - billout_pphval;
				var billout_discval = billout_validr * (colltarget_estdisc/100)
				var billout_idrtotal = billout_validr - billout_discval;

				form.setValue(obj.txt_billout_idr, billout_validr);
				form.setValue(obj.txt_billout_discmax, billout_discval);
				form.setValue(obj.txt_billout_ppn, billout_ppn);
				form.setValue(obj.txt_billout_ppnval, billout_ppnval);
				form.setValue(obj.txt_billout_pph, billout_pph);
				form.setValue(obj.txt_billout_pphval, billout_pphval);
				form.setValue(obj.txt_billout_idrnett, billout_idrnett);
				form.setValue(obj.txt_billout_discp, colltarget_estdisc);
				form.setValue(obj.txt_billout_discval, billout_discval);
				form.setValue(obj.txt_billout_idrtotal, billout_idrtotal);
				form.setValue(obj.txt_billout_idrtopay, billout_idrtotal);
				form.setValue(obj.txt_billout_ppntopay, billout_ppnval);

				form.setValue(obj.txt_billout_daystotarget, 0);		

						`
					})
				},
	

				billout_datedue: { 
					section: section.Begin('Bill Information', 'defbottomborder'), 
					text: 'Bill Due Date', type: dbtype.date, null: false, options: { disabled: true} },
				billout_daystotarget: { text: 'Age', type: dbtype.int(6), null:false, default:0, options: { disabled: true} },
				billout_idr: { text: 'Bill Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_discmax: { text: 'Max Discount', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_ppn: { text: 'PPN (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_ppnval: { text: 'PPN Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_pph: { text: 'PPh (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_pphval: { 
					section: section.End(),
					text: 'PPh Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },


				billout_idrnett: { text: 'IDR Nett', type: dbtype.decimal(14, 0), null: false, default: 0, options: { disabled: true } },
				billout_isdiscvalue: {text:'Disc using value', type: dbtype.boolean, null:false, default:'0', suppresslist: true, options:{labelWidth:'200px'}},
				billout_discp: { text: 'Discount (%)', type: dbtype.decimal(5,2), null:false, default:0},
				billout_discval: { text: 'Discount', type: dbtype.decimal(14,0), null:false, default:0, options: { disabled: true }},
				billout_idrtotal: { text: 'IDR Total', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },

				billout_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				billout_ppntopay: { text: 'Payment PPN', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true} },


				colltemprecv_id: { text: 'ID', type: dbtype.varchar(14), null: false, hidden: true },

			},
			
			defaultsearch: ['billout_id', 'colltemprecvdetil_descr']
		}		
		
	},

	schema: {
		header: 'trn_colltemprecv',
		detils: {
			'detil': {title: 'Detil', table: 'trn_colltemprecvdetil', form: true, headerview: 'colltemprecv_descr' },
		}
	}


}