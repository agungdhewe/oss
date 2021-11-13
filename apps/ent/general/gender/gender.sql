CREATE TABLE `mst_gender` (
	`gender_id` varchar(7) NOT NULL , 
	`gender_name` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `gender_name` (`gender_name`),
	PRIMARY KEY (`gender_id`)
) 
ENGINE=InnoDB
COMMENT='Master Gender';




INSERT INTO mst_gender (`gender_id`, `gender_name`, `_createby`, `_createdate`) VALUES ('M', 'MAN', 'root', NOW());
INSERT INTO mst_gender (`gender_id`, `gender_name`, `_createby`, `_createdate`) VALUES ('W', 'WOMAN', 'root', NOW());



