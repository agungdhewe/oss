CREATE TABLE `mst_jurnaltype` (
	`jurnaltype_id` varchar(10) NOT NULL , 
	`jurnaltype_name` varchar(30) NOT NULL , 
	`jurnaltype_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_descr` varchar(90)  , 
	`jurnalmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnaltype_name` (`jurnaltype_name`),
	PRIMARY KEY (`jurnaltype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe-tipe Jurnal';

ALTER TABLE `mst_jurnaltype` ADD KEY `jurnalmodel_id` (`jurnalmodel_id`);

ALTER TABLE `mst_jurnaltype` ADD CONSTRAINT `fk_mst_jurnaltype_mst_jurnalmodel` FOREIGN KEY (`jurnalmodel_id`) REFERENCES `mst_jurnalmodel` (`jurnalmodel_id`);
ALTER TABLE `mst_jurnaltype` ADD CONSTRAINT `fk_mst_jurnaltype_con_jurnaltype` FOREIGN KEY (`jurnaltype_id`) REFERENCES `con_jurnaltype` (`jurnaltype_id`);






CREATE TABLE `mst_jurnaltypecoa` (
	`jurnaltypecoa_id` varchar(14) NOT NULL , 
	`coa_id` varchar(17) NOT NULL , 
	`jurnaltypecoa_isdebet` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltypecoa_iskredit` tinyint(1) NOT NULL DEFAULT 0, 
	`jurnaltype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`jurnaltypecoa_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar COA yang dipunyai oleh suatu tipe jurnal';

ALTER TABLE `mst_jurnaltypecoa` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `mst_jurnaltypecoa` ADD KEY `jurnaltype_id` (`jurnaltype_id`);

ALTER TABLE `mst_jurnaltypecoa` ADD CONSTRAINT `fk_mst_jurnaltypecoa_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_jurnaltypecoa` ADD CONSTRAINT `fk_mst_jurnaltypecoa_mst_jurnaltype` FOREIGN KEY (`jurnaltype_id`) REFERENCES `mst_jurnaltype` (`jurnaltype_id`);





