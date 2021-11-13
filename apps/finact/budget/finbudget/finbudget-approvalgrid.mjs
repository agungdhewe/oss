var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_editapprovalgrid-tbl_list');
const txt_title = $('#pnl_editapprovalgrid-title');
const pnl_control = $('#pnl_editapprovalgrid-control');
const btn_removechecked  = $('#pnl_editapprovalgrid-removechecked');
const btn_addrow = $('#pnl_editapprovalgrid-addrow');

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
	txt_title.html(data.finbudget_id)
	header_data = data;
}

export function OpenDetil(data) {
	// saat di klik di edit utama, pada detil information

	grd_list.clear();
	txt_title.html(data.finbudget_id)
	header_data = data;

	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/approval-list`
		options.criteria['id'] = data.finbudget_id
	}
	var fn_listloaded = async (result, options) => {
		// console.log(result)





		var detilform = $ui.getPages().ITEMS['pnl_editapprovalform'].handler.getForm()

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


function grd_list_rowformatting(tr) {

}

function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	// console.log(record)

	last_scrolltop = $(window).scrollTop()
	$ui.getPages().show('pnl_editapprovalform', () => {
		$ui.getPages().ITEMS['pnl_editapprovalform'].handler.open(record, trid, header_data)
	})	
}

function grd_list_cellclick(td, ev) {

}

function grd_list_cellrender(td) {

}

function grd_list_rowrender(tr) {

	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	console.log(record);
	$(tr).find('td').each((i, td) => {
		var mapping = td.getAttribute('mapping')
		if (mapping=='docauth_descr') {
			var gambar = "";
			var authby = "";
			var notes = "";			
			if (record.finbudgetappr_isdeclined=="1") {
				gambar = `<img src="images/xtiondecl.png" width="20px" height="20px">`;
				authby = `<div><span style="font-weight: bold">${record.finbudgetappr_declinedby}</span> (${record.finbudgetappr_declineddate})</div>`
				notes = record.finbudgetappr_notes.replace(/(?:\r\n|\r|\n)/g, '<br>');
				notes = `<div style="margin-top: 5px; font-style: italic">${notes}</div>`
			} else if (record.finbudgetappr_isapproved=="1") {
				gambar = `<img src="images/xtionappr.png" width="20px" height="20px">`;
				authby = `<div><span style="font-weight: bold">${record.finbudgetappr_by}</span> (${record.finbudgetappr_date})</div>`
			} else {
				gambar = `<img src="images/xtionwait.png" width="20px" height="20px">`;
				authby = ""
			}

			var tpl = `
			<div style="display: flex">		
				<div style="width: 40px">${gambar}</div>
				<div>
					<div>${record.auth_name}</div>
					${authby}
					${notes}
				</div>
			</div>
			`	
			td.innerHTML = tpl;
			td.style.width = "400px";
		} 
		});		
		
}


function btn_removechecked_click() {
	$ui.ShowMessage("[QUESTION]Apakah anda akan menghapus baris terpilih ?" , {
		yes: () => {
			grd_list.removechecked({
				OnRemoving : async (options) => {
					var apiurl = `${global.modulefullname}/approval-delete`
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
	$ui.getPages().show('pnl_editapprovalform', ()=>{
		$ui.getPages().ITEMS['pnl_editapprovalform'].handler.createnew(header_data)
	})	
}