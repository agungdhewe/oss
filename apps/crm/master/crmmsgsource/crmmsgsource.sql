CREATE TABLE `mst_crmmsgsource` (
	`crmmsgsource_id` varchar(5) NOT NULL , 
	`crmmsgsource_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmmsgsource_name` (`crmmsgsource_name`),
	PRIMARY KEY (`crmmsgsource_id`)
) 
ENGINE=InnoDB
COMMENT='Sumber2 perpesanan/call';




INSERT INTO mst_crmmsgsource (`crmmsgsource_id`, `crmmsgsource_name`, `_createby`, `_createdate`) VALUES ('S01', 'PHONE', 'root', NOW());
INSERT INTO mst_crmmsgsource (`crmmsgsource_id`, `crmmsgsource_name`, `_createby`, `_createdate`) VALUES ('S02', 'WHATSAPP', 'root', NOW());
INSERT INTO mst_crmmsgsource (`crmmsgsource_id`, `crmmsgsource_name`, `_createby`, `_createdate`) VALUES ('S03', 'OTHER', 'root', NOW());



