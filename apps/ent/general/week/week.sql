CREATE TABLE `con_week` (
	`week_id` varchar(7) NOT NULL , 
	`week_year` int(4) NOT NULL DEFAULT 0, 
	`week_month` int(2) NOT NULL DEFAULT 0, 
	`week_number` int(1) NOT NULL DEFAULT 0, 
	`week_interval` int(1) NOT NULL DEFAULT 0, 
	`week_dtstart` date NOT NULL , 
	`week_dtend` date NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `week_name` (`week_year`, `week_month`, `week_number`),
	PRIMARY KEY (`week_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Week';







CREATE TABLE `con_weekdt` (
	`weekdt_id` varchar(10) NOT NULL , 
	`weekdt_date` date NOT NULL , 
	`weekdt_dayname` varchar(15) NOT NULL , 
	`weekdt_daynum` int(1) NOT NULL DEFAULT 0, 
	`weekdt_year` int(4) NOT NULL DEFAULT 0, 
	`weekdt_month` int(2) NOT NULL DEFAULT 0, 
	`week_id` varchar(7) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`weekdt_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Week';

ALTER TABLE `con_weekdt` ADD KEY `week_id` (`week_id`);

ALTER TABLE `con_weekdt` ADD CONSTRAINT `fk_con_weekdt_con_week` FOREIGN KEY (`week_id`) REFERENCES `con_week` (`week_id`);





