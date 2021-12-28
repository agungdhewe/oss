



alter table `trn_colltargetbillout` add column if not exists `colltargetbillout_iscancel` tinyint(1) NOT NULL DEFAULT 0 after `colltargetbillout_datetarget`; 

alter table `trn_colltargetbillout` add column if not exists `ori_billout_datetarget` date NULL after `billout_ppntopay`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_datedue` date NULL  after `ori_billout_datetarget`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_daystotarget` int(6) NOT NULL DEFAULT 0 after `ori_billout_datedue`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_idr` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_daystotarget`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_ppn` decimal(5, 2) NOT NULL DEFAULT 0 after `ori_billout_idr`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_ppnval` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_ppn`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_pph` decimal(5, 2) NOT NULL DEFAULT 0 after `ori_billout_ppnval`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_pphval` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_pph`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_idrnett` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_pphval`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_isdiscvalue` tinyint(1) NOT NULL DEFAULT 0 after `ori_billout_idrnett`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_discp` decimal(5, 2) NOT NULL DEFAULT 0 after `ori_billout_isdiscvalue`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_discval` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_discp`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_idrtotal` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_discval`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_idrtopay` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_idrtotal`;
alter table `trn_colltargetbillout` add column if not exists `ori_billout_ppntopay` decimal(14, 0) NOT NULL DEFAULT 0 after `ori_billout_idrtopay`;