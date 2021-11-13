CREATE TABLE `mst_crmmsgclass` (
	`crmmsgclass_id` varchar(10) NOT NULL , 
	`crmmsgclass_name` varchar(60) NOT NULL , 
	`crmmsgclass_order` int(4) NOT NULL DEFAULT 0, 
	`crmmsgclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`crmmsgsentiment_id` varchar(5) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmmsgclass_name` (`crmmsgclass_name`),
	PRIMARY KEY (`crmmsgclass_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kalisfikasi Message';

ALTER TABLE `mst_crmmsgclass` ADD KEY `crmmsgsentiment_id` (`crmmsgsentiment_id`);

ALTER TABLE `mst_crmmsgclass` ADD CONSTRAINT `fk_mst_crmmsgclass_mst_crmmsgsentiment` FOREIGN KEY (`crmmsgsentiment_id`) REFERENCES `mst_crmmsgsentiment` (`crmmsgsentiment_id`);


INSERT INTO mst_crmmsgclass (`crmmsgclass_id`, `crmmsgclass_name`, `crmmsgclass_order`, `crmmsgsentiment_id`, `_createby`, `_createdate`) VALUES ('CSMC001', 'ASK DIRECTION', '10', 'NEU', 'root', NOW());
INSERT INTO mst_crmmsgclass (`crmmsgclass_id`, `crmmsgclass_name`, `crmmsgclass_order`, `crmmsgsentiment_id`, `_createby`, `_createdate`) VALUES ('CSMC002', 'COMPLAIN', '20', 'NEG', 'root', NOW());
INSERT INTO mst_crmmsgclass (`crmmsgclass_id`, `crmmsgclass_name`, `crmmsgclass_order`, `crmmsgsentiment_id`, `_createby`, `_createdate`) VALUES ('CSMC003', 'ASK AFTERSALES', '30', 'NEU', 'root', NOW());
INSERT INTO mst_crmmsgclass (`crmmsgclass_id`, `crmmsgclass_name`, `crmmsgclass_order`, `crmmsgsentiment_id`, `_createby`, `_createdate`) VALUES ('CSMC004', 'ASK ??', '40', 'NEU', 'root', NOW());
INSERT INTO mst_crmmsgclass (`crmmsgclass_id`, `crmmsgclass_name`, `crmmsgclass_order`, `crmmsgsentiment_id`, `_createby`, `_createdate`) VALUES ('CSMC005', 'ASK ???', '50', 'NEU', 'root', NOW());



