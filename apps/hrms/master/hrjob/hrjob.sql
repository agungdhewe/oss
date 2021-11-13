CREATE TABLE `mst_hrjob` (
	`hrjob_id` varchar(20) NOT NULL , 
	`hrjob_name` varchar(60) NOT NULL , 
	`hrjob_descr` varchar(90)  , 
	`hrjob_isdisabled` tinyint(1) NOT NULL DEFAULT 0, 
	`hrgrd_id` varchar(10) NOT NULL , 
	`deptmodel_id` varchar(10) NOT NULL , 
	`hrsection_id` varchar(10)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `hrjob_name` (`hrjob_name`),
	PRIMARY KEY (`hrjob_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Master Job';

ALTER TABLE `mst_hrjob` ADD KEY `hrgrd_id` (`hrgrd_id`);
ALTER TABLE `mst_hrjob` ADD KEY `deptmodel_id` (`deptmodel_id`);
ALTER TABLE `mst_hrjob` ADD KEY `hrsection_id` (`hrsection_id`);

ALTER TABLE `mst_hrjob` ADD CONSTRAINT `fk_mst_hrjob_mst_hrgrd` FOREIGN KEY (`hrgrd_id`) REFERENCES `mst_hrgrd` (`hrgrd_id`);
ALTER TABLE `mst_hrjob` ADD CONSTRAINT `fk_mst_hrjob_mst_deptmodel` FOREIGN KEY (`deptmodel_id`) REFERENCES `mst_deptmodel` (`deptmodel_id`);
ALTER TABLE `mst_hrjob` ADD CONSTRAINT `fk_mst_hrjob_mst_hrsection` FOREIGN KEY (`hrsection_id`) REFERENCES `mst_hrsection` (`hrsection_id`);


INSERT INTO mst_hrjob (`hrjob_id`, `hrjob_name`, `hrgrd_id`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('COM-BM-EAG', 'Brand Manager (EAG)', 'DEPHD', 'COM', 'root', NOW());
INSERT INTO mst_hrjob (`hrjob_id`, `hrjob_name`, `hrgrd_id`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('COM-BM-FLA', 'Brand Manager (FLA)', 'DEPHD', 'COM', 'root', NOW());
INSERT INTO mst_hrjob (`hrjob_id`, `hrjob_name`, `hrgrd_id`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('COM-BM-GEX', 'Brand Manager (GEX)', 'DEPHD', 'COM', 'root', NOW());
INSERT INTO mst_hrjob (`hrjob_id`, `hrjob_name`, `hrgrd_id`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('COM-BM-HBS', 'Brand Manager (HBS)', 'DEPHD', 'COM', 'root', NOW());
INSERT INTO mst_hrjob (`hrjob_id`, `hrjob_name`, `hrgrd_id`, `deptmodel_id`, `_createby`, `_createdate`) VALUES ('COM-BM-FRG', 'Brand Manager FRG', 'DEPHD', 'COM', 'root', NOW());



