var this_page_id;
var this_page_options;

const tbl_list = $('#pnl_list-tbl_list')

const txt_search = $('#pnl_list-txt_search')
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

	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	


	btn_load_click()
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
		if (mapping=='periodemo_name') {
			console.log(record);

			var status = '';
			if (record.periodemo_isclosed=="1") {
				status += '<div class="inrow-id-block closed">&nbsp;</div>'
			} else {
				status += ''
			} 

			td.innerHTML = `
				<div style="margin-left: 5px">
					<div class="inrow-id-block"><span style="margin-right: 3px">${record.periodemo_id}</span>${status}</div>
				</div>
				<div style="margin-left: 15px; font-style: italic">${record.periodemo_name}</div> 
			`;
		}
	})
}

