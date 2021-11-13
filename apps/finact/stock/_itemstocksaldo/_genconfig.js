'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Stock Saldp",
	autoid: true,

	persistent: {
		'mst_itemstocksaldo': {
			comment: 'Daftar Saldo Item Stock per site',
			primarykeys: ['itemstocksaldo_id'],
			data: {
				itemstocksaldo_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				itemstocksaldo_ref: { text: 'Ref', type: dbtype.varchar(17), unset:true, null: false, default:'(uuid_short())' , options: { disabled: true } },
				itemstocksaldo_date: { text: 'Date', type: dbtype.datetime,  unset:true, null: false, default:'(now())', comp: comp.Textbox(), options: { disabled: true } },
				itemstock_id: {
					text:'Item', type: dbtype.varchar(14), null:false, suppresslist: true,
					options:{required:true,invalidMessage:'Item harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_itemstock', 
						field_value: 'itemstock_id', field_display: 'itemstock_name', field_display_name: 'itemstock_name', 
						api: 'finact/items/itemstock/list'})					
				},
				site_id: {
					text:'Stock From', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				itemstocksaldo_qty: { text: 'Qty', type: dbtype.int(4), null:false, default:0},
				itemstocksaldo_value: { text: 'Value', type: dbtype.decimal(14,2), null:false, default:0},
			},	
			defaultsearch : ['itemstocksaldo_id'],
			uniques: {
				itemstocksaldo_pair: ['itemstock_id', 'site_id']
			}

		},				
	},	

	schema: {
		header: 'mst_itemstocksaldo',
		detils: {
		}
	}
}			