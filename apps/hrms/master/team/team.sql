-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_team`;
-- drop table if exists `mst_teamempl`;


CREATE TABLE `mst_team` (
	`team_id` varchar(14) NOT NULL , 
	`team_name` varchar(30) NOT NULL , 
	`team_descr` varchar(255)  , 
	`dept_id` varchar(30) NOT NULL , 
	`team_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `team_name` (`team_name`),
	PRIMARY KEY (`team_id`)
) 
ENGINE=InnoDB
COMMENT='Master Education';

ALTER TABLE `mst_team` ADD KEY `dept_id` (`dept_id`);

ALTER TABLE `mst_team` ADD CONSTRAINT `fk_mst_team_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);





CREATE TABLE `mst_teamempl` (
	`teamempl_id` varchar(14) NOT NULL , 
	`empl_id` varchar(14) NOT NULL , 
	`team_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`teamempl_id`)
) 
ENGINE=InnoDB
COMMENT='Personil anggota team';

ALTER TABLE `mst_teamempl` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `mst_teamempl` ADD KEY `team_id` (`team_id`);

ALTER TABLE `mst_teamempl` ADD CONSTRAINT `fk_mst_teamempl_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `mst_teamempl` ADD CONSTRAINT `fk_mst_teamempl_mst_team` FOREIGN KEY (`team_id`) REFERENCES `mst_team` (`team_id`);





