-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_dept`;
-- drop table if exists `mst_deptbudgetacc`;


CREATE TABLE `mst_dept` (
	`dept_id` varchar(30) NOT NULL , 
	`dept_name` varchar(60) NOT NULL , 
	`dept_isparent` tinyint(1) NOT NULL DEFAULT 0, 
	`dept_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`deptgroup_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`dept_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Departement';

ALTER TABLE `mst_dept` ADD KEY `deptgroup_id` (`deptgroup_id`);

ALTER TABLE `mst_dept` ADD CONSTRAINT `fk_mst_dept_mst_deptgroup` FOREIGN KEY (`deptgroup_id`) REFERENCES `mst_deptgroup` (`deptgroup_id`);





CREATE TABLE `mst_deptbudgetacc` (
	`deptbudgetacc_id` varchar(14) NOT NULL , 
	`accbudget_id` varchar(20) NOT NULL , 
	`accbudget_nameshort` varchar(255)  , 
	`dept_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `deptbudgetacc_pari` (`dept_id`, `accbudget_id`),
	PRIMARY KEY (`deptbudgetacc_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Departement';

ALTER TABLE `mst_deptbudgetacc` ADD KEY `accbudget_id` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetacc` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_deptbudgetacc` ADD CONSTRAINT `fk_mst_deptbudgetacc_mst_accbudget` FOREIGN KEY (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `mst_deptbudgetacc` ADD CONSTRAINT `fk_mst_deptbudgetacc_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





