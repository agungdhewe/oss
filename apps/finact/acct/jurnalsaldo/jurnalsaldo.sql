CREATE TABLE `mst_periodemo` (
	`periodemo_id` varchar(6) NOT NULL , 
	`periodemo_name` varchar(30) NOT NULL , 
	`periodemo_year` int(4) NOT NULL , 
	`periodemo_month` int(2) NOT NULL , 
	`periodemo_dtstart` date NOT NULL , 
	`periodemo_dtend` date NOT NULL , 
	`periodemo_isclosed` tinyint(1) NOT NULL DEFAULT 0, 
	`periodemo_closeby` varchar(14)  , 
	`periodemo_closedate` date  , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	PRIMARY KEY (`periodemo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Periode Bulanan';







CREATE TABLE `trn_jurnalsaldo` (
	`jurnalsaldo_id` varchar(15) NOT NULL , 
	`jurnal_id` varchar(14)  , 
	`jurnal_date` date NOT NULL , 
	`jurnal_duedate` date NOT NULL , 
	`jurnaldetil_id` varchar(14)  , 
	`jurnaldetil_descr` varchar(255)  , 
	`coamodel_id` varchar(10) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`curr_id` varchar(10) NOT NULL , 
	`jurnalsaldo_date` date NOT NULL , 
	`jurnalsaldo_awal_frg` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnalsaldo_awal_idr` decimal(14, 2) NOT NULL DEFAULT 0, 
	`periodemo_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `jurnalsaldo_periode` (`periodemo_id`, `jurnaldetil_id`, `coa_id`, `dept_id`, `partner_id`, `curr_id`),
	PRIMARY KEY (`jurnalsaldo_id`)
) 
ENGINE=InnoDB
COMMENT='Saldo Aging Periode Bulanan';

ALTER TABLE `trn_jurnalsaldo` ADD KEY `coamodel_id` (`coamodel_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY `curr_id` (`curr_id`);
ALTER TABLE `trn_jurnalsaldo` ADD KEY `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_coamodel` FOREIGN KEY (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_curr` FOREIGN KEY (`curr_id`) REFERENCES `mst_curr` (`curr_id`);
ALTER TABLE `trn_jurnalsaldo` ADD CONSTRAINT `fk_trn_jurnalsaldo_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





CREATE TABLE `trn_periodesummary` (
	`periodesummary_id` varchar(15) NOT NULL , 
	`coamodel_id` varchar(10) NOT NULL , 
	`coa_id` varchar(20) NOT NULL , 
	`dept_id` varchar(30) NOT NULL , 
	`partner_id` varchar(30) NOT NULL , 
	`jurnalsaldo_awal` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnalsaldo_mutasi` decimal(14, 2) NOT NULL DEFAULT 0, 
	`jurnalsaldo_akhir` decimal(14, 2) NOT NULL DEFAULT 0, 
	`periodemo_id` varchar(14) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `periodesummary_periode` (`periodemo_id`, `coa_id`, `dept_id`, `partner_id`),
	PRIMARY KEY (`periodesummary_id`)
) 
ENGINE=InnoDB
COMMENT='Summary Periode Bulanan, terisi pada saat periode sudah close';

ALTER TABLE `trn_periodesummary` ADD KEY `coamodel_id` (`coamodel_id`);
ALTER TABLE `trn_periodesummary` ADD KEY `coa_id` (`coa_id`);
ALTER TABLE `trn_periodesummary` ADD KEY `dept_id` (`dept_id`);
ALTER TABLE `trn_periodesummary` ADD KEY `partner_id` (`partner_id`);
ALTER TABLE `trn_periodesummary` ADD KEY `periodemo_id` (`periodemo_id`);

ALTER TABLE `trn_periodesummary` ADD CONSTRAINT `fk_trn_periodesummary_mst_coamodel` FOREIGN KEY (`coamodel_id`) REFERENCES `mst_coamodel` (`coamodel_id`);
ALTER TABLE `trn_periodesummary` ADD CONSTRAINT `fk_trn_periodesummary_mst_coa` FOREIGN KEY (`coa_id`) REFERENCES `mst_coa` (`coa_id`);
ALTER TABLE `trn_periodesummary` ADD CONSTRAINT `fk_trn_periodesummary_mst_dept` FOREIGN KEY (`dept_id`) REFERENCES `mst_dept` (`dept_id`);
ALTER TABLE `trn_periodesummary` ADD CONSTRAINT `fk_trn_periodesummary_mst_partner` FOREIGN KEY (`partner_id`) REFERENCES `mst_partner` (`partner_id`);
ALTER TABLE `trn_periodesummary` ADD CONSTRAINT `fk_trn_periodesummary_mst_periodemo` FOREIGN KEY (`periodemo_id`) REFERENCES `mst_periodemo` (`periodemo_id`);





