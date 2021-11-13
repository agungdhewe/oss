'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collection Target KPI",
	autoid: true,

	persistent: {
		'mst_colltarprd' : {
			comment: 'Daftar Target Periode',
			primarykeys: ['colltarprd_id'],
			data: {
				colltarprd_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				periodemo_id: { 
					text: 'Periode', type: dbtype.varchar(6), null: true,
					options: { required: true, invalidMessage: 'Periode harus diisi' }, 
					comp: comp.Combo({
						table: 'mst_periodemo',
						field_value: 'periodemo_id', field_display: 'periodemo_name',
						api: 'finact/master/periode/list-open'
					})				
				},
			},
			defaultsearch: ['colltarprd_id', 'periodemo_id']
		},

		'mst_colltarprdpartnerexc': {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['colltarprdpartnerexc_id'],
			data: {
				colltarprdpartnerexc_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				partner_id: {
					options:{required:true,invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Partner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'local: get_partner'})
				},		
				colltarprd_id: { text: 'ID', type: dbtype.varchar(14), null: false, hidden: true },		
			},
			defaultsearch: ['colltarprdpartnerexc_id', 'partner_id']
		},


		'mst_colltarprddetil': {
			comment: 'Daftar Tanda Terima Sementara',
			primarykeys: ['colltarprddetil_id'],
			data: {
				colltarprddetil_id: { text: 'ID', type: dbtype.varchar(14), null: false, suppresslist: true, },
				colltarrowtype_id: {
					text:'Row', type: dbtype.varchar(10), null:true, 
					options:{required:true,invalidMessage:'Row Type harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_colltarrowtype', 
						field_value: 'colltarrowtype_id', field_display: 'colltarrowtype_name',  field_display_name: 'colltarrowtype_name',
						api: 'finact/collection/colltarrowtype/list',
						OnSelectedScript: `
				form.setValue(obj.txt_colltarrowtype_order, record.colltarrowtype_order);		
						`
					
					})
				},
				colltarrowtype_order: { text: 'RowType Order', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },


				partner_id: {
					options:{prompt:'NONE'},
					text:'Partner', type: dbtype.varchar(30), null:true, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},

				colltarprddetil_descr: { text: 'Descr', type: dbtype.varchar(255) },
				colltarprddetil_valpartnerost: { text: 'Outstanding Value', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				colltarprddetil_valpartner: { text: 'Adjusted Value', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },
				colltarprddetil_val: { text: 'Value', type: dbtype.decimal(14, 0), null: false, default: 0, options: { required: true } },

				colltarprd_id: { text: 'ID', type: dbtype.varchar(14), null: false, hidden: true },		
			},
			defaultsearch: ['colltarprddetil_id', 'partner_id']
		}		
	
	},

	schema: {
		header: 'mst_colltarprd',
		detils: {
			'partnerexc': {title: 'Partner Exclude', table: 'mst_colltarprdpartnerexc', form: true, headerview: 'periodemo_id' },
			'target': {title: 'Target', table: 'mst_colltarprddetil', form: true, headerview: 'periodemo_id' },
		}
	}


}