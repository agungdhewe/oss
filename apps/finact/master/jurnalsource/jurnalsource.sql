CREATE TABLE `mst_jurnalsource` (
	`jurnalsource_id` varchar(10) NOT NULL , 
	`jurnalsource_name` varchar(30) NOT NULL , 
	`jurnalsource_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalsource_name` (`jurnalsource_name`),
	PRIMARY KEY (`jurnalsource_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Sumber Jurnal';




INSERT INTO mst_jurnalsource (`jurnalsource_id`, `jurnalsource_name`, `_createby`, `_createdate`) VALUES ('MANUAL', 'MANUAL', 'root', NOW());
INSERT INTO mst_jurnalsource (`jurnalsource_id`, `jurnalsource_name`, `_createby`, `_createdate`) VALUES ('CASHDISC', 'CASHDISCOUNT', 'root', NOW());
INSERT INTO mst_jurnalsource (`jurnalsource_id`, `jurnalsource_name`, `_createby`, `_createdate`) VALUES ('TEMPRECV', 'TEMPORARY RECEIVE', 'root', NOW());
INSERT INTO mst_jurnalsource (`jurnalsource_id`, `jurnalsource_name`, `_createby`, `_createdate`) VALUES ('OFFRECV', 'OFFICIALRECEIVE', 'root', NOW());



