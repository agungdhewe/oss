import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './site.apis.mjs'
import * as pList from './site-list.mjs'
import * as pEdit from './site-edit.mjs'
import * as pEditUnitgrid from './site-unitgrid.js'
import * as pEditUnitform from './site-unitform.js'
import * as pEditMappinggrid from './site-mappinggrid.js'
import * as pEditMappingform from './site-mappingform.js'
import * as pEditEventgrid from './site-eventgrid.js'
import * as pEditEventform from './site-eventform.js'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editunitgrid = $('#pnl_editunitgrid')
const pnl_editunitform = $('#pnl_editunitform')
const pnl_editmappinggrid = $('#pnl_editmappinggrid')
const pnl_editmappingform = $('#pnl_editmappingform')
const pnl_editeventgrid = $('#pnl_editeventgrid')
const pnl_editeventform = $('#pnl_editeventform')



var pages = fgta4pages;
var slider = fgta4pageslider;


export const SIZE = {width:0, height:0}


export async function init() {
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
			{panel: pnl_editunitgrid, handler: pEditUnitgrid},
			{panel: pnl_editunitform, handler: pEditUnitform},
			{panel: pnl_editmappinggrid, handler: pEditMappinggrid},
			{panel: pnl_editmappingform, handler: pEditMappingform},
			{panel: pnl_editeventgrid, handler: pEditEventgrid},
			{panel: pnl_editeventform, handler: pEditEventform}			
		])

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