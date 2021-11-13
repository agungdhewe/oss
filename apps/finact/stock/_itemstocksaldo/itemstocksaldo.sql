CREATE TABLE `mst_itemstocksaldo` (
	`itemstocksaldo_id` varchar(14) NOT NULL , 
	`itemstocksaldo_ref` varchar(17) NOT NULL DEFAULT (uuid_short()), 
	`itemstocksaldo_date` datetime NOT NULL DEFAULT (now()), 
	`itemstock_id` varchar(14) NOT NULL , 
	`site_id` varchar(30) NOT NULL , 
	`itemstocksaldo_qty` int(4) NOT NULL DEFAULT 0, 
	`itemstocksaldo_value` decimal(14, 2) NOT NULL DEFAULT 0, 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `itemstocksaldo_pair` (`itemstock_id`, `site_id`),
	PRIMARY KEY (`itemstocksaldo_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Saldo Item Stock per site';

ALTER TABLE `mst_itemstocksaldo` ADD KEY `itemstock_id` (`itemstock_id`);
ALTER TABLE `mst_itemstocksaldo` ADD KEY `site_id` (`site_id`);

ALTER TABLE `mst_itemstocksaldo` ADD CONSTRAINT `fk_mst_itemstocksaldo_mst_itemstock` FOREIGN KEY (`itemstock_id`) REFERENCES `mst_itemstock` (`itemstock_id`);
ALTER TABLE `mst_itemstocksaldo` ADD CONSTRAINT `fk_mst_itemstocksaldo_mst_site` FOREIGN KEY (`site_id`) REFERENCES `mst_site` (`site_id`);





