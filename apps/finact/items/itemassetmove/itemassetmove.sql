-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_itemassetmove`;
-- drop table if exists `trn_itemassetmovedetil`;


CREATE TABLE `trn_itemassetmove` (
	`itemassetmove_id` varchar(30) NOT NULL , 
	`inquiry_id` varchar(14)  , 
	`itemassetmove_dtstart` date NOT NULL , 
	`itemassetmove_dtend` date NOT NULL , 
	`itemassetmove_descr` varchar(90) NOT NULL , 
	`from_site_id` varchar(30) NOT NULL , 
	`to_site_id` varchar(30) NOT NULL , 
	`user_dept_id` varchar(30) NOT NULL , 
	`empl_id` varchar(30)  , 
	`project_id` varchar(30) NOT NULL , 
	`projecttask_id` varchar(14)  , 
	`projbudget_id` varchar(30)  , 
	`projbudgettask_id` varchar(14)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmove_id`)
) 
ENGINE=InnoDB
COMMENT='Perubahan Lokasi Asset';

ALTER TABLE `trn_itemassetmove` ADD KEY `inquiry_id` (`inquiry_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `from_site_id` (`from_site_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `to_site_id` (`to_site_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `user_dept_id` (`user_dept_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `empl_id` (`empl_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `project_id` (`project_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `projecttask_id` (`projecttask_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `projbudget_id` (`projbudget_id`);
ALTER TABLE `trn_itemassetmove` ADD KEY `projbudgettask_id` (`projbudgettask_id`);

ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_trn_inquiry` FOREIGN KEY (`inquiry_id`) REFERENCES `trn_inquiry` (`inquiry_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_site` FOREIGN KEY (`from_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_site_2` FOREIGN KEY (`to_site_id`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_dept` FOREIGN KEY (`user_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_project` FOREIGN KEY (`project_id`) REFERENCES `mst_project` (`project_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_projecttask` FOREIGN KEY (`projecttask_id`) REFERENCES `mst_projecttask` (`projecttask_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_projbudget` FOREIGN KEY (`projbudget_id`) REFERENCES `mst_projbudget` (`projbudget_id`);
ALTER TABLE `trn_itemassetmove` ADD CONSTRAINT `fk_trn_itemassetmove_mst_projbudgettask` FOREIGN KEY (`projbudgettask_id`) REFERENCES `mst_projbudgettask` (`projbudgettask_id`);





CREATE TABLE `trn_itemassetmovedetil` (
	`itemassetmovedetil_id` varchar(30) NOT NULL , 
	`itemasset_id` varchar(14)  , 
	`itemassetmovedetil_descr` varchar(90) NOT NULL , 
	`itemassetmove_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`itemassetmovedetil_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Request Pembelian, Sewa, Service, Talent, dll';

ALTER TABLE `trn_itemassetmovedetil` ADD KEY `itemasset_id` (`itemasset_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD KEY `itemassetmove_id` (`itemassetmove_id`);

ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_mst_itemasset` FOREIGN KEY (`itemasset_id`) REFERENCES `mst_itemasset` (`itemasset_id`);
ALTER TABLE `trn_itemassetmovedetil` ADD CONSTRAINT `fk_trn_itemassetmovedetil_trn_itemassetmove` FOREIGN KEY (`itemassetmove_id`) REFERENCES `trn_itemassetmove` (`itemassetmove_id`);





