-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_checktpl`;
-- drop table if exists `mst_checktplitem`;


CREATE TABLE `mst_checktpl` (
	`checktpl_id` varchar(14) NOT NULL , 
	`checktpl_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `checktpl_name` (`checktpl_name`),
	PRIMARY KEY (`checktpl_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Template Checklist';







CREATE TABLE `mst_checktplitem` (
	`checktplitem_id` varchar(14) NOT NULL , 
	`checkval_id` varchar(14) NOT NULL , 
	`checktplitem_caption` varchar(30) NOT NULL , 
	`checkvalitem_order` int(4) NOT NULL DEFAULT 0, 
	`checktpl_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `checktpl_pair` (`checkval_id`, `checktpl_id`),
	PRIMARY KEY (`checktplitem_id`)
) 
ENGINE=InnoDB
COMMENT='Checklist Value Detail';

ALTER TABLE `mst_checktplitem` ADD KEY `checkval_id` (`checkval_id`);
ALTER TABLE `mst_checktplitem` ADD KEY `checktpl_id` (`checktpl_id`);

ALTER TABLE `mst_checktplitem` ADD CONSTRAINT `fk_mst_checktplitem_mst_checkval` FOREIGN KEY (`checkval_id`) REFERENCES `mst_checkval` (`checkval_id`);
ALTER TABLE `mst_checktplitem` ADD CONSTRAINT `fk_mst_checktplitem_mst_checktpl` FOREIGN KEY (`checktpl_id`) REFERENCES `mst_checktpl` (`checktpl_id`);





