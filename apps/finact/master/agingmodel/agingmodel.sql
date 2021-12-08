-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_agingmodel`;


CREATE TABLE `mst_agingmodel` (
	`agingmodel_id` varchar(2) NOT NULL , 
	`agingmodel_name` varchar(30)  , 
	`agingmodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `agingmodel_name` (`agingmodel_name`),
	PRIMARY KEY (`agingmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Aging';




INSERT INTO mst_agingmodel (`agingmodel_id`, `agingmodel_name`, `_createby`, `_createdate`) VALUES ('AP', 'PAYABLE', 'root', NOW());
INSERT INTO mst_agingmodel (`agingmodel_id`, `agingmodel_name`, `_createby`, `_createdate`) VALUES ('AR', 'RECEIVABLE', 'root', NOW());



