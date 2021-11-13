-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_collsource`;


CREATE TABLE `mst_collsource` (
	`collsource_id` varchar(10) NOT NULL , 
	`collsource_name` varchar(30) NOT NULL , 
	`collsource_descr` varchar(255)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `collsource_name` (`collsource_name`),
	PRIMARY KEY (`collsource_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Source';




INSERT INTO mst_collsource (`collsource_id`, `collsource_name`, `_createby`, `_createdate`) VALUES ('DNE', 'Dana Effektif', 'root', NOW());
INSERT INTO mst_collsource (`collsource_id`, `collsource_name`, `_createby`, `_createdate`) VALUES ('PPH', 'PPH', 'root', NOW());
INSERT INTO mst_collsource (`collsource_id`, `collsource_name`, `_createby`, `_createdate`) VALUES ('BAR', 'BARTER/OFFSET', 'root', NOW());



