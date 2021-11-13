export async function CopyFromLastYear(corpbudget_id, fn_callback) {
	var apiurl = `${global.modulefullname}/xtion-copyfromlastyear`
	var args = {
		corpbudget_id: corpbudget_id
	}


	console.log(apiurl, args);
	$ui.mask('wait...')
	try {

		$ui.forceclosemask = true;
		var result = await $ui.apicall(apiurl, args);
		if (typeof fn_callback == 'function') {
			fn_callback()
		}

	} catch (err) {
		$ui.unmask();
		console.log(err)
		$ui.ShowMessage("[WARNING] " + err.errormessage);
	}
}