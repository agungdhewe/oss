-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_collfuptype`;


CREATE TABLE `mst_collfuptype` (
	`collfuptype_id` varchar(10) NOT NULL , 
	`collfuptype_name` varchar(30) NOT NULL , 
	`collfuptype_descr` varchar(90)  , 
	`collfuptype_iscollect` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `collfuptype_name` (`collfuptype_name`),
	PRIMARY KEY (`collfuptype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Followup';




INSERT INTO mst_collfuptype (`collfuptype_id`, `collfuptype_name`, `collfuptype_iscollect`, `_createby`, `_createdate`) VALUES ('COL', 'COLLECT', '1', 'root', NOW());
INSERT INTO mst_collfuptype (`collfuptype_id`, `collfuptype_name`, `_createby`, `_createdate`) VALUES ('TEL', 'TELPON', 'root', NOW());
INSERT INTO mst_collfuptype (`collfuptype_id`, `collfuptype_name`, `_createby`, `_createdate`) VALUES ('IM', 'INSTANT MESSAGING', 'root', NOW());
INSERT INTO mst_collfuptype (`collfuptype_id`, `collfuptype_name`, `_createby`, `_createdate`) VALUES ('EM', 'EMAIL', 'root', NOW());



