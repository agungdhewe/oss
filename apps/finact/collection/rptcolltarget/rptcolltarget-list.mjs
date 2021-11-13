import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'


var this_page_id;
var this_page_options;



const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')
const cbo_report_type = $('#pnl_list-cbo_report_type');
const cbo_search_empl = $('#pnl_list-cbo_search_empl');
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
	

	cbo_report_type.combobox({onChange: (newValue,oldValue)=>{
		if (newValue!=oldValue) {
			cbo_search_empl.combo('setValue', 'ALL')
			cbo_search_empl.combo('setText', 'ALL')
		}
	}})


	cbo_search_empl.name = 'pnl_list-cbo_search_empl'	
	new fgta4slideselect(cbo_search_empl, {
		title: 'Filter',
		returnpage: this_page_id,
		api: $ui.apis.load_empl_id,
		fieldValue: 'empl_id',
		fieldValueMap: 'empl_id',
		fieldDisplay: 'empl_name',
		fields: [
			{ mapping: 'empl_id', text: 'Id' },
			{ mapping: 'empl_name', text: 'Name' },
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ empl_id: 'ALL', empl_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_search_empl.combo('setValue', 'ALL');
			cbo_search_empl.combo('setText', 'ALL');
		}
	});


	
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
	
	try {
	



	} catch (err) {
		$ui.ShowMessage('[WARNING]' + err);
		return;
	}
	

	var rpttype = cbo_report_type.combobox('getValue');
	var empl_id = cbo_search_empl.combo('getValue');
	var periodemo_id = cbo_search_periodemo.combo('getValue');
	var reportmodule;
	
	var params = {
		rpttype: rpttype,
		empl_id: empl_id,
		periodemo_id: periodemo_id
	}

	console.log(params);
	switch (rpttype) {
		case 'projection':
			reportmodule = window.global.modulefullname + '/rptcolltarget-02-projection.xprint'  + '?template=format-01-a3-landscape';
			break;

		case 'realisasi':
			reportmodule = window.global.modulefullname + '/rptcolltarget-03-realisasi.xprint'  + '?template=format-01-a4-landscape';
			break;

	}

	rpt.load(reportmodule, params);
}

function btn_print_click() {
	rpt.print();
}

function btn_export_click() {
	rpt.export('obj_reporttable', 'ReportTable.xlsx', 'TrialBalance');
}