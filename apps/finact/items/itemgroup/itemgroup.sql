-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemgroup`;


CREATE TABLE `mst_itemgroup` (
	`itemgroup_id` varchar(17) NOT NULL , 
	`itemgroup_name` varchar(60) NOT NULL , 
	`itemgroup_nameshort` varchar(60) NOT NULL , 
	`itemgroup_descr` varchar(90)  , 
	`itemgroup_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`itemgroup_parent` varchar(15)  , 
	`itemgroup_pathid` varchar(17) NOT NULL , 
	`itemgroup_path` varchar(390)  , 
	`itemgroup_level` int(2) NOT NULL DEFAULT 0, 
	`itemgroup_isexselect` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_id` varchar(10)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemgroup_name` (`itemgroup_name`),
--	UNIQUE KEY `itemgroup_path` (`itemgroup_path`, `itemgroup_pathid`),
	PRIMARY KEY (`itemgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Group Items';

ALTER TABLE `mst_itemgroup` ADD KEY `itemgroup_parent` (`itemgroup_parent`);
ALTER TABLE `mst_itemgroup` ADD KEY `itemmodel_id` (`itemmodel_id`);

ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `fk_mst_itemgroup_mst_itemgroup` FOREIGN KEY (`itemgroup_parent`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `mst_itemgroup` ADD CONSTRAINT `fk_mst_itemgroup_mst_itemmodel` FOREIGN KEY (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);





