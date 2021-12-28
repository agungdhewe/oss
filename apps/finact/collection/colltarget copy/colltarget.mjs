import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './colltarget.apis.mjs'
import * as pList from './colltarget-list.mjs'
import * as pEdit from './colltarget-edit.mjs'
import * as pEditBilloutgrid from './colltarget-billoutgrid.mjs'
import * as pEditBilloutform from './colltarget-billoutform.mjs'
import * as pEditApprovalgrid from './colltarget-approvalgrid.mjs'
import * as pEditApprovalform from './colltarget-approvalform.mjs'
import * as pEditMultiadd from './colltarget-multiadd.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editbilloutgrid = $('#pnl_editbilloutgrid')
const pnl_editbilloutform = $('#pnl_editbilloutform')
const pnl_editapprovalgrid = $('#pnl_editapprovalgrid')
const pnl_editapprovalform = $('#pnl_editapprovalform')
const pnl_editmultiadd = $('#pnl_editmultiadd')



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

	pages
		.setSlider(slider)
		.initPages([
			{panel: pnl_list, handler: pList},
			{panel: pnl_edit, handler: pEdit},
			{panel: pnl_editbilloutgrid, handler: pEditBilloutgrid},
			{panel: pnl_editbilloutform, handler: pEditBilloutform},
			{panel: pnl_editapprovalgrid, handler: pEditApprovalgrid},
			{panel: pnl_editapprovalform, handler: pEditApprovalform},			
			{panel: pnl_editmultiadd, handler: pEditMultiadd}			
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