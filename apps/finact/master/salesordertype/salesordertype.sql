CREATE TABLE `mst_salesordertype` (
	`salesordertype_id` varchar(10) NOT NULL , 
	`salesordertype_name` varchar(30)  , 
	`salesordertype_descr` varchar(90)  , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`sales_coa_id` varchar(10) NOT NULL , 
	`discount_coa_id` varchar(10) NOT NULL , 
	`unbill_coa_id` varchar(10) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `salesordertype_name` (`salesordertype_name`),
	PRIMARY KEY (`salesordertype_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar tipe-tipe Sales Order';

ALTER TABLE `mst_salesordertype` ADD KEY `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `mst_salesordertype` ADD KEY `sales_coa_id` (`sales_coa_id`);
ALTER TABLE `mst_salesordertype` ADD KEY `discount_coa_id` (`discount_coa_id`);
ALTER TABLE `mst_salesordertype` ADD KEY `unbill_coa_id` (`unbill_coa_id`);

ALTER TABLE `mst_salesordertype` ADD CONSTRAINT `fk_mst_salesordertype_mst_trxmodel` FOREIGN KEY (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `mst_salesordertype` ADD CONSTRAINT `fk_mst_salesordertype_mst_coa` FOREIGN KEY (`sales_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_salesordertype` ADD CONSTRAINT `fk_mst_salesordertype_mst_coa_2` FOREIGN KEY (`discount_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `mst_salesordertype` ADD CONSTRAINT `fk_mst_salesordertype_mst_coa_3` FOREIGN KEY (`unbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);


INSERT INTO mst_salesordertype (`salesordertype_id`, `salesordertype_name`, `trxmodel_id`, `sales_coa_id`, `discount_coa_id`, `unbill_coa_id`, `_createby`, `_createdate`) VALUES ('MO', 'MEDIA ORDER', 'SAL', '5050001', '5050002', '1051000', 'root', NOW());
INSERT INTO mst_salesordertype (`salesordertype_id`, `salesordertype_name`, `trxmodel_id`, `sales_coa_id`, `discount_coa_id`, `unbill_coa_id`, `_createby`, `_createdate`) VALUES ('SA', 'SALES ORDER', 'SAL', '5050001', '5050002', '1051000', 'root', NOW());
INSERT INTO mst_salesordertype (`salesordertype_id`, `salesordertype_name`, `trxmodel_id`, `sales_coa_id`, `discount_coa_id`, `unbill_coa_id`, `_createby`, `_createdate`) VALUES ('WSO', 'WHOLESALE ORDER', 'SAL', '5050001', '5050002', '1051000', 'root', NOW());



