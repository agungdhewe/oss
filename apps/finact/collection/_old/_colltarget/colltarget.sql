CREATE TABLE `trn_colltarget` (
	`colltarget_id` varchar(14) NOT NULL , 
	`colltarget_date` date NOT NULL , 
	`colltarget_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`colltarget_commitby` varchar(14)  , 
	`colltarget_commitdate` datetime  , 
	`partner_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `colltarget_date` (`colltarget_date`, `partner_id`),
	PRIMARY KEY (`colltarget_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Target Collector bulanan';

ALTER TABLE `trn_colltarget` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_colltarget` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_colltarget` ADD CONSTRAINT `fk_trn_colltarget_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





CREATE TABLE `trn_colltargetbillout` (
	`colltargetbillout_id` varchar(14) NOT NULL , 
	`colltargetbillout_notes` varchar(90) NOT NULL , 
	`billout_id` varchar(14)  , 
	`billouttotal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
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

ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_colltargetbillout` ADD CONSTRAINT `fk_trn_colltargetbillout_trn_colltarget` FOREIGN KEY (`colltarget_id`) REFERENCES `trn_colltarget` (`colltarget_id`);





