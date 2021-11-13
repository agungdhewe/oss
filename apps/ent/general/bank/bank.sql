CREATE TABLE `mst_bank` (
	`bank_id` varchar(14) NOT NULL , 
	`bank_name` varchar(60) NOT NULL , 
	`bank_code` varchar(30)  , 
	`bank_phone` varchar(30) NOT NULL , 
	`bank_email` varchar(30)  , 
	`bank_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`bank_address` varchar(255)  , 
	`bank_city` varchar(90)  , 
	`bank_prov` varchar(90)  , 
	`country_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `bank_name` (`bank_name`),
	PRIMARY KEY (`bank_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Brand';

ALTER TABLE `mst_bank` ADD KEY `country_id` (`country_id`);

ALTER TABLE `mst_bank` ADD CONSTRAINT `fk_mst_bank_mst_country` FOREIGN KEY (`country_id`) REFERENCES `mst_country` (`country_id`);





