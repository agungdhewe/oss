CREATE TABLE `mst_country` (
	`country_id` varchar(10) NOT NULL , 
	`country_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `country_name` (`country_name`),
	PRIMARY KEY (`country_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Negara';







