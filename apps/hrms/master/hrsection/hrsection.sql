CREATE TABLE `mst_hrsection` (
	`hrsection_id` varchar(10) NOT NULL , 
	`hrsection_name` varchar(60) NOT NULL , 
	`hrsection_descr` varchar(90)  , 
	`hrsection_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`deptmodel_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `hrsection_name` (`hrsection_name`),
	PRIMARY KEY (`hrsection_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Section yang merupakan unit kerja terkecil sebagai pecahan department';

ALTER TABLE `mst_hrsection` ADD KEY `deptmodel_id` (`deptmodel_id`);

ALTER TABLE `mst_hrsection` ADD CONSTRAINT `fk_mst_hrsection_mst_deptmodel` FOREIGN KEY (`deptmodel_id`) REFERENCES `mst_deptmodel` (`deptmodel_id`);


INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('FIA-GACT', 'FA - ACCOUNTING', 'FIA', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('FIA-COST', 'FA - COSTING', 'FIA', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('FIA-FIN', 'FA - FINANCE & TREASURY', 'FIA', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('FIA-GAPRO', 'GA - GA & PROCUREMENT', 'FIA', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('FIA-GAREC', 'GA - RECEIPTION', 'FIA', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('MIS-INRA', 'IT - INFRASTRUCTURE', 'MIS', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('MIS-OPS', 'IT - OPERATION SUPPORT', 'MIS', 'root', NOW());
INSERT INTO mst_hrsection (`hrsection_id`, `hrsection_name`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('MIS-SD', 'IT - SOFTWARE DEVELOPMENT', 'MIS', 'root', NOW());



CREATE TABLE `mst_hrdeptsection` (
	`hrdeptsection_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`auth_id` varchar(10) NOT NULL , 
	`hrsection_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `hrdeptsection_id` (`dept_id`, `hrsection_id`),
	PRIMARY KEY (`hrdeptsection_id`)
) 
ENGINE=InnoDB
COMMENT='Relasi dari mst_hrsection ke mst_dept';

ALTER TABLE `mst_hrdeptsection` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_hrdeptsection` ADD KEY `auth_id` (`auth_id`);
ALTER TABLE `mst_hrdeptsection` ADD KEY `hrsection_id` (`hrsection_id`);

ALTER TABLE `mst_hrdeptsection` ADD CONSTRAINT `fk_mst_hrdeptsection_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_hrdeptsection` ADD CONSTRAINT `fk_mst_hrdeptsection_mst_auth` FOREIGN KEY (`auth_id`) REFERENCES `mst_auth` (`auth_id`);
ALTER TABLE `mst_hrdeptsection` ADD CONSTRAINT `fk_mst_hrdeptsection_mst_hrsection` FOREIGN KEY (`hrsection_id`) REFERENCES `mst_hrsection` (`hrsection_id`);





