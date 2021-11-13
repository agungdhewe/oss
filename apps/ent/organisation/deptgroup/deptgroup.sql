CREATE TABLE `mst_deptgroup` (
	`deptgroup_id` varchar(10) NOT NULL , 
	`deptgroup_name` varchar(60) NOT NULL , 
	`deptgroup_descr` varchar(90)  , 
	`deptgroup_parent` varchar(10)  , 
	`deptgroup_pathid` varchar(13) NOT NULL , 
	`deptgroup_path` varchar(390) NOT NULL , 
	`deptgroup_level` int(2) NOT NULL DEFAULT 0, 
	`depttype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptgroup_name` (`deptgroup_name`),
	UNIQUE KEY `deptgroup_path` (`deptgroup_path`, `deptgroup_pathid`),
	PRIMARY KEY (`deptgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Departement';

ALTER TABLE `mst_deptgroup` ADD KEY `deptgroup_parent` (`deptgroup_parent`);
ALTER TABLE `mst_deptgroup` ADD KEY `depttype_id` (`depttype_id`);

ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `fk_mst_deptgroup_mst_deptgroup` FOREIGN KEY (`deptgroup_parent`) REFERENCES `mst_deptgroup` (`deptgroup_id`);
ALTER TABLE `mst_deptgroup` ADD CONSTRAINT `fk_mst_deptgroup_mst_depttype` FOREIGN KEY (`depttype_id`) REFERENCES `mst_depttype` (`depttype_id`);




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






