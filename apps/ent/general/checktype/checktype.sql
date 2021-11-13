-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_checktype`;


CREATE TABLE `mst_checktype` (
	`checktype_id` varchar(10) NOT NULL , 
	`checktype_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `checktype_name` (`checktype_name`),
	PRIMARY KEY (`checktype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Checklist Type';







