'use strict'

const dbtype = global.dbtype;
const comp = global.comp;

module.exports = {
	title: "Departement Group",
	autoid: false,

	persistent: {
		'mst_deptgroup' : {
			primarykeys: ['deptgroup_id'],
			comment: 'Daftar Group Departement',
			data: {
				deptgroup_id: {text:'ID', type: dbtype.varchar(10), null:false, uppercase: true, options:{required:true,invalidMessage:'ID Group harus diisi'}},
				deptgroup_name: {text:'Dept Group', type: dbtype.varchar(60), null:false, uppercase: true, options:{required:true,invalidMessage:'Nama Group harus diisi'}},
				deptgroup_descr: {text:'Descr', type: dbtype.varchar(90), null:true, uppercase: false, suppresslist: true},
				deptgroup_parent: {
					text:'Parent', type: dbtype.varchar(10), null:true, uppercase: true, suppresslist: true,
					options:{prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_deptgroup', 
						field_value: 'deptgroup_id', field_display: 'deptgroup_name', field_display_name: 'deptgroup_parent_name', 
						api: 'ent/organisation/deptgroup/list'})					
				},
				deptgroup_pathid: {text:'PathId', type: dbtype.varchar(13), null:false, uppercase: false, suppresslist: true, options:{disabled:true}},
				deptgroup_path: {text:'Path', type: dbtype.varchar(390), null:false, uppercase: false, suppresslist: true, options:{disabled:true}},
				deptgroup_level: {text:'Level', type: dbtype.int(2), null:false, default:'0', uppercase: false, suppresslist: true, options:{disabled:true}},
				deptgroup_isexselect : {text:'Exclude From Selection', type: dbtype.boolean, null:false, default:'0'},
				depttype_id: {
					text:'Type', type: dbtype.varchar(10), null:false, uppercase: true, suppresslist: true,
					options:{required:true,invalidMessage:'Type Group harus diisi', prompt:'-- PILIH --'},
					comp: comp.Combo({
						table: 'mst_depttype', 
						field_value: 'depttype_id', field_display: 'depttype_name', 
						api: 'ent/organisation/depttype/list'})				
				},
			},

			defaultsearch: ['deptgroup_id', 'deptgroup_name'],

			uniques: {
				'deptgroup_name' : ['deptgroup_name'],
				'deptgroup_path' : ['deptgroup_path', 'deptgroup_pathid'],
			},
			
			values : [
			]
			
		},
	},

	schema: {
		title: 'Department Group',
		header: 'mst_deptgroup',
		detils: {}
	}
}



/** tambahan trigger */
/*
DROP TRIGGER IF EXISTS kalistadb.mst_deptgroup_before_insert;

DELIMITER $$
$$
CREATE DEFINER=`root`@`localhost` TRIGGER mst_deptgroup_before_insert
BEFORE INSERT
   ON mst_deptgroup FOR EACH ROW
   
BEGIN

	DECLARE PATHID VARCHAR(13);
	DECLARE PARENT_PATHID VARCHAR(13);
	DECLARE PARENT_PATH VARCHAR(390);

	IF NEW.deptgroup_parent=NEW.deptgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;

	SET NEW.deptgroup_pathid = NEW.deptgroup_id;

	SET PATHID = RPAD(NEW.deptgroup_pathid, 13, '-');
	SET NEW.deptgroup_pathid = PATHID;

	IF NEW.deptgroup_parent IS NULL THEN
		SET NEW.deptgroup_path = PATHID;
		SET NEW.deptgroup_level = 0;
	ELSE
		SELECT deptgroup_pathid, deptgroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_deptgroup WHERE deptgroup_id = NEW.deptgroup_parent;	
			
		SET NEW.deptgroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.deptgroup_level = (LENGTH(NEW.deptgroup_path) / 13) - 1;
	
	END IF;

END

$$
DELIMITER ;







DROP TRIGGER IF EXISTS kalistadb.mst_deptgroup_before_update;

DELIMITER $$
$$
CREATE DEFINER=`root`@`localhost` TRIGGER `mst_deptgroup_before_update` BEFORE UPDATE ON `mst_deptgroup` FOR EACH ROW BEGIN


	DECLARE PATHID VARCHAR(13);
	DECLARE CHILDCOUNT INT;
	DECLARE PARENT_PATHID VARCHAR(13);
	DECLARE PARENT_PATH VARCHAR(390);

	SET PATHID = OLD.deptgroup_pathid;
	SET NEW.deptgroup_id = OLD.deptgroup_id;
	SET NEW.deptgroup_pathid = OLD.deptgroup_pathid;

	IF NEW.deptgroup_parent=NEW.deptgroup_id THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Kode parent tidak boleh sama dengan kode group';
	END IF;
	

	IF NEW.deptgroup_parent='--NULL--' THEN
    	SET NEW.deptgroup_parent = NULL;
    END IF;


	SELECT COUNT(*) 
	INTO CHILDCOUNT
	FROM mst_deptgroup WHERE deptgroup_parent = NEW.deptgroup_id;
	IF NEW.deptgroup_parent<>OLD.deptgroup_parent AND CHILDCOUNT>0 THEN
		SIGNAL SQLSTATE '45000' SET 
		MESSAGE_TEXT = 'Group yang punya anggota tidak bisa diubah parentnya';	
	END IF;


	IF NEW.deptgroup_parent IS NULL THEN
		SET NEW.deptgroup_path = NEW.deptgroup_pathid;
		SET NEW.deptgroup_level = 0;
	ELSE
		SELECT deptgroup_pathid, deptgroup_path 
		INTO PARENT_PATHID, PARENT_PATH
		FROM mst_deptgroup WHERE deptgroup_id = NEW.deptgroup_parent;	
			
		SET NEW.deptgroup_path = CONCAT(PARENT_PATH, PATHID);
		SET NEW.deptgroup_level = (LENGTH(NEW.deptgroup_path) / 13) - 1;
	
	END IF;

END

$$
DELIMITER ;


 */