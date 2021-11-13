'use strict'

const colReset = "\x1b[0m"
const colFgRed = "\x1b[31m"
const colFgGreen = "\x1b[32m"
const colFgYellow = "\x1b[33m"
const colBright = "\x1b[1m"

const path = require('path')
const fs = require('fs')
const readline = require('readline');

const GENLIBDIR = path.join('..', 'core', 'generator')
const gen_table = require(path.join(GENLIBDIR, 'gen_table.js'))
const gen_fs = require(path.join(GENLIBDIR, 'gen_fs.js'))





var modulename = process.argv[2]
var programpath = path.join(__dirname, modulename)
var genconfigpath = path.join(programpath, '_genconfig.js')


if (!fs.existsSync(genconfigpath)) {
	console.log(`genconfig.js belum dibuat di ${modulename}`)
	process.exit(0)
}

global.comp = {
	Checkbox: (opt) => { return {class: 'easyui-checkbox', comptype: 'checkbox', options:opt, prefix:'chk_'}},
	Textbox : (opt) => { return {class:'easyui-textbox', comptype: 'textbox', options:opt, prefix:'txt_'} },
	Datebox : (opt) => { return {class: 'easyui-datebox', comptype: 'datebox', options:opt, prefix:'dt_'} } ,
	Combobox: (opt) => { return {class: 'easyui-combobox', comptype: 'combobox', options:opt, prefix:'cbo_'} },
	Combo: (opt) => { return {class: 'easyui-combo', comptype: 'combo', options:opt, prefix:'cbo_'} },
	Numberbox: (opt) => { return {class: 'easyui-numberbox', comptype: 'numberbox', options:opt, prefix:'txt_'} }
}


global.dbtype = {
	varchar: (length) => { return {name: `varchar(${length})`, maxlength:length, defcomp: global.comp.Textbox() }},
	int: (length) => { return {name: `int(${length})`, defcomp: global.comp.Numberbox(), precision: 0 } },
	decimal: (length, prec) => { return {name: `decimal(${length}, ${prec})`, defcomp: global.comp.Numberbox(), precision: prec }},
	get boolean() { return {name:'tinyint(1)', defcomp: global.comp.Checkbox() } },
	get date() { return { name:'date', defcomp: global.comp.Datebox() } },
	get datetime() { return { name:'datetime', defcomp: global.comp.Textbox() } },


	Reference: (tablename, fieldname) => {


	}
}


console.log('FGTA4 Program Generator')
console.log('=======================')

var genconfig = require(genconfigpath)
genconfig.basename = path.basename(programpath)
genconfig.programpath = programpath
genconfig.dbtype = global.dbtype
genconfig.comp = global.comp
genconfig.GENLIBDIR = GENLIBDIR
genconfig.modulename = modulename
genconfig.dirname = __dirname


;(async (genconfig) => {
	try {
		var fsdata = await gen_fs(genconfig)

		// Siapkan Script Utama
		for (var fsd of fsdata) {
			if (fsd.type==='dir') { continue }
			var fn_prog_path = path.join(GENLIBDIR, `${fsd.program}.js`)
			var fn_prog = require(fn_prog_path)
			await fn_prog(fsd, genconfig)
		}

		// // Siapkan Script Detil
		// console.log('********************************')
		// for (var detilname in genconfig.schema.detils) {
		// 	var detil = genconfig.schema.detils[detilname]
		// 	var pages = []
		// 	if (detil.form==true) {
		// 		pages.push({pagename: `${detilname}grid`})
		// 		pages.push({pagename: `${detilname}form`})
		// 		pages.push({pagename: `${detilname}-list`})
		// 		pages.push({pagename: `${detilname}-save`})
		// 		pages.push({pagename: `${detilname}-open`})
		// 		pages.push({pagename: `${detilname}-delete`})
		// 	} else {
		// 		pages.push({pagename: `${detilname}`})
		// 	}

		// 	// console.log(pages)
		// 	for (var p of pages) {
		// 		var pagename = p.pagename
		// 		var fsd = genconfig.pages[pagename]
		// 		if (fsd.api===true) {
		// 			var fn_prog_path = path.join(GENLIBDIR, `${fsd.program}.js`)
		// 			var fn_prog = require(fn_prog_path)	
		// 			await fn_prog(fsd, genconfig)
		// 			console.log(fsd)
		// 			// fsdata.push(fsd)
		// 		} else {
		// 			// fsdata.push(part.mjs)
		// 			// fsdata.push(part.phtml)
		// 		}

		// 	}
		// }
		
		// console.log(fsdata)

		// console.log('********************************')
			
		

		// Tulis Script ke file
		for (var fsd of fsdata) {
			if (fsd.script!==undefined) {
				console.log(fsd.name)
				await fsd.write();				
			} else {
				
			}
		}



		console.log('\r\n\r\nGenerate Selesai\r\n' )
		console.log('\x1b[1m' + '==================' + '\x1b[0m')
		console.log('\x1b[5m' + '\x1b[1m' +' PERHATIAN ' + '\x1b[0m')
		console.log('\x1b[1m' +'==================' + '\x1b[0m')
		console.log(`Untuk menghindari program tergenerate ulang, buatlah file `+ '\x1b[33m' +`'${genconfig.basename}.genlock'` + '\x1b[0m')
		console.log(`pada direktory '${genconfig.programpath}'`)

		var rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});

		var question = () => {
			rl.question(`Apakah anda akan membuat `+ '\x1b[33m' +`'${genconfig.basename}.genlock'` + '\x1b[0m' + `sekarang [y/n] ?`, function(answer) {
				var allowed = ['Y', 'y', 'N', 'n']
				if (allowed.includes(answer)) {
					rl.close();
					if (answer=='Y' || answer=='y') {
						fs.writeFileSync(path.join(genconfig.programpath, `${genconfig.basename}.genlock`), `Program generated at ` + (new Date()).toISOString())
					}
					process.exit(0)
				} else {
					question()
				}
			});
		}

		question()

	} catch (err) {
		console.log(`${colFgRed}Error.${colReset}`)		
		console.log(err)
		process.exit(0)
	} finally {
		console.log("\n\n\n")
		
	}
})(genconfig) 


