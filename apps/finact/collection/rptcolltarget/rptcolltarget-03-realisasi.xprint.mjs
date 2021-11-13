const obj_reporttable_body = $('#obj_reporttable_tbody');


export async function init(opt) {
	setTimeout(()=>{
		console.log('init page...');
		// adjustPage();
		if (typeof (global.window_fn_print) === 'function') {
			var param = {
				report_height: '1000'			}
			global.window_fn_print(param);
		}
	}, 500);

	 
	generateReport(global.reportparameter);
}

async function generateReport(param) {
	console.log(param)

	


	var apiurl = `${global.modulefullname}/get_03-realisasi`
	var args = {
		options: {
			criteria: {
				periodemo_id : param.periodemo_id
			}
		}
	}

	if (param.empl_id!='ALL') {
		args.options.criteria.empl_id = param.empl_id;
	}

	try {
		let result = await $ui.apicall(apiurl, args);
		

		$(`
		<tr>
			<td class="col_group2_head_header">No</td>
			<td class="col_group2_head_header">Agency</td>
			<td class="col_group2_head_header">Collector</td>
			<td class="col_group2_head_header">Call</td>
			<td class="col_group2_head_header val">Total Proyeksi</td>
			<td class="col_group2_head_header val">Total Realisasi</td>
			<td class="col_group2_head_header val">%</td>
		</tr>
		`).appendTo(obj_reporttable_body);


		var total = {
			idrtopay_w1: 0,
			idrtopay_w2: 0,
			idrtopay_w3: 0,
			idrtopay_w4: 0,
			idrtopay_w5: 0,
			idrtopay_w6: 0,
			billout_idrtopay: 0,
			ori_billout_idr: 0,
			billout_idrtopay_realisasi: 0
		}

		var rownum = 0;
		for (var record of result.records) {
			rownum++;
			console.log(record);


			total.idrtopay_w1 += Number(record.idrtopay_w1);
			total.idrtopay_w2 += Number(record.idrtopay_w2);
			total.idrtopay_w3 += Number(record.idrtopay_w3);
			total.idrtopay_w4 += Number(record.idrtopay_w4);
			total.idrtopay_w5 += Number(record.idrtopay_w5);
			total.idrtopay_w6 += Number(record.idrtopay_w6);
			total.billout_idrtopay += Number(record.billout_idrtopay);
			total.ori_billout_idr += Number(record.ori_billout_idr);
			total.billout_idrtopay_realisasi += Number(record.billout_idrtopay_realisasi);

			var billout_idrtopay = Number(record.billout_idrtopay);
			var ori_billout_idr = Number(record.ori_billout_idr);
			var billout_idrtopay_realisasi = Number(record.billout_idrtopay_realisasi);
			var percent = Math.round((billout_idrtopay_realisasi/billout_idrtopay) * 100)

			$(`
			<tr>
				<td class="col_content">${rownum}</td>
				<td class="col_content">${record.partner_name}</td>
				<td class="col_content">${record.collector_initial}</td>
				<td class="col_content">0</td>
				<td class="col_content val">${format_number(record.billout_idrtopay)}</td>
				<td class="col_content val">${format_number(record.billout_idrtopay_realisasi)}</td>
				<td class="col_content val">${percent}</td>
			</tr>
			`).appendTo(obj_reporttable_body);
		}



		$(`
		<tr>
			<td class="col_group2_head_header">&nbsp;</td>
			<td class="col_group2_head_header">&nbsp;</td>
			<td class="col_group2_head_header">&nbsp;</td>
			<td class="col_group2_head_header">&nbsp;</td>
			<td class="col_group2_head_header val">${format_number(total.billout_idrtopay)}</td>
			<td class="col_group2_head_header val">${format_number(total.billout_idrtopay_realisasi)}</td>
			<td class="col_group2_head_header val">%</td>
		</tr>
		`).appendTo(obj_reporttable_body);


		adjustPage({
			adjust_height_page: -3,
		});
	} catch (err) {
		console.log(err)
		// $('#pnl_editbilloutgrid-error').html(err.errormessage);
	}
}



function CreateSubtotalAccount(subtotaldata) {
	return `

	`
}