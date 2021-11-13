alter table `mst_partnertype` add column if not exists `itemclass_id` varchar(14)  AFTER `partnertype_isdisabled`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `itemclass_id` (`itemclass_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_itemclass` FOREIGN KEY  if not exists (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);


alter table `mst_partnertype` add column if not exists `partnercategory_id` varchar(10)  AFTER `partnertype_isdisabled`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `partnercategory_id` (`partnercategory_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_partnercategory` FOREIGN KEY  if not exists (`partnercategory_id`) REFERENCES `mst_partnercategory` (`partnercategory_id`);


alter table `mst_inquirytypepartnertype` modify column if exists `itemclass_id` varchar(14) NOT NULL; 
alter table `mst_inquirytypepartnertype` drop constraint if exists `fk_mst_inquirytypepartnertype_mst_itemclass`; 
alter table `mst_inquirytypepartnertype` drop column if exists `itemclass_id`; 




-- 20210926

alter table `mst_partnertype` add column if not exists `unbill_coa_id` varchar(14)  AFTER `itemclass_id`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `unbill_coa_id` (`unbill_coa_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_coa_unbill` FOREIGN KEY  if not exists (`unbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);


alter table `mst_partnertype` add column if not exists `payable_coa_id` varchar(14)  AFTER `unbill_coa_id`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `payable_coa_id` (`payable_coa_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_coa_payable` FOREIGN KEY  if not exists (`payable_coa_id`) REFERENCES `mst_coa` (`coa_id`);




-- 20211014
alter table `mst_partnertype` add column if not exists `unbill_accbudget_id` varchar(20)  AFTER `itemclass_id`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `unbill_accbudget_id` (`unbill_accbudget_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_accbudget_unbill` FOREIGN KEY  if not exists (`unbill_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);

alter table `mst_partnertype` add column if not exists `payable_accbudget_id` varchar(20)  AFTER `unbill_coa_id`;
ALTER TABLE `mst_partnertype` ADD KEY if not exists `payable_accbudget_id` (`payable_accbudget_id`);
ALTER TABLE `mst_partnertype` ADD CONSTRAINT `fk_mst_partnertype_mst_accbudget_payable` FOREIGN KEY  if not exists (`payable_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);















