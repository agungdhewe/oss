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




INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('COM', 'COMMERCIAL', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('DC', 'DISTRIBUTION CENTER', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('FIA', 'FINANCE, ACCOUNTING & ADMINISTRATION', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('GMN', 'GENERAL MANAGEMENT', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('HR', 'HUMAN RESOURCE', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('MIS', 'MANAGEMENT INFORMATION SUPPORT', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('OPE', 'OPERATIONS', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('PRJ', 'PROJECT', 'root', NOW());
INSERT INTO mst_deptmodel (`deptmodel_id`, `deptmodel_name`, `_createby`, `_createdate`) VALUES ('STO', 'STORE', 'root', NOW());



