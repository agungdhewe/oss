-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_finbudget`;
-- drop table if exists `mst_finbudgetdet`;
-- drop table if exists `mst_finbudgetappr`;


CREATE TABLE `mst_finbudget` (
	`finbudget_id` varchar(4) NOT NULL , 
	`finbudget_year` int(4) NOT NULL , 
	`finbudget_notes` varchar(255)  , 
	`dept_id` varchar(30) NOT NULL , 
	`finbudget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudget_commitby` varchar(14)  , 
	`finbudget_commitdate` datetime  , 
	`finbudget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudget_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudget_approveby` varchar(14)  , 
	`finbudget_approvedate` datetime  , 
	`finbudget_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudget_declineby` varchar(14)  , 
	`finbudget_declinedate` datetime  , 
	`finbudget_version` int(4) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `finbudget_year` (`finbudget_year`),
	PRIMARY KEY (`finbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Dokumen';

ALTER TABLE `mst_finbudget` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_finbudget` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_finbudget` ADD CONSTRAINT `fk_mst_finbudget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_finbudget` ADD CONSTRAINT `fk_mst_finbudget_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_finbudgetdet` (
	`finbudgetdet_id` varchar(14) NOT NULL , 
	`accfin_id` varchar(20) NOT NULL , 
	`finbudgetdet_descr` varchar(255)  , 
	`finbudgetdet_01` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_02` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_03` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_04` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_05` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_06` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_07` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_08` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_09` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_10` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_11` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_12` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_total` decimal(14, 0) NOT NULL DEFAULT 0, 
	`finbudgetdet_notes` varchar(255)  , 
	`finbudget_id` varchar(4) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `finbudget_accfin_id` (`finbudget_id`, `accfin_id`),
	PRIMARY KEY (`finbudgetdet_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Detil Coporate Budget.';

ALTER TABLE `mst_finbudgetdet` ADD KEY `accfin_id` (`accfin_id`);
ALTER TABLE `mst_finbudgetdet` ADD KEY `finbudget_id` (`finbudget_id`);

ALTER TABLE `mst_finbudgetdet` ADD CONSTRAINT `fk_mst_finbudgetdet_mst_accfin` FOREIGN KEY (`accfin_id`) REFERENCES `mst_accfin` (`accfin_id`);
ALTER TABLE `mst_finbudgetdet` ADD CONSTRAINT `fk_mst_finbudgetdet_mst_finbudget` FOREIGN KEY (`finbudget_id`) REFERENCES `mst_finbudget` (`finbudget_id`);





CREATE TABLE `mst_finbudgetappr` (
	`finbudgetappr_id` varchar(14) NOT NULL , 
	`finbudgetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudgetappr_by` varchar(14)  , 
	`finbudgetappr_date` datetime  , 
	`finbudget_version` int(4) NOT NULL DEFAULT 0, 
	`finbudgetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`finbudgetappr_declinedby` varchar(14)  , 
	`finbudgetappr_declineddate` datetime  , 
	`finbudgetappr_notes` varchar(255)  , 
	`finbudget_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `finbudget_auth_id` (`finbudget_id`, `auth_id`),
	PRIMARY KEY (`finbudgetappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Finance Budget';

ALTER TABLE `mst_finbudgetappr` ADD KEY `finbudget_id` (`finbudget_id`);

ALTER TABLE `mst_finbudgetappr` ADD CONSTRAINT `fk_mst_finbudgetappr_mst_finbudget` FOREIGN KEY (`finbudget_id`) REFERENCES `mst_finbudget` (`finbudget_id`);





