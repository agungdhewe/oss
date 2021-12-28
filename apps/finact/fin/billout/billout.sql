-- SET FOREIGN_KEY_CHECKS=0;

-- drop table if exists `trn_billout`;
-- drop table if exists `trn_billoutdetil`;


CREATE TABLE IF NOT EXISTS `trn_billout` (
	`billout_id` varchar(30) NOT NULL , 
	`billtype_id` varchar(3) NOT NULL , 
	`dept_id` varchar(30)  , 
	`billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0, 
	`orderin_id` varchar(30)  , 
	`orderinterm_id` varchar(14)  , 
	`billout_isdp` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_descr` varchar(255) NOT NULL , 
	`billout_date` date NOT NULL , 
	`billout_datedue` date NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`billout_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`ppn_taxtype_id` varchar(10)  , 
	`ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`ppn_include` tinyint(1) NOT NULL DEFAULT 0, 
	`pph_taxtype_id` varchar(10)  , 
	`pph_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0, 
	`arunbill_coa_id` varchar(17) NOT NULL , 
	`ar_coa_id` varchar(17) NOT NULL , 
	`dp_coa_id` varchar(17) NOT NULL , 
	`sales_coa_id` varchar(10) NOT NULL , 
	`salesdisc_coa_id` varchar(10)  , 
	`ppn_coa_id` varchar(10)  , 
	`ppnsubsidi_coa_id` varchar(10)  , 
	`pph_coa_id` varchar(10)  , 
	`billout_totalitem` int(5) NOT NULL DEFAULT 0, 
	`billout_totalqty` int(5) NOT NULL DEFAULT 0, 
	`billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_discount` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_pph` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_nett` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_total` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billout_dp` decimal(16, 0) NOT NULL DEFAULT 0, 
	`unit_id` varchar(10)  , 
	`owner_dept_id` varchar(30) NOT NULL , 
	`trxmodel_id` varchar(10) NOT NULL , 
	`doc_id` varchar(30) NOT NULL , 
	`billout_version` int(4) NOT NULL DEFAULT 0, 
	`billout_iscommit` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_commitby` varchar(14)  , 
	`billout_commitdate` datetime  , 
	`billout_ispost` tinyint(1) NOT NULL DEFAULT 0, 
	`billout_postby` varchar(14)  , 
	`billout_postdate` datetime  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billout_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Tagihan Keluar';


ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billtype_id` varchar(3) NOT NULL  AFTER `billout_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `dept_id` varchar(30)   AFTER `billtype_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `orderin_id` varchar(30)   AFTER `billout_isunreferenced`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `orderinterm_id` varchar(14)   AFTER `orderin_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderinterm_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_descr` varchar(255) NOT NULL  AFTER `billout_isdp`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_date` date NOT NULL  AFTER `billout_descr`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_datedue` date NOT NULL  AFTER `billout_date`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `billout_datedue`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `partner_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `billout_payment`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `pph_taxtype_id` varchar(10)   AFTER `ppn_include`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `pph_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `pph_taxtype_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `arunbill_coa_id` varchar(17) NOT NULL  AFTER `pph_taxvalue`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ar_coa_id` varchar(17) NOT NULL  AFTER `arunbill_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `dp_coa_id` varchar(17) NOT NULL  AFTER `ar_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `sales_coa_id` varchar(10) NOT NULL  AFTER `dp_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `salesdisc_coa_id` varchar(10)   AFTER `sales_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ppn_coa_id` varchar(10)   AFTER `salesdisc_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `ppnsubsidi_coa_id` varchar(10)   AFTER `ppn_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `pph_coa_id` varchar(10)   AFTER `ppnsubsidi_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `pph_coa_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billout_totalitem`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totalqty`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_salesgross`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_discount`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_subtotal`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_pph`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_nett`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_ppn`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_total`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totaladdcost`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `unit_id` varchar(10)   AFTER `billout_dp`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `owner_dept_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_version`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_commitby` varchar(14)   AFTER `billout_iscommit`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_commitdate` datetime   AFTER `billout_commitby`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_commitdate`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_postby` varchar(14)   AFTER `billout_ispost`;
ALTER TABLE `trn_billout` ADD COLUMN IF NOT EXISTS  `billout_postdate` datetime   AFTER `billout_postby`;


ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billtype_id` varchar(3) NOT NULL  AFTER `billout_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `dept_id` varchar(30)   AFTER `billtype_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_isunreferenced` tinyint(1) NOT NULL DEFAULT 0 AFTER `dept_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `orderin_id` varchar(30)   AFTER `billout_isunreferenced`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `orderinterm_id` varchar(14)   AFTER `orderin_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_isdp` tinyint(1) NOT NULL DEFAULT 0 AFTER `orderinterm_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_descr` varchar(255) NOT NULL  AFTER `billout_isdp`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_date` date NOT NULL  AFTER `billout_descr`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_datedue` date NOT NULL  AFTER `billout_date`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `partner_id` varchar(30) NOT NULL  AFTER `billout_datedue`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `partner_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ppn_taxtype_id` varchar(10)   AFTER `billout_payment`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ppn_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `ppn_taxtype_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ppn_include` tinyint(1) NOT NULL DEFAULT 0 AFTER `ppn_taxvalue`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `pph_taxtype_id` varchar(10)   AFTER `ppn_include`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `pph_taxvalue` decimal(4, 2) NOT NULL DEFAULT 0 AFTER `pph_taxtype_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `arunbill_coa_id` varchar(17) NOT NULL  AFTER `pph_taxvalue`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ar_coa_id` varchar(17) NOT NULL  AFTER `arunbill_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `dp_coa_id` varchar(17) NOT NULL  AFTER `ar_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `sales_coa_id` varchar(10) NOT NULL  AFTER `dp_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `salesdisc_coa_id` varchar(10)   AFTER `sales_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ppn_coa_id` varchar(10)   AFTER `salesdisc_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `ppnsubsidi_coa_id` varchar(10)   AFTER `ppn_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `pph_coa_id` varchar(10)   AFTER `ppnsubsidi_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `pph_coa_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billout_totalitem`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totalqty`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_salesgross`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_discount`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_subtotal`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_pph`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_nett`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_ppn`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_total`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billout_totaladdcost`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `unit_id` varchar(10)   AFTER `billout_dp`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `owner_dept_id` varchar(30) NOT NULL  AFTER `unit_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `trxmodel_id` varchar(10) NOT NULL  AFTER `owner_dept_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `doc_id` varchar(30) NOT NULL  AFTER `trxmodel_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_version` int(4) NOT NULL DEFAULT 0 AFTER `doc_id`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_iscommit` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_version`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_commitby` varchar(14)   AFTER `billout_iscommit`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_commitdate` datetime   AFTER `billout_commitby`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_ispost` tinyint(1) NOT NULL DEFAULT 0 AFTER `billout_commitdate`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_postby` varchar(14)   AFTER `billout_ispost`;
ALTER TABLE `trn_billout` MODIFY COLUMN IF EXISTS  `billout_postdate` datetime   AFTER `billout_postby`;



ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `billtype_id` (`billtype_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `dept_id` (`dept_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `orderin_id` (`orderin_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `orderinterm_id` (`orderinterm_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `partner_id` (`partner_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `ppn_taxtype_id` (`ppn_taxtype_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `pph_taxtype_id` (`pph_taxtype_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `arunbill_coa_id` (`arunbill_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `ar_coa_id` (`ar_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `dp_coa_id` (`dp_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `sales_coa_id` (`sales_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `salesdisc_coa_id` (`salesdisc_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `ppn_coa_id` (`ppn_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `ppnsubsidi_coa_id` (`ppnsubsidi_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `pph_coa_id` (`pph_coa_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `unit_id` (`unit_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `owner_dept_id` (`owner_dept_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `trxmodel_id` (`trxmodel_id`);
ALTER TABLE `trn_billout` ADD KEY IF NOT EXISTS `doc_id` (`doc_id`);

ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_billtype` FOREIGN KEY IF NOT EXISTS  (`billtype_id`) REFERENCES `mst_billtype` (`billtype_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_dept` FOREIGN KEY IF NOT EXISTS  (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_trn_orderin` FOREIGN KEY IF NOT EXISTS  (`orderin_id`) REFERENCES `trn_orderin` (`orderin_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_trn_orderinterm` FOREIGN KEY IF NOT EXISTS  (`orderinterm_id`) REFERENCES `trn_orderinterm` (`orderinterm_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_partner` FOREIGN KEY IF NOT EXISTS  (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_taxtype` FOREIGN KEY IF NOT EXISTS  (`ppn_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_taxtype_2` FOREIGN KEY IF NOT EXISTS  (`pph_taxtype_id`) REFERENCES `mst_taxtype` (`taxtype_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa` FOREIGN KEY IF NOT EXISTS  (`arunbill_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_2` FOREIGN KEY IF NOT EXISTS  (`ar_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_3` FOREIGN KEY IF NOT EXISTS  (`dp_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_4` FOREIGN KEY IF NOT EXISTS  (`sales_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_5` FOREIGN KEY IF NOT EXISTS  (`salesdisc_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_6` FOREIGN KEY IF NOT EXISTS  (`ppn_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_7` FOREIGN KEY IF NOT EXISTS  (`ppnsubsidi_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_coa_8` FOREIGN KEY IF NOT EXISTS  (`pph_coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_unit` FOREIGN KEY IF NOT EXISTS  (`unit_id`) REFERENCES `mst_unit` (`unit_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_dept_2` FOREIGN KEY IF NOT EXISTS  (`owner_dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_trxmodel` FOREIGN KEY IF NOT EXISTS  (`trxmodel_id`) REFERENCES `mst_trxmodel` (`trxmodel_id`);
ALTER TABLE `trn_billout` ADD CONSTRAINT `fk_trn_billout_mst_doc` FOREIGN KEY IF NOT EXISTS  (`doc_id`) REFERENCES `mst_doc` (`doc_id`);





CREATE TABLE IF NOT EXISTS `trn_billoutdetil` (
	`billoutdetil_id` varchar(14) NOT NULL , 
	`billoutrowtype_id` varchar(3) NOT NULL , 
	`orderindelv_id` varchar(30)  , 
	`itemclass_id` varchar(14)  , 
	`billoutdetil_descr` varchar(255) NOT NULL , 
	`billoutdetil_totalitem` int(5) NOT NULL DEFAULT 0, 
	`billoutdetil_totalqty` int(5) NOT NULL DEFAULT 0, 
	`billoutdetil_salesgross` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_discount` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_subtotal` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_pph` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_nett` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_ppn` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_total` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_dp` decimal(16, 0) NOT NULL DEFAULT 0, 
	`billoutdetil_payment` decimal(16, 0) NOT NULL DEFAULT 0, 
	`accbudget_id` varchar(20)  , 
	`coa_id` varchar(17)  , 
	`billout_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`billoutdetil_id`)
) 
ENGINE=InnoDB
COMMENT='Bill out Detil';


ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutrowtype_id` varchar(3) NOT NULL  AFTER `billoutdetil_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `orderindelv_id` varchar(30)   AFTER `billoutrowtype_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `itemclass_id` varchar(14)   AFTER `orderindelv_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_descr` varchar(255) NOT NULL  AFTER `itemclass_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `billoutdetil_descr`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billoutdetil_totalitem`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_totalqty`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_salesgross`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_discount`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_subtotal`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_pph`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_nett`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_ppn`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_total`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_totaladdcost`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billoutdetil_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_dp`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `accbudget_id` varchar(20)   AFTER `billoutdetil_payment`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `coa_id` varchar(17)   AFTER `accbudget_id`;
ALTER TABLE `trn_billoutdetil` ADD COLUMN IF NOT EXISTS  `billout_id` varchar(30) NOT NULL  AFTER `coa_id`;


ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutrowtype_id` varchar(3) NOT NULL  AFTER `billoutdetil_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `orderindelv_id` varchar(30)   AFTER `billoutrowtype_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `itemclass_id` varchar(14)   AFTER `orderindelv_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_descr` varchar(255) NOT NULL  AFTER `itemclass_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_totalitem` int(5) NOT NULL DEFAULT 0 AFTER `billoutdetil_descr`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_totalqty` int(5) NOT NULL DEFAULT 0 AFTER `billoutdetil_totalitem`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_salesgross` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_totalqty`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_discount` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_salesgross`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_subtotal` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_discount`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_pph` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_subtotal`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_nett` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_pph`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_ppn` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_nett`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_total` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_ppn`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_totaladdcost` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_total`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_dp` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_totaladdcost`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billoutdetil_payment` decimal(16, 0) NOT NULL DEFAULT 0 AFTER `billoutdetil_dp`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `accbudget_id` varchar(20)   AFTER `billoutdetil_payment`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `coa_id` varchar(17)   AFTER `accbudget_id`;
ALTER TABLE `trn_billoutdetil` MODIFY COLUMN IF EXISTS  `billout_id` varchar(30) NOT NULL  AFTER `coa_id`;



ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `billoutrowtype_id` (`billoutrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `orderindelv_id` (`orderindelv_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `itemclass_id` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `accbudget_id` (`accbudget_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `coa_id` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD KEY IF NOT EXISTS `billout_id` (`billout_id`);

ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_billoutrowtype` FOREIGN KEY IF NOT EXISTS  (`billoutrowtype_id`) REFERENCES `mst_billoutrowtype` (`billoutrowtype_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_trn_orderindelv` FOREIGN KEY IF NOT EXISTS  (`orderindelv_id`) REFERENCES `trn_orderindelv` (`orderindelv_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_itemclass` FOREIGN KEY IF NOT EXISTS  (`itemclass_id`) REFERENCES `mst_itemclass` (`itemclass_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_accbudget` FOREIGN KEY IF NOT EXISTS  (`accbudget_id`) REFERENCES `mst_accbudget` (`accbudget_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_mst_coa` FOREIGN KEY IF NOT EXISTS  (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_billoutdetil` ADD CONSTRAINT `fk_trn_billoutdetil_trn_billout` FOREIGN KEY IF NOT EXISTS (`billout_id`) REFERENCES `trn_billout` (`billout_id`);





