CREATE TABLE `mst_crmmsgsentiment` (
	`crmmsgsentiment_id` varchar(5) NOT NULL , 
	`crmmsgsentiment_name` varchar(60) NOT NULL , 
	`crmmsgsentiment_value` int(4) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmmsgsentiment_name` (`crmmsgsentiment_name`),
	PRIMARY KEY (`crmmsgsentiment_id`)
) 
ENGINE=InnoDB
COMMENT='Penggolongan sentiment message';




INSERT INTO mst_crmmsgsentiment (`crmmsgsentiment_id`, `crmmsgsentiment_name`, `crmmsgsentiment_value`, `_createby`, `_createdate`) VALUES ('NEU', 'NEUTRAL', '0', 'root', NOW());
INSERT INTO mst_crmmsgsentiment (`crmmsgsentiment_id`, `crmmsgsentiment_name`, `crmmsgsentiment_value`, `_createby`, `_createdate`) VALUES ('POS', 'POSITIVE', '1', 'root', NOW());
INSERT INTO mst_crmmsgsentiment (`crmmsgsentiment_id`, `crmmsgsentiment_name`, `crmmsgsentiment_value`, `_createby`, `_createdate`) VALUES ('NEG', 'NEGATIVE', '-1', 'root', NOW());



