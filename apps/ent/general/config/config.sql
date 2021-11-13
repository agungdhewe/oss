CREATE TABLE `mst_config` (
	`config_id` varchar(30) NOT NULL , 
	`config_name` varchar(30) NOT NULL , 
	`config_dir` varchar(100) NOT NULL , 
	`config_filename` varchar(100) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `config_name` (`config_name`),
	PRIMARY KEY (`config_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Config';




INSERT INTO mst_config (`config_id`, `config_name`, `config_dir`, `config_filename`, `_createby`, `_createdate`) VALUES ('C001', 'MARIADB', '', '', 'root', NOW());
INSERT INTO mst_config (`config_id`, `config_name`, `config_dir`, `config_filename`, `_createby`, `_createdate`) VALUES ('C002', 'SQLSERVER', '', '', 'root', NOW());
INSERT INTO mst_config (`config_id`, `config_name`, `config_dir`, `config_filename`, `_createby`, `_createdate`) VALUES ('C003', 'POSGRE', '', '', 'root', NOW());



