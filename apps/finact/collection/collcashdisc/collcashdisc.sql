-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_collcashdisc`;
-- drop table if exists `trn_collcashdiscbillout`;
-- drop table if exists `trn_collcashdiscappr`;


CREATE TABLE `trn_collcashdisc` (
	`collcashdisc_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`collcashdisc_date` date NOT NULL , 
	`empl_id` varchar(30)  , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`collcashdisc_descr` varchar(90) NOT NULL , 
	`collcashdisc_discprop` decimal(5, 2) NOT NULL DEFAULT 0, 
	`collcashdisc_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`collcashdisc_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`collcashdisc_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`collcashdisc_version` int(4) NOT NULL DEFAULT 0, 
	`collcashdisc_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdisc_commitby` varchar(14)  , 
	`collcashdisc_commitdate` datetime  , 
	`collcashdisc_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdisc_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdisc_approveby` varchar(14)  , 
	`collcashdisc_approvedate` datetime  , 
	`collcashdisc_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdisc_declineby` varchar(14)  , 
	`collcashdisc_declinedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`collcashdisc_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Cash Discount';

ALTER TABLE `trn_collcashdisc` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_collcashdisc` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_collcashdisc` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_collcashdisc` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_collcashdisc` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_collcashdisc` ADD CONSTRAINT `fk_trn_collcashdisc_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_collcashdisc` ADD CONSTRAINT `fk_trn_collcashdisc_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_collcashdisc` ADD CONSTRAINT `fk_trn_collcashdisc_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_collcashdisc` ADD CONSTRAINT `fk_trn_collcashdisc_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_collcashdisc` ADD CONSTRAINT `fk_trn_collcashdisc_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_collcashdiscbillout` (
	`collcashdiscbillout_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`billout_id` varchar(14)  , 
	`billout_datedue` date NOT NULL , 
	`billout_daystotarget` int(6) NOT NULL DEFAULT 0, 
	`billout_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_ppn` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_ppnval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_pph` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_pphval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrnett` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_discp` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`collcashdiscbillout_notes` varchar(90) NOT NULL , 
	`collcashdisc_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`collcashdiscbillout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bill dari collector';

ALTER TABLE `trn_collcashdiscbillout` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_collcashdiscbillout` ADD KEY `collcashdisc_id` (`collcashdisc_id`);
ALTER TABLE `trn_collcashdiscbillout` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `trn_collcashdiscbillout` ADD CONSTRAINT `fk_trn_collcashdiscbillout_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_collcashdiscbillout` ADD CONSTRAINT `fk_trn_collcashdiscbillout_trn_collcashdisc` FOREIGN KEY (`collcashdisc_id`) REFERENCES `trn_collcashdisc` (`collcashdisc_id`);
ALTER TABLE `trn_collcashdiscbillout` ADD CONSTRAINT `fk_trn_collcashdiscbillout_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





CREATE TABLE `trn_collcashdiscappr` (
	`collcashdiscappr_id` varchar(14) NOT NULL , 
	`collcashdiscappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdiscappr_by` varchar(14)  , 
	`collcashdiscappr_date` datetime  , 
	`collcashdisc_version` int(4) NOT NULL DEFAULT 0, 
	`collcashdiscappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`collcashdiscappr_declinedby` varchar(14)  , 
	`collcashdiscappr_declineddate` datetime  , 
	`collcashdiscappr_notes` varchar(255)  , 
	`collcashdisc_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `collcashdisc_auth_id` (`collcashdisc_id`, `auth_id`),
	PRIMARY KEY (`collcashdiscappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval undefined';

ALTER TABLE `trn_collcashdiscappr` ADD KEY `collcashdisc_id` (`collcashdisc_id`);

ALTER TABLE `trn_collcashdiscappr` ADD CONSTRAINT `fk_trn_collcashdiscappr_trn_collcashdisc` FOREIGN KEY (`collcashdisc_id`) REFERENCES `trn_collcashdisc` (`collcashdisc_id`);





