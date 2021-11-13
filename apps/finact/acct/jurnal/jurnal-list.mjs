import { fgta4slideselect } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect.mjs'
import { fgta4ParallelProcess } from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4parallel.mjs'


var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
const cbo_search_jurnaltype = $('#pnl_list-cbo_search_jurnaltype');

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
	

	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	btn_new.linkbutton({
		onClick: () => { btn_new_click() }
	})

	var parallelProcess = fgta4ParallelProcess({
		waitfor: {
			cbo_search_jurnaltype_created: 1
		},
		onFinished: () => {
			btn_load_click();
		}
	})

	new fgta4slideselect(cbo_search_jurnaltype, {
		title: 'Pilih Tipe Journal',
		returnpage: this_page_id,
		api: $ui.apis.load_jurnaltype_id,
		fieldValue: 'jurnaltype_id',
		fieldValueMap: 'jurnaltype_id',
		fieldDisplay: 'jurnaltype_name',
		fields: [
			{ mapping: 'jurnaltype_name', text: 'Tipe Journal' },
		],
		OnDataLoading: (criteria) => {
			//criteria.billtype_direction = 'IN';
		},
		OnDataLoaded: (result, options) => {
			result.records.unshift({ jurnaltype_id: '--NULL--', jurnaltype_name: 'ALL' });
		},
		OnSelected: (value, display, record, args) => {
			args.flashhighlight = false;
			btn_load_click();
			// console.log(record);
		},
		OnCreated: () => {
			cbo_search_jurnaltype.combo('setValue', '--NULL--');
			cbo_search_jurnaltype.combo('setText', 'ALL');
			parallelProcess.setFinished('cbo_search_jurnaltype_created');
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

	//btn_load_click()
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
		var search_jurnaltype_id = cbo_search_jurnaltype.combo('getValue');

		if (search != '') {
			options.criteria['search'] = search
		}

		if (search_jurnaltype_id != '--NULL--' && search_jurnaltype_id != '') {
			options.criteria['jurnaltype_id'] = search_jurnaltype_id
		}

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
	$ui.getPages().ITEMS['pnl_edit'].handler.createnew()
	$ui.getPages().show('pnl_edit')	
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
		if (mapping=='jurnal_descr') {
			var status = '';
			if (record.jurnal_ispost=="1") {
				status += '<div class="inrow-id-block posted">&nbsp;</div>';
			} else if (record.jurnal_iscommit=="1") {
				status += '<div class="inrow-id-block submit">&nbsp;</div>'
			} else {
				status += '<div class="inrow-id-block draft">&nbsp;</div>'
			} 

			td.innerHTML = `
				<div>
					<div class="inrow-id-block"><span style="font-weight: bold; margin-right: 3px;">${record.jurnal_id}</span>${status}</div>
				</div>
				<div style="font-style: italic; margin-bottom: 3px;">${record.jurnal_descr}</div>
				<div style="font-size: 0.8em;">${record.periodemo_name}</div>
			`;
		}
	})
}

