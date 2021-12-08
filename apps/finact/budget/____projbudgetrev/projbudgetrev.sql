CREATE TABLE `mst_projbudgetrev` (
	`projbudgetrev_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`projbudget_id` varchar(30) NOT NULL , 
	`projbudgetrev_descr` varchar(255) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`projbudget_year` int(4) NOT NULL , 
	`projbudget_month` int(2) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`projbudgetrev_notes` varchar(255)  , 
	`projbudgetrev_version` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrev_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrev_commitby` varchar(14)  , 
	`projbudgetrev_commitdate` datetime  , 
	`projbudgetrev_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrev_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrev_approveby` varchar(14)  , 
	`projbudgetrev_approvedate` datetime  , 
	`projbudgetrev_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrev_declineby` varchar(14)  , 
	`projbudgetrev_declinedate` datetime  , 
	`projbudgetrev_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrev_closeby` varchar(14)  , 
	`projbudgetrev_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`projbudgetrev_id`)
) 
ENGINE=InnoDB
COMMENT='Data revisi budget project bulanan';

ALTER TABLE `mst_projbudgetrev` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_projbudgetrev` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `mst_projbudgetrev` ADD KEY `project_id` (`project_id`);
ALTER TABLE `mst_projbudgetrev` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_projbudgetrev` ADD CONSTRAINT `fk_mst_projbudgetrev_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_projbudgetrev` ADD CONSTRAINT `fk_mst_projbudgetrev_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `mst_projbudgetrev` ADD CONSTRAINT `fk_mst_projbudgetrev_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `mst_projbudgetrev` ADD CONSTRAINT `fk_mst_projbudgetrev_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_projbudgetrevdet` (
	`projbudgetrevdet_id` varchar(14) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`projbudgetrevdet_descr` varchar(255)  , 
	`projbudgetrevdet_qty` int(6) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_days` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_task` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_rate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_value` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_qty_prev` int(6) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_days_prev` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_task_prev` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_rate_prev` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_value_prev` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_rate_variance` decimal(4, 2) NOT NULL DEFAULT 0, 
	`projbudgetrevdet_value_variance` decimal(4, 2) NOT NULL DEFAULT 0, 
	`projbudgetrev_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projbudgetrevdet_pair` (`projbudgetrev_id`, `accbudget_id`),
	PRIMARY KEY (`projbudgetrevdet_id`)
) 
ENGINE=InnoDB
COMMENT='Detil budget tahunan (per account bulanan)';

ALTER TABLE `mst_projbudgetrevdet` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_projbudgetrevdet` ADD KEY `projbudgetrev_id` (`projbudgetrev_id`);

ALTER TABLE `mst_projbudgetrevdet` ADD CONSTRAINT `fk_mst_projbudgetrevdet_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_projbudgetrevdet` ADD CONSTRAINT `fk_mst_projbudgetrevdet_mst_projbudgetrev` FOREIGN KEY (`projbudgetrev_id`) REFERENCES `mst_projbudgetrev` (`projbudgetrev_id`);





CREATE TABLE `mst_projbudgetrevappr` (
	`projbudgetrevappr_id` varchar(14) NOT NULL , 
	`projbudgetrevappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrevappr_by` varchar(14)  , 
	`projbudgetrevappr_date` datetime  , 
	`projbudgetrev_version` int(4) NOT NULL DEFAULT 0, 
	`projbudgetrevappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetrevappr_declinedby` varchar(14)  , 
	`projbudgetrevappr_declineddate` datetime  , 
	`projbudgetrevappr_notes` varchar(255)  , 
	`projbudgetrev_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `projbudgetrev_auth_id` (`projbudgetrev_id`, `auth_id`),
	PRIMARY KEY (`projbudgetrevappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Budget Project Revisi';

ALTER TABLE `mst_projbudgetrevappr` ADD KEY `projbudgetrev_id` (`projbudgetrev_id`);

ALTER TABLE `mst_projbudgetrevappr` ADD CONSTRAINT `fk_mst_projbudgetrevappr_mst_projbudgetrev` FOREIGN KEY (`projbudgetrev_id`) REFERENCES `mst_projbudgetrev` (`projbudgetrev_id`);





