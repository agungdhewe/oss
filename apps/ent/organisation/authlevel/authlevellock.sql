CREATE TABLE `lck_authlevel` (
	`authlevel_id` varchar(10) NOT NULL , 
	PRIMARY KEY (`authlevel_id`)
) 
ENGINE=InnoDB
COMMENT='Auth level yang tidak boleh dihapus';

ALTER TABLE `lck_authlevel` ADD KEY `authlevel_id` (`authlevel_id`);
ALTER TABLE `lck_authlevel` ADD CONSTRAINT `fk_lck_authlevel_mst_authlevel` FOREIGN KEY (`authlevel_id`) REFERENCES `mst_authlevel` (`authlevel_id`);


