alter table `mst_itemclass` drop foreign key if exists `fk_mst_itemclass_mst_accbudget`;
alter table `mst_itemclass` drop foreign key if exists `fk_mst_itemclass_mst_coa_cost`;
alter table `mst_itemclass` drop foreign key if exists `fk_mst_itemclass_mst_coa_recv`;


alter table `mst_itemclass` MODIFY column if exists `itemclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0 AFTER `itemclass_name`;
alter table `mst_itemclass` MODIFY column if exists `itemclass_descr` varchar(90) AFTER `itemclass_isdisabled`;
alter table `mst_itemclass` MODIFY column if exists `itemmodel_id` varchar(10) NOT NULL after `itemclass_descr`;
alter table `mst_itemclass` MODIFY column if exists `itemclassgroup_id` varchar(15) NULL after `itemmodel_id`;
alter table `mst_itemclass` MODIFY column if exists `dept_id`  varchar(30) NOT NULL after `itemclassgroup_id`;
alter table `mst_itemclass` modify column if exists `unitmeasurement_id` varchar(10) NULL after `dept_id`;
alter table `mst_itemclass` modify column if exists `itemmanage_id`  varchar(2) NOT NULL after `unitmeasurement_id`;
alter table `mst_itemclass` modify column if exists `itemclass_minassetvalue` decimal(11, 2) NOT NULL DEFAULT 0 after `itemmanage_id`; 
alter table `mst_itemclass` change column if exists `accbudget_id` `inquiry_accbudget_id` varchar(20) NOT NULL after `itemclass_minassetvalue`;
alter table `mst_itemclass` change column if exists `cost_coa_id` `settl_coa_id` varchar(17) NOT NULL after `inquiry_accbudget_id`;
alter table `mst_itemclass` add column if not exists `depre_coa_id` varchar(17) after `settl_coa_id`;
alter table `mst_itemclass` modify column if exists `depre_coa_id` varchar(17) after `settl_coa_id`;
alter table `mst_itemclass` modify column if exists `depremodel_id` varchar(10)  after `depre_coa_id`;
alter table `mst_itemclass` modify column if exists	`itemclass_depreage` int(2) NOT NULL DEFAULT 5 after `depremodel_id` ;
alter table `mst_itemclass` modify column if exists	`itemclass_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1 after `itemclass_depreage`;
alter table `mst_itemclass` drop column if exists	`recv_coa_id`;
-- 	


ALTER TABLE `mst_itemclass` ADD KEY if not exists `itemmodel_id` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `itemclassgroup_id` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `dept_id` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `unitmeasurement_id` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `inquiry_accbudget_id` (`inquiry_accbudget_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `settl_coa_id` (`settl_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `depre_coa_id` (`depre_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY if not exists `depremodel_id` (`depremodel_id`);


ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmodel` FOREIGN KEY if not exists  (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemclassgroup` FOREIGN KEY if not exists  (`itemclassgroup_id`) REFERENCES `mst_itemclassgroup` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_dept` FOREIGN KEY if not exists  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_unitmeasurement` FOREIGN KEY if not exists  (`unitmeasurement_id`) REFERENCES `mst_unitmeasurement` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmanage` FOREIGN KEY if not exists  (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_accbudget` FOREIGN KEY if not exists  (`inquiry_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa` FOREIGN KEY if not exists  (`settl_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa_2` FOREIGN KEY if not exists  (`depre_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_depremodel` FOREIGN KEY if not exists  (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);



alter table `mst_itemclass` drop foreign key if exists `fk_mst_itemclass_mst_coa_2`;
alter table `mst_itemclass` change column if exists `depre_coa_id` `cost_coa_id` varchar(17)  after `settl_coa_id`;
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa_cost` FOREIGN KEY if not exists  (`cost_coa_id`) REFERENCES `mst_coa` (`coa_id`);


alter table `mst_itemclassaccbudget` drop foreign key if exists `fk_mst_itemclassaccbudget_mst_projecttype`;
alter table `mst_itemclassaccbudget` change column if exists `projecttype_id` `projectmodel_id` varchar(10) NOT NULL after `itemclassaccbudget_id`;
ALTER TABLE `mst_itemclassaccbudget` ADD KEY if not exists `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_projectmodel` FOREIGN KEY if not exists  (`projectmodel_id`) REFERENCES `mst_project` (`projectmodel_id`);








alter table `mst_itemclass` add column if not exists `itemclass_isadvproces` tinyint(1) not null default 0 AFTER `itemclass_isdisabled`;

