CREATE TABLE `trn_crmevent` (
	`crmevent_id` varchar(14) NOT NULL , 
	`crmevent_name` varchar(30) NOT NULL , 
	`crmevent_descr` varchar(90)  , 
	`crmevent_dtstart` date NOT NULL , 
	`crmevent_dtend` date NOT NULL , 
	`crmevent_dtaffected` date NOT NULL , 
	`crmevent_message` varchar(255)  , 
	`crmevent_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isunlimit` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_isclose` tinyint(1) NOT NULL DEFAULT 0, 
	`crmevent_targetinvited` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetattendant` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetnewcontact` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targettx` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targettxnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetbuyer` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetbuyernew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetsales` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_targetsalesnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalinvited` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalattendant` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalnewcontact` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totaltx` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totaltxnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalbuyer` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalbuyernew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalsales` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmevent_totalsalesnew` decimal(8, 0) NOT NULL DEFAULT 0, 
	`crmsource_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `crmevent_name` (`crmevent_name`),
	PRIMARY KEY (`crmevent_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event, suseuatu yang dilakukan untuk mencari calon customer baru';

ALTER TABLE `trn_crmevent` ADD KEY `crmsource_id` (`crmsource_id`);

ALTER TABLE `trn_crmevent` ADD CONSTRAINT `fk_trn_crmevent_mst_crmsource` FOREIGN KEY (`crmsource_id`) REFERENCES `mst_crmsource` (`crmsource_id`);





CREATE TABLE `trn_crmeventinvited` (
	`crmeventinvited_id` varchar(14) NOT NULL , 
	`crmeventinvited_contact` varchar(90) NOT NULL , 
	`crmeventinvited_name` varchar(90) NOT NULL , 
	`crmeventinvited_address` varchar(255) NOT NULL , 
	`crmeventinvited_city` varchar(30) NOT NULL , 
	`crmeventinvited_iscontacted` tinyint(1) NOT NULL DEFAULT 0, 
	`crmeventinvited_contactdate` date  , 
	`user_id` varchar(14) NOT NULL , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventinvited_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event Invited, yang diundang di event ini, baik yang sudah ada di contact atau belum. data ini sifatnya bulk.';

ALTER TABLE `trn_crmeventinvited` ADD KEY `user_id` (`user_id`);
ALTER TABLE `trn_crmeventinvited` ADD KEY `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventinvited` ADD CONSTRAINT `fk_trn_crmeventinvited_fgt_user` FOREIGN KEY (`user_id`) REFERENCES `fgt_user` (`user_id`);
ALTER TABLE `trn_crmeventinvited` ADD CONSTRAINT `fk_trn_crmeventinvited_trn_crmevent` FOREIGN KEY (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





CREATE TABLE `trn_crmeventattendant` (
	`crmeventattendant_id` varchar(14) NOT NULL , 
	`crmeventattendant_contact` varchar(90) NOT NULL , 
	`crmeventattendant_name` varchar(90) NOT NULL , 
	`crmeventattendant_address` varchar(255) NOT NULL , 
	`crmeventattendant_city` varchar(30) NOT NULL , 
	`crmeventattendant_contactdate` date  , 
	`crmevent_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`crmeventattendant_id`)
) 
ENGINE=InnoDB
COMMENT='CRM Event Atendant, yang datang di event ini';

ALTER TABLE `trn_crmeventattendant` ADD KEY `crmevent_id` (`crmevent_id`);

ALTER TABLE `trn_crmeventattendant` ADD CONSTRAINT `fk_trn_crmeventattendant_trn_crmevent` FOREIGN KEY (`crmevent_id`) REFERENCES `trn_crmevent` (`crmevent_id`);





