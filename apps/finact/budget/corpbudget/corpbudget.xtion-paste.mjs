export async function PasteFromSpreadsheet(corpbudget_id, pastedData, fn_callback) {



	$ui.mask('wait...')
	try {


		var data = await ReformatData(pastedData);

		console.log(data);

		var apiurl = `${global.modulefullname}/xtion-paste`
		var args = {
			corpbudget_id: corpbudget_id,
			data: data
		}

		$ui.forceclosemask = true;
		var result = await $ui.apicall(apiurl, args);
		if (typeof fn_callback == 'function') {
			fn_callback(null, true);
		}

		$ui.unmask();
	} catch (err) {
		$ui.unmask();
		console.log(err)
		if (err.errormessag !== undefined) {
			// error dari AJAX
			$ui.ShowMessage("[WARNING] " + err.errormessage);
		} else {
			// error yang lain
			$ui.ShowMessage("[WARNING] " + err.message);
		}

	}
}

function formatToNumber(num, locale) {
	const { format } = new Intl.NumberFormat(locale);
	const [, decimalSign] = /^0(.)1$/.exec(format(0.1));
	return +num
		.replace(new RegExp(`[^${decimalSign}\\d]`, 'g'), '')
		.replace(decimalSign, '.');
}

async function ReformatData(pastedData) {
	var colspattern = "No-Account-AccountName-JAN-FEB-MAR-APR-MEI-JUN-JUL-AGS-SEP-OKT-NOV-DES-TOTAL";

	var data = [];
	var i = 0;
	var rows = pastedData.split("\n");

	for (var row of rows) {
		if (row === "") {
			continue;
		}

		var cells = row.split("\t");
		var patt = colspattern.split("-");

		if (cells.length != patt.length) {
			throw new Error('Nama kolom yang di copy belum sama urutannya dengan template');
		}

		if (i == 0) {
			var formatc = new Array(cells.length);
			for (var c = 0; c < cells.length; c++) {
				formatc[c] = cells[c].trim();
				if (patt[c].toUpperCase() != formatc[c].toUpperCase()) {
					throw new Error('Kolom: ' + patt[c].toUpperCase() + ' belum ada ');
				}
			}
			/*
			var patt = formatc.join('-').trim();
			if (patt.toUpperCase() != colspattern.toUpperCase()) {
				throw new Error('Format data tidak sesuai');
			}
			*/
		} else {
			/*
						if (formatToNumber(cells[0]) != i) {
							throw new Error('No. baris tidak sesuai pada baris ke- ' + i);
						}
			*/
			data.push({
				no: cells[0],
				accbudget_id: cells[1].toString().trim(),
				accbudget_name: cells[2].toString().trim(),
				corpbudgetdet_01: formatToNumber(cells[3]),
				corpbudgetdet_02: formatToNumber(cells[4]),
				corpbudgetdet_03: formatToNumber(cells[5]),
				corpbudgetdet_04: formatToNumber(cells[6]),
				corpbudgetdet_05: formatToNumber(cells[7]),
				corpbudgetdet_06: formatToNumber(cells[8]),
				corpbudgetdet_07: formatToNumber(cells[9]),
				corpbudgetdet_08: formatToNumber(cells[10]),
				corpbudgetdet_09: formatToNumber(cells[11]),
				corpbudgetdet_10: formatToNumber(cells[12]),
				corpbudgetdet_11: formatToNumber(cells[13]),
				corpbudgetdet_12: formatToNumber(cells[14])
			})
		}
		i++;
	}


	return data;


}