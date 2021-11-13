import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './colltarprd.apis.mjs'
import * as pList from './colltarprd-list.mjs'
import * as pEdit from './colltarprd-edit.mjs'
import * as pEditPartnerexcgrid from './colltarprd-partnerexcgrid.mjs'
import * as pEditPartnerexcform from './colltarprd-partnerexcform.mjs'
import * as pEditTargetgrid from './colltarprd-targetgrid.mjs'
import * as pEditTargetform from './colltarprd-targetform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_editpartnerexcgrid = $('#pnl_editpartnerexcgrid')
const pnl_editpartnerexcform = $('#pnl_editpartnerexcform')
const pnl_edittargetgrid = $('#pnl_edittargetgrid')
const pnl_edittargetform = $('#pnl_edittargetform')



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
			{panel: pnl_editpartnerexcgrid, handler: pEditPartnerexcgrid},
			{panel: pnl_editpartnerexcform, handler: pEditPartnerexcform},
			{panel: pnl_edittargetgrid, handler: pEditTargetgrid},
			{panel: pnl_edittargetform, handler: pEditTargetform}			
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