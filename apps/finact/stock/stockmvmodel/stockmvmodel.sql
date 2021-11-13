-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `con_stockmvmodel`;


CREATE TABLE `con_stockmvmodel` (
	`stockmvmodel_id` varchar(10) NOT NULL , 
	`stockmvmodel_name` varchar(30) NOT NULL , 
	`stockmvmodel_descr` varchar(255)  , 
	`stockmvmodel_isdirout` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_isdirin` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_isdirtransit` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_iscolprop` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_iscolsend` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_iscolrecv` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_iscolvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`stockmvmodel_iscolsales` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `stockmvmodel_name` (`stockmvmodel_name`),
	PRIMARY KEY (`stockmvmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar model Stockmove';




INSERT INTO con_stockmvmodel (`stockmvmodel_id`, `stockmvmodel_name`, `stockmvmodel_isdirout`, `stockmvmodel_isdirin`, `stockmvmodel_isdirtransit`, `stockmvmodel_iscolprop`, `stockmvmodel_iscolsend`, `stockmvmodel_iscolrecv`, `stockmvmodel_iscolvalue`, `stockmvmodel_iscolsales`, `_createby`, `_createdate`) VALUES ('RV', 'RECEIVE', '0', '1', '0', '1', '0', '1', '1', '0', 'root', NOW());
INSERT INTO con_stockmvmodel (`stockmvmodel_id`, `stockmvmodel_name`, `stockmvmodel_isdirout`, `stockmvmodel_isdirin`, `stockmvmodel_isdirtransit`, `stockmvmodel_iscolprop`, `stockmvmodel_iscolsend`, `stockmvmodel_iscolrecv`, `stockmvmodel_iscolvalue`, `stockmvmodel_iscolsales`, `_createby`, `_createdate`) VALUES ('TR', 'TRANSFER', '1', '1', '1', '1', '1', '1', '0', '0', 'root', NOW());
INSERT INTO con_stockmvmodel (`stockmvmodel_id`, `stockmvmodel_name`, `stockmvmodel_isdirout`, `stockmvmodel_isdirin`, `stockmvmodel_isdirtransit`, `stockmvmodel_iscolprop`, `stockmvmodel_iscolsend`, `stockmvmodel_iscolrecv`, `stockmvmodel_iscolvalue`, `stockmvmodel_iscolsales`, `_createby`, `_createdate`) VALUES ('SL', 'SALES', '1', '0', '0', '0', '1', '0', '1', '1', 'root', NOW());
INSERT INTO con_stockmvmodel (`stockmvmodel_id`, `stockmvmodel_name`, `stockmvmodel_isdirout`, `stockmvmodel_isdirin`, `stockmvmodel_isdirtransit`, `stockmvmodel_iscolprop`, `stockmvmodel_iscolsend`, `stockmvmodel_iscolrecv`, `stockmvmodel_iscolvalue`, `stockmvmodel_iscolsales`, `_createby`, `_createdate`) VALUES ('DO', 'DIRECT OUT', '1', '0', '0', '1', '1', '0', '0', '0', 'root', NOW());
INSERT INTO con_stockmvmodel (`stockmvmodel_id`, `stockmvmodel_name`, `stockmvmodel_isdirout`, `stockmvmodel_isdirin`, `stockmvmodel_isdirtransit`, `stockmvmodel_iscolprop`, `stockmvmodel_iscolsend`, `stockmvmodel_iscolrecv`, `stockmvmodel_iscolvalue`, `stockmvmodel_iscolsales`, `_createby`, `_createdate`) VALUES ('AJ', 'ADJUSTMENT', '0', '1', '0', '1', '0', '1', '1', '0', 'root', NOW());



