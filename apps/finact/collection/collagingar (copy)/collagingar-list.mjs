import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'


var this_page_id;
var this_page_options;



const dt_report_date = $('#pnl_list-dt_report_date');
const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')
const cbo_report_type = $('#pnl_list-cbo_report_type');
const lbl_search_filter = $('#pnl_list-lbl_search_filter')
const cbo_search_filter = $('#pnl_list-cbo_search_filter');


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
			cbo_search_filter.combo('setValue', 'ALL')
			cbo_search_filter.combo('setText', 'ALL')
		}
	}})

	dt_report_date.datebox('setValue', global.now())

	cbo_search_filter.name = 'pnl_list-cbo_search_filter'	
	new fgta4slideselect(cbo_search_filter, {
		title: 'Filter',
		returnpage: this_page_id,
		

		fieldValue: 'filter_id',
		fieldValueMap: 'filter_id',
		fieldDisplay: 'filter_name',
		fields: [
			{ mapping: 'filter_id', text: 'Id' },
			{ mapping: 'filter_name', text: 'Name' },
			{ mapping: 'filter_type', text: 'Type' }
		],
		OnDataLoading: (criteria, options) => {
			// console.log('loading...');
			var rpttype = cbo_report_type.combobox('getValue');
			switch (rpttype) {
				case 'agency':
					options.api = `${global.modulefullname}/get_partner`;
					criteria.partnertype_id = 'AGENCY';
					break;
				case 'advertiser':
					options.api = `${global.modulefullname}/get_partner`;
					criteria.partnertype_id = 'ADVERTISER';
					break;
				case 'brand':
					options.api = `${global.modulefullname}/get_brand`;
					break;
			}
			

		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ filter_id: 'ALL', filter_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_search_filter.combo('setValue', 'ALL');
			cbo_search_filter.combo('setText', 'ALL');
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
	var dt = dt_report_date.datebox('getValue');
	
	try {
		if (dt=='') {
			throw 'Tanggal belum diisi';
		}

	} catch (err) {
		$ui.ShowMessage('[WARNING]' + err);
		return;
	}
	

	var rpttype = cbo_report_type.combobox('getValue');
	var filter_id = cbo_search_filter.combo('getValue');
	var reportmodule;
	
	var params = {
		rpttype: rpttype,
		filter_id: filter_id,
		dt: dt
	}

	console.log(params);
	switch (rpttype) {
		case 'agency':
			reportmodule = window.global.modulefullname + '/collagingar-byagency.xprint'  + '?template=format-01-a3-landscape';
			break;

		case 'advertiser':
			reportmodule = window.global.modulefullname + '/collagingar-byadvertiser.xprint'  + '?template=format-01-a3-landscape';
			break;
			
		case 'brand':
			reportmodule = window.global.modulefullname + '/collagingar-bybrand.xprint'  + '?template=format-01-a3-landscape';
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