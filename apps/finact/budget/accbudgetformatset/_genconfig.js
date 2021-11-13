'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Account Budget Format Setup",
	autoid: true,
	icon: 'icon-accbudget-formatset.svg',

	persistent: {
		'mst_accbudgetformatset': {
			comment: 'Daftar Setup Format Report Account Budget',
			primarykeys: ['accbudgetformatset_id'],
			data: {
				accbudgetformatset_id: { text: 'ID', type: dbtype.varchar(17), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				accbudgetformatset_order: { text: 'Order', type: dbtype.int(5), null: false, default:0 },
				accbudgetformatset_name: { text: 'Nama Baris Report', type: dbtype.varchar(90), options: { required: true, invalidMessage: 'Nama Baris Report harus diisi' } },
				accbudgetformatset_descr: { text: 'Descr', type: dbtype.varchar(255), suppresslist: true },
				accbudgetformatset_isparent: { text: 'Parent', type: dbtype.boolean, null: false, default: '0', suppresslist: true },
				accbudgetformatset_parent: {
					text: 'Parent', type: dbtype.varchar(17), null: true, suppresslist: true,
					options: { prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_accbudgetformatset',
						field_value: 'accbudgetformatset_id',
						field_display: 'accbudgetformatset_name',
						field_display_name: 'accbudgetformatset_parent_name',
						api: 'finact/budget/accbudgetformatset/list'
					})
				},
				accbudgetformatset_path: { text: 'Path', type: dbtype.varchar(340), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				accbudgetformatset_pathid: { text: 'PathId', type: dbtype.varchar(17), null: false, uppercase: true, suppresslist: true, options: { disabled: true } },
				accbudgetformatset_level: { text: 'Level', type: dbtype.int(2), null: false, default: '0', suppresslist: true, options: { disabled: true } },
				accbudgetformat_id: {
					text: 'Format', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Format harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudgetformat',
						field_value: 'accbudgetformat_id',
						field_display: 'accbudgetformat_name',
						field_display_name: 'accbudgetformat_name',
						api: 'finact/budget/accbudgetformat/list'
					})
				},

			},
			uniques: {
				'accbudgetformatset_name': ['accbudgetformatset_name'],
				'accbudgetformatset_path': ['accbudgetformatset_path', 'accbudgetformatset_pathid']
			},
			defaultsearch: ['accbudgetformatset_id', 'accbudgetformatset_name']
		},



		'mst_accbudgetformatsetitem' : {
			comment: 'Daftar Setup Format Report Account Budget',
			primarykeys: ['accbudgetformatsetitem_id'],
			data: {
				accbudgetformatsetitem_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				accbudget_id: {
					text: 'Account', type: dbtype.varchar(20), null: false,
					options: { required: true, invalidMessage: 'Account Budget harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name',
						api: 'finact/master/accbudget/list'
					})
				},
				accbudget_nameshort: { text: 'Nama Pendek', type: dbtype.varchar(255), options:{disabled:true}},
				accbudgetformat_id: {
					text: 'Format', type: dbtype.varchar(10), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Format harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudgetformat',
						field_value: 'accbudgetformat_id',
						field_display: 'accbudgetformat_name',
						field_display_name: 'accbudgetformat_name',
						api: 'finact/budget/accbudgetformat/list'
					})
				},				
				accbudgetformatset_id: {text:'FormatSet', type: dbtype.varchar(17), null:false},
			},
			uniques: {
				'accbudgetformatsetitem_pair': ['accbudgetformat_id', 'accbudget_id']
			}
		}



	},

	schema: {
		header: 'mst_accbudgetformatset',
		detils: {
			'account': { title: 'Account Budget', table: 'mst_accbudgetformatsetitem', form: true, headerview: 'accbudgetformatset_name' },
			'multiadd' : { title: 'Select Account Budget', table: 'mst_accbudgetformatsetitem', form: false },
		}
	}
}