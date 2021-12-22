'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Item Class",
	autoid: true,

	persistent: {
		'mst_itemclass': {
			comment: 'Daftar Klasifikasi Item',
			primarykeys: ['itemclass_id'],
			data: {
				itemclass_id: { text: 'ID', type: dbtype.varchar(14), null: false},
				itemclass_name: { text: 'Item Class', type: dbtype.varchar(30), null: false, uppercase: true, options: { required: true, invalidMessage: 'Nama Klasifikasi item harus diisi' } },
				itemclass_isdisabled: { text: 'Disabled', type: dbtype.boolean, null: false, default: '0' },
				itemclass_isadvproces: { text: 'Process as Advance', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options: {labelWidth:'200px'} },
				itemclass_descr: { text: 'Descr', type: dbtype.varchar(90), suppresslist: true },
				itemmodel_id: { 
					text: 'Model', type: dbtype.varchar(10), uppercase: true, null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Model harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_itemmodel', 
						field_value: 'itemmodel_id', field_display: 'itemmodel_name', field_display_name: 'itemmodel_name', 
						api: 'finact/items/itemmodel/list'})
				
				},	

				itemclassgroup_id: {
					text:'Group', type: dbtype.varchar(17), null:true, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_itemclassgroup', 
						field_value: 'itemclassgroup_id', field_display: 'itemclassgroup_name', field_display_name: 'itemclassgroup_name', 
						api: 'finact/items/itemclassgroup/list'})					
				},

				owner_dept_id: {
					text: 'Owner', type: dbtype.varchar(30), null:false,  suppresslist: true,
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'owner_dept_name',
						api: 'ent/organisation/dept/list',
						OnSelectedScript: `
				var maintainer_dept_id = form.getValue(obj.cbo_maintainer_dept_id);
				if (maintainer_dept_id==args.PreviousValue || maintainer_dept_id=='--NULL--' || maintainer_dept_id=='' || maintainer_dept_id==null) {
					form.setValue(obj.cbo_maintainer_dept_id, record.dept_id, record.dept_name);
				}
						`
					
					})				
				},

				maintainer_dept_id: {
					text: 'Maintainer', type: dbtype.varchar(30), null:false,  suppresslist: true,
					tips: 'Maintainer Dept yang akan manage distribusi tipe item ini',
					tipstype: 'visible',
					options:{required:true,invalidMessage:'Dept harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_dept', 
						field_value: 'dept_id', field_display: 'dept_name', field_display_name: 'maintainer_dept_name',
						api: 'ent/organisation/dept/list'})				
				},

				unitmeasurement_id: { 
					text: 'Unit of Measurement', 
					type: dbtype.varchar(10),  null: false, suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_unitmeasurement', 
						field_value: 'unitmeasurement_id', field_display: 'unitmeasurement_name', 
						api: 'ent/general/unitmeasurement/list'})
				},				


				itemmanage_id: {
					text:'Manage As', type: dbtype.varchar(2), null:false, suppresslist: true,
					options: {required:true, invalidMessage:'Order Doc harus diisi' },
					comp: comp.Combo({
						table: 'mst_itemmanage', 
						tips: 'Perlakuan item yang diterima pada saat order diselesaikan.',
						tipstype: 'visible',
						field_value: 'itemmanage_id', field_display: 'itemmanage_name',  field_display_name: 'itemmanage_name',
						api: 'finact/items/itemmanage/list'})
				},

				itemclass_minassetvalue: { text: 'If Value More Than', type: dbtype.decimal(11,2), null:false, default:0, suppresslist: true },

				inquiry_accbudget_id: {
					text: 'Inquiry Budget', type: dbtype.varchar(20), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Account Budget Inquiry harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_accbudget',
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'inquiry_accbudget_name', 
						api: 'finact/master/accbudget/list'
					})
				},

				settl_coa_id: {
					text: 'Settl Account', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Account Settlement harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'settl_coa_name', 
						api: 'finact/master/coa/list'
					})
				},

				cost_coa_id: {
					text: 'Cost/Depre', type: dbtype.varchar(17), null: true, suppresslist: true,
					tips: 'Account Cost / Amortisasi / Depresiasi (asset)',
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'cost_coa_name', 
						api: 'finact/master/coa/list'
					})
				},			
				
				depremodel_id: { 
					text: 'Depresiasi', 
					type: dbtype.varchar(10), null: true,  suppresslist: true,
					options: { prompt:'NONE' },
					comp: comp.Combo({
						table: 'mst_depremodel', 
						field_value: 'depremodel_id', field_display: 'depremodel_name', field_display_name: 'depremodel_name', 
						api: 'finact/master/depremodel/list'})				
				},	

				itemclass_depreage: { text: 'Depre Age', type: dbtype.int(2), null:false, default:5, suppresslist: true },
				itemclass_depreresidu: { text: 'Depre Residu', type: dbtype.decimal(11,2), null:false, default:1, suppresslist: true },
				

				itemclass_isallowoverqty: { caption:'Override Budget Restriction', text: 'Allow over qty from Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				itemclass_isallowoverdays: { text: 'Allow over days from Budget', type: dbtype.boolean, null: false, default: '0', suppresslist: true, options:{ labelWidth:'300px'} },
				itemclass_isallowovertask: { text: 'Allow over task from Budget', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				itemclass_isallowovervalue: { text: 'Allow over value from Budgett', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},
				itemclass_isallowunbudget: { text: 'Allow Request UnBudgeted', type: dbtype.boolean, null: false, default: '0' , suppresslist: true, options:{ labelWidth:'300px'}},

			},

			uniques: {
				'itemclass_name': ['itemclass_name']
			},

			defaultsearch: ['itemclass_id', 'itemclass_name']
		},


		
		'mst_itemclassaccbudget' : {
			comment: 'Account yang direlasikan ke itemclass ini',
			primarykeys: ['itemclassaccbudget_id'],
			data: {
				itemclassaccbudget_id: {text:'ID', type: dbtype.varchar(14), null:false, suppresslist: true},
				
				projectmodel_id: {
					text: 'Project Model', type: dbtype.varchar(10), null: true, suppresslist: true,
					options: { required: true, invalidMessage: 'ID harus diisi' , prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_projectmodel', field_value: 'projectmodel_id', field_display: 'projectmodel_name', 
						api: 'finact/master/projectmodel/list'
					})
				},

				inquiry_accbudget_id: {
					text:'Inquiry Budget Account', type: dbtype.varchar(20), null:false,
					options:{required:true,invalidMessage:'Account Budget harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_accbudget', 
						field_value: 'accbudget_id', field_display: 'accbudget_name', field_display_name: 'inquiry_accbudget_name', 
						api: 'finact/master/accbudget/list'})
				},

				settl_coa_id: {
					text: 'Settl Account', type: dbtype.varchar(17), null: false, suppresslist: true,
					options: { required: true, invalidMessage: 'Account Settlement harus diisi', prompt: '-- PILIH --' },
					comp: comp.Combo({
						table: 'mst_coa',
						field_value: 'coa_id', field_display: 'coa_name', field_display_name: 'settl_coa_name', 
						api: 'finact/master/coa/list'
					})
				},
		
				itemclass_id: {text:'Item', type: dbtype.varchar(14), null:false},	
			},

			// uniques: {
			// 	'itemclassaccbudget_pair': ['itemclass_id', 'projecttype_id']
			// },

		},


		'mst_itemclassfiles' : {
			primarykeys: ['itemclassfiles_id'],
			comment: 'Daftar FIle Inquiry',
			data: {
				itemclassfiles_id: {text:'ID', type: dbtype.varchar(14), null:false},	
				doctype_id: {
					text:'Document Type', type: dbtype.varchar(10), null:false, 
					options: { required: true, invalidMessage: 'Tipe dokumen harus diisi' } ,
					comp: comp.Combo({
						table: 'mst_doctype', 
						field_value: 'doctype_id', field_display: 'doctype_name', 
						api: 'ent/general/doctype/list'})
				},
				itemclassfiles_descr: {text:'Descr', type: dbtype.varchar(90), null:false},	
				itemclassfiles_order: {text:'Order', type: dbtype.int(4), null:false, default:'0', suppresslist: true},
				itemclassfiles_file: {text:'File', type: dbtype.varchar(90), suppresslist: true,  comp: comp.Filebox(), options: { accept: 'image/*' }},
				itemclass_id: {text:'ID', type: dbtype.varchar(14), null:false, hidden: true},		
			},
			defaultsearch: ['itemclassfiles_descr']
		},


	},

	schema: {
		header: 'mst_itemclass',
		detils: {
			'account': {title: 'Account Ovveride by Project Type', table: 'mst_itemclassaccbudget', form: true, headerview: 'itemclass_name' },
			'files': {title: 'Files', table: 'mst_itemclassfiles', form: true, headerview: 'itemclass_name' },
		}
	}


}