import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'



var this_page_id;
var this_page_options;



const cbo_search_dept = $('#pnl_list-cbo_search_dept');
const dt_report_date = $('#pnl_list-dt_report_date');
const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')


let last_scrolltop = 0
let rpt = {}

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	rpt = new fgta4report(obj_report, {
		OnReportLoaded: (iframe) => { obj_report_loaded(iframe) }
	})
	

	btn_load.linkbutton({ onClick: () => { btn_load_click(); } });
	btn_print.linkbutton({ onClick: () => { btn_print_click(); } });
	btn_export.linkbutton({ onClick: () => { btn_export_click(); } });

	btn_export.linkbutton('disable');
	btn_print.linkbutton('disable');
	

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_dept_created: 1
		},
		onFinished: () => {
			// btn_load_click();
		}
	})


	cbo_search_dept.name = 'pnl_list-cbo_search_dept'	
	new fgta4slideselect(cbo_search_dept, {
		title: 'Pilih Department',
		returnpage: this_page_id,
		api: $ui.apis.load_dept_id,

		fieldValue: 'dept_id',
		fieldValueMap: 'dept_id',
		fieldDisplay: 'dept_name',
		fields: [
			{ mapping: 'dept_name', text: 'Departemen' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			if (global.setup.empluser_allowviewalldept=='1') {
				result.records.unshift({ dept_id: 'ALL', dept_name: 'ALL' });
			}
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			// btn_load_click();
		},
		OnCreated: () => {
			cbo_search_dept.combo('setValue', global.setup.dept_id);
			cbo_search_dept.combo('setText', global.setup.dept_name);
			parallelProcess.setFinished('cbo_search_dept_created');
		}
	});



	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

}


export function OnSizeRecalculated(width, height) {
	var rpt_container = document.getElementById('rpt_container');
	var report_height = height - rpt_container.offsetTop;
	console.log('h', report_height);

	rpt_container.style.height = `${report_height}px`;
}


function obj_report_loaded(iframe) {
	console.log('report loaded');
	btn_export.linkbutton('enable');
	btn_print.linkbutton('enable');

	// iframe.contentWindow.document.addEventListener("click", function(ev) {
	// 	console.log(ev);

	// 	var el = iframe.contentWindow.document.elementFromPoint(ev.clientX, ev.clientY);
	// 	console.log(el);
	// });
}

export function opendetil(partner_id, date) {
	var dt = dt_report_date.datebox('getValue');

}






function btn_load_click() {
	var dt = dt_report_date.datebox('getValue');
	
	// try {
	// 	if (dt=='') {
	// 		throw 'Tanggal belum diisi';
	// 	}

	// } catch (err) {
	// 	$ui.ShowMessage('[WARNING]' + err);
	// 	return;
	// }
	


	// var reportmodule = window.global.modulefullname + '/rptcoa.xprint' + '?template=format-01-a4-landscape';
	var reportmodule = window.global.modulefullname + '/rptcoa.xprint';
	var params = {
		dt: dt
	}


	console.log(params);
	rpt.load(reportmodule, params);
}

function btn_print_click() {
	rpt.print();
}

function btn_export_click() {
	rpt.export('obj_reporttable', 'ReportTable.xlsx', 'TrialBalance');
}