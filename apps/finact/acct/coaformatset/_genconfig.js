'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Account Budget Format Setup",
	autoid: true,
	icon: 'icon-accbudget-formatset.svg',

	persistent: {
		'mst_coaformatset': {
			comment: 'Daftar Setup Format Report Account Budget',
			primarykeys: ['coaformatset_id'],
			data: {
				coaformatset_id: { text: 'ID', type: dbtype.varchar(17), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				coaformatset_order: { text: 'Order', type: dbtype.int(5), null: false, default:0 },
				coaformatset_name: { text: 'Nama Baris Report', type: dbtype.varchar(90), options: { required: true, invalidMessage: 'Nama Baris Report harus diisi' } },
				coaformatset_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				coaformatset_isparent: { text: 'Parent', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				coaformatset_parent: {
					text: 'Parent', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_coaformatset',
						field_value: 'coaformatset_id',
						field_display: 'coaformatset_name',
						field_display_name: 'coaformatset_parent_name',
						api: 'finact/budget/coaformatset/list'
					})
				},
				coaformatset_path: { text: 'Path', type: dbtype.varchar(340), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				coaformatset_pathid: { text: 'PathId', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				coaformatset_level: { text: 'Level', type: dbtype.int(2), null: false, default: '0', suppresslist: true, options: { disabled: true } },
				coaformat_id: {
					text: 'Format', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Format harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coaformat',
						field_value: 'coaformat_id',
						field_display: 'coaformat_name',
						field_display_name: 'coaformat_name',
						api: 'finact/budget/coaformat/list'
					})
				},

			},
			uniques: {
				'coaformatset_name': ['coaformatset_name'],
				'coaformatset_path': ['coaformatset_path', 'coaformatset_pathid']
			},
			defaultsearch: ['coaformatset_id', 'coaformatset_name']
		},



		'mst_coaformatsetitem' : {
			comment: 'Daftar Setup Format Report Account Budget',
			primarykeys: ['coaformatsetitem_id'],
			data: {
				coaformatsetitem_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				coa_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name',
						api: 'finact/master/coa/list'
					})
				},
				coa_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(255), options:{disabled:true}},
				coaformat_id: {
					text: 'Format', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Format harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coaformat',
						field_value: 'coaformat_id',
						field_display: 'coaformat_name',
						field_display_name: 'coaformat_name',
						api: 'finact/budget/coaformat/list'
					})
				},				
				coaformatset_id: {text:'FormatSet', type: dbtype.varchar(17), null:false},
			},
			uniques: {
				'coaformatsetitem_pair': ['coaformat_id', 'coa_id']
			}
		}



	},

	schema: {
		header: 'mst_coaformatset',
		detils: {
			'account': { title: 'Account Budget', table: 'mst_coaformatsetitem', form: true, headerview: 'coaformatset_name' },
			'multiadd' : { title: 'Select Account Budget', table: 'mst_coaformatsetitem', form: false },
		}
	}
}