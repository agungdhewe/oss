CREATE TABLE `mst_corpbudget` (
	`corpbudget_id` varchar(4) NOT NULL , 
	`corpbudget_year` int(4) NOT NULL , 
	`corpbudget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudget_commitby` varchar(14)  , 
	`corpbudget_commitdate` datetime  , 
	`corpbudget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudget_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudget_approveby` varchar(14)  , 
	`corpbudget_approvedate` datetime  , 
	`corpbudget_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudget_declineby` varchar(14)  , 
	`corpbudget_declinedate` datetime  , 
	`corpbudget_notes` varchar(255)  , 
	`corpbudget_version` int(4) NOT NULL DEFAULT 0, 
	`dept_id` varchar(30) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `corpbudget_year` (`corpbudget_year`),
	PRIMARY KEY (`corpbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Dokumen';

ALTER TABLE `mst_corpbudget` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_corpbudget` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_corpbudget` ADD CONSTRAINT `fk_mst_corpbudget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_corpbudget` ADD CONSTRAINT `fk_mst_corpbudget_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `mst_corpbudgetdet` (
	`corpbudgetdet_id` varchar(14) NOT NULL , 
	`corpbudgetdet_descr` varchar(255)  , 
	`corpbudgetdet_01` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_02` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_03` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_04` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_05` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_06` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_07` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_08` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_09` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_10` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_11` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_12` decimal(14, 0) NOT NULL DEFAULT 0, 
	`corpbudgetdet_total` decimal(14, 0) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20) NOT NULL , 
	`corpbudgetdet_notes` varchar(255)  , 
	`corpbudget_id` varchar(4) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `corpbudget_accbudget_id` (`corpbudget_id`, `accbudget_id`),
	PRIMARY KEY (`corpbudgetdet_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Detil Coporate Budget.';

ALTER TABLE `mst_corpbudgetdet` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_corpbudgetdet` ADD KEY `corpbudget_id` (`corpbudget_id`);

ALTER TABLE `mst_corpbudgetdet` ADD CONSTRAINT `fk_mst_corpbudgetdet_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_corpbudgetdet` ADD CONSTRAINT `fk_mst_corpbudgetdet_mst_corpbudget` FOREIGN KEY (`corpbudget_id`) REFERENCES `mst_corpbudget` (`corpbudget_id`);





CREATE TABLE `mst_corpbudgetappr` (
	`corpbudgetappr_id` varchar(14) NOT NULL , 
	`corpbudgetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudgetappr_by` varchar(14)  , 
	`corpbudgetappr_date` datetime  , 
	`corpbudget_version` int(4) NOT NULL DEFAULT 0, 
	`corpbudgetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`corpbudgetappr_declinedby` varchar(14)  , 
	`corpbudgetappr_declineddate` datetime  , 
	`corpbudgetappr_notes` varchar(255)  , 
	`corpbudget_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `corpbudget_auth_id` (`corpbudget_id`, `auth_id`),
	PRIMARY KEY (`corpbudgetappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Corp Budget';

ALTER TABLE `mst_corpbudgetappr` ADD KEY `corpbudget_id` (`corpbudget_id`);

ALTER TABLE `mst_corpbudgetappr` ADD CONSTRAINT `fk_mst_corpbudgetappr_mst_corpbudget` FOREIGN KEY (`corpbudget_id`) REFERENCES `mst_corpbudget` (`corpbudget_id`);





