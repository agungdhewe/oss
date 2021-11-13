CREATE TABLE `mst_coagroup` (
	`coagroup_id` varchar(17) NOT NULL , 
	`coagroup_name` varchar(90)  , 
	`coagroup_descr` varchar(255)  , 
	`coagroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`coagroup_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coagroup_parent` varchar(17)  , 
	`coagroup_path` varchar(340) NOT NULL , 
	`coagroup_pathid` varchar(17) NOT NULL , 
	`coagroup_level` int(2) NOT NULL DEFAULT 0, 
	`coagroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coagroup_name` (`coagroup_name`),
	UNIQUE KEY `coagroup_path` (`coagroup_path`, `coagroup_pathid`),
	PRIMARY KEY (`coagroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Grouping COA';

ALTER TABLE `mst_coagroup` ADD KEY `coagroup_parent` (`coagroup_parent`);

ALTER TABLE `mst_coagroup` ADD CONSTRAINT `fk_mst_coagroup_mst_coagroup` FOREIGN KEY (`coagroup_parent`) REFERENCES `mst_coagroup` (`coagroup_id`);





