CREATE TABLE `mst_marital` (
	`marital_id` varchar(2) NOT NULL , 
	`marital_name` varchar(30) NOT NULL , 
	`marital_descr` varchar(90)  , 
	`marital_ptkpval` decimal(8, 0) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `marital_name` (`marital_name`),
	PRIMARY KEY (`marital_id`)
) 
ENGINE=InnoDB
COMMENT='Master Marital';




INSERT INTO mst_marital (`marital_id`, `marital_name`, `marital_descr`, `marital_ptkpval`, `_createby`, `_createdate`) VALUES ('TK', 'Tidak Menikah', 'Tidak Menikah', '0', 'root', NOW());
INSERT INTO mst_marital (`marital_id`, `marital_name`, `marital_descr`, `marital_ptkpval`, `_createby`, `_createdate`) VALUES ('K0', 'Menikah - K0', 'Menikah, Tidak ada anak', '4500000', 'root', NOW());
INSERT INTO mst_marital (`marital_id`, `marital_name`, `marital_descr`, `marital_ptkpval`, `_createby`, `_createdate`) VALUES ('K1', 'Menikah - K1', 'Menikah, Anak 1', '9000000', 'root', NOW());
INSERT INTO mst_marital (`marital_id`, `marital_name`, `marital_descr`, `marital_ptkpval`, `_createby`, `_createdate`) VALUES ('K2', 'Menikah - K2', 'Menikah, Anak 2', '13500000', 'root', NOW());
INSERT INTO mst_marital (`marital_id`, `marital_name`, `marital_descr`, `marital_ptkpval`, `_createby`, `_createdate`) VALUES ('K3', 'Menikah - K3', 'Menikah, Anak 3', '18000000', 'root', NOW());



