CREATE TABLE `mst_locchange` (
	`locchange_id` varchar(14) NOT NULL , 
	`locchange_dateeff` date NOT NULL , 
	`locchange_reason` varchar(255) NOT NULL , 
	`site_id_from` varchar(30) NOT NULL , 
	`site_id_to` varchar(30) NOT NULL , 
	`empl_id` varchar(14)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`locchange_id`)
) 
ENGINE=InnoDB
COMMENT='Clearance karyawan';

ALTER TABLE `mst_locchange` ADD KEY `site_id_from` (`site_id_from`);
ALTER TABLE `mst_locchange` ADD KEY `site_id_to` (`site_id_to`);
ALTER TABLE `mst_locchange` ADD KEY `empl_id` (`empl_id`);

ALTER TABLE `mst_locchange` ADD CONSTRAINT `fk_mst_locchange_mst_site` FOREIGN KEY (`site_id_from`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_locchange` ADD CONSTRAINT `fk_mst_locchange_mst_site_2` FOREIGN KEY (`site_id_to`) REFERENCES `mst_site` (`site_id`);
ALTER TABLE `mst_locchange` ADD CONSTRAINT `fk_mst_locchange_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`);





