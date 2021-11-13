CREATE TABLE `trn_cashdiscount` (
	`cashdiscount_id` varchar(14) NOT NULL , 
	`billout_id` varchar(14)  , 
	`partner_id` varchar(30) NOT NULL , 
	`cashdiscount_ref` varchar(30)  , 
	`cashdiscount_date` date NOT NULL , 
	`cashdiscount_descr` varchar(90) NOT NULL , 
	`cashdiscount_percent` decimal(4, 2) NOT NULL DEFAULT 0, 
	`cashdiscount_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`cashdiscount_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscount_commitby` varchar(14)  , 
	`cashdiscount_commitdate` datetime  , 
	`cashdiscount_version` int(4) NOT NULL DEFAULT 0, 
	`cashdiscount_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscount_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscount_approveby` varchar(14)  , 
	`cashdiscount_approvedate` datetime  , 
	`cashdiscount_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscount_declineby` varchar(14)  , 
	`cashdiscount_declinedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`cashdiscount_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Cash Discount';

ALTER TABLE `trn_cashdiscount` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_cashdiscount` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_cashdiscount` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_cashdiscount` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_cashdiscount` ADD CONSTRAINT `fk_trn_cashdiscount_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_cashdiscount` ADD CONSTRAINT `fk_trn_cashdiscount_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_cashdiscount` ADD CONSTRAINT `fk_trn_cashdiscount_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_cashdiscount` ADD CONSTRAINT `fk_trn_cashdiscount_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_cashdiscountappr` (
	`cashdiscountappr_id` varchar(14) NOT NULL , 
	`cashdiscountappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscountappr_by` varchar(14)  , 
	`cashdiscountappr_date` datetime  , 
	`cashdiscount_version` int(4) NOT NULL DEFAULT 0, 
	`cashdiscountappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`cashdiscountappr_declinedby` varchar(14)  , 
	`cashdiscountappr_declineddate` datetime  , 
	`cashdiscountappr_notes` varchar(255)  , 
	`cashdiscount_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `cashdiscount_auth_id` (`cashdiscount_id`, `auth_id`),
	PRIMARY KEY (`cashdiscountappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_cashdiscountappr` ADD KEY `cashdiscount_id` (`cashdiscount_id`);

ALTER TABLE `trn_cashdiscountappr` ADD CONSTRAINT `fk_trn_cashdiscountappr_trn_cashdiscount` FOREIGN KEY (`cashdiscount_id`) REFERENCES `trn_cashdiscount` (`cashdiscount_id`);





