CREATE TABLE `mst_projbudget` (
	`projbudget_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`projbudget_name` varchar(255) NOT NULL , 
	`projbudget_descr` varchar(255)  , 
	`projbudget_year` int(4) NOT NULL , 
	`projbudget_month` int(2) NOT NULL , 
	`projbudget_isinheritvisibility` tinyint(1) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`projbudget_notes` varchar(255)  , 
	`projbudget_version` int(4) NOT NULL DEFAULT 0, 
	`projbudget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudget_commitby` varchar(14)  , 
	`projbudget_commitdate` datetime  , 
	`projbudget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudget_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudget_approveby` varchar(14)  , 
	`projbudget_approvedate` datetime  , 
	`projbudget_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudget_declineby` varchar(14)  , 
	`projbudget_declinedate` datetime  , 
	`projbudget_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudget_closeby` varchar(14)  , 
	`projbudget_closedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projbudget_name` (`projbudget_name`),
	UNIQUE KEY `projbudget_year_month` (`projbudget_year`, `projbudget_month`, `project_id`),
	PRIMARY KEY (`projbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Data budget project bulanan';

ALTER TABLE `mst_projbudget` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_projbudget` ADD KEY `project_id` (`project_id`);
ALTER TABLE `mst_projbudget` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_projbudget` ADD CONSTRAINT `fk_mst_projbudget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_projbudget` ADD CONSTRAINT `fk_mst_projbudget_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `mst_projbudget` ADD CONSTRAINT `fk_mst_projbudget_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_projbudgetdet` (
	`projbudgetdet_id` varchar(14) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`alloc_dept_id` varchar(30) NOT NULL , 
	`projbudgetdet_descr` varchar(255)  , 
	`projbudgetdet_qty` int(6) NOT NULL DEFAULT 0, 
	`projbudgetdet_days` int(4) NOT NULL DEFAULT 0, 
	`projbudgetdet_task` int(4) NOT NULL DEFAULT 0, 
	`projbudgetdet_rate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetdet_value` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudgetdet_valueprop` decimal(14, 0) NOT NULL DEFAULT 0, 
	`projbudget_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projbudgetdet_pair` (`projbudget_id`, `accbudget_id`),
	PRIMARY KEY (`projbudgetdet_id`)
) 
ENGINE=InnoDB
COMMENT='Detil budget tahunan (per account bulanan)';

ALTER TABLE `mst_projbudgetdet` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_projbudgetdet` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `mst_projbudgetdet` ADD KEY `alloc_dept_id` (`alloc_dept_id`);

ALTER TABLE `mst_projbudgetdet` ADD CONSTRAINT `fk_mst_projbudgetdet_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_projbudgetdet` ADD CONSTRAINT `fk_mst_projbudgetdet_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `mst_projbudgetdet` ADD CONSTRAINT `fk_mst_projbudgetdet_mst_dept_alloc` FOREIGN KEY (`alloc_dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE `mst_projbudgettask` (
	`projbudgettask_id` varchar(14) NOT NULL , 
	`projecttask_id` varchar(14) NOT NULL , 
	`projecttask_notes` varchar(255)  , 
	`projbudget_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projbudgettask_pair` (`projbudget_id`, `projecttask_id`),
	PRIMARY KEY (`projbudgettask_id`)
) 
ENGINE=InnoDB
COMMENT='Detil task project yang di cover oleh budget ini';

ALTER TABLE `mst_projbudgettask` ADD KEY `projecttask_id` (`projecttask_id`);
ALTER TABLE `mst_projbudgettask` ADD KEY `projbudget_id` (`projbudget_id`);

ALTER TABLE `mst_projbudgettask` ADD CONSTRAINT `fk_mst_projbudgettask_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `mst_projbudgettask` ADD CONSTRAINT `fk_mst_projbudgettask_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);





CREATE TABLE `mst_projbudgetappr` (
	`projbudgetappr_id` varchar(14) NOT NULL , 
	`projbudgetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetappr_by` varchar(14)  , 
	`projbudgetappr_date` datetime  , 
	`projbudget_version` int(4) NOT NULL DEFAULT 0, 
	`projbudgetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`projbudgetappr_declinedby` varchar(14)  , 
	`projbudgetappr_declineddate` datetime  , 
	`projbudgetappr_notes` varchar(255)  , 
	`projbudget_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `projbudget_auth_id` (`projbudget_id`, `auth_id`),
	PRIMARY KEY (`projbudgetappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Budget Project';

ALTER TABLE `mst_projbudgetappr` ADD KEY `projbudget_id` (`projbudget_id`);

ALTER TABLE `mst_projbudgetappr` ADD CONSTRAINT `fk_mst_projbudgetappr_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);





