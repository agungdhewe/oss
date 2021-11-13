'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Collector",
	// icon: "icon-colltarget-white.svg",
	// backcolor: "#1b7486",
	autoid: true,

	persistent: {
		'mst_collector' : {
			comment: 'Daftar Collector',
			primarykeys: ['collector_id'],
			data: {
				collector_id:  {text:'ID', type: dbtype.varchar(30), null:false},
				empl_id: {
					options:{required:true, invalidMessage:'Nama Collector harus diisi', prompt:'-- PILIH --'},
					text:'Collector', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_empl', 
						field_value: 'empl_id', field_display: 'empl_name',  field_display_name: 'empl_name',
						api: 'hrms/master/empl/list'})
				},

				collector_name: {text:'Name', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Collector harus diisi'}},
				collector_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0', options: { disabled: true } },
			},

			defaultsearch: ['collector_id', 'collector_name'],
			uniques: {
				'empl_id' : ['empl_id']
			}
		},

		'mst_collectorpartner' : {
			comment: 'Daftar Bill dari collector',
			primarykeys: ['collectorparner_id'],
			data: {
				collectorparner_id: { text: 'ID', type: dbtype.varchar(14), null: false, uppercase: true, options: { required: true, invalidMessage: 'ID harus diisi' } },
				partner_id: {
					options:{required:true, invalidMessage:'Partner harus diisi', prompt:'-- PILIH --'},
					text:'Parner', type: dbtype.varchar(30), null:false, 
					comp: comp.Combo({
						table: 'mst_partner', 
						field_value: 'partner_id', field_display: 'partner_name',  field_display_name: 'partner_name',
						api: 'ent/affiliation/partner/list'})
				},
				collector_id:  {text:'ID', type: dbtype.varchar(30), null:false},
			},
			uniques: {
				'partner_id' : ['partner_id']
			}			
		}
	},

	schema: {
		title: 'Collector',
		header: 'mst_collector',
		detils: {
			'mst_collectorpartner': {title: 'Partner', table: 'mst_collectorpartner', form: true, headerview: 'collector_name' },
		}
	}
}
