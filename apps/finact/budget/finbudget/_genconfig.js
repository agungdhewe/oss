
'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Finance Budget",
	autoid: true,
	printing: true,	
	icon: "icon-corpbudget-white.svg",
	committer: true,
	approval: true,
	doc_id: 'FINBUDGET',


	persistent: {

		'mst_finbudget' : {
			primarykeys: ['finbudget_id'],
			comment: 'Daftar Dokumen',
			data: {
				finbudget_id: {text:'ID', type: dbtype.varchar(4), null:false, uppercase: true, options:{required:true,invalidMessage:'ID harus diisi'}},	
				finbudget_year: {text:'Year', type: dbtype.int(4), null:false, uppercase: true, options:{required:true,invalidMessage:'Tahun Budget harus diisi'}},
				finbudget_notes: {text:'Notes', type: dbtype.varchar(255), null:true, suppresslist: true},	
				dept_id: {
					text: 'Dept', type: dbtype.varchar(30), null: false,
					options: { required: true, invalidMessage: 'Departmen Harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_dept',
						field_value: 'dept_id', field_display: 'dept_name',
						api: 'ent/organisation/dept/list'
					})
				},

				finbudget_iscommit: {text:'Commit', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}},
				finbudget_commitby: {text:'CommitBy', type: dbtype.varchar(14), suppresslist: true, unset:true, options:{disabled:true}, hidden: true},
				finbudget_commitdate: {text:'CommitDate', type: dbtype.datetime, suppresslist: true, unset:true, comp:comp.Textbox(), options:{disabled:true}, hidden: true},	
				finbudget_isapprovalprogress: {text:'Progress', type: dbtype.boolean, null:false, default:'0', unset:true, options:{disabled:true}, hidden: true},
				finbudget_isapproved: { text: 'Approved', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				finbudget_approveby: { text: 'Approve By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true },
				finbudget_approvedate: { text: 'Approve Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				finbudget_isdeclined: { text: 'Declined', type: dbtype.boolean, null: false, default: '0', unset:true, options: { disabled: true } },
				finbudget_declineby: { text: 'Decline By', type: dbtype.varchar(14), suppresslist: true, unset:true, options: { disabled: true }, hidden: true },
				finbudget_declinedate: { text: 'Decline Date', type: dbtype.datetime, suppresslist: true, unset:true, comp: comp.Textbox(), options: { disabled: true }, hidden: true },
				finbudget_version: {text:'Version', type: dbtype.int(4), null:false, default:'0', suppresslist: true, options:{disabled:true}},

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
			defaultsearch: ['finbudget_id', 'finbudget_year'],
			uniques: {
				'finbudget_year' : ['finbudget_year']
			}
		},

        
		'mst_finbudgetdet' : {
			primarykeys: ['finbudgetdet_id'],
			comment: 'Daftar Detil Coporate Budget.',			
			data : {
				finbudgetdet_id: {text:'ID', type: dbtype.varchar(14), null:false},

				accfin_id: {
					text:'Account', type: dbtype.varchar(20), null:false,
					options:{required:true,invalidMessage:'Account harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accfin', 
						field_value: 'accfin_id', field_display: 'accfin_name', 
						api: 'finact/master/accfin/list'})
				},

				finbudgetdet_descr: {text:'Descr', type: dbtype.varchar(255), suppresslist: true},
				finbudgetdet_01: {text:'JAN', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_02: {text:'FEB', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_03: {text:'MAR', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_04: {text:'APR', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_05: {text:'MEI', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_06: {text:'JUN', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_07: {text:'JUL', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_08: {text:'AGS', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_09: {text:'SEP', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_10: {text:'OKT', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_11: {text:'NOV', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_12: {text:'DES', type: dbtype.decimal(14, 0), null:false, default:0, suppresslist: true},
				finbudgetdet_total: {text:'Total', type: dbtype.decimal(14, 0), null:false, default:0},

				finbudgetdet_notes: {text:'Notes', type: dbtype.varchar(255), suppresslist: true},
				finbudget_id: {text:'BudgetID', type: dbtype.varchar(4), null:false},
			},
			defaultsearch: ['finbudget_id', 'finbudgetdet_descr', 'finbudgetdet_notes'],
			uniques: {
				'finbudget_accfin_id' : ['finbudget_id', 'accfin_id']
			}
        }
 
	},

	schema: {
		title: 'Finance Budget',
		header: 'mst_finbudget',
		detils: {
			'detil' : {title: 'Detil', table:'mst_finbudgetdet', form: true, headerview:'finbudget_year'}
        }
	}

}
