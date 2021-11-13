-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_checkval`;
-- drop table if exists `mst_checkvalopt`;


CREATE TABLE `mst_checkval` (
	`checkval_id` varchar(14) NOT NULL , 
	`checkval_caption` varchar(60) NOT NULL , 
	`checktype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `checkval_caption` (`checkval_caption`),
	PRIMARY KEY (`checkval_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Checklist Value';

ALTER TABLE `mst_checkval` ADD KEY `checktype_id` (`checktype_id`);

ALTER TABLE `mst_checkval` ADD CONSTRAINT `fk_mst_checkval_mst_checktype` FOREIGN KEY (`checktype_id`) REFERENCES `mst_checktype` (`checktype_id`);





CREATE TABLE `mst_checkvalopt` (
	`checkvalopt_id` varchar(14) NOT NULL , 
	`checkvalopt_caption` varchar(14) NOT NULL , 
	`checkvalopt_value` varchar(30) NOT NULL , 
	`checkvalopt_bgcolor` varchar(30) NOT NULL , 
	`checkval_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`checkvalopt_id`)
) 
ENGINE=InnoDB
COMMENT='Checklist Value Detail';

ALTER TABLE `mst_checkvalopt` ADD KEY `checkval_id` (`checkval_id`);

ALTER TABLE `mst_checkvalopt` ADD CONSTRAINT `fk_mst_checkvalopt_mst_checkval` FOREIGN KEY (`checkval_id`) REFERENCES `mst_checkval` (`checkval_id`);





