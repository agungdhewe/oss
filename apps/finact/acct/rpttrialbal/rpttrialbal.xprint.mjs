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
}

export async function opendetil(id, coa_id, date) {
	

	console.log(date);

	var currelname = `#${id}`;

	var isopened = $(currelname).attr('opened');
	if (isopened!=='true') {
		$(currelname).attr('opened', 'true');


		var apiurl = `${global.modulefullname}/getdetilcoa-bydept`
		var args = {param: {date: date, coa_id: coa_id}}
		try {
			let result = await $ui.apicall(apiurl, args);
			console.log(result);

			var dataresponse = result.dataresponse;
			for (var data of dataresponse) {
				var row = `
				<tr class="${id}-detil">
					<td class="row rptdata-col-no">&nbsp;</td>
					<td class="row rptdata-col-decoacodescr">&nbsp;</td>
					<td class="row rptdata-col-coaname">${data.dept_name}</td>
					<td class="row rptdata-col-val" data-t="n" data-num-fmt="#,##0">${data.saldoawal}</td>
					<td class="row rptdata-col-val" data-t="n" data-num-fmt="#,##0">${data.debet}</td>
					<td class="row rptdata-col-val" data-t="n" data-num-fmt="#,##0">${data.kredit}</td>
					<td class="row rptdata-col-val" data-t="n" data-num-fmt="#,##0">${data.saldoakhir}</td>
				</tr>	
			`;
	
			$(row).insertAfter(currelname);
			}

		} catch (err) {
			console.log(err)
		}		




	} else {
		$(currelname).attr('opened', 'false');
		$(`.${id}-detil`).remove();
	}


}