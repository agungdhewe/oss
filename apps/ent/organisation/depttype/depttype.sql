-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_depttype`;


CREATE TABLE `mst_depttype` (
	`depttype_id` varchar(10) NOT NULL , 
	`depttype_name` varchar(60) NOT NULL , 
	`depttype_descr` varchar(90)  , 
	`depttype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`depttype_isrevenue` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `depttype_name` (`depttype_name`),
	PRIMARY KEY (`depttype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Departement';




INSERT INTO mst_depttype (`depttype_id`, `depttype_name`, `depttype_descr`, `_createby`, `_createdate`) VALUES ('SUP', 'SUPPORTING', 'hanya expense', 'root', NOW());
INSERT INTO mst_depttype (`depttype_id`, `depttype_name`, `depttype_descr`, `depttype_isrevenue`, `_createby`, `_createdate`) VALUES ('COM', 'COMMERCIALS', 'punya income & expense', '1', 'root', NOW());
INSERT INTO mst_depttype (`depttype_id`, `depttype_name`, `depttype_descr`, `_createby`, `_createdate`) VALUES ('GAL', 'DEPT GROUP ALLOCATION', 'hanya expense', 'root', NOW());
INSERT INTO mst_depttype (`depttype_id`, `depttype_name`, `depttype_descr`, `_createby`, `_createdate`) VALUES ('SIT', 'SITE ALLOCATION', 'hanya expense', 'root', NOW());



