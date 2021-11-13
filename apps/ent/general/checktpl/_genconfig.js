'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Checklist Template",
	autoid: false,

	persistent: {
		'mst_checktpl' : {
			primarykeys: ['checktpl_id'],
			comment: 'Daftar Template Checklist',
			data: {
				checktpl_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				checktpl_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true},
	
			},

			defaultsearch : ['checktpl_id', 'checktpl_name'],

			uniques: {
				'checktpl_name' : ['checktpl_name']
			}
		},

		'mst_checktplitem' :{
			comment: 'Checklist Value Detail',
			primarykeys: ['checktplitem_id'],
			data: {
				checktplitem_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				
				checkval_id: {
					text: 'Item', type: dbtype.varchar(14), null: false,
					options: { required: true, invalidMessage: 'Item Harus diisi', prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_checkval',
						field_value: 'checkval_id', field_display: 'checkval_caption',
						api: 'ent/general/checkval/list'
					})
				},

				checktplitem_caption: { text: 'Caption', type: dbtype.varchar(30), null: false },
				checkvalitem_order: { text: 'Order', type: dbtype.int(4), null: false, default: '0' },

				checktpl_id: { text: 'Checklist Template', type: dbtype.varchar(14), null: false, suppresslist: true}
			},

			defaultsearch: ['checkval_id', 'checktplitem_caption'],
			uniques: {
				'checktpl_pair' : ['checkval_id', 'checktpl_id']
			}
		}

	},

	schema: {		
		header: 'mst_checktpl',
		detils: {
			'detail': { title: 'Items', table: 'mst_checktplitem', form: true, headerview: 'checktpl_name' }
		}
	}
}



