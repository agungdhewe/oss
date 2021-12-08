-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_project`;
-- drop table if exists `mst_projectdept`;
-- drop table if exists `mst_projecttask`;


CREATE TABLE `mst_project` (
	`project_id` varchar(30) NOT NULL , 
	`projectmodel_id` varchar(10) NOT NULL , 
	`project_name` varchar(90) NOT NULL , 
	`project_descr` varchar(255)  , 
	`dept_id` varchar(30) NOT NULL , 
	`project_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`project_isallowalldept` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_id` varchar(30)  , 
	`projecttype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `project_name` (`project_name`),
	PRIMARY KEY (`project_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Project';

ALTER TABLE `mst_project` ADD KEY `projectmodel_id` (`projectmodel_id`);
ALTER TABLE `mst_project` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_project` ADD KEY `orderin_id` (`orderin_id`);
ALTER TABLE `mst_project` ADD KEY `projecttype_id` (`projecttype_id`);

ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_projectmodel` FOREIGN KEY (`projectmodel_id`) REFERENCES `mst_projectmodel` (`projectmodel_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_trn_orderin` FOREIGN KEY (`orderin_id`) REFERENCES `trn_orderin` (`orderin_id`);
ALTER TABLE `mst_project` ADD CONSTRAINT `fk_mst_project_mst_projecttype` FOREIGN KEY (`projecttype_id`) REFERENCES `mst_projecttype` (`projecttype_id`);





CREATE TABLE `mst_projectdept` (
	`projectdept_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projectdept_pair` (`project_id`, `dept_id`),
	PRIMARY KEY (`projectdept_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar dept yang bisa akses suatu project';

ALTER TABLE `mst_projectdept` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_projectdept` ADD KEY `project_id` (`project_id`);

ALTER TABLE `mst_projectdept` ADD CONSTRAINT `fk_mst_projectdept_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_projectdept` ADD CONSTRAINT `fk_mst_projectdept_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);





CREATE TABLE `mst_projecttask` (
	`projecttask_id` varchar(14) NOT NULL , 
	`projecttask_name` varchar(90) NOT NULL , 
	`projecttask_descr` varchar(255)  , 
	`projecttask_dtstart` date NOT NULL , 
	`projecttask_dtend` date NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`project_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `projecttask_name` (`project_id`, `projecttask_name`),
	PRIMARY KEY (`projecttask_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Task Project';

ALTER TABLE `mst_projecttask` ADD KEY `project_id` (`project_id`);

ALTER TABLE `mst_projecttask` ADD CONSTRAINT `fk_mst_projecttask_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);





