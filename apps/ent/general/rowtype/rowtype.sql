CREATE TABLE `mst_rowtype` (
	`rowtype_id` varchar(5) NOT NULL , 
	`rowtype_name` varchar(30) NOT NULL , 
	`rowtype_tag` varchar(20) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `rowtype_name` (`rowtype_id`, `rowtype_name`),
	PRIMARY KEY (`rowtype_id`)
) 
ENGINE=InnoDB
COMMENT='Row Type';




INSERT INTO mst_rowtype (`rowtype_id`, `rowtype_name`, `rowtype_tag`, `_createby`, `_createdate`) VALUES ('ITEM', 'ITEM', 'BILL', 'root', NOW());
INSERT INTO mst_rowtype (`rowtype_id`, `rowtype_name`, `rowtype_tag`, `_createby`, `_createdate`) VALUES ('PPN', 'PPN', 'BILL', 'root', NOW());
INSERT INTO mst_rowtype (`rowtype_id`, `rowtype_name`, `rowtype_tag`, `_createby`, `_createdate`) VALUES ('PPH', 'PPh', 'BILL', 'root', NOW());



