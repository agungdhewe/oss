-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_partnercategory`;


CREATE TABLE `mst_partnercategory` (
	`partnercategory_id` varchar(10) NOT NULL , 
	`partnercategory_name` varchar(60) NOT NULL , 
	`partnercategory_descr` varchar(90) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnercategory_name` (`partnercategory_name`),
	PRIMARY KEY (`partnercategory_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Kategori Partner';







