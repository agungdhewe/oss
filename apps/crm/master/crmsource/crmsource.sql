CREATE TABLE `mst_crmsource` (
	`crmsource_id` varchar(10) NOT NULL , 
	`crmsource_name` varchar(30) NOT NULL , 
	`crmsource_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmsource_name` (`crmsource_name`),
	PRIMARY KEY (`crmsource_id`)
) 
ENGINE=InnoDB
COMMENT='Master CRM Source, dari mana data customer didapatkan';




INSERT INTO mst_crmsource (`crmsource_id`, `crmsource_name`, `_createby`, `_createdate`) VALUES ('FB', 'FACEBOOK', 'root', NOW());
INSERT INTO mst_crmsource (`crmsource_id`, `crmsource_name`, `_createby`, `_createdate`) VALUES ('IG', 'INSTAGRAM', 'root', NOW());
INSERT INTO mst_crmsource (`crmsource_id`, `crmsource_name`, `_createby`, `_createdate`) VALUES ('GADS', 'GOOGLE ADS', 'root', NOW());
INSERT INTO mst_crmsource (`crmsource_id`, `crmsource_name`, `_createby`, `_createdate`) VALUES ('TRANSMART', 'TRANSMART', 'root', NOW());
INSERT INTO mst_crmsource (`crmsource_id`, `crmsource_name`, `_createby`, `_createdate`) VALUES ('METRO', 'METRO', 'root', NOW());



