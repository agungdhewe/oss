-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `mst_trxmodel`;


CREATE TABLE `mst_trxmodel` (
	`trxmodel_id` varchar(10) NOT NULL , 
	`trxmodel_name` varchar(30) NOT NULL , 
	`trxmodel_descr` varchar(90)  , 
	`trxmodel_direction` varchar(3)  , 
	`ppn_taxtype_id` varchar(10)  , 
	`pph_taxtype_id` varchar(10)  , 
	`trxmodel_isuseqty` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isusedays` tinyint(1) NOT NULL DEFAULT 0, 
	`trxmodel_isusetask` tinyint(1) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `trxmodel_name` (`trxmodel_name`),
	PRIMARY KEY (`trxmodel_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Model Transaksi';

ALTER TABLE `mst_trxmodel` ADD KEY `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `mst_trxmodel` ADD KEY `pph_taxtype_id` (`pph_taxtype_id`);

ALTER TABLE `mst_trxmodel` ADD CONSTRAINT `fk_mst_trxmodel_mst_taxtype` FOREIGN KEY (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `mst_trxmodel` ADD CONSTRAINT `fk_mst_trxmodel_mst_taxtype_2` FOREIGN KEY (`pph_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);


INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('PUR', 'PURCHASE', 'OUT', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('REN', 'RENTAL', 'OUT', 'PPN', null, '1', '1', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('SAL', 'SALES', 'IN', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('SER', 'SERVICE', 'OUT', 'PPN', null, '1', '0', '0', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('TAL', 'TALENT', 'OUT', 'PPN', null, '0', '1', '1', 'root', NOW());
INSERT INTO mst_trxmodel (`trxmodel_id`, `trxmodel_name`, `trxmodel_direction`, `ppn_taxtype_id`, `pph_taxtype_id`, `trxmodel_isuseqty`, `trxmodel_isusedays`, `trxmodel_isusetask`, `_createby`, `_createdate`) VALUES ('USE', 'USE', 'USE', 'PPN', null, '1', '1', '1', 'root', NOW());



