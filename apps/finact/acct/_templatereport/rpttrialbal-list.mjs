var this_page_id;
var this_page_options;

import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'

const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')

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


function obj_report_loaded() {
	console.log('report loaded');
}


function btn_load_click() {
	var reporturl = 'index.php/printout/' + window.global.modulefullname + '/rpttrialbal.xprint?id=222' ;
	rpt.load(reporturl);
}

function btn_print_click() {
	rpt.print();
}