import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import {fgta4report} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4report.mjs'


var this_page_id;
var this_page_options;


const dt_report_date = $('#pnl_list-dt_report_date');
const btn_export = $('#pnl_list-btn_export');
const btn_print = $('#pnl_list-btn_print');
const btn_load = $('#pnl_list-btn_load');
const obj_report = $('#obj_report')
const cbo_search_partner = $('#pnl_list-cbo_search_partner');
const cbo_search_partnertype = $('#pnl_list-cbo_search_partnertype');

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
	


	cbo_search_partnertype.name = 'pnl_list-cbo_search_partnertype'	
	new fgta4slideselect(cbo_search_partnertype, {
		title: 'Pilih Tipe Partner',
		returnpage: this_page_id,
		api: $ui.apis.load_partnertype_id,

		fieldValue: 'partnertype_id',
		fieldValueMap: 'partnertype_id',
		fieldDisplay: 'partnertype_name',
		fields: [
			{ mapping: 'partnertype_name', text: 'Partner Type' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');

		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ partnertype_id: 'ALL', partnertype_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_search_partnertype.combo('setValue', 'ALL');
			cbo_search_partnertype.combo('setText', 'ALL');
		}
	});


	cbo_search_partner.name = 'pnl_list-cbo_search_partner'	
	new fgta4slideselect(cbo_search_partner, {
		title: 'Pilih Partner',
		returnpage: this_page_id,
		api: $ui.apis.load_partner_id,

		fieldValue: 'partner_id',
		fieldValueMap: 'partner_id',
		fieldDisplay: 'partner_name',
		fields: [
			{ mapping: 'partner_name', text: 'Partner' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
			var partnertype_id = cbo_search_partnertype.combo('getValue');
			if (partnertype_id!='ALL') {
				criteria.partnertype_id = partnertype_id;
			}

		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ partner_id: 'ALL', partner_name: 'ALL' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
		},
		OnCreated: () => {
			cbo_search_partner.combo('setValue', 'ALL');
			cbo_search_partner.combo('setText', 'ALL');
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
	


	var reportmodule = window.global.modulefullname + '/rptagingar.xprint'  + '?template=format-01-a3-landscape';
	var partner_id = cbo_search_partner.combo('getValue');
	var params = {
		reportmodule: reportmodule,
		partner_id: partner_id,
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