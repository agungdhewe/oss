CREATE TABLE `mst_prov` (
	`prov_id` varchar(30) NOT NULL , 
	`prov_name` varchar(60) NOT NULL , 
	`prov_capital` varchar(60) NOT NULL , 
	`area_id` varchar(30) NOT NULL , 
	`_createby` varchar(13) NOT NULL , 
	`_createdate` datetime NOT NULL DEFAULT current_timestamp(), 
	`_modifyby` varchar(13)  , 
	`_modifydate` datetime  , 
	UNIQUE KEY `prov_name` (`prov_name`),
	PRIMARY KEY (`prov_id`)
) 
ENGINE=InnoDB
COMMENT='Daftar Propinsi';

ALTER TABLE `mst_prov` ADD KEY `area_id` (`area_id`);

ALTER TABLE `mst_prov` ADD CONSTRAINT `fk_mst_prov_mst_area` FOREIGN KEY (`area_id`) REFERENCES `mst_area` (`area_id`);


INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('01', 'Nanggroe Aceh Darussalam', 'Banda Aceh', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('02', 'Sumatera Utara', 'Medan', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('03', 'Sumatera Barat', 'Padang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('04', 'Riau', 'Pekan Baru', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('05', 'Kepulauan Riau', 'Tanjung Pinang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('06', 'Jambi', 'Jambi', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('07', 'Bengkulu', 'Bengkulu', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('08', 'Sumatera Selatan', 'Palembang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('09', 'Kepulauan Bangka Belitung', 'Pangkal Pinang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('10', 'Lampung', 'Bandar Lampung', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('11', 'Banten', 'Serang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('12', 'DKI Jakarta', 'Jakarta', 'DK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('13', 'Jawa Barat', 'Bandung', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('14', 'Jawa Tengah', 'Semarang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('15', 'Jawa Timur', 'Surabaya', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('16', 'DI Yogyakarta', 'Yogyakarta', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('17', 'Bali', 'Denpasar', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('18', 'Nusa Tenggara Barat', 'Mataram', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('19', 'Nusa Tenggara Timur', 'Kupang', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('20', 'Kalimantan Barat', 'Pontianak', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('21', 'Kalimantan Selatan', 'Banjarmasin', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('22', 'Kalimantan Tengah', 'Palangkaraya', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('23', 'Kalimantan Timur', 'Samarinda', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('24', 'Kalimantan Utara', 'Tanjung Selor', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('25', 'Gorontalo', 'Gorontalo', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('26', 'Sulawesi Selatan', 'Makassar', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('27', 'Sulawesi Tenggara', 'Kendari', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('28', 'Sulawesi Tengah', 'Palu', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('29', 'Sulawesi Utara', 'Manado', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('30', 'Sulawesi Barat', 'Mamuju', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('31', 'Maluku', 'Ambon.', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('32', 'Maluku Utara', 'Sofifi', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('33', 'Papua', 'Jayapura', 'LK', 'root', NOW());
INSERT INTO mst_prov (`prov_id`, `prov_name`, `prov_capital`, `area_id`, `_createby`, `_createdate`) VALUES ('34', 'Papua Barat', 'Manokwar', 'LK', 'root', NOW());



