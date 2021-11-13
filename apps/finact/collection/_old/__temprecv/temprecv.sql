CREATE TABLE `trn_temprecv` (
	`temprecv_id` varchar(14) NOT NULL , 
	`temprecv_ref` varchar(30)  , 
	`temprecv_date` date NOT NULL , 
	`temprecv_descr` varchar(90) NOT NULL , 
	`temprecv_bgnum` varchar(90) NOT NULL , 
	`temprecv_isadvance` tinyint(1) NOT NULL DEFAULT 0, 
	`temprecv_validrtotal` decimal(14, 2) NOT NULL DEFAULT 0, 
	`temprecv_taxidrtotal` decimal(14, 2) NOT NULL DEFAULT 0, 
	`temprecv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`temprecv_commitby` varchar(14)  , 
	`temprecv_commitdate` datetime  , 
	`temprecv_isverify` tinyint(1) NOT NULL DEFAULT 0, 
	`temprecv_verifyby` varchar(14)  , 
	`temprecv_verifydate` datetime  , 
	`paymtype_id` varchar(10) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`jurnal_id_or` varchar(14)  , 
	`jurnal_id_tax` varchar(14)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`temprecv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_temprecv` ADD KEY `paymtype_id` (`paymtype_id`);
ALTER TABLE `trn_temprecv` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_temprecv` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_temprecv` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_temprecv` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_temprecv` ADD KEY `jurnal_id_or` (`jurnal_id_or`);
ALTER TABLE `trn_temprecv` ADD KEY `jurnal_id_tax` (`jurnal_id_tax`);
ALTER TABLE `trn_temprecv` ADD KEY `trxmodel_id` (`trxmodel_id`);

ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_paymtype` FOREIGN KEY (`paymtype_id`) REFERENCES `mst_paymtype` (`paymtype_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_jurnal` FOREIGN KEY (`jurnal_id_or`) REFERENCES `mst_jurnal` (`jurnal_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_jurnal_2` FOREIGN KEY (`jurnal_id_tax`) REFERENCES `mst_jurnal` (`jurnal_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);





CREATE TABLE `trn_temprecvdetil` (
	`temprecvdetil_id` varchar(14) NOT NULL , 
	`temprecvdetil_descr` varchar(90) NOT NULL , 
	`temprecvdetil_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`temprecvdetil_taxidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billout_id` varchar(14)  , 
	`coa_id_or` varchar(17) NOT NULL , 
	`coa_id_tax` varchar(17) NOT NULL , 
	`temprecv_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`temprecvdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_temprecvdetil` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_temprecvdetil` ADD KEY `coa_id_or` (`coa_id_or`);
ALTER TABLE `trn_temprecvdetil` ADD KEY `coa_id_tax` (`coa_id_tax`);
ALTER TABLE `trn_temprecvdetil` ADD KEY `temprecv_id` (`temprecv_id`);

ALTER TABLE `trn_temprecvdetil` ADD CONSTRAINT `fk_trn_temprecvdetil_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_temprecvdetil` ADD CONSTRAINT `fk_trn_temprecvdetil_mst_coa` FOREIGN KEY (`coa_id_or`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_temprecvdetil` ADD CONSTRAINT `fk_trn_temprecvdetil_mst_coa_2` FOREIGN KEY (`coa_id_tax`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_temprecvdetil` ADD CONSTRAINT `fk_trn_temprecvdetil_trn_temprecv` FOREIGN KEY (`temprecv_id`) REFERENCES `trn_temprecv` (`temprecv_id`);





