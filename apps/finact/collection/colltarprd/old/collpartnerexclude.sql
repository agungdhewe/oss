-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_colltarprd`;
-- drop table if exists `mst_colltarprdpartnerexc`;


CREATE TABLE `mst_colltarprd` (
	`colltarprd_id` varchar(14) NOT NULL , 
	`periodemo_id` varchar(6)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltarprd_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Target Periode';

ALTER TABLE `mst_colltarprd` ADD KEY `periodemo_id` (`periodemo_id`);

ALTER TABLE `mst_colltarprd` ADD CONSTRAINT `fk_mst_colltarprd_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE `mst_colltarprdpartnerexc` (
	`colltarprdpartnerexc_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`colltarprd_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`colltarprdpartnerexc_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tanda Terima Sementara';

ALTER TABLE `mst_colltarprdpartnerexc` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `mst_colltarprdpartnerexc` ADD KEY `colltarprd_id` (`colltarprd_id`);

ALTER TABLE `mst_colltarprdpartnerexc` ADD CONSTRAINT `fk_mst_colltarprdpartnerexc_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_colltarprdpartnerexc` ADD CONSTRAINT `fk_mst_colltarprdpartnerexc_mst_colltarprd` FOREIGN KEY (`colltarprd_id`) REFERENCES `mst_colltarprd` (`colltarprd_id`);





