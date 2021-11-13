export async function init(opt) {
	$ui.RenderBarcode('elqrcode', (data) => {
		var qr = new QRious({
			element: data.el,
			size: data.size,
			value: data.value
		});

		console.log('init page...');
		adjustPage({
			adjust_height_report: 0,
			adjust_height_page: 0
		});
		if (typeof (global.window_fn_print) === 'function') {
			global.window_fn_print();
		}

	});
}


