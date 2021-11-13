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


		var sumgroup2 = {
			subtotal_age_0: 0,
			subtotal_age_30: 0,
			subtotal_age_60: 0,
			subtotal_age_90: 0,
			subtotal_age_120: 0,
			subtotal_outstanding_idr: 0
		}

		var rownum = 0;
		var total_age_0 = 0;
		var total_age_30 = 0;
		var total_age_60 = 0;
		var total_age_90 = 0;
		var total_age_120 = 0;
		var total_age_120_more = 0;
		var total_outstanding_idr = 0;
		var last_advertiser_partner_name = "";
		var last_agency_name = "";

		for (var record of result.records) {
			var advertiser_partner_name = record.advertiser_partner_name;
			var agency_name = record.agency_partner_name;
		
			if (advertiser_partner_name!=last_advertiser_partner_name) {
				last_agency_name = '';
				


				if (c>0) {
					var group2_summary = CreateSubtotalAccount(sumgroup2);
					$(group2_summary).appendTo(obj_reporttable_body);

					// add jarak
					$(`
					<tr>
						<td colspan="13" style="height: 30px">&nbsp;</td>
					</tr>
					`).appendTo(obj_reporttable_body);
				}

				// header
				$(`
				<tr>
					<td class="row_group1_head" colspan="13">${record.advertiser_partner_name}</td>
				</tr>
				`).appendTo(obj_reporttable_body);

			}


			if (agency_name!=last_agency_name) {
				// header

				


				sumgroup2.subtotal_age_0 = 0;
				sumgroup2.subtotal_age_30 = 0;
				sumgroup2.subtotal_age_60 = 0;
				sumgroup2.subtotal_age_90 = 0;
				sumgroup2.subtotal_age_120 = 0;
				sumgroup2.subtotal_outstanding_idr = 0;


				$(`
				<tr>
					<td class="row_group2_head" colspan="13">${record.agency_partner_name}</td>
				</tr>
				<tr>
					<td class="col_group2_head_header">No</td>
					<td class="col_group2_head_header">No. Invoice</td>
					<td class="col_group2_head_header">Tgl. Invoice</td>
					<td class="col_group2_head_header">Descr</td>
					<td class="col_group2_head_header">Brand</td>
					<td class="col_group2_head_header val">Current</td>
					<td class="col_group2_head_header val">0-30</td>
					<td class="col_group2_head_header val">31-60</td>
					<td class="col_group2_head_header val">61-90</td>
					<td class="col_group2_head_header val">>90</td>
					<td class="col_group2_head_header val">Total</td>
				</tr>
				`).appendTo(obj_reporttable_body);

				rownum = 0;
			}


			rownum++;

			
			$(`
				<tr>
					<td class="rptrow col_content">${rownum}</td>
					<td class="rptrow col_content">${record.billout_ref}</td>
					<td class="rptrow col_content">${record.ref_jurnal_duedate}</td>
					<td class="rptrow col_content">${record.billout_descr}</td>
					<td class="rptrow col_content">${record.brand_name}</td>
					<td class="rptrow col_content val">${format_number(record.age_0)}</td>
					<td class="rptrow col_content val">${format_number(record.age_30)}</td>
					<td class="rptrow col_content val">${format_number(record.age_60)}</td>
					<td class="rptrow col_content val">${format_number(record.age_90)}</td>
					<td class="rptrow col_content val">${format_number(record.age_120)}</td>
					<td class="rptrow col_content val total">${format_number(record.outstanding_idr)}</td>
				</tr>
			`).appendTo(obj_reporttable_body);


			sumgroup2.subtotal_age_0 += Number(record.age_0);
			sumgroup2.subtotal_age_30 += Number(record.age_30);
			sumgroup2.subtotal_age_60 += Number(record.age_60);
			sumgroup2.subtotal_age_90 += Number(record.age_90);
			sumgroup2.subtotal_age_120 += Number(record.age_120);
			sumgroup2.subtotal_outstanding_idr += Number(record.outstanding_idr);

			total_age_0 += Number(record.age_0);
			total_age_30 += Number(record.age_30);
			total_age_60 += Number(record.age_60);
			total_age_90 += Number(record.age_90);
			total_age_120 += Number(record.age_120);
			total_age_120_more += Number(record.age_120_more);
			total_outstanding_idr += Number(record.outstanding_idr);
			last_advertiser_partner_name = advertiser_partner_name;
			last_agency_name = agency_name;
			c++;
		}



		var group2_summary = CreateSubtotalAccount(sumgroup2);
		$(group2_summary).appendTo(obj_reporttable_body);


		$(`
			<tr>
				<td class="rptrow" colspan="13">&nbsp;</td>
			</tr>
			<tr>
				<td class="rptrowfoot col_content" colspan="5">TOTAL</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_0)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_30)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_60)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_90)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_age_120)}</td>
				<td class="rptrowfoot col_content val total">${format_number(total_outstanding_idr)}</td>
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
	<tr>
		<td class="col_group2_foot">&nbsp;</td>
		<td class="col_group2_foot" colspan="4">Subtotal</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_age_0)}</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_age_30)}</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_age_60)}</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_age_90)}</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_age_120)}</td>
		<td class="col_group2_foot val">${format_number(subtotaldata.subtotal_outstanding_idr)}</td>
	</tr>
	
	`
}


