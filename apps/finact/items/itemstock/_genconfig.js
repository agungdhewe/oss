'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Stock",
	autoid: true,

	persistent: {
		'mst_itemstock': {
			comment: 'Daftar Item Stock',
			primarykeys: ['itemstock_id'],
			data: {
				itemstock_id: { text: 'ID', type: dbtype.varchar(14), null: false, options: { required: true, invalidMessage: 'ID harus diisi' } },
				itemstock_name: { text: 'Nama Item', type: dbtype.varchar(150), null: false, options: { required: true, invalidMessage: 'Nama item harus diisi' } },
				itemstock_barcode: { text: 'Barcode', type: dbtype.varchar(30), null: false },

				itemstock_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemstock_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },

				itemstock_estcost: { text: 'Estimated Cost', type: dbtype.decimal(12,0), suppresslist: true },



				itemstock_lastqty: { text: 'Qty', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastqtyupdate: { text: 'Last Qty Update', type: dbtype.decimal(14,2), suppresslist: true, unset:true, options: { disabled: true } },
				itemstock_lastrecvid: { text: 'Last Recv Id', type: dbtype.varchar(90), suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				itemstock_lastrecvdate: { text: 'Last Recv Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				itemstock_lastrecvqty: { text: 'Last Recv Qty', type: dbtype.decimal(14,2), suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },

				itemstock_lastcost: { text: 'Last Cost', type: dbtype.decimal(14,2), suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				itemstock_lastcostdate: { text: 'Last Cost Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },


				itemgroup_id: {
					text:'Group', type: dbtype.varchar(15), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'NONE'},
					comp: comp.Combo({
						table: 'mst_itemgroup', 
						field_value: 'itemgroup_id', field_display: 'itemgroup_name', field_display_name: 'itemgroup_name', 
						api: 'finact/items/itemgroup/list'})					
				},

				itemclass_id: {
					text:'Class', type: dbtype.varchar(14), null:false, uppercase: true, suppresslist: true,
					options: { required: true, invalidMessage: 'Class harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemclass', 
						field_value: 'itemclass_id', field_display: 'itemclass_name', field_display_name: 'itemclass_name', 
						api: 'finact/items/itemclass/list'})					
				},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null:false, uppercase: true, suppresslist: false,
					tips: 'Owner Dept yang akan manage tipe item ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'dept_name', 
						api: 'ent/organisation/dept/list'})				
				},				

			},

			defaultsearch : ['itemstock_id', 'itemstock_name'],
			uniques: {
				'itemstock_name' : ['itemstock_name'],
				'itemstock_barcode' : ['itemstock_barcode']
			}

		},


		'mst_itemstocksetting' : {
			comment: 'Stock Setting',
			primarykeys: ['itemstocksetting_id'],
			data: {
				itemstocksetting_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false },
				site_id: {
					text:'Site', type: dbtype.varchar(30), null:true, 
					options:{required:true,invalidMessage:'Site harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_site', 
						field_value: 'site_id', field_display: 'site_name', 
						api: 'ent/location/site/list'})				
				},
				itemstock_minqty: { text: 'Min Qty', type: dbtype.decimal(14, 0) },
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), uppercase: true, null: false },
			}			
		},


		'mst_itemstocksite' : {
			comment: 'Current Stock di lokasi',
			primarykeys: ['itemstocksite_id'],
			data: {
				itemstocksite_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false },

				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), uppercase: true, null: false },

			}			
		},

		'mst_itemstocksaldo' : {
			comment: 'Saldo akhir stok pada akhir bulan',
			primarykeys: ['itemstocksaldo_id'],
			data: {
				itemstocksaldo_id: { text: 'ID', type: dbtype.varchar(14), uppercase: true, null: false },
				itemstock_id: { text: 'ItemStock ID', type: dbtype.varchar(14), uppercase: true, null: false },
			}	
		},

 	},	
		
	schema: {
		header: 'mst_itemstock',
		detils: {
			'setting' : {title: 'Setting', table: 'mst_itemstocksetting', form: true, headerview: 'itemstock_name' },
		}
	}
}	