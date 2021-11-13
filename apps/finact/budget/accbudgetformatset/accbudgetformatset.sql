-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_accbudgetformatset`;
-- drop table if exists `mst_accbudgetformatsetitem`;


CREATE TABLE `mst_accbudgetformatset` (
	`accbudgetformatset_id` varchar(17) NOT NULL , 
	`accbudgetformatset_order` int(5) NOT NULL DEFAULT 0, 
	`accbudgetformatset_name` varchar(90)  , 
	`accbudgetformatset_descr` varchar(255)  , 
	`accbudgetformatset_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetformatset_isbold` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetformatset_isitalic` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetformatset_isunderline` tinyint(1) NOT NULL DEFAULT 0, 
	`accbudgetformatset_parent` varchar(17)  , 
	`accbudgetformatset_path` varchar(340) NOT NULL , 
	`accbudgetformatset_pathid` varchar(17) NOT NULL , 
	`accbudgetformatset_level` int(2) NOT NULL DEFAULT 0, 
	`accbudgetformat_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetformatset_name` (`accbudgetformatset_name`),
	UNIQUE KEY `accbudgetformatset_path` (`accbudgetformatset_path`, `accbudgetformatset_pathid`),
	PRIMARY KEY (`accbudgetformatset_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Setup Format Report Account Budget';

ALTER TABLE `mst_accbudgetformatset` ADD KEY `accbudgetformatset_parent` (`accbudgetformatset_parent`);
ALTER TABLE `mst_accbudgetformatset` ADD KEY `accbudgetformat_id` (`accbudgetformat_id`);

ALTER TABLE `mst_accbudgetformatset` ADD CONSTRAINT `fk_mst_accbudgetformatset_mst_accbudgetformatset` FOREIGN KEY (`accbudgetformatset_parent`) REFERENCES `mst_accbudgetformatset` (`accbudgetformatset_id`);
ALTER TABLE `mst_accbudgetformatset` ADD CONSTRAINT `fk_mst_accbudgetformatset_mst_accbudgetformat` FOREIGN KEY (`accbudgetformat_id`) REFERENCES `mst_accbudgetformat` (`accbudgetformat_id`);





CREATE TABLE `mst_accbudgetformatsetitem` (
	`accbudgetformatsetitem_id` varchar(14) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`accbudget_nameshort` varchar(255)  , 
	`accbudgetformat_id` varchar(10) NOT NULL , 
	`accbudgetformatset_id` varchar(17) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `accbudgetformatsetitem_pair` (`accbudgetformat_id`, `accbudget_id`),
	PRIMARY KEY (`accbudgetformatsetitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Setup Format Report Account Budget';

ALTER TABLE `mst_accbudgetformatsetitem` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_accbudgetformatsetitem` ADD KEY `accbudgetformat_id` (`accbudgetformat_id`);
ALTER TABLE `mst_accbudgetformatsetitem` ADD KEY `accbudgetformatset_id` (`accbudgetformatset_id`);

ALTER TABLE `mst_accbudgetformatsetitem` ADD CONSTRAINT `fk_mst_accbudgetformatsetitem_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_accbudgetformatsetitem` ADD CONSTRAINT `fk_mst_accbudgetformatsetitem_mst_accbudgetformat` FOREIGN KEY (`accbudgetformat_id`) REFERENCES `mst_accbudgetformat` (`accbudgetformat_id`);
ALTER TABLE `mst_accbudgetformatsetitem` ADD CONSTRAINT `fk_mst_accbudgetformatsetitem_mst_accbudgetformatset` FOREIGN KEY (`accbudgetformatset_id`) REFERENCES `mst_accbudgetformatset` (`accbudgetformatset_id`);





