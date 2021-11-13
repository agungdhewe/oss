CREATE TABLE `mst_partnerorg` (
	`partnerorg_id` varchar(10) NOT NULL , 
	`partnerorg_name` varchar(60) NOT NULL , 
	`partnerorg_descr` varchar(90)  , 
	`partnerorg_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `partnerorg_name` (`partnerorg_name`),
	PRIMARY KEY (`partnerorg_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Partner Organisation';




INSERT INTO mst_partnerorg (`partnerorg_id`, `partnerorg_name`, `_createby`, `_createdate`) VALUES ('PER', 'INDIVIDUAL/PERORANGAN', 'root', NOW());
INSERT INTO mst_partnerorg (`partnerorg_id`, `partnerorg_name`, `_createby`, `_createdate`) VALUES ('USH', 'PERUSAHAAN', 'root', NOW());
INSERT INTO mst_partnerorg (`partnerorg_id`, `partnerorg_name`, `_createby`, `_createdate`) VALUES ('ORG', 'ORGANISASI/YAYASAN', 'root', NOW());
INSERT INTO mst_partnerorg (`partnerorg_id`, `partnerorg_name`, `_createby`, `_createdate`) VALUES ('PDK', 'SEKOLAH/LEMBAGA PENDIDIKAN', 'root', NOW());



