CREATE TABLE `mst_authlevel` (
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`authlevel_descr` varchar(90)  , 
	`authlevel_order` int(4) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `authlevel_name` (`authlevel_name`),
	PRIMARY KEY (`authlevel_id`)
) 
ENGINE=InnoDB
COMMENT='Master Level Authorisasi';




INSERT INTO mst_authlevel (`authlevel_id`, `authlevel_name`, `authlevel_order`, `_createby`, `_createdate`) VALUES ('DIREC', 'DIRECTOR', '100', 'root', NOW());
INSERT INTO mst_authlevel (`authlevel_id`, `authlevel_name`, `authlevel_order`, `_createby`, `_createdate`) VALUES ('KADIV', 'HEAD OF DIVISION', '200', 'root', NOW());
INSERT INTO mst_authlevel (`authlevel_id`, `authlevel_name`, `authlevel_order`, `_createby`, `_createdate`) VALUES ('KADEP', 'HEAD OF DEPARTMENT', '300', 'root', NOW());
INSERT INTO mst_authlevel (`authlevel_id`, `authlevel_name`, `authlevel_order`, `_createby`, `_createdate`) VALUES ('KAREG', 'HEAD OF REGIONAL', '400', 'root', NOW());



