const path = require('path')
const fs = require('fs')

const colReset = "\x1b[0m"
const colFgRed = "\x1b[31m"
const colFgGreen = "\x1b[32m"
const colFgYellow = "\x1b[33m"
const colFgBlack = "\x1b[30m"
const colBright = "\x1b[1m"
const BgYellow = "\x1b[43m"

module.exports = async (fsd, genconfig) => {

	var headertable_name = genconfig.schema.header
	var headertable = genconfig.persistent[headertable_name]
	var header_primarykey = headertable.primarykeys[0]

	var detil = genconfig.schema.detils[fsd.detilname]
	var tablename = detil.table
	var detiltable = genconfig.persistent[tablename]
	var data = detiltable.data

	
	// console.log(data)
	var lookupfields = ''
	var uppercasefields = ''
	var setnullfields = ''
	var unsetfields = ''
	var tosqldate = ''
	var fields = []
	var fieldreturn = []	
	var cdbsave = '';
	var withupload = false;
	
	for (var fieldname in data) {
		fields.push(fieldname);
		fieldreturn.push(fieldname);
		var options = data[fieldname].comp.options
		var comptype = data[fieldname].comp.comptype

		if (options==undefined) {
			options = {}
		}

		var comptype = data[fieldname].comp.comptype
		if (comptype=='datebox') {
			tosqldate += `\t\t\t$obj->${fieldname} = (\\DateTime::createFromFormat('d/m/Y',$obj->${fieldname}))->format('Y-m-d');\r\n`
			lookupfields += `\t\t\t\t\t'${fieldname}' => date("d/m/Y", strtotime($row['${fieldname}'])),\r\n`;
		}
		
		var uppercase = data[fieldname].uppercase;
		var lowercase = data[fieldname].lowercase;
		if (uppercase===true) {
			uppercasefields += `\t\t\t$obj->${fieldname} = strtoupper($obj->${fieldname});\r\n`
		} else if (lowercase===true) {
			uppercasefields += `\t\t\t$obj->${fieldname} = strtolower($obj->${fieldname});\r\n`
		}		 

		if (comptype!='combo') {
			var allownull = data[fieldname].null;
			if (allownull) {
				var required = options.required;;
				if (!(required===true)) {
					// setnullfields += `\t\t\t// if ($obj->${fieldname}=='--NULL--') { unset($obj->${fieldname}); }\r\n`
					setnullfields += `\t\t\tif ($obj->${fieldname}=='') { $obj->${fieldname} = '--NULL--'; }\r\n`
				}
			}
		}



		// untuk componen yang tienya combo, tambah lookup
		if (comptype=='combo') {
			var field_display_name = options.field_display;
			if (options.field_display_name!=null) {
				field_display_name = options.field_display_name;
			}			
			lookupfields += `\t\t\t\t\t'${field_display_name}' => \\FGTA4\\utils\\SqlUtility::Lookup($record['${fieldname}'], $this->db, '${options.table}', '${options.field_value}', '${options.field_display}'),\r\n`
		}



		if (comptype=='filebox') { 
			withupload = true;
			var idsuffix = data[fieldname].idsuffix;
			var fileid = idsuffix===undefined || idsuffix=='' ? '$obj->{$primarykey}' : `$obj->{$primarykey} . "|${idsuffix}"`;
			cdbsave += `
				$fieldname = '${fieldname}';	
				if (property_exists($files, $fieldname)) {

					$file_id = ${fileid};
					$doc = $files->{$fieldname};
					$file_base64data = $doc->data;
					unset($doc->data);

					$overwrite = true;
					$res = $this->cdb->addAttachment($file_id, $doc, 'filedata', $file_base64data, $overwrite);	
					$rev = $res->asObject()->rev;

					$key->{$primarykey} = $obj->{$primarykey};
					
					$obj = new \\stdClass;
					$obj->{$primarykey} = $key->{$primarykey};
					$obj->${fieldname} = $rev;
					$cmd = \\FGTA4\\utils\\SqlUtility::CreateSQLUpdate($tablename, $obj, $key);
					$stmt = $this->db->prepare($cmd->sql);
					$stmt->execute($cmd->params);
				}				
			
			`;
			
		}

		// * Field yang tidak ikut di save */
		var unset = data[fieldname].unset===true;
		if (unset) {
			unsetfields += `\t\t\tunset($obj->${fieldname});\r\n`
		}		


	}

	// $obj->tanggal = (\DateTime::createFromFormat('d/m/Y',$obj->tanggal))->format('Y-m-d');
	var primarykey = detiltable.primarykeys[0]
	
	fieldreturn.push('_createby')
	fieldreturn.push('_createdate')
	fieldreturn.push('_modifyby')
	fieldreturn.push('_modifydate')
	var fieldresturnsel = "'" + fieldreturn.join("', '") + "'"

	if (withupload) {
		uploadfileparam = ', $files';
	}


	var mjstpl = path.join(genconfig.GENLIBDIR, 'tpl', 'tdetil-save_api.tpl')
	var tplscript = fs.readFileSync(mjstpl).toString()
	tplscript = tplscript.replace('/*{__TABLENAME__}*/', tablename)
	tplscript = tplscript.replace('/*{__PRIMARYID__}*/', primarykey)
	tplscript = tplscript.replace('/*{__TOSQLDATE__}*/', tosqldate)
	tplscript = tplscript.replace('/*{__TOUPPERCASE__}*/', uppercasefields)
	tplscript = tplscript.replace('/*{__FIELDRETSEL__}*/', fieldresturnsel)
	tplscript = tplscript.replace('/*{__SETNULLFIELD__}*/', setnullfields)
	tplscript = tplscript.replace('/*{__LOOKUPFIELD__}*/', lookupfields)
	tplscript = tplscript.replace('/*{__HEADERTABLE__}*/', headertable_name)
	tplscript = tplscript.replace('/*{__HEADERPRIMARYKEY__}*/', header_primarykey)
	tplscript = tplscript.replace('/*{__UNSETFIELD__}*/', unsetfields)

	tplscript = tplscript.replace('/*{__CDBSAVE__}*/', cdbsave)
	tplscript = tplscript.replace('/*{__UPLOADFILEPARAM__}*/', uploadfileparam)


	tplscript = tplscript.replace(/{__BASENAME__}/g, genconfig.basename);
	tplscript = tplscript.replace(/{__TABLENAME__}/g, headertable_name)
	tplscript = tplscript.replace(/{__MODULEPROG__}/g, genconfig.modulename + '/' + fsd.name);
	tplscript = tplscript.replace(/{__GENDATE__}/g, ((date)=>{var year = date.getFullYear();var month=(1+date.getMonth()).toString();month=month.length>1 ? month:'0'+month;var day = date.getDate().toString();day = day.length > 1 ? day:'0'+day;return day+'/'+month+'/'+year;})(new Date()));
	tplscript = tplscript.replace(/{__DETILNAME__}/g, fsd.detilname);
	

	fsd.script = tplscript
}