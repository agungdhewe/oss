-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_deptmodel`;


CREATE TABLE `mst_deptmodel` (
	`deptmodel_id` varchar(10) NOT NULL , 
	`deptmodel_name` varchar(60) NOT NULL , 
	`deptmodel_descr` varchar(90)  , 
	`deptmodel_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptmodel_name` (`deptmodel_name`),
	PRIMARY KEY (`deptmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Departement';




INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('GD', 'GENERAL DEPT', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('TS', 'TECHNICAL SUPPORT', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('RH', 'REPRESENTASI HIRARKI', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('RL', 'REPRESENTASI LOKASI', 'root', NOW());



