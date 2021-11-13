CREATE TABLE `mst_area` (
	`area_id` varchar(30) NOT NULL , 
	`area_name` varchar(60) NOT NULL , 
	`area_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `area_name` (`area_name`),
	PRIMARY KEY (`area_id`)
) 
ENGINE=InnoDB
COMMENT='Master Area';




INSERT INTO mst_area (`area_id`, `area_name`, `_createby`, `_createdate`) VALUES ('DK', 'DALAM KOTA', 'root', NOW());
INSERT INTO mst_area (`area_id`, `area_name`, `_createby`, `_createdate`) VALUES ('LK', 'LUAR KOTA', 'root', NOW());



