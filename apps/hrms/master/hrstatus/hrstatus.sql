CREATE TABLE `mst_hrstatus` (
	`hrstatus_id` varchar(3) NOT NULL , 
	`hrstatus_name` varchar(30) NOT NULL , 
	`hrstatus_descr` varchar(90)  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `hrstatus_name` (`hrstatus_name`),
	PRIMARY KEY (`hrstatus_id`)
) 
ENGINE=InnoDB
COMMENT='Master Status HR';




INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('PE', 'PERMANENT', 'root', NOW());
INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('C0', 'PROBATION', 'root', NOW());
INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('C1', 'CONTRACT I', 'root', NOW());
INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('C2', 'CONTRACT II', 'root', NOW());
INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('C3', 'CONTRACT III', 'root', NOW());
INSERT INTO mst_hrstatus (`hrstatus_id`, `hrstatus_name`, `_createby`, `_createdate`) VALUES ('T1', 'TRAINEE', 'root', NOW());



