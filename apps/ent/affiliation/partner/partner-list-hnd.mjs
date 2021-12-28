import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'



let grd_list, opt;
var this_page_id;
var this_page_options;


const cbo_search_partnertype = $('#pnl_list-cbo_search_partnertype');

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;
	this_page_id = opt.id;
	this_page_options = opt;


	grd_list.autoload = false;


	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_partnertype_created: 1
		},
		onFinished: () => {
			grd_list.doLoad();
		}
	})


	cbo_search_partnertype.name = 'pnl_list-cbo_search_partnertype'	
	new fgta4slideselect(cbo_search_partnertype, {
		title: 'Pilih Tupe',
		returnpage: this_page_id,
		api: $ui.apis.load_partnertype_id,

		fieldValue: 'partnertype_id',
		fieldValueMap: 'partnertype_id',
		fieldDisplay: 'partnertype_name',
		fields: [
			{ mapping: 'partnertype_name', text: 'Tipe Partner' },
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
			grd_list.doLoad();
		},
		OnCreated: () => {
			cbo_search_partnertype.combo('setValue', 'ALL');
			cbo_search_partnertype.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_partnertype_created');
		}
	});


	fn_callback();
}




export function customsearch(options) {
	var partnertype_id = cbo_search_partnertype.combo('getValue');
	if (partnertype_id!='ALL') {
		options.api = 'ent/affiliation/partner/list-selector';
		options.criteria.partnertype_id = partnertype_id;
	}


}