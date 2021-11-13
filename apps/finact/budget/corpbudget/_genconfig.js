
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Corporate Budget",
	autoid: true,
	printing: true,	
	icon: "icon-corpbudget-white.svg",
	committer: true,
	approval: true,
	doc_id: 'CORPBUDGET',


	persistent: {

		'mst_corpbudget' : {
			primarykeys: ['corpbudget_id'],
			comment: 'Daftar Dokumen',
			data: {
				corpbudget_id: {text:'ID', type: dbtype.varchar(4), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},	
				corpbudget_year: {text:'Year', type: dbtype.int(4), null:false, uppercase: true, options:{required:true,invalidMessage:'Tahun Budget harus diisi'}},
				corpbudget_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				corpbudget_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true},
				corpbudget_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				corpbudget_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true},
				corpbudget_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				corpbudget_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true },
				corpbudget_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				corpbudget_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				corpbudget_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true },
				corpbudget_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				corpbudget_notes: {text:'Notes', type: dbtype.varchar(255), null:true, suppresslist: true},	
				corpbudget_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departmen Harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},
				
				doc_id: {
					text:'Doc', type: dbtype.varchar(30), null:false, uppercase: true, 
					options: {required:true, invalidMessage:'ID harus diisi' },
					comp: comp.Combo({
						table: 'mst_doc',
						field_value: 'doc_id', field_display: 'doc_name', field_display_name: 'doc_name',
						api: 'ent/organisation/docs/list'
					})				
				},
			},
			defaultsearch: ['corpbudget_id', 'corpbudget_year'],
			uniques: {
				'corpbudget_year' : ['corpbudget_year']
			}
		},

        
		'mst_corpbudgetdet' : {
			primarykeys: ['corpbudgetdet_id'],
			comment: 'Daftar Detil Coporate Budget.',			
			data : {
				corpbudgetdet_id: {text:'ID', type: dbtype.varchar(14), null:false},
				corpbudgetdet_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
				corpbudgetdet_01: {text:'JAN', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_02: {text:'FEB', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_03: {text:'MAR', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_04: {text:'APR', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_05: {text:'MEI', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_06: {text:'JUN', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_07: {text:'JUL', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_08: {text:'AGS', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_09: {text:'SEP', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_10: {text:'OKT', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_11: {text:'NOV', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_12: {text:'DES', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				corpbudgetdet_total: {text:'Total', type: dbtype.decimal(14, 0), null:false, default:0},
				accbudget_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true,invalidMessage:'Account Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},
				corpbudgetdet_notes: {text:'Notes', type: dbtype.varchar(255), suppresslist: true},
				corpbudget_id: {text:'BudgetID', type: dbtype.varchar(4), null:false},
			},
			defaultsearch: ['accbudget_id', 'corpbudgetdet_descr', 'corpbudgetdet_notes'],
			uniques: {
				'corpbudget_accbudget_id' : ['corpbudget_id', 'accbudget_id']
			}
        }
 
	},

	schema: {
		title: 'Corp Budget',
		header: 'mst_corpbudget',
		detils: {
			'detil' : {title: 'Detil', table:'mst_corpbudgetdet', form: true, headerview:'corpbudget_id'}
        }
	}

}
