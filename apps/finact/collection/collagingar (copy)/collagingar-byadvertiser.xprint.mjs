const obj_reporttable_body = $('#obj_reporttable_tbody');


export async function init(opt) {
	setTimeout(()=>{
		console.log('init page...');
		adjustPage();
		if (typeof (global.window_fn_print) === 'function') {
			var param = {
				report_height: '1000'
			}
			global.window_fn_print(param);
		}
	}, 500);

	 
	generateReport(global.reportparameter);
}

async function generateReport(param) {
	console.log(param)

	
	var apiurl = `${global.modulefullname}/get_araging_byadvertiser`
	var args = {
		options: {
			criteria: {
				date: '2021-09-30'
			}
		}
	}

	if (param.filter_id!='ALL') {
		args.options.criteria.advertiser_partner_id = param.filter_id;
	}

	try {
		let result = await $ui.apicall(apiurl, args);
		console.log(result.records);


		var c = 0;

		var subtotal_age_0 = 0;
		var subtotal_age_30 = 0;
		var subtotal_age_60 = 0;
		var subtotal_age_90 = 0;
		var subtotal_age_120 = 0;
		var subtotal_age_120_more = 0;
		var subtotal_outstanding_idr = 0;

		var total_age_0 = 0;
		var total_age_30 = 0;
		var total_age_60 = 0;
		var total_age_90 = 0;
		var total_age_120 = 0;
		var total_age_120_more = 0;
		var total_outstanding_idr = 0;
		var last_advertiser_partner_name = "";

		for (var record of result.records) {
			var advertiser_partner_name = record.advertiser_partner_name;
			if (advertiser_partner_name!=last_advertiser_partner_name) {
				if (c>0) {
					// summary
					$(`
					<tr>
						<td class="rptrowsubtotal col_content" colspan="5">Sub Total</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_0)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_30)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_60)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_90)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_120)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_age_120_more)}</td>
						<td class="rptrowsubtotal col_content val total">${format_number(subtotal_outstanding_idr)}</td>
					</tr>
					`).appendTo(obj_reporttable_body);

					subtotal_age_0 = 0;
					subtotal_age_30  = 0;
					subtotal_age_60  = 0;
					subtotal_age_90  = 0;
					subtotal_age_120  = 0;
					subtotal_age_120_more  = 0;
					subtotal_outstanding_idr  = 0;

				}


				// header
				$(`
				<tr>
					<td class="col_group_head" colspan="12">${record.advertiser_partner_name}</td>
				</tr>
				`).appendTo(obj_reporttable_body);

			}


			
			$(`
				<tr>
					<td class="rptrow col_content">${record.agency_partner_name}</td>
					<td class="rptrow col_content">${record.brand_name}</td>
					<td class="rptrow col_content">${record.jurnal_id}</td>
					<td class="rptrow col_content">${record.ref_jurnal_duedate}</td>
					<td class="rptrow col_content date">${record.days}</td>
					<td class="rptrow col_content val">${format_number(record.age_0)}</td>
					<td class="rptrow col_content val">${format_number(record.age_30)}</td>
					<td class="rptrow col_content val">${format_number(record.age_60)}</td>
					<td class="rptrow col_content val">${format_number(record.age_90)}</td>
					<td class="rptrow col_content val">${format_number(record.age_120)}</td>
					<td class="rptrow col_content val">${format_number(record.age_120_more)}</td>
					<td class="rptrow col_content val total">${format_number(record.outstanding_idr)}</td>
				</tr>
			`).appendTo(obj_reporttable_body);


			subtotal_age_0 += Number(record.age_0);
			subtotal_age_30 += Number(record.age_30);
			subtotal_age_60 += Number(record.age_60);
			subtotal_age_90 += Number(record.age_90);
			subtotal_age_120 += Number(record.age_120);
			subtotal_age_120_more += Number(record.age_120_more);
			subtotal_outstanding_idr += Number(record.outstanding_idr);

			total_age_0 += Number(record.age_0);
			total_age_30 += Number(record.age_30);
			total_age_60 += Number(record.age_60);
			total_age_90 += Number(record.age_90);
			total_age_120 += Number(record.age_120);
			total_age_120_more += Number(record.age_120_more);
			total_outstanding_idr += Number(record.outstanding_idr);
			last_advertiser_partner_name = advertiser_partner_name;
			c++;
		}


		$(`
			<tr>
				<td class="rptrow" colspan="12">&nbsp;</td>
			</tr>
			<tr>
				<td class="rptrowfoot col_content" colspan="5">TOTAL</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_0)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_30)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_60)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_90)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_120)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_120_more)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_outstanding_idr)}</td>
			</tr>
		`).appendTo(obj_reporttable_body);

	} catch (err) {
		console.log(err)
		// $('#pnl_editbilloutgrid-error').html(err.errormessage);
	}
}
