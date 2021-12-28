let form, obj, opt;

export function init(param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;

	billout_isunreference_changed(false);
}


export function form_newdata(data, options) {
	var header_data = form.getHeaderData();
	var promptMandatory = form.getDefaultPrompt(true)


	data.billout_discp = header_data.colltarget_discprop;


	data.billout_id = promptMandatory.value;
	data.billout_descr = promptMandatory.text;

	billout_isunreference_changed(false);
	billout_isdiscvalue_changed(false);
	
}


export function form_dataopened(result, options) {
	var isunreference = result.record.billout_isunreference=='1' ? true : false;
	var isdiscvalue = result.record.isdiscvalue=='1' ? true : false;

	billout_isunreference_changed(isunreference);
	billout_isdiscvalue_changed(isdiscvalue);
}



export function billout_isunreference_changed(checked) {
	var promptMandatory = form.getDefaultPrompt(true)
	var promptOptional = form.getDefaultPrompt(false)

	if (checked) {
		//unreferenced
		obj.cbo_billout_id.revalidate({
			required: false, invalidMessage: null, prompt: form.getDefaultPrompt(false).text,
			validType: null,
		});	
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_billout_id, promptOptional.value, promptOptional.text);
		};

		form.setDisable(obj.cbo_billout_id, true);

	} else {
		// harus ada referensi tagihan
		obj.cbo_billout_id.revalidate({
			required: true, invalidMessage:  'Tagihan harus diisi', prompt: form.getDefaultPrompt(true).text,
			validType: "requiredcombo['pnl_editbilloutform-cbo_billout_id']",
		});
		if (!form.isEventSuspended()) {
			form.setValue(obj.cbo_billout_id, promptMandatory.value, promptMandatory.text);
		}

		form.setDisable(obj.cbo_billout_id, false);
	}
}


export function billout_isdiscvalue_changed(checked) {
	if (checked) {
		//diskon langsung rupiah
		form.setDisable(obj.txt_billout_discp, true);
		form.setDisable(obj.txt_billout_discval, false);

	} else {
		form.setDisable(obj.txt_billout_discp, false);
		form.setDisable(obj.txt_billout_discval, true);
	}
}

function getDaysToTargetDate(due_date) {
	

	var target_date = form.getValue(obj.dt_colltargetbillout_datetarget);

	var dt_due = $.fn.datebox.defaults.parser(due_date);
	var dt_target = $.fn.datebox.defaults.parser(target_date);

	var diffTime = Math.abs(dt_target - dt_due);
	var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

	return diffDays;

}


export function colltargetbillout_datetarget_changed() {
	if (form.isEventSuspended()) {
		return;
	}

	var days = getDaysToTargetDate(form.getValue(obj.dt_billout_datedue));
	form.setValue(obj.txt_billout_daystotarget, days);
}


export function cbo_partner_id_selected(value, display, record, args) {
	obj.cbo_billout_id.reset();
}


function recalculate_discount() {
	
	var idr = parseFloat(form.getValue(obj.txt_billout_idr));
	var ppnval = parseFloat(form.getValue(obj.txt_billout_ppn));
	var idrnontax = idr - ppnval;


	var isdiscvalue = form.getValue(obj.chk_billout_isdiscvalue)=='1' ? true : false;
	if (isdiscvalue) {
		// discount rupiah
		var discval = parseFloat(form.getValue(obj.txt_billout_discval))
		var percent = Math.round((discval / idrnontax), 2);  

		if (!form.isEventSuspended()) {
			form.setValue(obj.txt_billout_discp, percent);
		}
	} else {
		// discount persen
		var percent = parseFloat(form.getValue(obj.txt_billout_discp ))
		var discval = (percent/100) * idrnontax;

		if (!form.isEventSuspended()) {
			form.setValue(obj.txt_billout_discval, discval);
		}
	}

}


export function cbo_billout_id_selected(value, display, record, args) {

	form.setValue(obj.dt_billout_datedue, $.fn.datebox.defaults.formatter(from_sql_date(record.billout_datedue)));
	colltargetbillout_datetarget_changed();

	form.setValue(obj.txt_billout_totalitem, record.billout_totalitem);
	form.setValue(obj.txt_billout_totalqty, record.billout_totalqty);
	form.setValue(obj.txt_billout_totalqty, record.billout_totalqty);
	form.setValue(obj.txt_billout_salesgross, record.billout_salesgross);
	form.setValue(obj.txt_billout_discount, record.billout_discount);
	form.setValue(obj.txt_billout_subtotal, record.billout_subtotal);
	form.setValue(obj.txt_billout_pph, record.billout_pph);
	form.setValue(obj.txt_billout_nett, record.billout_nett);
	form.setValue(obj.txt_billout_ppn, record.billout_ppn);
	form.setValue(obj.txt_billout_total, record.billout_total);
	form.setValue(obj.txt_billout_totaladdcost, record.billout_totaladdcost);
	form.setValue(obj.txt_billout_dp, record.billout_dp);
	form.setValue(obj.txt_billout_payment, record.billout_payment);
	form.setValue(obj.txt_billout_paid, record.billout_paid);

	var idr = parseFloat(record.billout_payment) - parseFloat(record.billout_paid)
	form.setValue(obj.txt_billout_idr, idr);


	recalculate_discount();
	recalculate();


}









// export function billout_discp_changed() {
// 	if (form.isEventSuspended()) {
// 		return;
// 	}

// 	var idr = parseFloat(form.getValue(obj.txt_billout_idr));
// 	var ppnval = parseFloat(form.getValue(obj.txt_billout_ppn));
// 	var idrnontax = idr - ppnval;
// 	var percent = parseFloat(form.getValue(obj.txt_billout_discp ))
// 	var discval = (percent/100) * idrnontax;

// 	form.SuspendEvent(true);
// 	form.setValue(obj.txt_billout_discval, discval);
// 	form.SuspendEvent(false);

// 	// recalculate();
// }

// export function billout_discval_changed() {
// 	if (form.isEventSuspended()) {
// 		return;
// 	}

// 	var idr = parseFloat(form.getValue(obj.txt_billout_idr));
// 	var ppnval = parseFloat(form.getValue(obj.txt_billout_ppn));
// 	var idrnontax = idr - ppnval;
// 	var discval = parseFloat(form.getValue(obj.txt_billout_discval))
// 	var percent = Math.round((discval / idrnontax), 2);  

// 	form.SuspendEvent(true);
// 	form.setValue(obj.txt_billout_discp, percent);
// 	form.SuspendEvent(false);

// 	// recalculate();
// }


function recalculate() {
	var idr = parseFloat(form.getValue(obj.txt_billout_idr));
	var ppnval = parseFloat(form.getValue(obj.txt_billout_ppn));
	var idrnontax = idr - ppnval;

	var discval = parseFloat(form.getValue(obj.txt_billout_discval))
	var subtotaltarget = idrnontax - discval;
	var idrtopay = subtotaltarget - ppnval;

	form.setValue(obj.txt_billout_idrtopay, idrtopay);
	form.setValue(obj.txt_billout_ppntopay, ppnval);
	form.setValue(obj.txt_billout_idrtotal, subtotaltarget);

}