var this_page_id;



const tbl_list = $('#pnl_list-tbl_list')
// const txt_search = $('#pnl_list-txt_search')
const btn_search = $('#pnl_list-btn_search')

let grd_list = {}

let last_scrolltop = 0


export async function init(opt) {
	this_page_id = opt.id


	grd_list = new global.fgta4grid(tbl_list, {
		OnRowFormatting: (tr) => { grd_list_rowformatting(tr) },
		OnRowClick: (tr, ev) => { grd_list_rowclick(tr, ev) },
		OnCellClick: (td, ev) => { grd_list_cellclick(td, ev) },
		OnCellRender: (td) => { grd_list_cellrender(td) },
		OnRowRender: (tr) => { grd_list_rowrender(tr) }
	})


	// txt_search.textbox('textbox').bind('keypress', (evt)=>{
	// 	if (evt.key==='Enter') {
	// 		btn_search_click(self)
	// 	}
	// })

	btn_search.linkbutton({
		onClick: () => { btn_search_click() }
	})	


}



function btn_search_click(self) {
	var search = 'xxx'; //txt_search.textbox('getText')
	if (search.trim()=='') {
		$ui.ShowMessage("[WARNING]Masukkan kode artikel yang ingin dicari");
		return;
	}

	
	grd_list.clear()
	var fn_listloading = async (options) => {
		options.api = `${global.modulefullname}/list`
		
		if (search!='') {
			options.criteria['search'] = search
		}
	}

	var fn_listloaded = async (result, options) => {
		// console.log(result)
	}

	grd_list.listload(fn_listloading, fn_listloaded)
}


function grd_list_rowformatting(tr) {

}


function grd_list_rowclick(tr, ev) {
	// console.log(tr)
	var trid = tr.getAttribute('id')
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]
	var viewmode = true
	last_scrolltop = $(window).scrollTop()
	$ui.getPages().ITEMS['pnl_detsize'].handler.open(record, trid, viewmode, (err)=> {
		if (err) {
			console.log(err)
		} else {
			$ui.getPages().show('pnl_detsize')	
		}
	})
}

function grd_list_cellclick(td, ev) {
	// console.log(td)
	// ev.stopPropagation()
}

function grd_list_cellrender(td) {
	var text = td.innerHTML
	if (td.mapping == 'budgetted' || td.mapping == 'requested' || td.mapping == 'applied' || td.mapping == 'realisasi') {
		$(td).css('text-align', 'right')
		td.innerHTML = new Number(text).toLocaleString('en-US');
	}
}

function grd_list_rowrender(tr) {
	var dataid = tr.getAttribute('dataid')
	var record = grd_list.DATA[dataid]

	$(tr).find('td').each((i, td) => {
		// var mapping = td.getAttribute('mapping')
		// if (mapping=='id') {
		// 	if (!record.disabled) {
		// 		td.classList.add('fgtable-rowred')
		// 	}
		// }
		if (record.disabled=="1" || record.disabled==true) {
			td.classList.add('fgtable-row-disabled')
		} else {
			td.classList.remove('fgtable-row-disabled')
		}
	})
}

