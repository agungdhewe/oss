import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './deptbudgetacc.apis.mjs'
import * as pList from './deptbudgetacc-list.mjs'
import * as pEdit from './deptbudgetacc-edit.mjs'
import * as pEditAccbudgetgrid from './deptbudgetacc-accbudgetgrid.mjs'
import * as pEditAccbudgetform from './deptbudgetacc-accbudgetform.mjs'
import * as pAccbudgetMultiadd from './deptbudgetacc-multiadd.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editaccbudgetgrid = $('#pnl_editaccbudgetgrid')
const pnl_editaccbudgetform = $('#pnl_editaccbudgetform')
const pnl_accbudgetmultiadd = $('#pnl_accbudgetmultiadd')



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
			{panel: pnl_editaccbudgetgrid, handler: pEditAccbudgetgrid},
			{panel: pnl_editaccbudgetform, handler: pEditAccbudgetform},
			{panel: pnl_accbudgetmultiadd, handler: pAccbudgetMultiadd},
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