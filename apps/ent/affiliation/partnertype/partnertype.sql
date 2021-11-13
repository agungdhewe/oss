-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_partnertype`;
-- drop table if exists `mst_partnertypeaccbudget`;


CREATE TABLE `mst_partnertype` (
	`partnertype_id` varchar(10) NOT NULL , 
	`partnertype_name` varchar(60) NOT NULL , 
	`partnertype_descr` varchar(90) NOT NULL , 
	`partnercategory_id` varchar(10)  , 
	`itemclass_id` varchar(14)  , 
	`unbill_accbudget_id` varchar(20)  , 
	`unbill_coa_id` varchar(20)  , 
	`payable_accbudget_id` varchar(20)  , 
	`payable_coa_id` varchar(20)  , 
	`partnertype_isempl` tinyint(1) NOT NULL DEFAULT 0, 
	`partnertype_ishaveae` tinyint(1) NOT NULL DEFAULT 0, 
	`partnertype_ishavecollector` tinyint(1) NOT NULL DEFAULT 0, 
	`partnertype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnertype_name` (`partnertype_name`),
	PRIMARY KEY (`partnertype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Partner';

ALTER TABLE `mst_partnertype` ADD KEY `partnercategory_id` (`partnercategory_id`);
ALTER TABLE `mst_partnertype` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_partnertype` ADD KEY `unbill_accbudget_id` (`unbill_accbudget_id`);
ALTER TABLE `mst_partnertype` ADD KEY `unbill_coa_id` (`unbill_coa_id`);
ALTER TABLE `mst_partnertype` ADD KEY `payable_accbudget_id` (`payable_accbudget_id`);
ALTER TABLE `mst_partnertype` ADD KEY `payable_coa_id` (`payable_coa_id`);

ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_partnercategory` FOREIGN KEY (`partnercategory_id`) REFERENCES `mst_partnercategory` (`partnercategory_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_accbudget` FOREIGN KEY (`unbill_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_coa` FOREIGN KEY (`unbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_accbudget_2` FOREIGN KEY (`payable_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_coa_2` FOREIGN KEY (`payable_coa_id`) REFERENCES `mst_coa` (`coa_id`);





CREATE TABLE `mst_partnertypeaccbudget` (
	`partnertypeaccbudget_id` varchar(14) NOT NULL , 
	`projectmodel_id` varchar(10)  , 
	`unbill_accbudget_id` varchar(20)  , 
	`unbill_coa_id` varchar(20)  , 
	`payable_accbudget_id` varchar(20)  , 
	`payable_coa_id` varchar(20)  , 
	`partnertype_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnertypeaccbudget_pair` (`partnertype_id`, `projectmodel_id`),
	PRIMARY KEY (`partnertypeaccbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Account yang direlasikan ke itemclass ini';

ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `unbill_accbudget_id` (`unbill_accbudget_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `unbill_coa_id` (`unbill_coa_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `payable_accbudget_id` (`payable_accbudget_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `payable_coa_id` (`payable_coa_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD KEY `partnertype_id` (`partnertype_id`);

ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_projectmodel` FOREIGN KEY (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_accbudget` FOREIGN KEY (`unbill_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_coa` FOREIGN KEY (`unbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_accbudget_2` FOREIGN KEY (`payable_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_coa_2` FOREIGN KEY (`payable_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_partnertypeaccbudget` ADD CONSTRAINT `fk_mst_partnertypeaccbudget_mst_partnertype` FOREIGN KEY (`partnertype_id`) REFERENCES `mst_partnertype` (`partnertype_id`);





