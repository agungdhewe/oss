CREATE TABLE `mst_unitmeasurement` (
	`unitmeasurement_id` varchar(10) NOT NULL , 
	`unitmeasurement_name` varchar(90) NOT NULL , 
	`unitmeasurement_descr` varchar(255)  , 
	`unitmeasurement_order` int(4) NOT NULL DEFAULT 100, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `unitmeasurement_name` (`unitmeasurement_name`),
	PRIMARY KEY (`unitmeasurement_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model';




INSERT INTO mst_unitmeasurement (`unitmeasurement_id`, `unitmeasurement_name`, `unitmeasurement_order`, `_createby`, `_createdate`) VALUES ('PCS', 'PCS', '0', 'root', NOW());
INSERT INTO mst_unitmeasurement (`unitmeasurement_id`, `unitmeasurement_name`, `unitmeasurement_order`, `_createby`, `_createdate`) VALUES ('UNIT', 'UNIT', '1', 'root', NOW());
INSERT INTO mst_unitmeasurement (`unitmeasurement_id`, `unitmeasurement_name`, `unitmeasurement_order`, `_createby`, `_createdate`) VALUES ('RIM', 'RIM', '2', 'root', NOW());
INSERT INTO mst_unitmeasurement (`unitmeasurement_id`, `unitmeasurement_name`, `unitmeasurement_order`, `_createby`, `_createdate`) VALUES ('BOX', 'BOX', '3', 'root', NOW());



