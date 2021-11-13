CREATE TABLE `trn_crmmsgcs` (
	`crmmsgcs_id` varchar(14) NOT NULL , 
	`crmmsgcs_phonenumber` varchar(60)  , 
	`crmmsgcs_email` varchar(60)  , 
	`crmmsgcs_name` varchar(60) NOT NULL , 
	`crmmsgsource_id` varchar(5) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmmsgcs_id`)
) 
ENGINE=InnoDB
COMMENT='Sumber2 perpesanan/call';

ALTER TABLE `trn_crmmsgcs` ADD KEY `crmmsgsource_id` (`crmmsgsource_id`);

ALTER TABLE `trn_crmmsgcs` ADD CONSTRAINT `fk_trn_crmmsgcs_mst_crmmsgsource` FOREIGN KEY (`crmmsgsource_id`) REFERENCES `mst_crmmsgsource` (`crmmsgsource_id`);





CREATE TABLE `trn_crmmsgcsitem` (
	`crmmsgcsitem_id` varchar(14) NOT NULL , 
	`crmmsgcsitem_message` varchar(5000)  , 
	`crmmsgclass_id` varchar(10) NOT NULL , 
	`brand_id` varchar(14)  , 
	`site_id` varchar(30)  , 
	`crmmsgcs_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmmsgcsitem_id`)
) 
ENGINE=InnoDB
COMMENT='Sumber2 perpesanan/call';

ALTER TABLE `trn_crmmsgcsitem` ADD KEY `crmmsgclass_id` (`crmmsgclass_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD KEY `site_id` (`site_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD KEY `crmmsgcs_id` (`crmmsgcs_id`);

ALTER TABLE `trn_crmmsgcsitem` ADD CONSTRAINT `fk_trn_crmmsgcsitem_mst_crmmsgclass` FOREIGN KEY (`crmmsgclass_id`) REFERENCES `mst_crmmsgclass` (`crmmsgclass_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD CONSTRAINT `fk_trn_crmmsgcsitem_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD CONSTRAINT `fk_trn_crmmsgcsitem_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_crmmsgcsitem` ADD CONSTRAINT `fk_trn_crmmsgcsitem_trn_crmmsgcs` FOREIGN KEY (`crmmsgcs_id`) REFERENCES `trn_crmmsgcs` (`crmmsgcs_id`);





CREATE TABLE `trn_crmmsgcstx` (
	`crmmsgcstx_id` varchar(14) NOT NULL , 
	`crmmsgcstx_date` date NOT NULL , 
	`crmmsgcstx_value` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmmsgcstx_id`)
) 
ENGINE=InnoDB
COMMENT='Log Failure Item Asset';







