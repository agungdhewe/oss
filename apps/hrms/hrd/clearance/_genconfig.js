'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Clearance",
	autoid: true,

	persistent: {
		'trn_hrclear' : {
			primarykeys: ['hrclear_id'],
			comment: 'Clearance karyawan',
			data: {
				hrclear_id: {text:'ID', type: dbtype.varchar(14), null:false},
				hrclear_dteff: {text:'Eff.Date', type: dbtype.date, null:false, suppresslist: true, options:{required:true,invalidMessage:'Tanggal masuk harus diisi'}},
				hrclear_reason: {text:'Reason', type: dbtype.varchar(255), null:false, options:{required:true,invalidMessage:'Alasan keluar harus diisi'}},


			},

			defaultsearch : ['edu_id', 'edu_name'],

			uniques: {
				'edu_name' : ['edu_name']
			},

			
		}
	},

	schema: {
		title: 'Education',
		header: 'trn_hrclear',
		detils: {}
	}
}


/**
 * METEODE APPROVAL
   -> SEC.HEAD (DYNAMIC, BUILD IN)
   -> DEPT.HEAD
   -> 1st LEVEL of DEPT.HEAD
   -> 2nd LEVEL of DEPT.HEAD
   -> 

 */