CREATE TABLE `mst_doc` (
	`doc_id` varchar(30) NOT NULL , 
	`doc_name` varchar(30) NOT NULL , 
	`doc_code` varchar(30) NOT NULL , 
	`doc_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`doc_descr` varchar(90)  , 
	`doc_config` varchar(2000)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `doc_name` (`doc_name`),
	PRIMARY KEY (`doc_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Dokumen';







CREATE TABLE `mst_docauth` (
	`docauth_id` varchar(14) NOT NULL , 
	`docauth_descr` varchar(90)  , 
	`docauth_order` int(4) NOT NULL DEFAULT 0, 
	`docauth_value` int(4) NOT NULL DEFAULT 100, 
	`docauth_min` int(4) NOT NULL DEFAULT 0, 
	`authlevel_id` varchar(10) NOT NULL , 
	`auth_id` varchar(10)  , 
	`doc_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `docauth_id` (`doc_id`, `authlevel_id`, `auth_id`),
	UNIQUE KEY `docauth_order` (`doc_id`, `docauth_order`),
	PRIMARY KEY (`docauth_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Authorisasi dokumen.';

ALTER TABLE `mst_docauth` ADD KEY `authlevel_id` (`authlevel_id`);
ALTER TABLE `mst_docauth` ADD KEY `auth_id` (`auth_id`);
ALTER TABLE `mst_docauth` ADD KEY `doc_id` (`doc_id`);

ALTER TABLE `mst_docauth` ADD CONSTRAINT `fk_mst_docauth_mst_authlevel` FOREIGN KEY (`authlevel_id`) REFERENCES `mst_authlevel` (`authlevel_id`);
ALTER TABLE `mst_docauth` ADD CONSTRAINT `fk_mst_docauth_mst_auth` FOREIGN KEY (`auth_id`) REFERENCES `mst_auth` (`auth_id`);
ALTER TABLE `mst_docauth` ADD CONSTRAINT `fk_mst_docauth_mst_doc` FOREIGN KEY (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





