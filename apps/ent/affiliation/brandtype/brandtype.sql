CREATE TABLE `mst_brandtype` (
	`brandtype_id` varchar(10) NOT NULL , 
	`brandtype_name` varchar(60) NOT NULL , 
	`brandtype_descr` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brandtype_name` (`brandtype_name`),
	PRIMARY KEY (`brandtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Brand';




INSERT INTO mst_brandtype (`brandtype_id`, `brandtype_name`, `brandtype_descr`, `_createby`, `_createdate`) VALUES ('ACS', 'ACCESSORIES', 'Fashion Accessories Brands', 'root', NOW());
INSERT INTO mst_brandtype (`brandtype_id`, `brandtype_name`, `brandtype_descr`, `_createby`, `_createdate`) VALUES ('MEN', 'MEN', 'Fashion Men Brands', 'root', NOW());



