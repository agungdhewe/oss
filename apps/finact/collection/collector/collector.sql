CREATE TABLE `mst_collector` (
	`collector_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`collector_name` varchar(60) NOT NULL , 
	`collector_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `empl_id` (`empl_id`),
	PRIMARY KEY (`collector_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Collector';

ALTER TABLE `mst_collector` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_collector` ADD CONSTRAINT `fk_mst_collector_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





CREATE TABLE `mst_collectorpartner` (
	`collectorparner_id` varchar(14) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`collector_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partner_id` (`partner_id`),
	PRIMARY KEY (`collectorparner_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Bill dari collector';

ALTER TABLE `mst_collectorpartner` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `mst_collectorpartner` ADD KEY `collector_id` (`collector_id`);

ALTER TABLE `mst_collectorpartner` ADD CONSTRAINT `fk_mst_collectorpartner_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `mst_collectorpartner` ADD CONSTRAINT `fk_mst_collectorpartner_mst_collector` FOREIGN KEY (`collector_id`) REFERENCES `mst_collector` (`collector_id`);





