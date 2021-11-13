CREATE TABLE `trn_salesorder` (
	`salesorder_id` varchar(30) NOT NULL , 
	`salesorder_date` date NOT NULL , 
	`salesorder_descr` varchar(255) NOT NULL , 
	`salesorder_ref` varchar(90) NOT NULL , 
	`ae_empl_id` varchar(14)  , 
	`partner_id` varchar(30) NOT NULL , 
	`salesorder_istax` tinyint(1) NOT NULL DEFAULT 1, 
	`taxtype_id` varchar(10) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`salesordertype_id` varchar(10) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`salesorder_version` int(4) NOT NULL DEFAULT 0, 
	`salesorder_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorder_commitby` varchar(14)  , 
	`salesorder_commitdate` datetime  , 
	`salesorder_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorder_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorder_approveby` varchar(14)  , 
	`salesorder_approvedate` datetime  , 
	`salesorder_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorder_declineby` varchar(14)  , 
	`salesorder_declinedate` datetime  , 
	`salesorder_notes` varchar(255)  , 
	`salesorder_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorder_closeby` varchar(14)  , 
	`salesorder_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`salesorder_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Sales Order';

ALTER TABLE `trn_salesorder` ADD KEY `ae_empl_id` (`ae_empl_id`);
ALTER TABLE `trn_salesorder` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_salesorder` ADD KEY `taxtype_id` (`taxtype_id`);
ALTER TABLE `trn_salesorder` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_salesorder` ADD KEY `salesordertype_id` (`salesordertype_id`);
ALTER TABLE `trn_salesorder` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_salesorder` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_salesorder` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_empl` FOREIGN KEY (`ae_empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_taxtype` FOREIGN KEY (`taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_salesordertype` FOREIGN KEY (`salesordertype_id`) REFERENCES `mst_salesordertype` (`salesordertype_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_salesorder` ADD CONSTRAINT `fk_trn_salesorder_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_salesorderitem` (
	`salesorderitem_id` varchar(14) NOT NULL , 
	`itemclass_id` varchar(14) NOT NULL , 
	`salesorderitem_descr` varchar(90) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`salesorderitem_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`salesorderitem_discountidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`salesorderitem_totalidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`salesorder_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`salesorderitem_id`)
) 
ENGINE=InnoDB
COMMENT='Meida Order Item';

ALTER TABLE `trn_salesorderitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_salesorderitem` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_salesorderitem` ADD KEY `salesorder_id` (`salesorder_id`);

ALTER TABLE `trn_salesorderitem` ADD CONSTRAINT `fk_trn_salesorderitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_salesorderitem` ADD CONSTRAINT `fk_trn_salesorderitem_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_salesorderitem` ADD CONSTRAINT `fk_trn_salesorderitem_trn_salesorder` FOREIGN KEY (`salesorder_id`) REFERENCES `trn_salesorder` (`salesorder_id`);





CREATE TABLE `trn_salesorderappr` (
	`salesorderappr_id` varchar(14) NOT NULL , 
	`salesorderappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorderappr_by` varchar(14)  , 
	`salesorderappr_date` datetime  , 
	`salesorder_version` int(4) NOT NULL DEFAULT 0, 
	`salesorderappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`salesorderappr_declinedby` varchar(14)  , 
	`salesorderappr_declineddate` datetime  , 
	`salesorderappr_notes` varchar(255)  , 
	`salesorder_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `salesorder_auth_id` (`salesorder_id`, `auth_id`),
	PRIMARY KEY (`salesorderappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_salesorderappr` ADD KEY `salesorder_id` (`salesorder_id`);

ALTER TABLE `trn_salesorderappr` ADD CONSTRAINT `fk_trn_salesorderappr_trn_salesorder` FOREIGN KEY (`salesorder_id`) REFERENCES `trn_salesorder` (`salesorder_id`);





