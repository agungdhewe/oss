-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coaformat`;


CREATE TABLE `mst_coaformat` (
	`coaformat_id` varchar(10) NOT NULL , 
	`coaformat_name` varchar(30)  , 
	`coaformat_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coaformat_name` (`coaformat_name`),
	PRIMARY KEY (`coaformat_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Format Report Account ';







