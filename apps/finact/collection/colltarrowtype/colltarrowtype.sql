-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_colltarrowtype`;


CREATE TABLE `mst_colltarrowtype` (
	`colltarrowtype_id` varchar(10) NOT NULL , 
	`colltarrowtype_name` varchar(30) NOT NULL , 
	`colltarrowtype_descr` varchar(255)  , 
	`colltarrowtype_order` int(4) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `colltarrowtype_name` (`colltarrowtype_name`),
	PRIMARY KEY (`colltarrowtype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Source';




INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('SAL', 'Saldo', '10', 'root', NOW());
INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('ALB', 'Allowance Bad Deb', '20', 'root', NOW());
INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('PAR', 'Agency', '30', 'root', NOW());
INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('SAR', 'Saldo AR Adjusted', '40', 'root', NOW());
INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('FOR', 'Formulasi Target (35%)', '50', 'root', NOW());
INSERT INTO mst_colltarrowtype (`colltarrowtype_id`, `colltarrowtype_name`, `colltarrowtype_order`, `_createby`, `_createdate`) VALUES ('ESL', 'Saldo Ending', '50', 'root', NOW());



