-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_collaccmtn`;
-- drop table if exists `trn_collaccmtndet`;


CREATE TABLE `trn_collaccmtn` (
	`collaccmtn_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`collaccmtn_date` date NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30) NOT NULL , 
	`partnercontact_id` varchar(14)  , 
	`partnercontact_upname` varchar(90) NOT NULL , 
	`partnercontact_position` varchar(90) NOT NULL , 
	`partnercontact_upphone` varchar(90) NOT NULL , 
	`partnercontact_email` varchar(90) NOT NULL , 
	`collfuptype_id` varchar(10) NOT NULL , 
	`collaccmtn_descr` varchar(255) NOT NULL , 
	`collaccmtn_notes` varchar(255)  , 
	`collaccmtn_response` varchar(255)  , 
	`collaccmtn_nextactdate` date NOT NULL , 
	`collaccmtn_nextactnotes` varchar(255)  , 
	`collaccmtn_version` int(4) NOT NULL DEFAULT 0, 
	`collaccmtn_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`collaccmtn_commitby` varchar(14)  , 
	`collaccmtn_commitdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`collaccmtn_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_collaccmtn` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_collaccmtn` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_collaccmtn` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_collaccmtn` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_collaccmtn` ADD KEY `partnercontact_id` (`partnercontact_id`);
ALTER TABLE `trn_collaccmtn` ADD KEY `collfuptype_id` (`collfuptype_id`);

ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_partnercontact` FOREIGN KEY (`partnercontact_id`) REFERENCES `mst_partnercontact` (`partnercontact_id`);
ALTER TABLE `trn_collaccmtn` ADD CONSTRAINT `fk_trn_collaccmtn_mst_collfuptype` FOREIGN KEY (`collfuptype_id`) REFERENCES `mst_collfuptype` (`collfuptype_id`);





CREATE TABLE `trn_collaccmtndet` (
	`collaccmtndet_id` varchar(14) NOT NULL , 
	`billout_id` varchar(14)  , 
	`billout_datedue` date NOT NULL , 
	`billout_daystotarget` int(6) NOT NULL DEFAULT 0, 
	`billout_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_ppn` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_ppnval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_pph` decimal(5, 2) NOT NULL DEFAULT 0, 
	`billout_pphval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrnett` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_discval` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`collaccmtndet_notes` varchar(255)  , 
	`collaccmtn_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`collaccmtndet_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_collaccmtndet` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_collaccmtndet` ADD KEY `collaccmtn_id` (`collaccmtn_id`);

ALTER TABLE `trn_collaccmtndet` ADD CONSTRAINT `fk_trn_collaccmtndet_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_collaccmtndet` ADD CONSTRAINT `fk_trn_collaccmtndet_trn_collaccmtn` FOREIGN KEY (`collaccmtn_id`) REFERENCES `trn_collaccmtn` (`collaccmtn_id`);





