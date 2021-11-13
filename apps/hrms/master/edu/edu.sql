CREATE TABLE `mst_edu` (
	`edu_id` varchar(7) NOT NULL , 
	`edu_name` varchar(30) NOT NULL , 
	`edu_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `edu_name` (`edu_name`),
	PRIMARY KEY (`edu_id`)
) 
ENGINE=InnoDB
COMMENT='Master Education';




INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('SD', 'SD', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('SMP', 'SMP / Sederajat', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('SMA', 'SMA / Sederajat', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('D1', 'Diploma 1', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('D3', 'Diploma 2', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('S1', 'Strata 1', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('S2', 'Starta 2', 'root', NOW());
INSERT INTO mst_edu (`edu_id`, `edu_name`, `_createby`, `_createdate`) VALUES ('S3', 'Starta 3', 'root', NOW());



