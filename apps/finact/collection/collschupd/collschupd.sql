-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_colltarget`;
-- drop table if exists `trn_colltargetbillout`;


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

ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE `trn_colltargetbillout` (
	`colltargetbillout_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`billout_id` varchar(14)  , 
	`colltargetbillout_datetarget` date NOT NULL , 
	`colltargetbillout_iscancel` tinyint(1) NOT NULL DEFAULT 0, 
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
	`ori_billout_datetarget` date NOT NULL , 
	`ori_billout_datedue` date NOT NULL , 
	`ori_billout_daystotarget` int(6) NOT NULL DEFAULT 0, 
	`ori_billout_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_ppn` decimal(5, 2) NOT NULL DEFAULT 0, 
	`ori_billout_ppnval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_pph` decimal(5, 2) NOT NULL DEFAULT 0, 
	`ori_billout_pphval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_idrnett` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0, 
	`ori_billout_discp` decimal(5, 2) NOT NULL DEFAULT 0, 
	`ori_billout_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`ori_billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltarget_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltargetbillout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bill dari collector';

ALTER TABLE `trn_colltargetbillout` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD KEY `colltarget_id` (`colltarget_id`);

ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_colltarget` FOREIGN KEY (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);





