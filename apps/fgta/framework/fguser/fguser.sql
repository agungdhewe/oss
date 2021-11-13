CREATE TABLE `fgt_user` (
	`user_id` varchar(14) NOT NULL , 
	`user_name` varchar(30)  , 
	`user_fullname` varchar(90)  , 
	`user_email` varchar(150)  , 
	`user_password` varchar(255)  , 
	`user_disabled` tinyint(1) NOT NULL DEFAULT 0, 
	`group_id` varchar(13) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`user_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar User';

ALTER TABLE `fgt_user` ADD KEY `group_id` (`group_id`);

ALTER TABLE `fgt_user` ADD CONSTRAINT `fk_fgt_user_fgt_group` FOREIGN KEY (`group_id`) REFERENCES `fgt_group` (`group_id`);



CREATE TABLE `fgt_usergroups` (
	`usergroups_id` varchar(14) NOT NULL , 
	`usergroups_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`group_id` varchar(13) NOT NULL , 
	`user_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`usergroups_id`)
) 
ENGINE=InnoDB
COMMENT='Group yang dipunyai user, selain group utamanya';

ALTER TABLE `fgt_usergroups` ADD KEY `group_id` (`group_id`);
ALTER TABLE `fgt_usergroups` ADD KEY `user_id` (`user_id`);

ALTER TABLE `fgt_usergroups` ADD CONSTRAINT `fk_fgt_usergroups_fgt_group` FOREIGN KEY (`group_id`) REFERENCES `fgt_group` (`group_id`);
ALTER TABLE `fgt_usergroups` ADD CONSTRAINT `fk_fgt_usergroups_fgt_user` FOREIGN KEY (`user_id`) REFERENCES `fgt_user` (`user_id`);



