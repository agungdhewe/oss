CREATE TABLE `mst_land` (
	`land_id` varchar(30) NOT NULL , 
	`land_name` varchar(90) NOT NULL , 
	`land_address` varchar(250) NOT NULL , 
	`land_phone` varchar(30) NOT NULL , 
	`land_email` varchar(150) NOT NULL , 
	`land_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`land_geoloc` varchar(30) NOT NULL DEFAULT '', 
	`landtype_id` varchar(10) NOT NULL , 
	`zone_id` varchar(10) NOT NULL , 
	`city_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `land_name` (`land_name`),
	PRIMARY KEY (`land_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Land';

ALTER TABLE `mst_land` ADD KEY `landtype_id` (`landtype_id`);
ALTER TABLE `mst_land` ADD KEY `zone_id` (`zone_id`);
ALTER TABLE `mst_land` ADD KEY `city_id` (`city_id`);
ALTER TABLE `mst_land` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `mst_land` ADD CONSTRAINT `fk_mst_land_mst_landtype` FOREIGN KEY (`landtype_id`) REFERENCES `mst_landtype` (`landtype_id`);
ALTER TABLE `mst_land` ADD CONSTRAINT `fk_mst_land_mst_zone` FOREIGN KEY (`zone_id`) REFERENCES `mst_zone` (`zone_id`);
ALTER TABLE `mst_land` ADD CONSTRAINT `fk_mst_land_mst_city` FOREIGN KEY (`city_id`) REFERENCES `mst_city` (`city_id`);
ALTER TABLE `mst_land` ADD CONSTRAINT `fk_mst_land_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);





