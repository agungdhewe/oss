export async function Approve(cashdiscount_id, param, fn_callback) {
	var apiurl = `${global.modulefullname}/xtion-approve`
	var args = {
		cashdiscount_id: cashdiscount_id,
		param: param
	}

	console.log(apiurl, args);
	$ui.mask('wait...')
	try {

		$ui.forceclosemask = true;
		var result = await $ui.apicall(apiurl, args);
		console.log('result', result);
		if (typeof fn_callback == 'function') {
			fn_callback(null, true);
		}


		$ui.unmask();
	} catch (err) {
		$ui.unmask();
		console.log(err)
		$ui.ShowMessage("[WARNING] " + err.errormessage);
	}
}

export async function UnApprove(corpbudget_id, fn_callback) {

}
