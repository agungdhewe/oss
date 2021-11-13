-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemstock`;
-- drop table if exists `mst_itemstocksetting`;
-- drop table if exists `mst_itemstocksite`;
-- drop table if exists `mst_itemstocksaldo`;


CREATE TABLE `mst_itemstock` (
	`itemstock_id` varchar(14) NOT NULL , 
	`itemstock_name` varchar(150) NOT NULL , 
	`itemstock_barcode` varchar(30) NOT NULL , 
	`itemstock_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemstock_descr` varchar(90)  , 
	`itemstock_estcost` decimal(12, 0)  , 
	`itemstock_lastqty` decimal(14, 2)  , 
	`itemstock_lastqtyupdate` decimal(14, 2)  , 
	`itemstock_lastrecvid` varchar(90)  , 
	`itemstock_lastrecvdate` datetime  , 
	`itemstock_lastrecvqty` decimal(14, 2)  , 
	`itemstock_lastcost` decimal(14, 2)  , 
	`itemstock_lastcostdate` datetime  , 
	`itemgroup_id` varchar(15)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemstock_name` (`itemstock_name`),
	UNIQUE KEY `itemstock_barcode` (`itemstock_barcode`),
	PRIMARY KEY (`itemstock_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Item Stock';

ALTER TABLE `mst_itemstock` ADD KEY `itemgroup_id` (`itemgroup_id`);
ALTER TABLE `mst_itemstock` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_itemstock` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_itemstock` ADD CONSTRAINT `fk_mst_itemstock_mst_itemgroup` FOREIGN KEY (`itemgroup_id`) REFERENCES `mst_itemgroup` (`itemgroup_id`);
ALTER TABLE `mst_itemstock` ADD CONSTRAINT `fk_mst_itemstock_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_itemstock` ADD CONSTRAINT `fk_mst_itemstock_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE `mst_itemstocksetting` (
	`itemstocksetting_id` varchar(14) NOT NULL , 
	`site_id` varchar(30)  , 
	`itemstock_minqty` decimal(14, 0)  , 
	`itemstock_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemstocksetting_id`)
) 
ENGINE=InnoDB
COMMENT='Stock Setting';

ALTER TABLE `mst_itemstocksetting` ADD KEY `site_id` (`site_id`);
ALTER TABLE `mst_itemstocksetting` ADD KEY `itemstock_id` (`itemstock_id`);

ALTER TABLE `mst_itemstocksetting` ADD CONSTRAINT `fk_mst_itemstocksetting_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_itemstocksetting` ADD CONSTRAINT `fk_mst_itemstocksetting_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);





CREATE TABLE `mst_itemstocksite` (
	`itemstocksite_id` varchar(14) NOT NULL , 
	`itemstock_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemstocksite_id`)
) 
ENGINE=InnoDB
COMMENT='Current Stock di lokasi';

ALTER TABLE `mst_itemstocksite` ADD KEY `itemstock_id` (`itemstock_id`);

ALTER TABLE `mst_itemstocksite` ADD CONSTRAINT `fk_mst_itemstocksite_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);





CREATE TABLE `mst_itemstocksaldo` (
	`itemstocksaldo_id` varchar(14) NOT NULL , 
	`itemstock_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemstocksaldo_id`)
) 
ENGINE=InnoDB
COMMENT='Saldo akhir stok pada akhir bulan';

ALTER TABLE `mst_itemstocksaldo` ADD KEY `itemstock_id` (`itemstock_id`);

ALTER TABLE `mst_itemstocksaldo` ADD CONSTRAINT `fk_mst_itemstocksaldo_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);





