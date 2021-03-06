-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_request`;
-- drop table if exists `trn_requestitem`;
-- drop table if exists `trn_requestappr`;


CREATE TABLE `trn_request` (
	`request_id` varchar(30) NOT NULL , 
	`inquiry_id` varchar(14)  , 
	`request_isunref` tinyint(1) NOT NULL DEFAULT 0, 
	`inquirytype_id` varchar(14) NOT NULL , 
	`user_dept_id` varchar(30)  , 
	`request_descr` varchar(90) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`request_dtstart` date NOT NULL , 
	`request_dtend` date NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`projecttask_id` varchar(14)  , 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`request_isunbudgetted` tinyint(1) NOT NULL DEFAULT 0, 
	`site_id` varchar(30) NOT NULL , 
	`deliver_siteaddress` varchar(250)  , 
	`deliver_city` varchar(60)  , 
	`deliver_upname` varchar(60)  , 
	`deliver_uptelp` varchar(60)  , 
	`inquirymodel_id` varchar(1) NOT NULL , 
	`inquiryselect_id` varchar(1) NOT NULL , 
	`itemmanage_id` varchar(2) NOT NULL , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`orderout_dept_id` varchar(30) NOT NULL , 
	`orderout_doc_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`request_version` int(4) NOT NULL DEFAULT 0, 
	`request_isdateinterval` tinyint(1) NOT NULL DEFAULT 0, 
	`request_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`request_commitby` varchar(14)  , 
	`request_commitdate` datetime  , 
	`request_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`request_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`request_approveby` varchar(14)  , 
	`request_approvedate` datetime  , 
	`request_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`request_declineby` varchar(14)  , 
	`request_declinedate` datetime  , 
	`request_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`request_closeby` varchar(14)  , 
	`request_closedate` datetime  , 
	`request_isautogenerated` tinyint(1) NOT NULL DEFAULT 0, 
	`request_isitemdeptuser` tinyint(1) NOT NULL DEFAULT 0, 
	`request_isitemdeptowner` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`request_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Request Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_request` ADD KEY `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_request` ADD KEY `inquirytype_id` (`inquirytype_id`);
ALTER TABLE `trn_request` ADD KEY `user_dept_id` (`user_dept_id`);
ALTER TABLE `trn_request` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_request` ADD KEY `project_id` (`project_id`);
ALTER TABLE `trn_request` ADD KEY `projecttask_id` (`projecttask_id`);
ALTER TABLE `trn_request` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_request` ADD KEY `projbudgettask_id` (`projbudgettask_id`);
ALTER TABLE `trn_request` ADD KEY `site_id` (`site_id`);
ALTER TABLE `trn_request` ADD KEY `inquirymodel_id` (`inquirymodel_id`);
ALTER TABLE `trn_request` ADD KEY `inquiryselect_id` (`inquiryselect_id`);
ALTER TABLE `trn_request` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `trn_request` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_request` ADD KEY `orderout_dept_id` (`orderout_dept_id`);
ALTER TABLE `trn_request` ADD KEY `orderout_doc_id` (`orderout_doc_id`);
ALTER TABLE `trn_request` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_trn_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_inquirytype` FOREIGN KEY (`inquirytype_id`) REFERENCES `mst_inquirytype` (`inquirytype_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_dept` FOREIGN KEY (`user_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_projbudgettask` FOREIGN KEY (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_inquirymodel` FOREIGN KEY (`inquirymodel_id`) REFERENCES `mst_inquirymodel` (`inquirymodel_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_inquiryselect` FOREIGN KEY (`inquiryselect_id`) REFERENCES `mst_inquiryselect` (`inquiryselect_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_dept_2` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_dept_3` FOREIGN KEY (`orderout_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_doc` FOREIGN KEY (`orderout_doc_id`) REFERENCES `mst_doc` (`doc_id`);
ALTER TABLE `trn_request` ADD CONSTRAINT `fk_trn_request_mst_doc_2` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_requestitem` (
	`requestitem_id` varchar(30) NOT NULL , 
	`itemasset_id` varchar(14)  , 
	`item_id` varchar(14)  , 
	`itemstock_id` varchar(14)  , 
	`partner_id` varchar(30)  , 
	`itemclass_id` varchar(14) NOT NULL , 
	`requestitem_descr` varchar(90) NOT NULL , 
	`requestitem_qty` int(4) NOT NULL DEFAULT 0, 
	`requestitem_days` int(4) NOT NULL DEFAULT 0, 
	`requestitem_task` int(4) NOT NULL DEFAULT 0, 
	`requestitem_estrate` decimal(12, 0) NOT NULL DEFAULT 0, 
	`requestitem_estvalue` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetdet_id` varchar(30)  , 
	`requestitem_isunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`requestitem_isallowoverbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`requestitem_value` decimal(14, 0) NOT NULL DEFAULT 0, 
	`requestitem_budgetavailable` decimal(14, 0) NOT NULL DEFAULT 0, 
	`requestitem_qtyavailable` int(4) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`inquiry_id` varchar(30)  , 
	`inquirydetil_id` varchar(14)  , 
	`request_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`requestitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Request Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_requestitem` ADD KEY `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_requestitem` ADD KEY `item_id` (`item_id`);
ALTER TABLE `trn_requestitem` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `trn_requestitem` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_requestitem` ADD KEY `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_requestitem` ADD KEY `projbudgetdet_id` (`projbudgetdet_id`);
ALTER TABLE `trn_requestitem` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_requestitem` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_requestitem` ADD KEY `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_requestitem` ADD KEY `inquirydetil_id` (`inquirydetil_id`);
ALTER TABLE `trn_requestitem` ADD KEY `request_id` (`request_id`);

ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_item` FOREIGN KEY (`item_id`) REFERENCES `mst_item` (`item_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_projbudgetdet` FOREIGN KEY (`projbudgetdet_id`) REFERENCES `mst_projbudgetdet` (`projbudgetdet_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_trn_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_trn_inquirydetil` FOREIGN KEY (`inquirydetil_id`) REFERENCES `trn_inquirydetil` (`inquirydetil_id`);
ALTER TABLE `trn_requestitem` ADD CONSTRAINT `fk_trn_requestitem_trn_request` FOREIGN KEY (`request_id`) REFERENCES `trn_request` (`request_id`);





CREATE TABLE `trn_requestappr` (
	`requestappr_id` varchar(14) NOT NULL , 
	`requestappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`requestappr_by` varchar(14)  , 
	`requestappr_date` datetime  , 
	`request_version` int(4) NOT NULL DEFAULT 0, 
	`requestappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`requestappr_declinedby` varchar(14)  , 
	`requestappr_declineddate` datetime  , 
	`requestappr_notes` varchar(255)  , 
	`request_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `request_auth_id` (`request_id`, `auth_id`),
	PRIMARY KEY (`requestappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_requestappr` ADD KEY `request_id` (`request_id`);

ALTER TABLE `trn_requestappr` ADD CONSTRAINT `fk_trn_requestappr_trn_request` FOREIGN KEY (`request_id`) REFERENCES `trn_request` (`request_id`);





