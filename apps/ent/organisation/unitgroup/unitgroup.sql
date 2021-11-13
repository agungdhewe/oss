CREATE TABLE `mst_unitgroup` (
	`unitgroup_id` varchar(10) NOT NULL , 
	`unitgroup_name` varchar(60) NOT NULL , 
	`unitgroup_descr` varchar(90) NOT NULL , 
	`unitgroup_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `unitgroup_name` (`unitgroup_name`),
	PRIMARY KEY (`unitgroup_id`)
) 
ENGINE=InnoDB
COMMENT='Master Group Unit';







