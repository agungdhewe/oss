-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_colltarget`;
-- drop table if exists `trn_colltargetbillout`;
-- drop table if exists `trn_colltargetappr`;


CREATE TABLE `trn_colltarget` (
	`colltarget_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`empl_id` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`colltarget_discprop` decimal(5, 2) NOT NULL DEFAULT 0, 
	`colltarget_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltarget_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltarget_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltarget_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30) NOT NULL , 
	`colltarget_version` int(4) NOT NULL DEFAULT 0, 
	`colltarget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`colltarget_commitby` varchar(14)  , 
	`colltarget_commitdate` datetime  , 
	`colltarget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0, 
	`colltarget_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`colltarget_approveby` varchar(14)  , 
	`colltarget_approvedate` datetime  , 
	`colltarget_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`colltarget_declineby` varchar(14)  , 
	`colltarget_declinedate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `colltarget_emplperiodemo` (`periodemo_id`, `empl_id`),
	PRIMARY KEY (`colltarget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Target Collector bulanan';

ALTER TABLE `trn_colltarget` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_colltarget` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_colltarget` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_colltarget` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_colltargetbillout` (
	`colltargetbillout_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL ,
	`billout_id` varchar(14)  , 
	`colltargetbillout_datetarget` date NOT NULL , 
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
	`billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltargetbillout_notes` varchar(90) NOT NULL , 
	`colltarget_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltargetbillout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bill dari collector';

ALTER TABLE `trn_colltargetbillout` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY `colltarget_id` (`colltarget_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_colltarget` FOREIGN KEY (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





CREATE TABLE `trn_colltargetappr` (
	`colltargetappr_id` varchar(14) NOT NULL , 
	`colltargetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0, 
	`colltargetappr_by` varchar(14)  , 
	`colltargetappr_date` datetime  , 
	`colltarget_version` int(4) NOT NULL DEFAULT 0, 
	`colltargetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0, 
	`colltargetappr_declinedby` varchar(14)  , 
	`colltargetappr_declineddate` datetime  , 
	`colltargetappr_notes` varchar(255)  , 
	`colltarget_id` varchar(30) NOT NULL , 
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
	UNIQUE KEY `colltarget_auth_id` (`colltarget_id`, `auth_id`),
	PRIMARY KEY (`colltargetappr_id`)
) 
ENGINE=InnoDB
COMMENT='Approval Collector Target';

ALTER TABLE `trn_colltargetappr` ADD KEY `colltarget_id` (`colltarget_id`);

ALTER TABLE `trn_colltargetappr` ADD CONSTRAINT `fk_trn_colltargetappr_trn_colltarget` FOREIGN KEY (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);





