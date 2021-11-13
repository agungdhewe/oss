CREATE TABLE `mst_deptbudget` (
	`deptbudget_id` varchar(35) NOT NULL , 
	`deptbudget_year` int(4) NOT NULL , 
	`deptbudget_notes` varchar(255)  , 
	`deptbudget_version` int(4) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`deptbudget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudget_commitby` varchar(14)  , 
	`deptbudget_commitdate` datetime  , 
	`deptbudget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudget_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudget_approveby` varchar(14)  , 
	`deptbudget_approvedate` datetime  , 
	`deptbudget_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudget_declineby` varchar(14)  , 
	`deptbudget_declinedate` datetime  , 
	`deptbudget_isveryfied` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudget_verifyby` varchar(14)  , 
	`deptbudget_verifydate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptbudget_year` (`deptbudget_year`, `dept_id`),
	PRIMARY KEY (`deptbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Budget Departemen';

ALTER TABLE `mst_deptbudget` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_deptbudget` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_deptbudget` ADD CONSTRAINT `fk_mst_deptbudget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_deptbudget` ADD CONSTRAINT `fk_mst_deptbudget_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_deptbudgetdet` (
	`deptbudgetdet_id` varchar(14) NOT NULL , 
	`deptbudgetdet_descr` varchar(255)  , 
	`deptbudgetdet_01` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_02` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_03` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_04` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_05` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_06` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_07` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_08` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_09` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_10` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_11` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_12` decimal(14, 0) NOT NULL DEFAULT 0, 
	`deptbudgetdet_total` decimal(14, 0) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20) NOT NULL , 
	`deptbudgetdet_notes` varchar(255)  , 
	`deptbudget_id` varchar(35) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptbudget_accbudget_id` (`deptbudget_id`, `accbudget_id`),
	PRIMARY KEY (`deptbudgetdet_id`)
) 
ENGINE=InnoDB
COMMENT='Detil budget department (per account bulanan)';

ALTER TABLE `mst_deptbudgetdet` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetdet` ADD KEY `deptbudget_id` (`deptbudget_id`);

ALTER TABLE `mst_deptbudgetdet` ADD CONSTRAINT `fk_mst_deptbudgetdet_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetdet` ADD CONSTRAINT `fk_mst_deptbudgetdet_mst_deptbudget` FOREIGN KEY (`deptbudget_id`) REFERENCES `mst_deptbudget` (`deptbudget_id`);





CREATE TABLE `mst_deptbudgetappr` (
	`deptbudgetappr_id` varchar(14) NOT NULL , 
	`deptbudgetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetappr_by` varchar(14)  , 
	`deptbudgetappr_date` datetime  , 
	`deptbudget_version` int(4) NOT NULL DEFAULT 0, 
	`deptbudgetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`deptbudgetappr_declinedby` varchar(14)  , 
	`deptbudgetappr_declineddate` datetime  , 
	`deptbudgetappr_notes` varchar(255)  , 
	`deptbudget_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `deptbudget_auth_id` (`deptbudget_id`, `auth_id`),
	PRIMARY KEY (`deptbudgetappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Budget Department';

ALTER TABLE `mst_deptbudgetappr` ADD KEY `deptbudget_id` (`deptbudget_id`);

ALTER TABLE `mst_deptbudgetappr` ADD CONSTRAINT `fk_mst_deptbudgetappr_mst_deptbudget` FOREIGN KEY (`deptbudget_id`) REFERENCES `mst_deptbudget` (`deptbudget_id`);





