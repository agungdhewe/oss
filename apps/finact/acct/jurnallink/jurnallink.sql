CREATE TABLE `trn_jurnal` (
	`jurnal_id` varchar(14) NOT NULL , 
	`jurnal_date` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`periodemo_id` varchar(6) NOT NULL , 
	`jurnal_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnal_isagingclose` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Jurnal';

ALTER TABLE `trn_jurnal` ADD KEY `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_jurnal` ADD CONSTRAINT `fk_trn_jurnal_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE `trn_jurnaldetil` (
	`jurnaldetil_id` varchar(14) NOT NULL , 
	`jurnaldetil_descr` varchar(255) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`jurnaldetil_valfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_valfrgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`jurnaldetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnaldetil_id_ref` varchar(14) NOT NULL , 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnaldetil` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `jurnaldetil_id_ref` (`jurnaldetil_id_ref`);
ALTER TABLE `trn_jurnaldetil` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnaldetil` FOREIGN KEY (`jurnaldetil_id_ref`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);
ALTER TABLE `trn_jurnaldetil` ADD CONSTRAINT `fk_trn_jurnaldetil_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





CREATE TABLE `trn_jurnalreferece` (
	`jurnalreferece_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnalreferece_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnalreferece` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnalreferece` ADD CONSTRAINT `fk_trn_jurnalreferece_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





CREATE TABLE `trn_jurnalresponse` (
	`jurnalresponse_id` varchar(14) NOT NULL , 
	`jurnal_ref` varchar(30)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_descr` varchar(255) NOT NULL , 
	`jurnal_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnal_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnalresponse_id`)
) 
ENGINE=InnoDB
COMMENT='Jurnal Detil';

ALTER TABLE `trn_jurnalresponse` ADD KEY `jurnal_id` (`jurnal_id`);

ALTER TABLE `trn_jurnalresponse` ADD CONSTRAINT `fk_trn_jurnalresponse_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);





