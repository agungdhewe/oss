-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_deptgroup`;


CREATE TABLE `mst_deptgroup` (
	`deptgroup_id` varchar(10) NOT NULL , 
	`deptgroup_name` varchar(60) NOT NULL , 
	`deptgroup_descr` varchar(90)  , 
	`deptgroup_parent` varchar(10)  , 
	`deptgroup_pathid` varchar(13) NOT NULL , 
	`deptgroup_path` varchar(390) NOT NULL , 
	`deptgroup_level` int(2) NOT NULL DEFAULT 0, 
	`deptgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
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





