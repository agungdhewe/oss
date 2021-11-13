CREATE TABLE `fgt_group` (
	`group_id` varchar(13) NOT NULL , 
	`group_name` varchar(30)  , 
	`group_descr` varchar(255)  , 
	`group_disabled` tinyint(1) NOT NULL DEFAULT 1, 
	`group_menu` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `group_name` (`group_name`),
	PRIMARY KEY (`group_id`)
) 
ENGINE=InnoDB
COMMENT='';





