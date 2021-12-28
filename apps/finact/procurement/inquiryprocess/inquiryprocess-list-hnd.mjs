let grd_list, opt;

export function init(param, fn_callback) {
	grd_list = param.grd_list;
	opt = param.opt;

	$('#pnl_list-btn_new').hide();



	fn_callback();
}


