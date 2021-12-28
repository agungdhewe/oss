let	form, obj, opt;


export function init(param) {
	form = param.form;
	obj = param.obj;
	opt = param.opt;
}

export function cbo_itemmodel_id_selected(value, display, record, args) {
	console.log(record);

	form.setValue(obj.cbo_depremodel_id, record.depremodel_id, record.depremodel_name);
	form.setValue(obj.cbo_itemmanage_id, record.cbo_itemmanage_id, record.cbo_itemmanage_name);
	form.setValue(obj.cbo_owner_dept_id, record.dept_id, record.dept_name);
	form.setValue(obj.cbo_maintainer_dept_id, record.dept_id, record.dept_name);
	
}