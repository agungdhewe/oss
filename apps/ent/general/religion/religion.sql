CREATE TABLE `mst_religion` (
	`religion_id` varchar(3) NOT NULL , 
	`religion_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `religion_name` (`religion_name`),
	PRIMARY KEY (`religion_id`)
) 
ENGINE=InnoDB
COMMENT='Master Religion';




INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R01', 'ISLAM', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R02', 'KRISTEN', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R03', 'KATHOLIK', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R04', 'HINDU', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R05', 'BUDHA', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R06', 'KONGHUCHU', 'root', NOW());
INSERT INTO mst_religion (`religion_id`, `religion_name`, `_createby`, `_createdate`) VALUES ('R07', 'KEPERCAYAAN TERHADAP TUHAN YME', 'root', NOW());



