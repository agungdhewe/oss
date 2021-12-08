-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coareport`;


CREATE TABLE `mst_coareport` (
	`coareport_id` varchar(2) NOT NULL , 
	`coareport_name` varchar(30)  , 
	`coareport_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coareport_name` (`coareport_name`),
	PRIMARY KEY (`coareport_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Report COA';




INSERT INTO mst_coareport (`coareport_id`, `coareport_name`, `_createby`, `_createdate`) VALUES ('NR', 'NERACA', 'root', NOW());
INSERT INTO mst_coareport (`coareport_id`, `coareport_name`, `_createby`, `_createdate`) VALUES ('LR', 'LABARUGI', 'root', NOW());
INSERT INTO mst_coareport (`coareport_id`, `coareport_name`, `_createby`, `_createdate`) VALUES ('OF', 'MANUAL', 'root', NOW());



