import {fgta4grid} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4grid.mjs'
import {fgta4form} from  '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4form.mjs'
import * as fgta4pages from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pages.mjs'
import * as fgta4pageslider from '../../../../../index.php/asset/fgta/framework/fgta4libs/fgta4pageslider.mjs'
import * as apis from './partner.apis.mjs'
import * as pList from './partner-list.mjs'
import * as pEdit from './partner-edit.mjs'
import * as pEditTypegrid from './partner-typegrid.mjs'
import * as pEditTypeform from './partner-typeform.mjs'
import * as pEditBankgrid from './partner-bankgrid.mjs'
import * as pEditBankform from './partner-bankform.mjs'
import * as pEditContactgrid from './partner-contactgrid.mjs'
import * as pEditContactform from './partner-contactform.mjs'
import * as pEditSitegrid from './partner-sitegrid.mjs'
import * as pEditSiteform from './partner-siteform.mjs'
import * as pEditModeltransaksigrid from './partner-modeltransaksigrid.mjs'
import * as pEditModeltransaksiform from './partner-modeltransaksiform.mjs'
import * as pEditRefgrid from './partner-refgrid.mjs'
import * as pEditRefform from './partner-refform.mjs'



const pnl_list = $('#pnl_list')
const pnl_edit = $('#pnl_edit')
const pnl_edittypegrid = $('#pnl_edittypegrid')
const pnl_edittypeform = $('#pnl_edittypeform')
const pnl_editbankgrid = $('#pnl_editbankgrid')
const pnl_editbankform = $('#pnl_editbankform')
const pnl_editcontactgrid = $('#pnl_editcontactgrid')
const pnl_editcontactform = $('#pnl_editcontactform')
const pnl_editsitegrid = $('#pnl_editsitegrid')
const pnl_editsiteform = $('#pnl_editsiteform')
const pnl_editmodeltransaksigrid = $('#pnl_editmodeltransaksigrid')
const pnl_editmodeltransaksiform = $('#pnl_editmodeltransaksiform')
const pnl_editrefgrid = $('#pnl_editrefgrid')
const pnl_editrefform = $('#pnl_editrefform')



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
			{panel: pnl_edittypegrid, handler: pEditTypegrid},
			{panel: pnl_edittypeform, handler: pEditTypeform},
			{panel: pnl_editbankgrid, handler: pEditBankgrid},
			{panel: pnl_editbankform, handler: pEditBankform},
			{panel: pnl_editcontactgrid, handler: pEditContactgrid},
			{panel: pnl_editcontactform, handler: pEditContactform},
			{panel: pnl_editsitegrid, handler: pEditSitegrid},
			{panel: pnl_editsiteform, handler: pEditSiteform},
			{panel: pnl_editmodeltransaksigrid, handler: pEditModeltransaksigrid},
			{panel: pnl_editmodeltransaksiform, handler: pEditModeltransaksiform},
			{panel: pnl_editrefgrid, handler: pEditRefgrid},
			{panel: pnl_editrefform, handler: pEditRefform}			
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