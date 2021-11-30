-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_inquirytype`;
-- drop table if exists `mst_inquirytypepartnertype`;
-- drop table if exists `mst_inquirytypetrxmodel`;
-- drop table if exists `mst_inquirytypeitemclass`;


CREATE TABLE `mst_inquirytype` (
	`inquirytype_id` varchar(14) NOT NULL , 
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquirytype_name` varchar(90) NOT NULL , 
	`inquirytype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_descr` varchar(255)  , 
	`inquiryselect_id` varchar(1) NOT NULL , 
	`inquirytype_isperempl` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_id` varchar(2) NOT NULL , 
	`inquirytype_isallowadvance` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isemplaspartner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_maxadvancevalue` decimal(12, 0) NOT NULL DEFAULT 0, 
	`related_dept_id` varchar(30)  , 
	`related_team_id` varchar(14)  , 
	`owner_dept_id` varchar(30)  , 
	`owner_team_id` varchar(14)  , 
	`site_id` varchar(30)  , 
	`room_id` varchar(30)  , 
	`orderout_dept_id` varchar(30) NOT NULL , 
	`orderout_team_id` varchar(14)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`inquiry_title_ina` varchar(90)  , 
	`inquiry_title_eng` varchar(90)  , 
	`inquiry_doc_id` varchar(30) NOT NULL , 
	`request_title_ina` varchar(90)  , 
	`request_title_eng` varchar(90)  , 
	`request_doc_id` varchar(30) NOT NULL , 
	`orderout_title_ina` varchar(90)  , 
	`orderout_title_eng` varchar(90)  , 
	`orderout_doc_id` varchar(30) NOT NULL , 
	`inquirytype_isuseqty` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isusedays` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isusetask` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitqty` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitdays` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimittask` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_islimitvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isallowoverbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptuser` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptowner` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdeptmaintainer` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isqtybreakdown` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_istoberequest` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isautorequest` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isautoorder` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_ismovinginit` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytype_name` (`inquirytype_name`),
	PRIMARY KEY (`inquirytype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Inquiry';

ALTER TABLE `mst_inquirytype` ADD KEY `inquirymodel_id` (`inquirymodel_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `inquiryselect_id` (`inquiryselect_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `related_dept_id` (`related_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `related_team_id` (`related_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `owner_team_id` (`owner_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `site_id` (`site_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `room_id` (`room_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `orderout_dept_id` (`orderout_dept_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `orderout_team_id` (`orderout_team_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `inquiry_doc_id` (`inquiry_doc_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `request_doc_id` (`request_doc_id`);
ALTER TABLE `mst_inquirytype` ADD KEY `orderout_doc_id` (`orderout_doc_id`);

ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_inquirymodel` FOREIGN KEY (`inquirymodel_id`) REFERENCES `mst_inquirymodel` (`inquirymodel_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_inquiryselect` FOREIGN KEY (`inquiryselect_id`) REFERENCES `mst_inquiryselect` (`inquiryselect_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept` FOREIGN KEY (`related_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team` FOREIGN KEY (`related_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept_2` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team_2` FOREIGN KEY (`owner_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_room` FOREIGN KEY (`room_id`) REFERENCES `mst_room` (`room_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_dept_3` FOREIGN KEY (`orderout_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_team_3` FOREIGN KEY (`orderout_team_id`) REFERENCES `mst_team` (`team_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc` FOREIGN KEY (`inquiry_doc_id`) REFERENCES `mst_doc` (`doc_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc_2` FOREIGN KEY (`request_doc_id`) REFERENCES `mst_doc` (`doc_id`);
ALTER TABLE `mst_inquirytype` ADD CONSTRAINT `fk_mst_inquirytype_mst_doc_3` FOREIGN KEY (`orderout_doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_inquirytypepartnertype` (
	`inquirytypepartnertype_id` varchar(14) NOT NULL , 
	`partnertype_id` varchar(10) NOT NULL , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypepartnertype_pair` (`inquirytype_id`, `partnertype_id`),
	PRIMARY KEY (`inquirytypepartnertype_id`)
) 
ENGINE=InnoDB
COMMENT='Model transaksi yang diapply ke suatu tipe inquiry';

ALTER TABLE `mst_inquirytypepartnertype` ADD KEY `partnertype_id` (`partnertype_id`);
ALTER TABLE `mst_inquirytypepartnertype` ADD KEY `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypepartnertype` ADD CONSTRAINT `fk_mst_inquirytypepartnertype_mst_partnertype` FOREIGN KEY (`partnertype_id`) REFERENCES `mst_partnertype` (`partnertype_id`);
ALTER TABLE `mst_inquirytypepartnertype` ADD CONSTRAINT `fk_mst_inquirytypepartnertype_mst_inquirytype` FOREIGN KEY (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





CREATE TABLE `mst_inquirytypetrxmodel` (
	`inquirytypetrxmodel_id` varchar(14) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`orderout_inquirytype_id` varchar(30) NOT NULL , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypetrxmodel_pair` (`inquirytype_id`, `trxmodel_id`),
	PRIMARY KEY (`inquirytypetrxmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Model transaksi yang diapply ke suatu tipe inquiry';

ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY `orderout_inquirytype_id` (`orderout_inquirytype_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD KEY `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_inquirytype` FOREIGN KEY (`orderout_inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);
ALTER TABLE `mst_inquirytypetrxmodel` ADD CONSTRAINT `fk_mst_inquirytypetrxmodel_mst_inquirytype` FOREIGN KEY (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





CREATE TABLE `mst_inquirytypeitemclass` (
	`inquirytypeitemclass_id` varchar(14) NOT NULL , 
	`itemclass_id` varchar(14) NOT NULL , 
	`inquirytype_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `inquirytypeitemclass_pair` (`inquirytype_id`, `itemclass_id`),
	PRIMARY KEY (`inquirytypeitemclass_id`)
) 
ENGINE=InnoDB
COMMENT='Itemclass yang diapply ke suatu tipe inquiry';

ALTER TABLE `mst_inquirytypeitemclass` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_inquirytypeitemclass` ADD KEY `inquirytype_id` (`inquirytype_id`);

ALTER TABLE `mst_inquirytypeitemclass` ADD CONSTRAINT `fk_mst_inquirytypeitemclass_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `mst_inquirytypeitemclass` ADD CONSTRAINT `fk_mst_inquirytypeitemclass_mst_inquirytype` FOREIGN KEY (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);





