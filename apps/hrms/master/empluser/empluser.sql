CREATE TABLE `mst_empluser` (
  `empl_id` varchar(30) NOT NULL,
  `user_id` varchar(14) NOT NULL,
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  ,   
  PRIMARY KEY (`empl_id`),
  UNIQUE KEY `mst_empluser_user_id_IDX` (`user_id`) USING BTREE,
  CONSTRAINT `mst_empluser_fgt_user` FOREIGN KEY (`user_id`) REFERENCES `fgt_user` (`user_id`),
  CONSTRAINT `mst_empluser_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`)
) 
ENGINE=InnoDB
COMMENT='Assign Employee dengan user_id';



CREATE TABLE `mst_emplunit` (
	`emplunit_id` varchar(14) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `emplunit_pair` (`empl_id`, `unit_id`),
	PRIMARY KEY (`emplunit_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar employee yang punya authorisasi di unit';

ALTER TABLE `mst_emplunit` ADD KEY `unit_id` (`unit_id`);
ALTER TABLE `mst_emplunit` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_emplunit` ADD CONSTRAINT `fk_mst_emplunit_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_emplunit` ADD CONSTRAINT `fk_mst_emplunit_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





CREATE TABLE `mst_empldept` (
	`empldept_id` varchar(14) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `empldept_pair` (`empl_id`, `dept_id`),
	PRIMARY KEY (`empldept_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar employee yang punya authorisasi di dept';

ALTER TABLE `mst_empldept` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_empldept` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_empldept` ADD CONSTRAINT `fk_mst_empldept_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_empldept` ADD CONSTRAINT `fk_mst_empldept_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





CREATE TABLE `mst_emplsite` (
	`emplsite_id` varchar(14) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `emplsite_pair` (`empl_id`, `site_id`),
	PRIMARY KEY (`emplsite_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar employee yang punya authorisasi di site';

ALTER TABLE `mst_emplsite` ADD KEY `site_id` (`site_id`);
ALTER TABLE `mst_emplsite` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_emplsite` ADD CONSTRAINT `fk_mst_emplsite_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_emplsite` ADD CONSTRAINT `fk_mst_emplsite_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





