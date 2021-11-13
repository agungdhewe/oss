import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'

var this_page_id;
var this_page_options;



const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')
const cbo_search_periodemo = $('#pnl_list-cbo_search_periodemo');

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
	



	cbo_search_periodemo.name = 'pnl_list-cbo_search_periodemo'	
	new fgta4slideselect(cbo_search_periodemo, {
		title: 'Pilih Periode',
		returnpage: this_page_id,
		api: $ui.apis.load_periodemo_id,

		fieldValue: 'periodemo_id',
		fieldValueMap: 'periodemo_id',
		fieldDisplay: 'periodemo_name',
		fields: [
			{ mapping: 'periodemo_name', text: 'Periode' },
		],
		OnDataLoading: (criteria) => {
		},
		OnDataLoaded: (result, options) => {
		},
		OnSelected: (value, display, record, options) => {
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_search_periodemo.combo('setValue', '0');
			cbo_search_periodemo.combo('setText', '-- PILIH --');
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




function btn_load_click() {
	var periodemo_id = cbo_search_periodemo.combo('getValue');
	var periodemo_name = cbo_search_periodemo.combo('getText');
	

	// try {
	// 	if (dt=='') {
	// 		throw 'Tanggal belum diisi';
	// 	}

	// } catch (err) {
	// 	$ui.ShowMessage('[WARNING]' + err);
	// 	return;
	// }
	


	// var reportmodule = window.global.modulefullname + '/rptcoa.xprint' + '?template=format-01-a4-landscape';
	var reportmodule = window.global.modulefullname + '/colltargetprint.xprint';
	var params = {
		periodemo_id: periodemo_id,
		periodemo_name: periodemo_name
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