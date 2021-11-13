CREATE TABLE `mst_partnerreg` (
	`partner_id` varchar(14) NOT NULL , 
	`partnerorg_id` varchar(30)  , 
	`partnertype_id` varchar(10)  , 
	`partner_name` varchar(30) NOT NULL , 
	`partner_dirut` varchar(30)  , 
	`partner_dir` varchar(30)  , 
	`partner_addressline1` varchar(100)  , 
	`partner_addressline2` varchar(100)  , 
	`partner_addressline3` varchar(100)  , 
	`partner_city` varchar(30)  , 
	`partner_country` varchar(10)  , 
	`partner_postcode` varchar(10)  , 
	`partner_billaddrline1` varchar(100)  , 
	`partner_billaddrline2` varchar(100)  , 
	`partner_billaddrline3` varchar(100)  , 
	`partner_phone1` varchar(30)  , 
	`partner_phone2` varchar(30)  , 
	`partner_phone3` varchar(30)  , 
	`partner_phone4` varchar(30)  , 
	`partner_fax1` varchar(30)  , 
	`partner_fax2` varchar(30)  , 
	`partner_email1` varchar(150)  , 
	`partner_email2` varchar(150)  , 
	`partner_aktanoth` varchar(90)  , 
	`partner_siupno` varchar(90)  , 
	`partner_sk` varchar(90)  , 
	`partner_tdp` varchar(90)  , 
	`partner_bank` varchar(90)  , 
	`partner_npwp` varchar(90)  , 
	`partner_cf1` varchar(90)  , 
	`partner_cf2` varchar(90)  , 
	`partner_cf3` varchar(90)  , 
	`partner_cf4` varchar(90)  , 
	`partner_cf5` varchar(90)  , 
	`partner_cf6` varchar(90)  , 
	`partner_cf7` varchar(90)  , 
	`partner_isdisabled` tinyint(1)  DEFAULT 0, 
	`partner_isapproved` tinyint(1)  DEFAULT 0, 
	`partner_apprby` varchar(90)  , 
	`partner_apprdt` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`partner_id`)
) 
ENGINE=InnoDB
COMMENT='Registrasi partner baru';

ALTER TABLE `mst_partnerreg` ADD KEY `partnerorg_id` (`partnerorg_id`);
ALTER TABLE `mst_partnerreg` ADD KEY `partnertype_id` (`partnertype_id`);
ALTER TABLE `mst_partnerreg` ADD KEY `partner_country` (`partner_country`);

ALTER TABLE `mst_partnerreg` ADD CONSTRAINT `fk_mst_partnerreg_mst_partnerorg` FOREIGN KEY (`partnerorg_id`) REFERENCES `mst_partnerorg` (`partnerorg_id`);
ALTER TABLE `mst_partnerreg` ADD CONSTRAINT `fk_mst_partnerreg_mst_partnertype` FOREIGN KEY (`partnertype_id`) REFERENCES `mst_partnertype` (`partnertype_id`);
ALTER TABLE `mst_partnerreg` ADD CONSTRAINT `fk_mst_partnerreg_mst_country` FOREIGN KEY (`partner_country`) REFERENCES `mst_country` (`country_id`);





CREATE TABLE `mst_partneruser` (
	`partneruser_id` varchar(14) NOT NULL , 
	`partneruser_email1` varchar(150) NOT NULL , 
	`partneruser_password` varchar(150) NOT NULL , 
	`partneruser_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`partner_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`partneruser_id`)
) 
ENGINE=InnoDB
COMMENT='Login partner';

ALTER TABLE `mst_partneruser` ADD KEY `partner_id` (`partner_id`);

ALTER TABLE `mst_partneruser` ADD CONSTRAINT `fk_mst_partneruser_mst_partnerreg` FOREIGN KEY (`partner_id`) REFERENCES `mst_partnerreg` (`partner_id`);





