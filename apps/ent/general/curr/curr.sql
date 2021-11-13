CREATE TABLE `mst_curr` (
	`curr_id` varchar(10) NOT NULL , 
	`curr_name` varchar(60) NOT NULL , 
	`curr_descr` varchar(90) NOT NULL , 
	`curr_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `curr_name` (`curr_name`),
	PRIMARY KEY (`curr_id`)
) 
ENGINE=InnoDB
COMMENT='Master Currency';







CREATE TABLE `mst_currrate` (
	`currrate_id` varchar(14) NOT NULL , 
	`currrate_date` date NOT NULL , 
	`currrate_value` decimal(6, 0) NOT NULL DEFAULT 0, 
	`curr_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `currrate_date` (`curr_id`, `currrate_date`),
	PRIMARY KEY (`currrate_id`)
) 
ENGINE=InnoDB
COMMENT='Rate Currency historical';

ALTER TABLE `mst_currrate` ADD KEY `curr_id` (`curr_id`);

ALTER TABLE `mst_currrate` ADD CONSTRAINT `fk_mst_currrate_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);





