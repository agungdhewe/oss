var this_page_id;
var this_page_options;

import { fgta4report } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'
import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'

//const dt_report_date = $('#pnl_list-dt_report_date');
const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')

const cbo_corpbudget_id = $('#pnl_list-cbo_corpbudget_id');
const cbo_reporttype_id = $('#pnl_list-cbo_reporttype_id');


let last_scrolltop = 0
let rpt = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	rpt = new fgta4report(obj_report, {
		OnReportLoaded: () => { obj_report_loaded() }
	})


	btn_load.linkbutton({ onClick: () => { btn_load_click(); } });
	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });
	btn_export.linkbutton({ onClick: () => { btn_export_click(); } });

	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})


	cbo_reporttype_id.name = 'pnl_list-cbo_reporttype_id';
	new fgta4slideselect(cbo_reporttype_id, {
		title: 'Pilih Report Type',
		returnpage: this_page_id,
		api: $ui.apis.load_reporttype_id,
		fieldValue: 'reporttype_id',
		fieldValueMap: 'reporttype_id',
		fieldDisplay: 'reporttype_name',
		fields: [
			{ mapping: 'reporttype_id', text: 'reporttype_id' },
			{ mapping: 'reporttype_name', text: 'reporttype_name' },
		],
		OnDataLoading: (criteria) => {
			console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			if (options.offset == 0) {
				result.records.unshift({ reporttype_id: '--NULL--', reporttype_name: '-- PILIH --' });
			}
		},
		OnSelected: (value, display, record) => {
			// console.log(record);
		},
		OnCreated: () => {
			cbo_reporttype_id.combo('setValue', '--NULL--');
			cbo_reporttype_id.combo('setText', '-- PILIH --');
		}
	});

	cbo_corpbudget_id.name = 'pnl_list-cbo_corpbudget_id';
	new fgta4slideselect(cbo_corpbudget_id, {
		title: 'Pilih Budget',
		returnpage: this_page_id,
		api: $ui.apis.load_corpbudget_id,
		fieldValue: 'corpbudget_id',
		fieldValueMap: 'corpbudget_id',
		fieldDisplay: 'corpbudget_year',
		fields: [
			{ mapping: 'corpbudget_id', text: 'corpbudget_id' },
			{ mapping: 'corpbudget_year', text: 'corpbudget_year' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			if (options.offset == 0) {
				result.records.unshift({ corpbudget_id: '--NULL--', corpbudget_year: '-- PILIH --' });
			}
		},
		OnSelected: (value, display, record) => {
			// console.log(record);
		},
		OnCreated: () => {
			cbo_corpbudget_id.combo('setValue', '--NULL--');
			cbo_corpbudget_id.combo('setText', '-- PILIH --');
		}
	});


}


export function OnSizeRecalculated(width, height) {
	var rpt_container = document.getElementById('rpt_container');
	var report_height = height - rpt_container.offsetTop;
	console.log('h', report_height);

	rpt_container.style.height = `${report_height}px`;
}


function obj_report_loaded() {
	console.log('report loaded');
	btn_export.linkbutton('enable');
	btn_print.linkbutton('enable');
}


function btn_load_click() {
	//var dt = dt_report_date.datebox('getValue');
	var corpbudget_id = cbo_corpbudget_id.combobox('getValue');
	var reporttype_id = cbo_reporttype_id.combobox('getValue');

	try {
		if (corpbudget_id == '--NULL--') {
			throw 'Periode Budget belum dipilih !';
		}

	} catch (err) {
		$ui.ShowMessage('[WARNING]' + err);
		return;
	}



	var reportmodule = window.global.modulefullname + '/rptcorpbudget.xprint' + '?template=format-01-a4-landscape';
	var params = {
		corpbudget_id: corpbudget_id
	}


	console.log(params);
	rpt.load(reportmodule, params);
}

function btn_print_click() {
	rpt.print();
}

function btn_export_click() {
	rpt.export('obj_reporttable', 'ReportTable.xlsx', 'CorpBudget');
}