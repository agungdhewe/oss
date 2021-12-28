-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_colltarget`;
-- drop table if exists `trn_colltargetbillout`;
-- drop table if exists `trn_colltargetappr`;


CREATE TABLE IF NOT EXISTS `trn_colltarget` (
	`colltarget_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`empl_id` varchar(30)  , 
	`dept_id` varchar(30)  , 
	`colltarget_discprop` decimal(5, 2) NOT NULL DEFAULT 0, 
	`colltarget_idr` decimal(16, 0) NOT NULL DEFAULT 0, 
	`colltarget_discval` decimal(16, 0) NOT NULL DEFAULT 0, 
	`colltarget_idrtopay` decimal(16, 0) NOT NULL DEFAULT 0, 
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


ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `periodemo_id` varchar(6)   AFTER `colltarget_id`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `empl_id` varchar(30)   AFTER `periodemo_id`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `empl_id`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_discprop` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_idr` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_discprop`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_idr`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_idrtopay` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_discval`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `colltarget_idrtopay`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_version`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_commitby` varchar(14)   AFTER `colltarget_iscommit`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_commitdate` datetime   AFTER `colltarget_commitby`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_commitdate`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_isapprovalprogress`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_approveby` varchar(14)   AFTER `colltarget_isapproved`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_approvedate` datetime   AFTER `colltarget_approveby`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_approvedate`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_declineby` varchar(14)   AFTER `colltarget_isdeclined`;
ALTER TABLE `trn_colltarget` ADD COLUMN IF NOT EXISTS  `colltarget_declinedate` datetime   AFTER `colltarget_declineby`;


ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `periodemo_id` varchar(6)   AFTER `colltarget_id`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `empl_id` varchar(30)   AFTER `periodemo_id`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)   AFTER `empl_id`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_discprop` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_idr` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_discprop`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_discval` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_idr`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_idrtopay` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltarget_discval`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `colltarget_idrtopay`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_version`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_commitby` varchar(14)   AFTER `colltarget_iscommit`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_commitdate` datetime   AFTER `colltarget_commitby`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_isapprovalprogress` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_commitdate`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_isapprovalprogress`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_approveby` varchar(14)   AFTER `colltarget_isapproved`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_approvedate` datetime   AFTER `colltarget_approveby`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_approvedate`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_declineby` varchar(14)   AFTER `colltarget_isdeclined`;
ALTER TABLE `trn_colltarget` MODIFY COLUMN IF EXISTS  `colltarget_declinedate` datetime   AFTER `colltarget_declineby`;


ALTER TABLE `trn_colltarget` ADD CONSTRAINT `colltarget_emplperiodemo` UNIQUE IF NOT EXISTS  (`periodemo_id`, `empl_id`);

ALTER TABLE `trn_colltarget` ADD KEY IF NOT EXISTS `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_colltarget` ADD KEY IF NOT EXISTS `empl_id` (`empl_id`);
ALTER TABLE `trn_colltarget` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_colltarget` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_periodemo` FOREIGN KEY IF NOT EXISTS  (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_empl` FOREIGN KEY IF NOT EXISTS  (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_colltargetbillout` (
	`colltargetbillout_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`billout_id` varchar(14)  , 
	`billout_isunreference` tinyint(1) NOT NULL DEFAULT 0, 
	`colltargetbillout_datetarget` date NOT NULL , 
	`colltargetbillout_notes` varchar(90) NOT NULL , 
	`billout_idr` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_discp` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_datedue` date NOT NULL , 
	`billout_daystotarget` int(6) NOT NULL DEFAULT 0, 
	`billout_totalitem` int(5) NOT NULL DEFAULT 0, 
	`billout_totalqty` int(5) NOT NULL DEFAULT 0, 
	`billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_discount` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_pph` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_nett` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_total` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_dp` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_paid` decimal(16, 0) NOT NULL DEFAULT 0, 
	`colltarget_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltargetbillout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bill dari collector';


ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `colltargetbillout_id`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_isunreference` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_id`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `colltargetbillout_datetarget` date NOT NULL  AFTER `billout_isunreference`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `colltargetbillout_notes` varchar(90) NOT NULL  AFTER `colltargetbillout_datetarget`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_idr` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltargetbillout_notes`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_idr`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_discp` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `billout_isdiscvalue`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_discval` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_discp`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_discval`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_idrtopay`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_ppntopay`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_datedue` date NOT NULL  AFTER `billout_idrtotal`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_daystotarget` int(6) NOT NULL DEFAULT 0 AFTER `billout_datedue`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `billout_daystotarget`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billout_totalitem`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totalqty`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_salesgross`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_discount`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_subtotal`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_pph`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_nett`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_ppn`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_total`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totaladdcost`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_dp`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `billout_paid` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_payment`;
ALTER TABLE `trn_colltargetbillout` ADD COLUMN IF NOT EXISTS  `colltarget_id` varchar(14) NOT NULL  AFTER `billout_paid`;


ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `colltargetbillout_id`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_id` varchar(14)   AFTER `partner_id`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_isunreference` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_id`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `colltargetbillout_datetarget` date NOT NULL  AFTER `billout_isunreference`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `colltargetbillout_notes` varchar(90) NOT NULL  AFTER `colltargetbillout_datetarget`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_idr` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `colltargetbillout_notes`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_idr`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_discp` decimal(5, 2) NOT NULL DEFAULT 0 AFTER `billout_isdiscvalue`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_discval` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_discp`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_discval`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_idrtopay`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_ppntopay`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_datedue` date NOT NULL  AFTER `billout_idrtotal`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_daystotarget` int(6) NOT NULL DEFAULT 0 AFTER `billout_datedue`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `billout_daystotarget`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billout_totalitem`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totalqty`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_salesgross`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_discount`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_subtotal`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_pph`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_nett`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_ppn`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_total`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totaladdcost`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_dp`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `billout_paid` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_payment`;
ALTER TABLE `trn_colltargetbillout` MODIFY COLUMN IF EXISTS  `colltarget_id` varchar(14) NOT NULL  AFTER `billout_paid`;



ALTER TABLE `trn_colltargetbillout` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY IF NOT EXISTS `billout_id` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY IF NOT EXISTS `colltarget_id` (`colltarget_id`);

ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_billout` FOREIGN KEY IF NOT EXISTS  (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_colltarget` FOREIGN KEY IF NOT EXISTS (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);





CREATE TABLE IF NOT EXISTS `trn_colltargetappr` (
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


ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltargetappr_id`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_by` varchar(14)   AFTER `colltargetappr_isapproved`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_date` datetime   AFTER `colltargetappr_by`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltarget_version` int(4) NOT NULL DEFAULT 0 AFTER `colltargetappr_date`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_version`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_declinedby` varchar(14)   AFTER `colltargetappr_isdeclined`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_declineddate` datetime   AFTER `colltargetappr_declinedby`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltargetappr_notes` varchar(255)   AFTER `colltargetappr_declineddate`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `colltarget_id` varchar(30) NOT NULL  AFTER `colltargetappr_notes`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `docauth_descr` varchar(90)   AFTER `colltarget_id`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_colltargetappr` ADD COLUMN IF NOT EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_isapproved` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltargetappr_id`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_by` varchar(14)   AFTER `colltargetappr_isapproved`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_date` datetime   AFTER `colltargetappr_by`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltarget_version` int(4) NOT NULL DEFAULT 0 AFTER `colltargetappr_date`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_isdeclined` tinyint(1) NOT NULL DEFAULT 0 AFTER `colltarget_version`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_declinedby` varchar(14)   AFTER `colltargetappr_isdeclined`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_declineddate` datetime   AFTER `colltargetappr_declinedby`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltargetappr_notes` varchar(255)   AFTER `colltargetappr_declineddate`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `colltarget_id` varchar(30) NOT NULL  AFTER `colltargetappr_notes`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `docauth_descr` varchar(90)   AFTER `colltarget_id`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `docauth_order` int(4) NOT NULL DEFAULT 0 AFTER `docauth_descr`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `docauth_value` int(4) NOT NULL DEFAULT 100 AFTER `docauth_order`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `docauth_min` int(4) NOT NULL DEFAULT 0 AFTER `docauth_value`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `authlevel_id` varchar(10) NOT NULL  AFTER `docauth_min`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `authlevel_name` varchar(60) NOT NULL  AFTER `authlevel_id`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `auth_id` varchar(10)   AFTER `authlevel_name`;
ALTER TABLE `trn_colltargetappr` MODIFY COLUMN IF EXISTS  `auth_name` varchar(60) NOT NULL  AFTER `auth_id`;


ALTER TABLE `trn_colltargetappr` ADD CONSTRAINT `colltarget_auth_id` UNIQUE IF NOT EXISTS  (`colltarget_id`, `auth_id`);

ALTER TABLE `trn_colltargetappr` ADD KEY IF NOT EXISTS `colltarget_id` (`colltarget_id`);

ALTER TABLE `trn_colltargetappr` ADD CONSTRAINT `fk_trn_colltargetappr_trn_colltarget` FOREIGN KEY IF NOT EXISTS (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);





