-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_brand`;
-- drop table if exists `mst_brandpartner`;
-- drop table if exists `mst_brandref`;


CREATE TABLE IF NOT EXISTS `mst_brand` (
	`brand_id` varchar(14) NOT NULL , 
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


ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brand_name` varchar(60) NOT NULL  AFTER `brand_id`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brand_descr` varchar(90)   AFTER `brand_name`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brand_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `brand_descr`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brand_grouping01` varchar(60)   AFTER `brand_isdisabled`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brand_grouping02` varchar(60)   AFTER `brand_grouping01`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `brandtype_id` varchar(10) NOT NULL  AFTER `brand_grouping02`;
ALTER TABLE `mst_brand` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `brandtype_id`;


ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brand_name` varchar(60) NOT NULL  AFTER `brand_id`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brand_descr` varchar(90)   AFTER `brand_name`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brand_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `brand_descr`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brand_grouping01` varchar(60)   AFTER `brand_isdisabled`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brand_grouping02` varchar(60)   AFTER `brand_grouping01`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `brandtype_id` varchar(10) NOT NULL  AFTER `brand_grouping02`;
ALTER TABLE `mst_brand` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10) NOT NULL  AFTER `brandtype_id`;


ALTER TABLE `mst_brand` ADD CONSTRAINT `brand_name` UNIQUE IF NOT EXISTS  (`brand_name`);

ALTER TABLE `mst_brand` ADD KEY IF NOT EXISTS `brandtype_id` (`brandtype_id`);
ALTER TABLE `mst_brand` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);

ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_brandtype` FOREIGN KEY IF NOT EXISTS  (`brandtype_id`) REFERENCES `mst_brandtype` (`brandtype_id`);
ALTER TABLE `mst_brand` ADD CONSTRAINT `fk_mst_brand_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);


INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('HBS', 'HUGOBOSS', 'MEN', 'HBS', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('CAN', 'CANALI', 'MEN', 'CAN', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('GEX', 'GEOX', 'MEN', 'GEX', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('EAG', 'AIGNER', 'ACS', 'EAG', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FLA', 'FURLA', 'ACS', 'FLA', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FRG', 'FERRAGAMO', 'ACS', 'FRG', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('FKP', 'FIND KAPOOR', 'ACS', 'FKP', 'root', NOW());
INSERT INTO mst_brand (`brand_id`, `brand_name`, `brandtype_id`, `unit_id`, `_createby`, `_createdate`) VALUES ('TOD', 'TODS', 'ACS', 'TOD', 'root', NOW());



CREATE TABLE IF NOT EXISTS `mst_brandpartner` (
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


ALTER TABLE `mst_brandpartner` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(14) NOT NULL  AFTER `brandpartner_id`;
ALTER TABLE `mst_brandpartner` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `partner_id`;


ALTER TABLE `mst_brandpartner` MODIFY COLUMN IF EXISTS  `partner_id` varchar(14) NOT NULL  AFTER `brandpartner_id`;
ALTER TABLE `mst_brandpartner` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `partner_id`;


ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `brandpartner_name` UNIQUE IF NOT EXISTS  (`brand_id`, `partner_id`);

ALTER TABLE `mst_brandpartner` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);

ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_brandpartner` ADD CONSTRAINT `fk_mst_brandpartner_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





CREATE TABLE IF NOT EXISTS `mst_brandref` (
	`brandref_id` varchar(14) NOT NULL , 
	`interface_id` varchar(7) NOT NULL , 
	`brandref_code` varchar(30) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `brandref_pair` (`brand_id`, `interface_id`),
	PRIMARY KEY (`brandref_id`)
) 
ENGINE=InnoDB
COMMENT='Kode referensi brand untuk keperluan interfacing dengan system lain';


ALTER TABLE `mst_brandref` ADD COLUMN IF NOT EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `brandref_id`;
ALTER TABLE `mst_brandref` ADD COLUMN IF NOT EXISTS  `brandref_code` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `mst_brandref` ADD COLUMN IF NOT EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `brandref_code`;


ALTER TABLE `mst_brandref` MODIFY COLUMN IF EXISTS  `interface_id` varchar(7) NOT NULL  AFTER `brandref_id`;
ALTER TABLE `mst_brandref` MODIFY COLUMN IF EXISTS  `brandref_code` varchar(30) NOT NULL  AFTER `interface_id`;
ALTER TABLE `mst_brandref` MODIFY COLUMN IF EXISTS  `brand_id` varchar(14) NOT NULL  AFTER `brandref_code`;


ALTER TABLE `mst_brandref` ADD CONSTRAINT `brandref_pair` UNIQUE IF NOT EXISTS  (`brand_id`, `interface_id`);

ALTER TABLE `mst_brandref` ADD KEY IF NOT EXISTS `interface_id` (`interface_id`);
ALTER TABLE `mst_brandref` ADD KEY IF NOT EXISTS `brand_id` (`brand_id`);

ALTER TABLE `mst_brandref` ADD CONSTRAINT `fk_mst_brandref_mst_interface` FOREIGN KEY IF NOT EXISTS  (`interface_id`) REFERENCES `mst_interface` (`interface_id`);
ALTER TABLE `mst_brandref` ADD CONSTRAINT `fk_mst_brandref_mst_brand` FOREIGN KEY IF NOT EXISTS (`brand_id`) REFERENCES `mst_brand` (`brand_id`);





