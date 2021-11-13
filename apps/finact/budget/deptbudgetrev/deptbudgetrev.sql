CREATE TABLE `mst_deptbudgetrev` (
	`deptbudgetrev_id` varchar(35) NOT NULL , 
	`deptbudgetrev_year` int(4) NOT NULL , 
	`deptbudgetrev_month` int(2) NOT NULL , 
	`deptbudgetrev_descr` varchar(255) NOT NULL , 
	`deptbudgetrev_notes` varchar(255)  , 
	`deptbudgetrev_version` int(4) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`deptbudgetrev_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrev_commitby` varchar(14)  , 
	`deptbudgetrev_commitdate` datetime  , 
	`deptbudgetrev_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrev_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrev_approveby` varchar(14)  , 
	`deptbudgetrev_approvedate` datetime  , 
	`deptbudgetrev_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrev_declineby` varchar(14)  , 
	`deptbudgetrev_declinedate` datetime  , 
	`deptbudgetrev_isveryfied` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrev_verifyby` varchar(14)  , 
	`deptbudgetrev_verifydate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`deptbudgetrev_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Budget Departemen';

ALTER TABLE `mst_deptbudgetrev` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_deptbudgetrev` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_deptbudgetrev` ADD CONSTRAINT `fk_mst_deptbudgetrev_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_deptbudgetrev` ADD CONSTRAINT `fk_mst_deptbudgetrev_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_deptbudgetrevdet` (
	`deptbudgetrevdet_id` varchar(14) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`deptbudgetrevdet_descr` varchar(255)  , 
	`deptbudgetrevdet_prev` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetrevdet_value` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetrevdet_variance` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetrevdet_notes` varchar(255)  , 
	`deptbudgetrev_id` varchar(35) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptbudgetrev_accbudget_id` (`deptbudgetrev_id`, `accbudget_id`),
	PRIMARY KEY (`deptbudgetrevdet_id`)
) 
ENGINE=InnoDB
COMMENT='Detil revisi budget department ';

ALTER TABLE `mst_deptbudgetrevdet` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetrevdet` ADD KEY `deptbudgetrev_id` (`deptbudgetrev_id`);

ALTER TABLE `mst_deptbudgetrevdet` ADD CONSTRAINT `fk_mst_deptbudgetrevdet_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetrevdet` ADD CONSTRAINT `fk_mst_deptbudgetrevdet_mst_deptbudgetrev` FOREIGN KEY (`deptbudgetrev_id`) REFERENCES `mst_deptbudgetrev` (`deptbudgetrev_id`);





CREATE TABLE `mst_deptbudgetrevappr` (
	`deptbudgetrevappr_id` varchar(14) NOT NULL , 
	`deptbudgetrevappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrevappr_by` varchar(14)  , 
	`deptbudgetrevappr_date` datetime  , 
	`deptbudgetrev_version` int(4) NOT NULL DEFAULT 0, 
	`deptbudgetrevappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetrevappr_declinedby` varchar(14)  , 
	`deptbudgetrevappr_declineddate` datetime  , 
	`deptbudgetrevappr_notes` varchar(255)  , 
	`deptbudgetrev_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `deptbudgetrev_auth_id` (`deptbudgetrev_id`, `auth_id`),
	PRIMARY KEY (`deptbudgetrevappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Budget Department Revisi';

ALTER TABLE `mst_deptbudgetrevappr` ADD KEY `deptbudgetrev_id` (`deptbudgetrev_id`);

ALTER TABLE `mst_deptbudgetrevappr` ADD CONSTRAINT `fk_mst_deptbudgetrevappr_mst_deptbudgetrev` FOREIGN KEY (`deptbudgetrev_id`) REFERENCES `mst_deptbudgetrev` (`deptbudgetrev_id`);





