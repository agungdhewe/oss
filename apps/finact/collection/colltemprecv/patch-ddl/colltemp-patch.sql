alter table `trn_colltemprecv` add column if not exists `paym_bankname` varchar(90)  AFTER `paymtype_id`;
alter table `trn_colltemprecv` add column if not exists `paym_bgnum` varchar(90)  AFTER `paym_bankname`;
alter table `trn_colltemprecv` add column if not exists `paym_bgdatedue` date AFTER `paym_bgnum`;
alter table `trn_colltemprecv` add column if not exists `paym_bgdate` date AFTER `paym_bgdatedue`;





alter table `trn_colltemprecv` add column if not exists `billout_pphtopay` decimal(14, 0) NOT NULL DEFAULT 0 AFTER `billout_ppntopay`;




alter table `trn_colltemprecv` add column if not exists `bankrekening_id` varchar(20)  AFTER `paymtype_id`;
ALTER TABLE `trn_colltemprecv` ADD KEY if not exists `bankrekening_id` (`bankrekening_id`);
ALTER TABLE `trn_colltemprecv` ADD CONSTRAINT `fk_trn_colltemprecv_mst_bankrekening` FOREIGN KEY  if not exists (`bankrekening_id`) REFERENCES `mst_bankrekening` (`bankrekening_id`);








