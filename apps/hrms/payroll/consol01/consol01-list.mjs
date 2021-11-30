var this_page_id;

import {fgta4slideselect2} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4slideselect2.mjs'

const tbl_list = $('#pnl_list-tbl_list');
const btn_kalkulasi = $('#pnl_list-btn_kalkulasi');
const cbo_month = $('#pnl_edit-cbo_month');
const obj_pastebox = $('#pnl_list-obj_pastebox');


let grd_list = {}


export async function init(opt) {
	this_page_id = opt.id

	var month_init = {id:'', text:''}
	var monthdata = await ResetMonth();
	if (monthdata.length>0) {
		month_init = {id:monthdata[0].month_id, text:monthdata[0].month_name}
	} else {
		cbo_month.combo('disable');
		obj_pastebox.hide();
	}

	cbo_month.name = 'cbo_month';
	new fgta4slideselect2(cbo_month, {
		title: 'Pilih Bulan',
		returnpage: this_page_id,
		fieldValue: 'month_id',
		fieldValueMap: 'month_id',
		fieldDisplay: 'month_name',
		initialvalue: month_init,
		fields: [
			{mapping: 'month_id', text: 'month_id'},
			{mapping: 'month_name', text: 'month_name'},
		],
		OnDataLoading: async (criteria, options) => {
			return await getMonthData();
		},
		OnDataLoaded : (result, options) => {
				// console.log('loadddeeeed');
		},
		OnSelected: (value, display, record) => {}
	});	
	

	grd_list = new global.fgta4grid(tbl_list, {})


	btn_kalkulasi.linkbutton({onClick: () => { btn_kalkulasi_click();  }})


	obj_pastebox[0].addEventListener('paste', (e) => {
		var clipboardData = e.clipboardData || window.clipboardData;
		var pastedData = clipboardData.getData('Text');
		var selected_month = cbo_month.combo('getValue');
		if (selected_month=='') return;
		$ui.ShowMessage("[QUESTION]Apakah anda yakin akan <b>upload</b> data ?", {
			"OK": async () => {
				obj_pastebox.hide();
				obj_pastebox.html('');
				obj_pastebox_paste(pastedData, (err)=>{
					obj_pastebox.show();
				});
			},
			"Cancel": () => {
			}
		})

	});
	
}


async function ResetMonth() {
	var id = 'monthdata';
	var md = await getData(id);
	if (md==null) {
		var monthnames = ['JANUARI', 'FEBURARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
		var i=0;
		var months = []
		for (var mo of monthnames) {
			i++;
			months.push({month_id: i, month_name: mo});
		}

		md = {
			_id: id,
			data: months
		};

		await global.DB.put(md);
		console.log(months);
		return months;
	} else {
		console.log(md);
		return md.data;
	}
}

async function getData(id) {
	try {
		return await global.DB.get(id);;
	} catch (err) {
		return null;
	}
}


async function getMonthData() {
	try {
		var md = await getData('monthdata');;
		if (md==null) {
			return []
		} else {
			return md.data
		}
	} catch (err) {
		console.error(err);
		throw err;
	}
}


async function remove_current_selected_month() {
	var selected_month = cbo_month.combo('getValue');

	try {
		var md = await getData('monthdata');
		if (md!=null) {
			if ( md.data.length==0) {
				cbo_month.combo('disable');
			} else {
				var index = 0;
				for (var mo of md.data) {
					if (selected_month == mo.month_id) {
						console.log('remove month ' + mo.month_id)
						break;
					}
					index++;
				}
				md.data.splice(index, 1);
				await global.DB.put(md);

				return md.data;
			}
		}
		return [];
	} catch (err) {
		console.error(err);
	}

}


async function obj_pastebox_paste(pastedData, fn_finish) {
	var colspattern = "NIK $ NAMA $ BRUTO $ PPH";
	var rows = pastedData.split("\n");


	var selected_month = cbo_month.combo('getValue');

	try {
		var i = 0;
		for (var row of rows) {
			if (row === "") continue;
	
			var cells = row.split("\t");
			if (i==0) {
				var headpatt = cells.join(' $ ').trim();
				if (headpatt.toUpperCase()!=colspattern.toUpperCase()) {
					console.log(headpatt.toUpperCase());
					console.log(colspattern.toUpperCase());
					throw new Error('Format data tidak sesuai');
				}
			} else {
				var nik = cells[0];
				var nama = cells[1];
				var bruto = cells[2];
				var pph = cells[3];

			


			}

			i++;
		}

		var monthdata = await remove_current_selected_month();
		if (monthdata.length>0) {
			cbo_month.combo('setValue', monthdata[0].month_id);
			cbo_month.combo('setText', monthdata[0].month_name);
			if (typeof fn_finish === 'function') {
				setTimeout(()=>{
					fn_finish();
				}, 1000);
			}
		} else {
			cbo_month.combo('disable');
			cbo_month.combo('setValue', '');
			cbo_month.combo('setText', '');
			obj_pastebox.hide();
		}


	} catch (err) {
		console.error(err);
	}


}


async function btn_kalkulasi_click() {
	try {

		await global.DB.createIndex({
			ddoc: "idx-doctype",
			name: "idx-doctype",					
			index: {
				fields: ['doctype']
			}	
		});


		await global.DB.createIndex({
			ddoc: "idx-doctype-month",
			name: "idx-doctype-month",					
			index: {
				fields: ['doctype', 'month']
			}	
		});

		var res = await global.DB.find({
			selector: {
				doctype: 'nik'
			},	
			fields: [
				'nik', 'nama'	
			]
		});

		for (var doc of res.docs) {
			var nik = doc.nik;
			var payrolldata = [];
			for (var month=1; month<=12; month++) {
				var id = `pay#${month}#${nik}`;
				var data = await getData(id);
				if (data != null) {
					payrolldata.push(data);
				}
			}
			await process_nik(payrolldata);
		}


	} catch (err) {
		console.log(err);
	}
}

async function process_nik(payrolldata) {
	console.log(payrolldata)
}