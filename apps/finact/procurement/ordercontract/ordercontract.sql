-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_ordercontract`;
-- drop table if exists `trn_ordercontractitem`;


CREATE TABLE `trn_ordercontract` (
	`ordercontract_id` varchar(14) NOT NULL , 
	`ordercontract_ref` varchar(255)  , 
	`ordercontract_descr` varchar(255) NOT NULL , 
	`partner_id` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ordercontract_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_ordercontract` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `trn_ordercontract` ADD CONSTRAINT `fk_trn_ordercontract_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





CREATE TABLE `trn_ordercontractitem` (
	`ordercontractitem_id` varchar(30) NOT NULL , 
	`item_id` varchar(14)  , 
	`itemstock_id` varchar(14)  , 
	`itemclass_id` varchar(14)  , 
	`ordercontractitem_descr` varchar(90) NOT NULL , 
	`ordercontractitem_estrate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`ordercontract_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`ordercontractitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Kontrak Order Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_ordercontractitem` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_ordercontractitem` ADD KEY `ordercontract_id` (`ordercontract_id`);

ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_ordercontractitem` ADD CONSTRAINT `fk_trn_ordercontractitem_trn_ordercontract` FOREIGN KEY (`ordercontract_id`) REFERENCES `trn_ordercontract` (`ordercontract_id`);





