var this_page_id;
var this_page_options;

const txt_title = $('#pnl_summary-title');

const tbl_list = $('#pnl_summary-tbl_list')
const btn_approve = $('#pnl_summary-btn_approve')
const btn_decline = $('#pnl_summary-btn_decline')			

const pnl_subtitle = $('#pnl_summary-subtitle');

let grd_list = {}
let header_data = {};
let buttonstate = {};

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;

	grd_list = new global.fgta4grid(tbl_list, {
		// OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		// OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		// OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		// OnCellRender: (td) => { grd_list_cellrender(td) },
		// OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	btn_approve.linkbutton({ onClick: () => { 
		$ui.getPages().ITEMS['pnl_edit'].handler.btn_approve_click()
	} });
	
	
	btn_decline.linkbutton({ onClick: () => { 
		$ui.getPages().ITEMS['pnl_edit'].handler.btn_decline_click()
	} });



	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
		}
	})
}


export async function OpenDetil(data) {
	txt_title.html(data.deptbudget_id)
	header_data = data;

	format_summary();
}


export function updatebuttonstate(state) {
	buttonstate = state;
	btn_approve.linkbutton(state.button_approve_on ? 'enable' : 'disable');
	btn_decline.linkbutton(state.button_decline_on ? 'enable' : 'disable');		

}


async function format_summary() {
	pnl_subtitle.html(header_data.subtitle)

	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/summary-list`
		options.criteria['deptbudget_id'] = header_data.deptbudget_id
	}

	var fn_listloaded = async (result, options) => {
		console.log(result)

		if (buttonstate.button_decline_on) {
			if (result.allowdecline) {
				btn_decline.linkbutton('enable');
			} else {
				btn_decline.linkbutton('disable');
			}
		}
		
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}