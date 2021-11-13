CREATE TABLE `mst_periodemo` (
	`periodemo_id` varchar(6) NOT NULL , 
	`periodemo_name` varchar(30) NOT NULL , 
	`periodemo_year` int(4) NOT NULL , 
	`periodemo_month` int(2) NOT NULL , 
	`periodemo_dtstart` date NOT NULL , 
	`periodemo_dtend` date NOT NULL , 
	`periodemo_prev` varchar(6) NOT NULL , 
	`periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`periodemo_closeby` varchar(14)  , 
	`periodemo_closedate` date  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `periodemo_prev` (`periodemo_prev`),
	PRIMARY KEY (`periodemo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Periode Bulanan';

ALTER TABLE `mst_periodemo` ADD KEY `periodemo_prev` (`periodemo_prev`);

ALTER TABLE `mst_periodemo` ADD CONSTRAINT `fk_mst_periodemo_mst_periodemo` FOREIGN KEY (`periodemo_prev`) REFERENCES `mst_periodemo` (`periodemo_id`);





