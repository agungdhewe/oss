'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Checklist Value",
	autoid: true,

	persistent: {
		'mst_checkval' : {
			primarykeys: ['checkval_id'],
			comment: 'Daftar Checklist Value',
			data: {
				checkval_id: {text:'ID', type: dbtype.varchar(14), null:false, uppercase: true},
				checkval_caption: {text:'Caption', type: dbtype.varchar(60), null:false, uppercase: true},

				checktype_id: {
					text: 'Type', type: dbtype.varchar(10), null: false,
					options: { required: true, invalidMessage: 'Tipe Harus diisi', prompt: 'NONE' },
					comp: comp.Combo({
						table: 'mst_checktype',
						field_value: 'checktype_id', field_display: 'checktype_name',
						api: 'ent/general/checktype/list'
					})
				}
			},

			defaultsearch : ['checkval_id', 'checkval_caption'],

			uniques: {
				'checkval_caption' : ['checkval_caption']
			}
		},

		'mst_checkvalopt' :{
			comment: 'Checklist Value Detail',
			primarykeys: ['checkvalopt_id'],
			data: {
				checkvalopt_id: { text: 'ID', type: dbtype.varchar(14), null: false },
				checkvalopt_caption: { text: 'Caption', type: dbtype.varchar(14), null: false },
				checkvalopt_value: { text: 'Value', type: dbtype.varchar(30), null: false },
				checkvalopt_bgcolor: { text: 'BG Color', type: dbtype.varchar(30), null: false },

				checkval_id: { text: 'Checklist Value', type: dbtype.varchar(14), null: false, suppresslist: true}
			}
		}

	},

	schema: {
		title: 'Checklist Value',
		header: 'mst_checkval',
		detils: {
			'detail': { title: 'Detail', table: 'mst_checkvalopt', form: true, headerview: 'checkval_caption' }
		}
	}
}



