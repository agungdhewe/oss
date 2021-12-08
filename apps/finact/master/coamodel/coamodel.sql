-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_coamodel`;


CREATE TABLE `mst_coamodel` (
	`coamodel_id` varchar(10) NOT NULL , 
	`coamodel_name` varchar(90) NOT NULL , 
	`coamodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_isaging` tinyint(1) NOT NULL DEFAULT 0, 
	`coamodel_descr` varchar(90)  , 
	`coareport_id` varchar(2) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `coamodel_name` (`coamodel_name`),
	PRIMARY KEY (`coamodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar model COA';

ALTER TABLE `mst_coamodel` ADD KEY `coareport_id` (`coareport_id`);

ALTER TABLE `mst_coamodel` ADD CONSTRAINT `fk_mst_coamodel_mst_coareport` FOREIGN KEY (`coareport_id`) REFERENCES `mst_coareport` (`coareport_id`);


INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('KB', 'KAS & BANK', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('SB', 'SURAT BERHARGA', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `coamodel_isaging`, `_createby`, `_createdate`) VALUES ('AR', 'PIUTANG', 'NR', '1', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('PS', 'PERSEDIAAN', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('PL', 'PERLENGKAPAN', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `coamodel_isaging`, `_createby`, `_createdate`) VALUES ('UM', 'UAMG MUKA', 'NR', '1', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('HT', 'HARTA TETAP', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('HB', 'HARTA TAK BERWUJUD', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `coamodel_isaging`, `_createby`, `_createdate`) VALUES ('AP', 'KEWAJIBAN', 'NR', '1', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('MD', 'MODAL', 'NR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('PD', 'PENDAPATAN', 'LR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('BN', 'BEBAN', 'LR', 'root', NOW());
INSERT INTO mst_coamodel (`coamodel_id`, `coamodel_name`, `coareport_id`, `_createby`, `_createdate`) VALUES ('CL', 'CLEARING', 'CR', 'root', NOW());



