-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_dept`;


CREATE TABLE `mst_dept` (
	`dept_id` varchar(30) NOT NULL , 
	`dept_name` varchar(60) NOT NULL , 
	`dept_descr` varchar(90)  , 
	`dept_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_isbudgetmandatory` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_issingleprojectbudget` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_path` varchar(390) NOT NULL , 
	`dept_level` int(2) NOT NULL DEFAULT 0, 
	`deptgroup_id` varchar(10) NOT NULL , 
	`dept_parent` varchar(30)  , 
	`depttype_id` varchar(10) NOT NULL , 
	`deptmodel_id` varchar(10) NOT NULL , 
	`auth_id` varchar(10) NOT NULL , 
	`project_id` varchar(30)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `dept_name` (`dept_name`),
	PRIMARY KEY (`dept_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Departement';

ALTER TABLE `mst_dept` ADD KEY `deptgroup_id` (`deptgroup_id`);
ALTER TABLE `mst_dept` ADD KEY `dept_parent` (`dept_parent`);
ALTER TABLE `mst_dept` ADD KEY `depttype_id` (`depttype_id`);
ALTER TABLE `mst_dept` ADD KEY `deptmodel_id` (`deptmodel_id`);
ALTER TABLE `mst_dept` ADD KEY `auth_id` (`auth_id`);
ALTER TABLE `mst_dept` ADD KEY `project_id` (`project_id`);

ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_deptgroup` FOREIGN KEY (`deptgroup_id`) REFERENCES `mst_deptgroup` (`deptgroup_id`);
ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_dept` FOREIGN KEY (`dept_parent`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_depttype` FOREIGN KEY (`depttype_id`) REFERENCES `mst_depttype` (`depttype_id`);
ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_deptmodel` FOREIGN KEY (`deptmodel_id`) REFERENCES `mst_deptmodel` (`deptmodel_id`);
ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_auth` FOREIGN KEY (`auth_id`) REFERENCES `mst_auth` (`auth_id`);
ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);





