-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_colltemprecv`;
-- drop table if exists `trn_colltemprecvdetil`;


CREATE TABLE `trn_colltemprecv` (
	`colltemprecv_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`colltemprecv_date` date NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30)  , 
	`partner_id` varchar(30) NOT NULL , 
	`colltemprecv_descr` varchar(90) NOT NULL , 
	`collsource_id` varchar(10) NOT NULL , 
	`paymtype_id` varchar(10)  , 
	`coa_id` varchar(17)  , 
	`colltemprecv_isadvance` tinyint(1) NOT NULL DEFAULT 0, 
	`colltemprecv_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`colltarget_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0, 
	`doc_id` varchar(30)  , 
	`colltemprecv_version` int(4) NOT NULL DEFAULT 0, 
	`colltemprecv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`colltemprecv_commitby` varchar(14)  , 
	`colltemprecv_commitdate` datetime  , 
	`colltemprecv_isverified` tinyint(1) NOT NULL DEFAULT 0, 
	`colltemprecv_verifyby` varchar(14)  , 
	`colltemprecv_verifydate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltemprecv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_colltemprecv` ADD KEY `periodemo_id` (`periodemo_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `collsource_id` (`collsource_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_colltemprecv` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_collsource` FOREIGN KEY (`collsource_id`) REFERENCES `mst_collsource` (`collsource_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_paymtype` FOREIGN KEY (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE `trn_colltemprecvdetil` (
	`colltemprecvdetil_id` varchar(14) NOT NULL , 
	`billout_id` varchar(14)  , 
	`billout_datedue` date NOT NULL , 
	`billout_daystotarget` int(6) NOT NULL DEFAULT 0, 
	`billout_idr` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billout_discmax` decimal(14, 0) NOT NULL DEFAULT 0, 
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
	`colltemprecv_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltemprecvdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_colltemprecvdetil` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_colltemprecvdetil` ADD KEY `colltemprecv_id` (`colltemprecv_id`);

ALTER TABLE `trn_colltemprecvdetil` ADD CONSTRAINT `fk_trn_colltemprecvdetil_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_colltemprecvdetil` ADD CONSTRAINT `fk_trn_colltemprecvdetil_trn_colltemprecv` FOREIGN KEY (`colltemprecv_id`) REFERENCES `trn_colltemprecv` (`colltemprecv_id`);





