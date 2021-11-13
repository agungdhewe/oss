CREATE TABLE `mst_landtype` (
	`landtype_id` varchar(10) NOT NULL , 
	`landtype_name` varchar(60) NOT NULL , 
	`landtype_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `landtype_name` (`landtype_name`),
	PRIMARY KEY (`landtype_id`)
) 
ENGINE=InnoDB
COMMENT='Master Land Type';




INSERT INTO mst_landtype (`landtype_id`, `landtype_name`, `_createby`, `_createdate`) VALUES ('MALL', 'MALL', 'root', NOW());
INSERT INTO mst_landtype (`landtype_id`, `landtype_name`, `_createby`, `_createdate`) VALUES ('KANTOR', 'PERKANTORAN', 'root', NOW());
INSERT INTO mst_landtype (`landtype_id`, `landtype_name`, `_createby`, `_createdate`) VALUES ('HOTEL', 'HOTEL', 'root', NOW());
INSERT INTO mst_landtype (`landtype_id`, `landtype_name`, `_createby`, `_createdate`) VALUES ('SPORTCLUB', 'SPORTCLUB', 'root', NOW());



