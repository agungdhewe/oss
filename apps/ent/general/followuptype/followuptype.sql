CREATE TABLE `mst_followuptype` (
	`followuptype_id` varchar(10) NOT NULL , 
	`followuptype_name` varchar(30) NOT NULL , 
	`followuptype_descr` varchar(90)  , 
	`followuptype_isusephone` tinyint(1) NOT NULL DEFAULT 0, 
	`followuptype_isuseemail` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `followuptype_name` (`followuptype_name`),
	PRIMARY KEY (`followuptype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tipe Followup';




INSERT INTO mst_followuptype (`followuptype_id`, `followuptype_name`, `followuptype_isusephone`, `_createby`, `_createdate`) VALUES ('TEL', 'TELPON', '1', 'root', NOW());
INSERT INTO mst_followuptype (`followuptype_id`, `followuptype_name`, `followuptype_isusephone`, `_createby`, `_createdate`) VALUES ('IM', 'INSTANT MESSAGING', '1', 'root', NOW());
INSERT INTO mst_followuptype (`followuptype_id`, `followuptype_name`, `followuptype_isuseemail`, `_createby`, `_createdate`) VALUES ('EM', 'EMAIL', '1', 'root', NOW());



