CREATE TABLE `mst_sitegroup` (
	`sitegroup_id` varchar(10) NOT NULL , 
	`sitegroup_name` varchar(60) NOT NULL , 
	`sitegroup_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `sitegroup_name` (`sitegroup_name`),
	PRIMARY KEY (`sitegroup_id`)
) 
ENGINE=InnoDB
COMMENT='Master Site Group';







