'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Jurnal Type",
	autoid: false,

	persistent: {
		'mst_jurnaltype': {
			comment: 'Daftar Tipe-tipe Jurnal',
			primarykeys: ['jurnaltype_id'],
			data: {
				jurnaltype_id: { text: 'ID', type: dbtype.varchar(10), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				jurnaltype_name: { text: 'Type Jurnal', type: dbtype.varchar(30), uppercase: true, null: false, options: { required: true, invalidMessage: 'Tipe Jurnal harus diisi' } },
				jurnaltype_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				jurnaltype_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				jurnalmodel_id: {
					text: 'Model', type: dbtype.varchar(10), null: false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Model Jurnal harus diisi' },
					comp: comp.Combo({
						table: 'mst_jurnalmodel',
						field_value: 'jurnalmodel_id',
						field_display: 'jurnalmodel_name',
						api: 'finact/master/jurnalmodel/list'
					})
				}
			},
			defaultsearch: ['jurnaltype_id', 'jurnaltype_name', 'jurnalmodel_id'],
			uniques: {
				'jurnaltype_name': ['jurnaltype_name']
			}
		},
						
		'mst_jurnaltypecoa': {
			comment: 'Daftar COA yang dipunyai oleh suatu tipe jurnal',
			primarykeys: ['jurnaltypecoa_id'],
			data: {
				jurnaltypecoa_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coa_id: {
					text: 'COA', type: dbtype.varchar(17), null: false, uppercase: true,
					options: { required: true, invalidMessage: 'COA harus diisi' },
					comp: comp.Combo({
							table: 'mst_coa',
							field_value: 'coa_id',
							field_display: 'coa_name',
							api: 'finact/master/coa/list'
						})
				},
				jurnaltypecoa_isdebet: { text: 'Debet', type: dbtype.boolean, null: false, default: '0' },
				jurnaltypecoa_iskredit: { text: 'Kredit', type: dbtype.boolean, null: false, default: '0' },
				jurnaltype_id: { text: 'Type Jurnal', type: dbtype.varchar(10), null: false, options: { disabled: true } },
			},

			defaultsearch: ['jurnaltypecoa_id', 'coa_id'],

		}	
	},

	schema: {
		header: 'mst_jurnaltype',
		detils: {
			'coa': { title: 'Chart of Accounts', table: 'mst_jurnaltypecoa', form: true, headerview: 'jurnaltype_name' }
		}
	}
}