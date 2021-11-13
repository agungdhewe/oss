CREATE TABLE `mst_sitemodel` (
	`sitemodel_id` varchar(10) NOT NULL , 
	`sitemodel_name` varchar(60) NOT NULL , 
	`sitemodel_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `sitemodel_name` (`sitemodel_name`),
	PRIMARY KEY (`sitemodel_id`)
) 
ENGINE=InnoDB
COMMENT='Master Site Model';




INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('DEA', 'DEALER', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('DC', 'DISTRIBUTION CENTER', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('DSO', 'DEPAPRTEMEN STORE', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('FNF', 'BAZAAR OR TEMPSHOP', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('HO', 'HEAD OFFICE', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('STO', 'STORE', 'root', NOW());
INSERT INTO mst_sitemodel (`sitemodel_id`, `sitemodel_name`, `_createby`, `_createdate`) VALUES ('OL', 'ONLINE CHANNEL', 'root', NOW());



