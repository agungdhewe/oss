-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coaformatset`;
-- drop table if exists `mst_coaformatsetitem`;


CREATE TABLE `mst_coaformatset` (
	`coaformatset_id` varchar(17) NOT NULL , 
	`coaformatset_order` int(5) NOT NULL DEFAULT 0, 
	`coaformatset_name` varchar(90)  , 
	`coaformatset_descr` varchar(255)  , 
	`coaformatset_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`coaformatset_parent` varchar(17)  , 
	`coaformatset_path` varchar(340) NOT NULL , 
	`coaformatset_pathid` varchar(17) NOT NULL , 
	`coaformatset_level` int(2) NOT NULL DEFAULT 0, 
	`coaformat_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coaformatset_name` (`coaformatset_name`),
	UNIQUE KEY `coaformatset_path` (`coaformatset_path`, `coaformatset_pathid`),
	PRIMARY KEY (`coaformatset_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Setup Format Report Account Budget';

ALTER TABLE `mst_coaformatset` ADD KEY `coaformatset_parent` (`coaformatset_parent`);
ALTER TABLE `mst_coaformatset` ADD KEY `coaformat_id` (`coaformat_id`);

ALTER TABLE `mst_coaformatset` ADD CONSTRAINT `fk_mst_coaformatset_mst_coaformatset` FOREIGN KEY (`coaformatset_parent`) REFERENCES `mst_coaformatset` (`coaformatset_id`);
ALTER TABLE `mst_coaformatset` ADD CONSTRAINT `fk_mst_coaformatset_mst_coaformat` FOREIGN KEY (`coaformat_id`) REFERENCES `mst_coaformat` (`coaformat_id`);





CREATE TABLE `mst_coaformatsetitem` (
	`coaformatsetitem_id` varchar(14) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`coa_nameshort` varchar(255)  , 
	`coaformat_id` varchar(10) NOT NULL , 
	`coaformatset_id` varchar(17) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coaformatsetitem_pair` (`coaformat_id`, `coa_id`),
	PRIMARY KEY (`coaformatsetitem_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Setup Format Report Account Budget';

ALTER TABLE `mst_coaformatsetitem` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `mst_coaformatsetitem` ADD KEY `coaformat_id` (`coaformat_id`);
ALTER TABLE `mst_coaformatsetitem` ADD KEY `coaformatset_id` (`coaformatset_id`);

ALTER TABLE `mst_coaformatsetitem` ADD CONSTRAINT `fk_mst_coaformatsetitem_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_coaformatsetitem` ADD CONSTRAINT `fk_mst_coaformatsetitem_mst_coaformat` FOREIGN KEY (`coaformat_id`) REFERENCES `mst_coaformat` (`coaformat_id`);
ALTER TABLE `mst_coaformatsetitem` ADD CONSTRAINT `fk_mst_coaformatsetitem_mst_coaformatset` FOREIGN KEY (`coaformatset_id`) REFERENCES `mst_coaformatset` (`coaformatset_id`);





