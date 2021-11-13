CREATE TABLE `mst_depremodel` (
	`depremodel_id` varchar(10) NOT NULL , 
	`depremodel_name` varchar(90) NOT NULL , 
	`depremodel_descr` varchar(255)  , 
	`depremodel_formulaname` varchar(50) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `depremodel_name` (`depremodel_name`),
	PRIMARY KEY (`depremodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model';




INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('NO', 'NONE (DIRECT)', 'DIRECT', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('MN', 'MANUAL', '', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('SL', 'STRAIGHT LINE', 'STRAIGHTLINE', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('DD', 'DOUBLE DECLINING BALANCE', '', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('SY', 'SUM OF YEARS DIGIT', '', 'root', NOW());
INSERT INTO mst_depremodel (`depremodel_id`, `depremodel_name`, `depremodel_formulaname`, `_createby`, `_createdate`) VALUES ('UP', 'UNIT OF PRODUCTION', '', 'root', NOW());



