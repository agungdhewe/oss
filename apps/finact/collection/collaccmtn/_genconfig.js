'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collection Account Maintenance",
	autoid: true,
	committer: true,


	persistent: {
		'trn_collaccmtn' : {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['collaccmtn_id'],
			data: {
				collaccmtn_id: { text: 'ID', type: dbtype.varchar(14), null: false },


				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})				
				},
				
				collaccmtn_date: { text: 'Date', type: dbtype.date, null: false },

				empl_id: {
					options:{required:true, invalidMessage:'Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false,  suppresslist: true,
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
				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				partnercontact_id: {
					text:'Partner Contact', type: dbtype.varchar(14), null:true, suppresslist: true,
					options: { prompt: 'NONE' } ,
					comp: comp.Combo({
						table: 'mst_partnercontact', 
						field_value: 'partnercontact_id', field_display: 'partnercontact_name',  field_display_name: 'partnercontact_name',
						api: 'ent/affiliation/partner/contact-list',
						OnSelectedScript: `
				form.setValue(obj.txt_partnercontact_upname, record.partnercontact_name)
				form.setValue(obj.txt_partnercontact_position, record.partnercontact_position)
				form.setValue(obj.txt_partnercontact_upphone, record.partnercontact_mobilephone)
				form.setValue(obj.txt_partnercontact_email, record.partnercontact_email)		
						`
					})
				},
				partnercontact_upname: {text:'Name', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, hidden: true, options:{disabled:true}},
				partnercontact_position: {text:'Position', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnercontact_upphone: {text:'HP', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{disabled:true}},
				partnercontact_email: {text:'Email', type: dbtype.varchar(90), null:false, uppercase: true, suppresslist: true, options:{validType: ['email'],disabled:true}},

				collfuptype_id: {
					options:{required:true,invalidMessage:'Tipe followup harus diisi', prompt:'-- PILIH --'},
					text:'Followup Type', type: dbtype.varchar(10), null:false, 
					comp: comp.Combo({
						table: 'mst_collfuptype', 
						field_value: 'collfuptype_id', field_display: 'collfuptype_name',  field_display_name: 'collfuptype_name',
						api: 'finact/collection/collfuptype/list'})
				},

				collaccmtn_descr: { text: 'Description', type: dbtype.varchar(255), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Descr harus diisi' } },

				collaccmtn_notes: { 
					section: section.Begin('Information'),
					text: 'Notes', type: dbtype.varchar(255), null: true, suppresslist: true},
				collaccmtn_response: { text: 'Response', type: dbtype.varchar(255), null: true, suppresslist: true},
				collaccmtn_nextactdate: { text: 'Next Act Date', type: dbtype.date, null: false, suppresslist: true },
				collaccmtn_nextactnotes: { 
					section: section.End(),
					text: 'Next Act Notes', type: dbtype.varchar(255), null: true, suppresslist: true},

				collaccmtn_version: {
					section: section.Begin('Status'),
					text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},
				collaccmtn_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				collaccmtn_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true, lookup:'user'},
				collaccmtn_commitdate: {
					section: section.End(),
					text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},

			},

			defaultsearch: ['collaccmtn_id', 'collaccmtn_descr', 'collaccmtn_notes']
		},

		'trn_collaccmtndet': {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['collaccmtndet_id'],
			data: {
				collaccmtndet_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				billout_id: {
					text: 'Tagihan', type: dbtype.varchar(14), null: true, 
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'trn_billout',
						field_value: 'billout_id', field_display: 'billout_descr', field_display_name: 'billout_descr',
						api: 'local: get-billout',
						OnSelectedScript: `
				console.log(record);
				
				form.setValue(obj.txt_billout_idr, record.billout_idr);
				form.setValue(obj.txt_billout_ppn, record.billout_ppn);
				form.setValue(obj.txt_billout_ppnval, record.billout_ppnval);
				form.setValue(obj.txt_billout_pph, record.billout_pph);
				form.setValue(obj.txt_billout_pphval, record.billout_pphval);
				form.setValue(obj.txt_billout_idrnett, record.billout_idrnett);
				form.setValue(obj.txt_billout_discval, record.billout_discval);
				form.setValue(obj.txt_billout_idrtotal, record.billout_idrtotal);
				form.setValue(obj.txt_billout_idrtopay, record.billout_idrtotal);
				form.setValue(obj.txt_billout_ppntopay, record.billout_ppnval);
						`
					})
				},



				billout_datedue: { 
					section: section.Begin('Bill Information', 'defbottomborder'), 
					text: 'Bill Due Date', type: dbtype.date, null: false, options: { disabled: true} },
				billout_daystotarget: { text: 'Days to TargetDate', type: dbtype.int(6), null:false, default:0, options: { disabled: true} },
				billout_idr: { text: 'Bill Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_ppn: { text: 'PPN (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_ppnval: { text: 'PPN Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_pph: { text: 'PPh (%)', type: dbtype.decimal(5,2), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_pphval: { 
					section: section.End(),
					text: 'PPh Value', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },

				billout_idrnett: { text: 'IDR Nett', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_discval: { text: 'Discount', type: dbtype.decimal(14,0), null:false, default:0, suppresslist: true, options: { disabled: true }},
				billout_idrtotal: { text: 'IDR Total', type: dbtype.decimal(14, 0), null: false, default: 0, suppresslist: true, options: { disabled: true } },
				billout_idrtopay: { text: 'Payment', type: dbtype.decimal(14, 0), null: false, default: 0, options: { disabled: true } },
				billout_ppntopay: { text: 'Payment PPN', type: dbtype.decimal(14, 0), null: false, default: 0, options: { disabled: true } },

				collaccmtndet_notes: { text: 'Notes', type: dbtype.varchar(255), null: true, suppresslist: true},
				collaccmtn_id: { text: 'ID', type: dbtype.varchar(14), null: false, hidden: true },
			},
			
			defaultsearch: ['billout_id', 'collaccmtndet_notes']
		}		
	
	},

	schema: {
		header: 'trn_collaccmtn',
		detils: {
			'detil': {title: 'Detil', table: 'trn_collaccmtndet', form: true, headerview: 'collaccmtn_descr' },
		}
	}


}