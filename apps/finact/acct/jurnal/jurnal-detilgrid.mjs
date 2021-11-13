var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_editdetilgrid-tbl_list');
const txt_title = $('#pnl_editdetilgrid-title');
const pnl_control = $('#pnl_editdetilgrid-control');
const btn_removechecked  = $('#pnl_editdetilgrid-removechecked');
const btn_addrow = $('#pnl_editdetilgrid-addrow');
const txt_jurnal_variance = $('.jurnal_variance');
const txt_jurnal_total = $('.jurnal_total');

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
	grd_list.clear();
	txt_title.html(data.jurnal_descr)
	header_data = data;
}

export function OpenDetil(data) {
	// saat di klik di edit utama, pada detil information

	grd_list.clear();
	txt_title.html(data.jurnal_descr)
	header_data = data;

	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/detil-list`
		options.criteria['id'] = data.jurnal_id
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
	txt_jurnal_variance.html(window.format_number(summary.jurnal_variance));
	txt_jurnal_total.html(window.format_number(summary.jurnal_total ));
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
	//console.log(td);
	if (typeof td != 'undefined'){
		var text = td.innerHTML
		if (td.mapping == 'jurnaldetil_validr' && parseFloat(text) < 0){						
			//console.log(absValue);
			$(td).css('color', 'red');
		}
	}
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	var k_margin = '';

	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping');		
		if (record.jurnaldetil_validr < 0){			
			k_margin = "margin-left: 25px";
		}
		if (mapping =="jurnaldetil_descr"){
			td.innerHTML = `
				<div style="${k_margin}">
					<div>
						<div style="font-weight: bold;"><span style="font-size: 0.8em; margin-right: 3px; vertical-align: top;">${record.coa_id}</span>${record.coa_name.toUpperCase()}</div>
					</div>
					<div style="font-style: italic; margin-bottom: 3px;">${record.jurnaldetil_descr}</div>
					<div style="font-size: 0.8em;">${record.dept_name} - ${record.partner_name}</div>
				</div>
			`;
		}
	})
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