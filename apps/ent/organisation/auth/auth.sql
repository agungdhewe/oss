CREATE TABLE `mst_auth` (
	`auth_id` varchar(30) NOT NULL , 
	`auth_name` varchar(60) NOT NULL , 
	`auth_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`auth_descr` varchar(90)  , 
	`authlevel_id` varchar(10) NOT NULL , 
	`deptmodel_id` varchar(10) NOT NULL , 
	`empl_id` varchar(14)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `auth_name` (`auth_name`),
	PRIMARY KEY (`auth_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Authorisasi';

ALTER TABLE `mst_auth` ADD KEY `authlevel_id` (`authlevel_id`);
ALTER TABLE `mst_auth` ADD KEY `deptmodel_id` (`deptmodel_id`);
ALTER TABLE `mst_auth` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_auth` ADD CONSTRAINT `fk_mst_auth_mst_authlevel` FOREIGN KEY (`authlevel_id`) REFERENCES `mst_authlevel` (`authlevel_id`);
ALTER TABLE `mst_auth` ADD CONSTRAINT `fk_mst_auth_mst_deptmodel` FOREIGN KEY (`deptmodel_id`) REFERENCES `mst_deptmodel` (`deptmodel_id`);
ALTER TABLE `mst_auth` ADD CONSTRAINT `fk_mst_auth_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





CREATE TABLE `mst_authdelegate` (
	`authdelegate_id` varchar(14) NOT NULL , 
	`authdelegate_portion` int(3) NOT NULL DEFAULT 0, 
	`empl_id` varchar(14) NOT NULL , 
	`auth_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `authdelegate_id` (`auth_id`, `empl_id`),
	PRIMARY KEY (`authdelegate_id`)
) 
ENGINE=InnoDB
COMMENT='Delegasi Authorisasi, apabila person yang ada di master authorisasi berhalangan.';

ALTER TABLE `mst_authdelegate` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `mst_authdelegate` ADD KEY `auth_id` (`auth_id`);

ALTER TABLE `mst_authdelegate` ADD CONSTRAINT `fk_mst_authdelegate_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `mst_authdelegate` ADD CONSTRAINT `fk_mst_authdelegate_mst_auth` FOREIGN KEY (`auth_id`) REFERENCES `mst_auth` (`auth_id`);





