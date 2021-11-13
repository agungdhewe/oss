-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemclass`;
-- drop table if exists `mst_itemclassaccbudget`;


CREATE TABLE `mst_itemclass` (
	`itemclass_id` varchar(14) NOT NULL , 
	`itemclass_name` varchar(30) NOT NULL , 
	`itemclass_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isadvproces` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_descr` varchar(90)  , 
	`itemmodel_id` varchar(10) NOT NULL , 
	`itemclassgroup_id` varchar(15) NOT NULL , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`maintainer_dept_id` varchar(30) NOT NULL , 
	`unitmeasurement_id` varchar(10) NOT NULL , 
	`itemmanage_id` varchar(2) NOT NULL , 
	`itemclass_minassetvalue` decimal(11, 2) NOT NULL DEFAULT 0, 
	`inquiry_accbudget_id` varchar(20) NOT NULL , 
	`settl_coa_id` varchar(17) NOT NULL , 
	`cost_coa_id` varchar(17)  , 
	`depremodel_id` varchar(10)  , 
	`itemclass_depreage` int(2) NOT NULL DEFAULT 5, 
	`itemclass_depreresidu` decimal(11, 2) NOT NULL DEFAULT 1, 
	`itemclass_isallowoverqty` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowoverdays` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowovertask` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowovervalue` tinyint(1) NOT NULL DEFAULT 0, 
	`itemclass_isallowunbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemclass_name` (`itemclass_name`),
	PRIMARY KEY (`itemclass_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Klasifikasi Item';

ALTER TABLE `mst_itemclass` ADD KEY `itemmodel_id` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD KEY `itemclassgroup_id` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD KEY `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `mst_itemclass` ADD KEY `maintainer_dept_id` (`maintainer_dept_id`);
ALTER TABLE `mst_itemclass` ADD KEY `unitmeasurement_id` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD KEY `inquiry_accbudget_id` (`inquiry_accbudget_id`);
ALTER TABLE `mst_itemclass` ADD KEY `settl_coa_id` (`settl_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY `cost_coa_id` (`cost_coa_id`);
ALTER TABLE `mst_itemclass` ADD KEY `depremodel_id` (`depremodel_id`);

ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmodel` FOREIGN KEY (`itemmodel_id`) REFERENCES `mst_itemmodel` (`itemmodel_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemclassgroup` FOREIGN KEY (`itemclassgroup_id`) REFERENCES `mst_itemclassgroup` (`itemclassgroup_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_dept` FOREIGN KEY (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_dept_2` FOREIGN KEY (`maintainer_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_unitmeasurement` FOREIGN KEY (`unitmeasurement_id`) REFERENCES `mst_unitmeasurement` (`unitmeasurement_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_accbudget` FOREIGN KEY (`inquiry_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa` FOREIGN KEY (`settl_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_coa_2` FOREIGN KEY (`cost_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclass` ADD CONSTRAINT `fk_mst_itemclass_mst_depremodel` FOREIGN KEY (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);





CREATE TABLE `mst_itemclassaccbudget` (
	`itemclassaccbudget_id` varchar(14) NOT NULL , 
	`projectmodel_id` varchar(10)  , 
	`inquiry_accbudget_id` varchar(20) NOT NULL , 
	`settl_coa_id` varchar(17) NOT NULL , 
	`itemclass_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemclassaccbudget_pair` (`itemclass_id`, `projecttype_id`),
	PRIMARY KEY (`itemclassaccbudget_id`)
) 
ENGINE=InnoDB
COMMENT='Account yang direlasikan ke itemclass ini';

ALTER TABLE `mst_itemclassaccbudget` ADD KEY `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY `inquiry_accbudget_id` (`inquiry_accbudget_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY `settl_coa_id` (`settl_coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD KEY `itemclass_id` (`itemclass_id`);

ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_projectmodel` FOREIGN KEY (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_accbudget` FOREIGN KEY (`inquiry_accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_coa` FOREIGN KEY (`settl_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_itemclassaccbudget` ADD CONSTRAINT `fk_mst_itemclassaccbudget_mst_itemclass` FOREIGN KEY (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);





