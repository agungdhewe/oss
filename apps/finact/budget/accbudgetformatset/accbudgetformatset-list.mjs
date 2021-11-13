import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
const cbo_search_format = $('#pnl_list-cbo_search_format');

const btn_load = $('#pnl_list-btn_load')
const btn_new = $('#pnl_list-btn_new')


let grd_list = {}

let last_scrolltop = 0

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	txt_search.textbox('textbox').bind('keypress', (evt)=>{
		if (evt.key==='Enter') {
			btn_load_click(self)
		}
	})
	

	btn_load.linkbutton({ onClick: () => { btn_load_click() } })
	btn_new.linkbutton({ onClick: () => { btn_new_click() } })


	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_format_created: 1
		},
		onFinished: () => {
			btn_load_click();
		}
	})

	cbo_search_format.name = 'pnl_list-cbo_search_format'	
	new fgta4slideselect(cbo_search_format, {
		title: 'Pilih Format',
		returnpage: this_page_id,
		api: $ui.apis.load_accbudgetformat_id,

		fieldValue: 'accbudgetformat_id',
		fieldValueMap: 'accbudgetformat_id',
		fieldDisplay: 'accbudgetformat_name',
		fields: [
			{ mapping: 'accbudgetformat_name', text: 'Format' },
		],
		OnDataLoading: (criteria) => {
			// console.log('loading...');
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ accbudgetformat_id: '--NULL--', accbudgetformat_name: '-- PILIH --' });
		},
		OnSelected: (value, display, record, options) => {
			// console.log(record);
			options.flashhighlight = false
			btn_load_click();
		},
		OnCreated: () => {
			cbo_search_format.combo('setValue', '--NULL--');
			cbo_search_format.combo('setText', '-- PILIH --');
			parallelProcess.setFinished('cbo_search_format_created');
		}
	});


	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	


	document.addEventListener('scroll', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				grd_list.nextpageload();
			}			
		}
	})	
	
	//button state
}


export function OnSizeRecalculated(width, height) {
}


export function updategrid(data, trid) {
	if (trid==null) {
		grd_list.fill([data])
		trid = grd_list.getLastId()
		
	} else {
		grd_list.update(trid, data)
	}

	return trid
}


export function removerow(trid) {
	grd_list.removerow(trid)
}

export function scrolllast() {
	$(window).scrollTop(last_scrolltop)

}

function btn_load_click() {

	grd_list.clear()

	var fn_listloading = async (options) => {
		var search = txt_search.textbox('getText')
		if (search!='') {
			options.criteria['search'] = search
		}

		var accbudgetformat_id = cbo_search_format.combo('getValue');
		options.criteria.accbudgetformat_id = accbudgetformat_id;

		// switch (this_page_options.variancename) {
		// 	case 'commit' :
		//		break;
		// }

	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}

function btn_new_click() {
	var accbudgetformat_id = cbo_search_format.combo('getValue');
	if (accbudgetformat_id=='--NULL--') {
		$ui.ShowMessage('[WARNING]Format belum dipilih');
	} else {
		$ui.getPages().ITEMS['pnl_edit'].handler.createnew()
		$ui.getPages().show('pnl_edit')	
	}

}


function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	var viewmode = true
	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS['pnl_edit'].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show('pnl_edit')	
		}
	})
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	// var text = td.innerHTML
	// if (td.mapping == 'id') {
	// 	// $(td).css('background-color', 'red')
	// 	td.innerHTML = `<a href="javascript:void(0)">${text}</a>`
	// }
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='accbudgetformatset_name') {
			console.log(mapping)
			var accbudgetformatset_name = record.accbudgetformatset_name;
			var accbudgetformatset_level = record.accbudgetformatset_level;

			var indent = 10 * accbudgetformatset_level;

			if (record.accbudgetformatset_isbold=="1") {
				accbudgetformatset_name = `<B>${accbudgetformatset_name}</B>`
			} 
			if (record.accbudgetformatset_isitalic=="1") {
				accbudgetformatset_name = `<I>${accbudgetformatset_name}</I>`
			} 
			
			if (record.accbudgetformatset_isunderline=="1") {
				accbudgetformatset_name = `<U>${accbudgetformatset_name}</U>`
			}

			
			td.innerHTML = `<div style="margin-left: ${indent}px">${accbudgetformatset_name}</div>`
		}

	})
}

