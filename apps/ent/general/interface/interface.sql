CREATE TABLE `mst_interface` (
	`interface_id` varchar(7) NOT NULL , 
	`interface_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `interface_name` (`interface_name`),
	PRIMARY KEY (`interface_id`)
) 
ENGINE=InnoDB
COMMENT='Master Interface';







