CREATE TABLE `mst_empl` (
	`empl_id` varchar(30) NOT NULL , 
	`empl_nik` varchar(30) NOT NULL , 
	`empl_name` varchar(60) NOT NULL , 
	`empl_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`empl_dtjoin` date NOT NULL , 
	`empl_dtexit` date  , 
	`empl_birthplace` varchar(30) NOT NULL , 
	`empl_birthdate` date  , 
	`empl_address` varchar(255)  , 
	`empl_city` varchar(20)  , 
	`empl_prov` varchar(20)  , 
	`empl_hp` varchar(30)  , 
	`empl_email` varchar(120)  , 
	`empl_kk` varchar(30)  , 
	`empl_ktp` varchar(30)  , 
	`empl_npwp` varchar(30)  , 
	`empl_bpjstk` varchar(30)  , 
	`empl_bpjskes` varchar(30)  , 
	`hrjob_id` varchar(20) NOT NULL , 
	`hrstatus_id` varchar(3) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`auth_id` varchar(30)  , 
	`marital_id` varchar(2) NOT NULL , 
	`gender_id` varchar(1) NOT NULL , 
	`edu_id` varchar(7) NOT NULL , 
	`religion_id` varchar(3) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `empl_nik` (`empl_nik`),
	PRIMARY KEY (`empl_id`)
) 
ENGINE=InnoDB
COMMENT='Master Employee';

ALTER TABLE `mst_empl` ADD KEY `hrjob_id` (`hrjob_id`);
ALTER TABLE `mst_empl` ADD KEY `hrstatus_id` (`hrstatus_id`);
ALTER TABLE `mst_empl` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_empl` ADD KEY `site_id` (`site_id`);
ALTER TABLE `mst_empl` ADD KEY `auth_id` (`auth_id`);
ALTER TABLE `mst_empl` ADD KEY `marital_id` (`marital_id`);
ALTER TABLE `mst_empl` ADD KEY `gender_id` (`gender_id`);
ALTER TABLE `mst_empl` ADD KEY `edu_id` (`edu_id`);
ALTER TABLE `mst_empl` ADD KEY `religion_id` (`religion_id`);

ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_hrjob` FOREIGN KEY (`hrjob_id`) REFERENCES `mst_hrjob` (`hrjob_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_hrstatus` FOREIGN KEY (`hrstatus_id`) REFERENCES `mst_hrstatus` (`hrstatus_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_auth` FOREIGN KEY (`auth_id`) REFERENCES `mst_auth` (`auth_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_marital` FOREIGN KEY (`marital_id`) REFERENCES `mst_marital` (`marital_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_gender` FOREIGN KEY (`gender_id`) REFERENCES `mst_gender` (`gender_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_edu` FOREIGN KEY (`edu_id`) REFERENCES `mst_edu` (`edu_id`);
ALTER TABLE `mst_empl` ADD CONSTRAINT `fk_mst_empl_mst_religion` FOREIGN KEY (`religion_id`) REFERENCES `mst_religion` (`religion_id`);





