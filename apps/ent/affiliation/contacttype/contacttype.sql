CREATE TABLE `mst_contacttype` (
	`contacttype_id` varchar(10) NOT NULL , 
	`contacttype_name` varchar(30) NOT NULL , 
	`contacttype_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `contacttype_name` (`contacttype_name`),
	PRIMARY KEY (`contacttype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Tipe Contact';




INSERT INTO mst_contacttype (`contacttype_id`, `contacttype_name`, `_createby`, `_createdate`) VALUES ('EMAIL', 'EMAIL', 'root', NOW());
INSERT INTO mst_contacttype (`contacttype_id`, `contacttype_name`, `_createby`, `_createdate`) VALUES ('PHONE', 'PHONE', 'root', NOW());



