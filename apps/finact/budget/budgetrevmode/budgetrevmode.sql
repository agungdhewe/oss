-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_budgetrevmode`;


CREATE TABLE `mst_budgetrevmode` (
	`budgetrevmode_id` varchar(10) NOT NULL , 
	`budgetrevmode_name` varchar(60) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `budgetrevmode_name` (`budgetrevmode_name`),
	PRIMARY KEY (`budgetrevmode_id`)
) 
ENGINE=InnoDB
COMMENT='Budget Revision Mode';




INSERT INTO mst_budgetrevmode (`budgetrevmode_id`, `budgetrevmode_name`, `_createby`, `_createdate`) VALUES ('A', 'Tambah Baru', 'root', NOW());
INSERT INTO mst_budgetrevmode (`budgetrevmode_id`, `budgetrevmode_name`, `_createby`, `_createdate`) VALUES ('U', 'Update Existing', 'root', NOW());



