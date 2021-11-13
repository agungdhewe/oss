CREATE TABLE `mst_brand` (
	`brand_id` varchar(10) NOT NULL , 
	`brand_name` varchar(60) NOT NULL , 
	`brand_descr` varchar(90)  , 
	`brand_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`brand_grouping01` varchar(60)  , 
	`brand_grouping02` varchar(60)  , 
	`brandtype_id` varchar(10) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brand_name` (`brand_name`),
	PRIMARY KEY (`brand_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Brand';

ALTER TABLE `mst_brand` ADD KEY `brandtype_id` (`brandtype_id`);
ALTER TABLE `mst_brand` ADD KEY `unit_id` (`unit_id`);

ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_brandtype` FOREIGN KEY (`brandtype_id`) REFERENCES `mst_brandtype` (`brandtype_id`);
ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`);


INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'MEN', 'HBS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('CAN', 'CANALI', 'MEN', 'CAN', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'MEN', 'GEX', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('EAG', 'AIGNER', 'ACS', 'EAG', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'ACS', 'FLA', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'ACS', 'FRG', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FKP', 'FIND KAPOOR', 'ACS', 'FKP', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('TOD', 'TODS', 'ACS', 'TOD', 'root', NOW());



CREATE TABLE `mst_brandpartner` (
	`brandpartner_id` varchar(14) NOT NULL , 
	`partner_id` varchar(14) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brandpartner_name` (`brand_id`, `partner_id`),
	PRIMARY KEY (`brandpartner_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Partner Brand';

ALTER TABLE `mst_brandpartner` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





CREATE TABLE `mst_brandref` (
	`brandref_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`brandref_code` varchar(30) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brandref_pair` (`brand_id`, `interface_id`),
	UNIQUE KEY `brandref_code` (`interface_id`, `brandref_code`),
	PRIMARY KEY (`brandref_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi brand untuk keperluan interfacing dengan system lain';

ALTER TABLE `mst_brandref` ADD KEY `interface_id` (`interface_id`);
ALTER TABLE `mst_brandref` ADD KEY `brand_id` (`brand_id`);

ALTER TABLE `mst_brandref` ADD CONSTRAINT `fk_mst_brandref_mst_interface` FOREIGN KEY (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `mst_brandref` ADD CONSTRAINT `fk_mst_brandref_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





