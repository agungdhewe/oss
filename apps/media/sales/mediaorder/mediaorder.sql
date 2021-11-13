CREATE TABLE `trn_mediaorder` (
	`mediaorder_id` varchar(30) NOT NULL , 
	`mediaordertype_id` varchar(10) NOT NULL , 
	`mediaorder_date` date NOT NULL , 
	`mediaorder_descr` varchar(255) NOT NULL , 
	`mediaorder_ref` varchar(90) NOT NULL , 
	`ae_empl_id` varchar(14)  , 
	`agency_partner_id` varchar(30) NOT NULL , 
	`advertiser_partner_id` varchar(30) NOT NULL , 
	`brand_id` varchar(14) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`mediaorder_istax` tinyint(1) NOT NULL DEFAULT 1, 
	`taxtype_id` varchar(10) NOT NULL , 
	`mediapackage_id` varchar(10)  , 
	`salesordertype_id` varchar(10) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`mediaorder_version` int(4) NOT NULL DEFAULT 0, 
	`mediaorder_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorder_commitby` varchar(14)  , 
	`mediaorder_commitdate` datetime  , 
	`mediaorder_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorder_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorder_approveby` varchar(14)  , 
	`mediaorder_approvedate` datetime  , 
	`mediaorder_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorder_declineby` varchar(14)  , 
	`mediaorder_declinedate` datetime  , 
	`mediaorder_notes` varchar(255)  , 
	`mediaorder_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorder_closeby` varchar(14)  , 
	`mediaorder_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`mediaorder_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Media Order';

ALTER TABLE `trn_mediaorder` ADD KEY `mediaordertype_id` (`mediaordertype_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `ae_empl_id` (`ae_empl_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `agency_partner_id` (`agency_partner_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `advertiser_partner_id` (`advertiser_partner_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `brand_id` (`brand_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `taxtype_id` (`taxtype_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `mediapackage_id` (`mediapackage_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `salesordertype_id` (`salesordertype_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_mediaorder` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_mediaordertype` FOREIGN KEY (`mediaordertype_id`) REFERENCES `mst_mediaordertype` (`mediaordertype_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_empl` FOREIGN KEY (`ae_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_partner` FOREIGN KEY (`agency_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_partner_2` FOREIGN KEY (`advertiser_partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_brand` FOREIGN KEY (`brand_id`) REFERENCES `mst_brand` (`brand_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_taxtype` FOREIGN KEY (`taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_mediapackage` FOREIGN KEY (`mediapackage_id`) REFERENCES `mst_mediapackage` (`mediapackage_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_salesordertype` FOREIGN KEY (`salesordertype_id`) REFERENCES `mst_salesordertype` (`salesordertype_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_mediaorder` ADD CONSTRAINT `fk_trn_mediaorder_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_mediaorderitem` (
	`mediaorderitem_id` varchar(14) NOT NULL , 
	`mediaadslot_id` varchar(14)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`mediaordertype_id` varchar(10) NOT NULL , 
	`mediaorderitem_descr` varchar(90) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`mediaorderitem_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`mediaorderitem_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`mediaorderitem_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`mediaorderitem_discountidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`mediaorderitem_totalidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`mediaorder_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`mediaorderitem_id`)
) 
ENGINE=InnoDB
COMMENT='Meida Order Item';

ALTER TABLE `trn_mediaorderitem` ADD KEY `mediaadslot_id` (`mediaadslot_id`);
ALTER TABLE `trn_mediaorderitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_mediaorderitem` ADD KEY `mediaordertype_id` (`mediaordertype_id`);
ALTER TABLE `trn_mediaorderitem` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_mediaorderitem` ADD KEY `mediaorder_id` (`mediaorder_id`);

ALTER TABLE `trn_mediaorderitem` ADD CONSTRAINT `fk_trn_mediaorderitem_mst_mediaadslot` FOREIGN KEY (`mediaadslot_id`) REFERENCES `mst_mediaadslot` (`mediaadslot_id`);
ALTER TABLE `trn_mediaorderitem` ADD CONSTRAINT `fk_trn_mediaorderitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_mediaorderitem` ADD CONSTRAINT `fk_trn_mediaorderitem_mst_mediaordertype` FOREIGN KEY (`mediaordertype_id`) REFERENCES `mst_mediaordertype` (`mediaordertype_id`);
ALTER TABLE `trn_mediaorderitem` ADD CONSTRAINT `fk_trn_mediaorderitem_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_mediaorderitem` ADD CONSTRAINT `fk_trn_mediaorderitem_trn_mediaorder` FOREIGN KEY (`mediaorder_id`) REFERENCES `trn_mediaorder` (`mediaorder_id`);





CREATE TABLE `trn_mediaorderappr` (
	`mediaorderappr_id` varchar(14) NOT NULL , 
	`mediaorderappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorderappr_by` varchar(14)  , 
	`mediaorderappr_date` datetime  , 
	`mediaorder_version` int(4) NOT NULL DEFAULT 0, 
	`mediaorderappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`mediaorderappr_declinedby` varchar(14)  , 
	`mediaorderappr_declineddate` datetime  , 
	`mediaorderappr_notes` varchar(255)  , 
	`mediaorder_id` varchar(30) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`authlevel_name` varchar(60) NOT NULL , 
	`auth_id` varchar(10)  , 
	`auth_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `mediaorder_auth_id` (`mediaorder_id`, `auth_id`),
	PRIMARY KEY (`mediaorderappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_mediaorderappr` ADD KEY `mediaorder_id` (`mediaorder_id`);

ALTER TABLE `trn_mediaorderappr` ADD CONSTRAINT `fk_trn_mediaorderappr_trn_mediaorder` FOREIGN KEY (`mediaorder_id`) REFERENCES `trn_mediaorder` (`mediaorder_id`);





