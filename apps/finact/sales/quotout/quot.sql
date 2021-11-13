-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_quot`;


CREATE TABLE `trn_quot` (
	`quot_id` varchar(30) NOT NULL , 
	`quot_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`quot_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Quotation';







