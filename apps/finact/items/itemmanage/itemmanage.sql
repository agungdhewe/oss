CREATE TABLE `mst_itemmanage` (
	`itemmanage_id` varchar(2) NOT NULL , 
	`itemmanage_name` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemmanage_name` (`itemmanage_name`),
	PRIMARY KEY (`itemmanage_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Manage Item';




INSERT INTO mst_itemmanage (`itemmanage_id`, `itemmanage_name`, `_createby`, `_createdate`) VALUES ('AS', 'ASSET', 'root', NOW());
INSERT INTO mst_itemmanage (`itemmanage_id`, `itemmanage_name`, `_createby`, `_createdate`) VALUES ('ST', 'STOCK', 'root', NOW());
INSERT INTO mst_itemmanage (`itemmanage_id`, `itemmanage_name`, `_createby`, `_createdate`) VALUES ('NI', 'NON-ITEM', 'root', NOW());



