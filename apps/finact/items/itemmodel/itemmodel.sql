-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_itemmodel`;


CREATE TABLE `mst_itemmodel` (
	`itemmodel_id` varchar(10) NOT NULL , 
	`itemmodel_name` varchar(90) NOT NULL , 
	`itemmodel_descr` varchar(255)  , 
	`itemmodel_isintangible` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_issellable` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmodel_isnonitem` tinyint(1) NOT NULL DEFAULT 0, 
	`itemmanage_id` varchar(2) NOT NULL , 
	`dept_id` varchar(30)  , 
	`depremodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemmodel_name` (`itemmodel_name`),
	PRIMARY KEY (`itemmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Item';

ALTER TABLE `mst_itemmodel` ADD KEY `itemmanage_id` (`itemmanage_id`);
ALTER TABLE `mst_itemmodel` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_itemmodel` ADD KEY `depremodel_id` (`depremodel_id`);

ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_itemmanage` FOREIGN KEY (`itemmanage_id`) REFERENCES `mst_itemmanage` (`itemmanage_id`);
ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_itemmodel` ADD CONSTRAINT `fk_mst_itemmodel_mst_depremodel` FOREIGN KEY (`depremodel_id`) REFERENCES `mst_depremodel` (`depremodel_id`);





