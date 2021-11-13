CREATE TABLE `trn_temprecv` (
	`temprecv_id` varchar(14) NOT NULL , 
	`temprecv_ref` varchar(30)  , 
	`temprecv_date` date NOT NULL , 
	`temprecv_descr` varchar(90) NOT NULL , 
	`temprecv_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`temprecv_commitby` varchar(14)  , 
	`temprecv_commitdate` datetime  , 
	`temprecv_validr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`temprecv_taxidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`temprecv_bgnum` varchar(90) NOT NULL , 
	`billout_id` varchar(14)  , 
	`partner_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`temprecv_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `trn_temprecv` ADD KEY `billout_id` (`billout_id`);
ALTER TABLE `trn_temprecv` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_temprecv` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_trn_billout` FOREIGN KEY (`billout_id`) REFERENCES `trn_billout` (`billout_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_temprecv` ADD CONSTRAINT `fk_trn_temprecv_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





