CREATE TABLE `trn_jurextap` (
	`jurnal_id` varchar(14) NOT NULL , 
	`billin_id` varchar(14)  ,  
	`ap_jurnaldetil_id` varchar(14) NULL , 
	PRIMARY KEY (`jurnal_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel Ekstensi Jurnal untuk keperluan AP';


ALTER TABLE `trn_jurextap` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurextap` ADD KEY `ap_jurnaldetil_id` (`ap_jurnaldetil_id`);

ALTER TABLE `trn_jurextap` ADD CONSTRAINT `fk_trn_jurextap_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);
ALTER TABLE `trn_jurextap` ADD CONSTRAINT `fk_trn_jurextap_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurextap` ADD CONSTRAINT `fk_trn_jurextap_mst_jurnaldetil` FOREIGN KEY (`ap_jurnaldetil_id`) REFERENCES `trn_jurnaldetil` (`jurnaldetil_id`);






CREATE TABLE `trn_jurextapdetil` (
	`jurnaldetil_id` varchar(14) NOT NULL ,
	`billin_id` varchar(14)  ,  
	`billindetil_id` varchar(14)  ,  
	`jurnal_id` varchar(14) NOT NULL ,  
	PRIMARY KEY (`jurnaldetil_id`)
) 
ENGINE=InnoDB
COMMENT='Tabel Ekstensi Jurnal untuk keperluan AP';

ALTER TABLE `trn_jurextapdetil` ADD KEY `billin_id` (`billin_id`);
ALTER TABLE `trn_jurextapdetil` ADD KEY `billindetil_id` (`billindetil_id`);
ALTER TABLE `trn_jurextapdetil` ADD KEY `jurnal_id` (`jurnal_id`);


ALTER TABLE `trn_jurextapdetil` ADD CONSTRAINT `fk_trn_jurextapdetil_trn_billin` FOREIGN KEY (`billin_id`) REFERENCES `trn_billin` (`billin_id`);
ALTER TABLE `trn_jurextapdetil` ADD CONSTRAINT `fk_trn_jurextapdetil_trn_billindetil` FOREIGN KEY (`billindetil_id`) REFERENCES `trn_billindetil` (`billindetil_id`);
ALTER TABLE `trn_jurextapdetil` ADD CONSTRAINT `fk_trn_jurextapdetil_trn_jurnal` FOREIGN KEY (`jurnal_id`) REFERENCES `trn_jurnal` (`jurnal_id`);


