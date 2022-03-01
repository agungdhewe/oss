var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_editdetilgrid-tbl_list');
const txt_title = $('#pnl_editdetilgrid-title');
const txt_title_dept = $('#pnl_editdetilgrid-title-dept');
const txt_title_year = $('#pnl_editdetilgrid-title-year')
const pnl_control = $('.pnl_editdetilgrid-control');
const btn_removechecked  = $('#pnl_editdetilgrid-removechecked');
const btn_addrow = $('#pnl_editdetilgrid-addrow');
const txt_deptbudgetdet_total = $('.deptbudgetdet_total');
const txt_copy_year = $('#pnl_editdetilgrid-txt_copy_year');
const btn_copyyear = $('#pnl_editdetilgrid-btn_copyyear')

let grd_list = {};
let header_data = {};
let last_scrolltop = 0;

export async function init(opt) {
	this_page_id = opt.id;
	this_page_options = opt;
	
	
	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	});	

	btn_removechecked.linkbutton({
		onClick: () => { btn_removechecked_click() }
	});

	btn_addrow.linkbutton({
		onClick: () => { btn_addrow_click() }
	});


	btn_copyyear.linkbutton({
		onClick: () => { btn_copyyear_click() }
	})

	document.addEventListener('OnButtonBack', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
			$ui.getPages().show('pnl_edit')
		}
	});

	document.addEventListener('OnButtonHome', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			ev.detail.cancel = true;
		}
	});

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	});	

	document.addEventListener('OnViewModeChanged', (ev) => {
		if (ev.detail.viewmode===true) {
			pnl_control.hide()
		} else {
			pnl_control.show()
		}
	});

	document.addEventListener('scroll', (ev) => {
		if ($ui.getPages().getCurrentPage()==this_page_id) {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				grd_list.nextpageload();
			}			
		}
	});			
}


export function OnSizeRecalculated(width, height) {
}



export function createnew(data, options) {
	// pada saat membuat data baru di header
	header_data = data;

	grd_list.clear();
	txt_title.html(data.deptbudget_id);
	txt_title_dept.html(header_data.dept_name);
	txt_title_year.html(header_data.deptbudget_year);

}

export function OpenDetil(data) {
	// saat di klik di edit utama, pada detil information
	header_data = data;

	console.log(header_data);


	grd_list.clear();
	txt_title.html(header_data.deptbudget_id);
	txt_title_dept.html(header_data.dept_name);
	txt_title_year.html(header_data.deptbudget_year);


	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/detil-list`
		options.criteria['id'] = data.deptbudget_id
	}
	var fn_listloaded = async (result, options) => {
		// console.log(result)
		setSummary(result.summary);

		var detilform = $ui.getPages().ITEMS['pnl_editdetilform'].handler.getForm()

		if (detilform.AllowAddRecord) {
			btn_addrow.show()
		} else {
			btn_addrow.hide()
		}

		if (detilform.AllowRemoveRecord) {
			btn_removechecked.show()
		} else {
			btn_removechecked.hide()
		}


		// isi copy budget
		var lastyear = header_data.deptbudget_year;
		txt_copy_year.textbox('setText', lastyear-1);

	}

	grd_list.listload(fn_listloading, fn_listloaded)	
}

export function scrolllast() {
	$(window).scrollTop(last_scrolltop)
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

export function getGrid() {
	return grd_list
}

export function setSummary(summary) {
	txt_deptbudgetdet_total.html(window.format_number(summary.deptbudgetdet_total));
}



function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	last_scrolltop = $(window).scrollTop()
	$ui.getPages().show('pnl_editdetilform', () => {
		$ui.getPages().ITEMS['pnl_editdetilform'].handler.open(record, trid, header_data)
	})	
}

function grd_list_cellclick(td, ev) {

}

function grd_list_cellrender(td) {

}

function grd_list_rowrender(tr) {

}


function btn_removechecked_click() {
	$ui.ShowMessage("[QUESTION]Apakah anda akan menghapus baris terpilih ?" , {
		yes: () => {
			grd_list.removechecked({
				OnRemoving : async (options) => {
					var apiurl = `${global.modulefullname}/detil-delete`
					var args = {data: options.data, options: {}}
					try {
						let result = await $ui.apicall(apiurl, args)
					} catch (err) {
						console.log(err)
					}
				}
			})
		},
		no: () => {}
	})
}


function btn_addrow_click() {
	$ui.getPages().show('pnl_editdetilform', ()=>{
		$ui.getPages().ITEMS['pnl_editdetilform'].handler.createnew(header_data)
	})	
}


async function btn_copyyear_click() {
	var apiurl = `${global.modulefullname}/xtion-copyyear`
	var args = {
		data: {
			year: header_data.deptbudget_year - 1,
			dept_id: header_data.dept_id,
			deptbudget_id: header_data.deptbudget_id
		}
	}
	try {
		var result = await $ui.apicall(apiurl, args);

		console.log(result);

		OpenDetil(header_data);
	} catch (err) {
		console.log(err)
	}


}