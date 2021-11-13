-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accbudgetformat`;


CREATE TABLE `mst_accbudgetformat` (
	`accbudgetformat_id` varchar(10) NOT NULL , 
	`accbudgetformat_name` varchar(30)  , 
	`accbudgetformat_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetformat_name` (`accbudgetformat_name`),
	PRIMARY KEY (`accbudgetformat_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Format Report Account Budget';







