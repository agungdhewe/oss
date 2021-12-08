import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './deptbudgetrev.apis.mjs'
import * as pList from './deptbudgetrev-list.mjs'
import * as pEdit from './deptbudgetrev-edit.mjs'
import * as pEditDetilgrid from './deptbudgetrev-detilgrid.mjs'
import * as pEditDetilform from './deptbudgetrev-detilform.mjs'
import * as pEditApprovalgrid from './deptbudgetrev-approvalgrid.mjs'
import * as pEditApprovalform from './deptbudgetrev-approvalform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editdetilgrid = $('#pnl_editdetilgrid')
const pnl_editdetilform = $('#pnl_editdetilform')
const pnl_editapprovalgrid = $('#pnl_editapprovalgrid')
const pnl_editapprovalform = $('#pnl_editapprovalform')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init(opt) {
	// $ui.grd_list = new fgta4grid()
	// $ui.grd_edit = new fgta4grid()

	global.fgta4grid = fgta4grid
	global.fgta4form = fgta4form

	$ui.apis = apis
	document.getElementsByTagName("body")[0].style.margin = '5px 5px 5px 5px'


	//button state
	opt.privileges = {
		can_edit: true,
		can_commit: true,
		can_approve: true,
		ovveride_api_list: null
	};
	switch (opt.variancename) {
		case 'view' :
			opt.privileges.can_edit = false;
			opt.privileges.can_commit = false;
			opt.privileges.can_approve = false;
			break;
		case 'propose' : 
			opt.privileges.can_approve = false;
			break;
		case 'approval' : 
			opt.privileges.can_edit = false;
			opt.privileges.can_commit = false;
			opt.privileges.override_api_list = `${global.modulefullname}/list-forapproval`;
			break;
	}

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editdetilgrid, handler: pEditDetilgrid},
			{panel: pnl_editdetilform, handler: pEditDetilform},
			{panel: pnl_editapprovalgrid, handler: pEditApprovalgrid},
			{panel: pnl_editapprovalform, handler: pEditApprovalform}			
		], opt)

	$ui.setPages(pages)


	document.addEventListener('OnButtonHome', (ev) => {
		if (ev.detail.cancel) {
			return
		}

		ev.detail.cancel = true;
		ExitModule();
	})
	
	document.addEventListener('OnSizeRecalculated', (ev) => {
		OnSizeRecalculated(ev.detail.width, ev.detail.height)
	})	



	await PreloadData()

}


export function OnSizeRecalculated(width, height) {
	SIZE.width = width
	SIZE.height = height
}

export async function ExitModule() {
	$ui.home();
}



async function PreloadData() {
	
}