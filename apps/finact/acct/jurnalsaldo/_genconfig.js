'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Saldo Awal Periode",
	autoid: true,

 	 persistent: {
		'mst_periodemo': {
			comment: 'Daftar Periode Bulanan',
			primarykeys: ['periodemo_id'],
			data: {
				periodemo_id: { text: 'ID', type: dbtype.varchar(6), uppercase: true, null: false, options: { disabled: true } },
				periodemo_name: { text: 'Periode Name', type: dbtype.varchar(30), uppercase: true, null: false, options: { disabled: true } },
				periodemo_year: { text: 'Year', type: dbtype.int(4), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Tahun harus diisi' } },
				periodemo_month: { text: 'Month', type: dbtype.int(2), null: false, suppresslist: true, options: { required: true, invalidMessage: 'Bulan harus diisi' } },
				periodemo_dtstart: { text: 'Start Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_dtend: { text: 'End Date', type: dbtype.date, null: false, suppresslist: true, options: { disabled: true } },
				periodemo_isclosed: { text: 'Closed', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
				periodemo_closeby: { text: 'Close By', type: dbtype.varchar(14), suppresslist: true, null: true, options: { disabled: true } },
				periodemo_closedate: { text: 'Close Date', type: dbtype.date, suppresslist: true, null: true, options: { disabled: true } }
			},
		},


		'trn_jurnalsaldo' : {
			comment: 'Saldo Aging Periode Bulanan',
			primarykeys: ['jurnalsaldo_id'],
			data : {

				jurnalsaldo_id: { text: 'ID', type: dbtype.varchar(15), null: false, uppercase: true, suppresslist: true, },

				jurnal_id: { text: 'ID', type: dbtype.varchar(14), null: true },
				jurnal_date: { text: 'Jurnal Date', type: dbtype.date, null: false, suppresslist: true },
				jurnal_duedate: { text: 'DueDate', type: dbtype.date, null: false, suppresslist: true },
				jurnaldetil_id: { text: 'ID', type: dbtype.varchar(14), null: true },
				jurnaldetil_descr: { text: 'ID', type: dbtype.varchar(255), null: true },


				coamodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model COA harus diisi' },
					comp: comp.Combo({
					  table: 'mst_coamodel',
					  field_value: 'coamodel_id',
					  field_display: 'coamodel_name',
					  api: 'finact/master/coamodel/list'
					})
				},

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Account Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: false,
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},

				partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},

				curr_id: {
					text:'Currency', type: dbtype.varchar(10), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Currency harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_curr', 
						field_value: 'curr_id', field_display: 'curr_name', 
						api: 'ent/general/curr/list'})
				},

				jurnalsaldo_date: { text: 'Date', type: dbtype.date, null: false, suppresslist: false },
				jurnalsaldo_awal_frg: { text: 'Saldo Awal Frg', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				jurnalsaldo_awal_idr: { text: 'Saldo Awal IDR', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				periodemo_id: { text: 'Periode', type: dbtype.varchar(14), null: false, uppercase: true },				

			},

			uniques: {
				'jurnalsaldo_periode' : ['periodemo_id', 'jurnaldetil_id',  'coa_id', 'dept_id', 'partner_id', 'curr_id']
			}

		},

		'trn_periodesummary' : {
			comment: 'Summary Periode Bulanan, terisi pada saat periode sudah close',
			primarykeys: ['periodesummary_id'],
			data : {

				periodesummary_id: { text: 'ID', type: dbtype.varchar(15), null: false, uppercase: true, suppresslist: true, },

				coamodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model COA harus diisi' },
					comp: comp.Combo({
					  table: 'mst_coamodel',
					  field_value: 'coamodel_id',
					  field_display: 'coamodel_name',
					  api: 'finact/master/coamodel/list'
					})
				},

				coa_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true, invalidMessage:'Account Biaya harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_coa', 
						field_value: 'coa_id', field_display: 'coa_name', 
						api: 'finact/master/coa/list'})
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: false,
					options:{required:true, invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},

				partner_id: {
					suppresslist: true,
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name', 
						api: 'ent/affiliation/partner/list'})
				},

				jurnalsaldo_awal: { text: 'Saldo Awal', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				jurnalsaldo_mutasi: { text: 'Mutasi', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				jurnalsaldo_akhir: { text: 'Saldo Akhir', type: dbtype.decimal(14, 2), null: false, default: 0, suppresslist: false },
				periodemo_id: { text: 'Periode', type: dbtype.varchar(14), null: false, uppercase: true },				
			},
			uniques: {
				'periodesummary_periode' : ['periodemo_id', 'coa_id', 'dept_id', 'partner_id']
			}
		}

 	 },

	schema: {
		header: 'mst_periodemo',
		detils: {
			'saldo': {title: 'Saldo Awal', table: 'trn_jurnalsaldo', form: true, headerview: 'periodemo_name' },
			'summary': {title: 'Summary', table: 'trn_periodesummary', form: true, headerview: 'periodemo_name' }
		}
	}
}