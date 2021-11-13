CREATE TABLE `mst_jurnalmodel` (
	`jurnalmodel_id` varchar(10) NOT NULL , 
	`jurnalmodel_name` varchar(30) NOT NULL , 
	`jurnalmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnalmodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalmodel_name` (`jurnalmodel_name`),
	PRIMARY KEY (`jurnalmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Jurnal';







