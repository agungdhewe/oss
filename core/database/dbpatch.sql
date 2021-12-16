-- patch 2021 12 15
-- trn_medialogproofitem
ALTER TABLE `trn_medialogproofitem` ADD KEY if not exists `billoutpreprocess_id` (`billoutpreprocess_id`);
ALTER TABLE `trn_medialogproofitem` ADD CONSTRAINT `fk_trn_medialogproofitem_mst_billoutpreprocess` FOREIGN KEY  if not exists (`billoutpreprocess_id`) REFERENCES `mst_billoutpreprocess` (`billoutpreprocess_id`);

alter table `trn_medialogproofitem` add column if not exists `projbudget_id` varchar(30)   AFTER `brand_id`;
alter table `trn_medialogproofitem` add column if not exists `projbudgettask_id` varchar(14)   AFTER `projbudget_id`;
ALTER TABLE `trn_medialogproofitem` ADD KEY if not exists `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_medialogproofitem` ADD KEY if not exists `projbudgettask_id` (`projbudgettask_id`);
ALTER TABLE `trn_medialogproofitem` ADD CONSTRAINT `fk_trn_medialogproofitem_mst_projbudget` FOREIGN KEY  if not exists (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_medialogproofitem` ADD CONSTRAINT `fk_trn_medialogproofitem_mst_projbudgettask` FOREIGN KEY  if not exists (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);







