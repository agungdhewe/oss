CREATE TABLE `mst_coamodel` (
	`coamodel_id` varchar(10) NOT NULL , 
	`coamodel_name` varchar(30) NOT NULL , 
	`coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_isaging` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coamodel_name` (`coamodel_name`),
	PRIMARY KEY (`coamodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar model COA';




INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coamodel_isaging`, `coamodel_descr`, `_createby`, `_createdate`) VALUES ('AR', 'RECEIVABLE', '1', '', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coamodel_isaging`, `coamodel_descr`, `_createby`, `_createdate`) VALUES ('AP', 'PAYABLE', '1', '', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coamodel_isaging`, `coamodel_descr`, `_createby`, `_createdate`) VALUES ('GN', 'GENERAL', '0', '', 'root', NOW());



