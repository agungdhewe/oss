var this_page_id;

const tbl_list = $('#pnl_editmultiadd-tbl_list');
const txt_title = $('#pnl_editmultiadd-title');
const txt_search = $('#pnl_editmultiadd-txt_search')
const btn_load = $('#pnl_editmultiadd-btn_load')
const btn_apply = $('.pnl_editmultiadd-apply')
const chk_stay = $('#pnl_editmultiadd-stay')

let grd_list;
let header_data;


export async function init(opt) {
	this_page_id = opt.id
	

	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		// OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		// OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	});	


	btn_load.linkbutton({
		onClick: () => { btn_load_click() }
	})

	btn_apply.linkbutton({
		onClick: () => { btn_apply_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	})

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	})

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	

	document.addEventListener('OnViewModeChanged', (ev) => {
		// if (ev.detail.viewmode===true) {
		// 	pnl_control.hide()
		// } else {
		// 	pnl_control.show()
		// }
	});

	document.addEventListener('scroll', (ev) => {
		// if ($ui.getPages().getCurrentPage()==this_page_id) {
		// 	if($(window).scrollTop() + $(window).height() == $(document).height()) {
		// 		grd_list.nextpageload();
		// 	}			
		// }
	});		
}


export function OnSizeRecalculated(width, height) {
}



export function OpenDetil(data) {
	header_data = data;
}




export function LoadData(data) {
	txt_search.textbox('resize', '100%');
	grd_list.clear();

	if (data!=null) {
		txt_title.html(data.dept_name)
		header_data = data;
		txt_search.textbox('setText', '');
	}


	var fn_listloading = async (options) => {
		var search = txt_search.textbox('getText')

		console.log(header_data);
		options.api = `${global.modulefullname}/get-billout`
		options.criteria.search = search;
		options.criteria.col_empl_id = header_data.empl_id;
		options.criteria.periodemo_id = header_data.periodemo_id;
	}

	var fn_listloaded = async (result, options) => {
		console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)	
}

function grd_list_rowformatting(tr) {

}

function grd_list_cellrender(td) {

}

function grd_list_rowrender(tr) {

}


function btn_load_click() {
	LoadData();
}

function btn_apply_click() {


	var stay = chk_stay.prop("checked")

	grd_list.IterateChecked({
		OnIterating : async (options) => {
			console.log(options)
			var apiurl = `${global.modulefullname}/billout-add`
			var args = {data: options.data, options: {}}


			var colltarget_estdisc = Number(header_data.colltarget_discprop);
			var billout_ppn = 0;
			var billout_ppnval = 0;
			var billout_pph = 0;
			var billout_pphval = 0;
			var billout_validr	= Number(options.data.billout_validr);
			var billout_idrnett = billout_validr - billout_pphval;
			var billout_discval = billout_validr * (colltarget_estdisc/100)
			var billout_idrtotal = billout_validr - billout_discval;

			args.data.periodemo_id = header_data.periodemo_id;
			args.data.colltarget_estdisc = colltarget_estdisc;
			args.data.billout_ppn = billout_ppn;
			args.data.billout_ppnval = billout_ppnval;
			args.data.billout_pph = billout_pph;
			args.data.billout_pphval = billout_pphval;
			args.data.billout_validr = billout_validr;
			args.data.billout_idrnett = billout_idrnett;
			args.data.billout_discval = billout_discval;
			args.data.billout_idrtotal = billout_idrtotal;
			args.data.colltarget_id = header_data.colltarget_id;
			try {
				let result = await $ui.apicall(apiurl, args)
				if (stay) {
					grd_list.removerow(result._trid);
				}
			} catch (err) {
				console.log(err)
			}
		},

		OnIterated: async (args) => {
			if (!stay) {
				$ui.getPages().show('pnl_editbilloutgrid', ()=>{
					$ui.getPages().ITEMS['pnl_editbilloutgrid'].handler.OpenDetil(header_data)
				})
			}



		}


	})
}