CREATE TABLE `mst_site` (
	`site_id` varchar(30) NOT NULL , 
	`site_name` varchar(90) NOT NULL , 
	`site_address` varchar(250) NOT NULL , 
	`site_phone` varchar(30) NOT NULL , 
	`site_email` varchar(150) NOT NULL , 
	`site_sqmwide` decimal(12, 2) NOT NULL DEFAULT 0, 
	`site_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`site_geoloc` varchar(30) NOT NULL DEFAULT '', 
	`site_opendate` date NOT NULL , 
	`sitemodel_id` varchar(10) NOT NULL , 
	`sitegroup_id` varchar(10) NOT NULL , 
	`land_id` varchar(30) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`config_id` varchar(30) NOT NULL , 
	`taxtype_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `site_name` (`site_name`),
	PRIMARY KEY (`site_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Site';

ALTER TABLE `mst_site` ADD KEY `sitemodel_id` (`sitemodel_id`);
ALTER TABLE `mst_site` ADD KEY `sitegroup_id` (`sitegroup_id`);
ALTER TABLE `mst_site` ADD KEY `land_id` (`land_id`);
ALTER TABLE `mst_site` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_site` ADD KEY `config_id` (`config_id`);
ALTER TABLE `mst_site` ADD KEY `taxtype_id` (`taxtype_id`);


ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_sitemodel` FOREIGN KEY (`sitemodel_id`) REFERENCES `mst_sitemodel` (`sitemodel_id`);
ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_sitegroup` FOREIGN KEY (`sitegroup_id`) REFERENCES `mst_sitegroup` (`sitegroup_id`);
ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_land` FOREIGN KEY (`land_id`) REFERENCES `mst_land` (`land_id`);
ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_config` FOREIGN KEY (`config_id`) REFERENCES `mst_config` (`config_id`);
ALTER TABLE `mst_site` ADD CONSTRAINT `fk_mst_site_mst_taxtype` FOREIGN KEY (`taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);





CREATE TABLE `mst_siteunit` (
	`siteunit_id` varchar(14) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `siteunit_siteunit` (`site_id`, `unit_id`),
	PRIMARY KEY (`siteunit_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Site Unit';

ALTER TABLE `mst_siteunit` ADD KEY `unit_id` (`unit_id`);
ALTER TABLE `mst_siteunit` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `mst_siteunit` ADD KEY `site_id` (`site_id`);

ALTER TABLE `mst_siteunit` ADD CONSTRAINT `fk_mst_siteunit_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_siteunit` ADD CONSTRAINT `fk_mst_siteunit_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `mst_siteunit` ADD CONSTRAINT `fk_mst_siteunit_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);





CREATE TABLE `mst_sitemapping` (
	`sitemapping_id` varchar(14) NOT NULL , 
	`sitemapping_mapfrom` varchar(60) NOT NULL , 
	`unit_id` varchar(10) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `sitemapping_map` (`sitemapping_mapfrom`),
	PRIMARY KEY (`sitemapping_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Site Mapping';

ALTER TABLE `mst_sitemapping` ADD KEY `unit_id` (`unit_id`);
ALTER TABLE `mst_sitemapping` ADD KEY `site_id` (`site_id`);

ALTER TABLE `mst_sitemapping` ADD CONSTRAINT `fk_mst_sitemapping_mst_unit` FOREIGN KEY (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `mst_sitemapping` ADD CONSTRAINT `fk_mst_sitemapping_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);





CREATE TABLE `mst_siteevent` (
	`siteevent_id` varchar(14) NOT NULL , 
	`siteevent_name` varchar(60) NOT NULL , 
	`siteevent_date` date NOT NULL , 
	`siteevent_enabling` tinyint(1) NOT NULL DEFAULT 0, 
	`siteevent_disabling` tinyint(1) NOT NULL DEFAULT 0, 
	`site_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`siteevent_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Site Event';

ALTER TABLE `mst_siteevent` ADD KEY `site_id` (`site_id`);

ALTER TABLE `mst_siteevent` ADD CONSTRAINT `fk_mst_siteevent_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);





