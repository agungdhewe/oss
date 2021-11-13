-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_inquirymodel`;


CREATE TABLE `mst_inquirymodel` (
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquirymodel_name` varchar(30) NOT NULL , 
	`inquirymodel_descr` varchar(90)  , 
	`inquirymodel_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirymodel_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirymodel_name` (`inquirymodel_name`),
	PRIMARY KEY (`inquirymodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Inquiry';




INSERT INTO mst_inquirymodel (`inquirymodel_id`, `inquirymodel_name`, `inquirymodel_isqtybreakdown`, `inquirymodel_isdateinterval`, `_createby`, `_createdate`) VALUES ('M', 'PERMINTAAN BARANG', '1', '0', 'root', NOW());
INSERT INTO mst_inquirymodel (`inquirymodel_id`, `inquirymodel_name`, `inquirymodel_isqtybreakdown`, `inquirymodel_isdateinterval`, `_createby`, `_createdate`) VALUES ('B', 'PEMINJAMAN BARANG', '1', '1', 'root', NOW());
INSERT INTO mst_inquirymodel (`inquirymodel_id`, `inquirymodel_name`, `inquirymodel_isqtybreakdown`, `inquirymodel_isdateinterval`, `_createby`, `_createdate`) VALUES ('S', 'SERVICE', '0', '0', 'root', NOW());
INSERT INTO mst_inquirymodel (`inquirymodel_id`, `inquirymodel_name`, `inquirymodel_isqtybreakdown`, `inquirymodel_isdateinterval`, `_createby`, `_createdate`) VALUES ('P', 'PARTNER', '0', '1', 'root', NOW());



