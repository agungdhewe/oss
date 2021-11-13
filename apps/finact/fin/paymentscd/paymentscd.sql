-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_billinpaym`;


CREATE TABLE `trn_billinpaym` (
	`billinpaym_id` varchar(14) NOT NULL , 
	`billin_id` varchar(14) NOT NULL , 
	`billinpaym_date` date NOT NULL , 
	`billinpaym_descr` varchar(255) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`billinpaym_frgrate` decimal(14, 0) NOT NULL DEFAULT 0, 
	`billinpaym_itemfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_itemidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_ppnidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphfrg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`billinpaym_pphidr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billinpaym_id`)
) 
ENGINE=InnoDB
COMMENT='Jadwal pembayaran tagihan';

ALTER TABLE `trn_billinpaym` ADD KEY `curr_id` (`curr_id`);

ALTER TABLE `trn_billinpaym` ADD CONSTRAINT `fk_trn_billinpaym_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);





