CREATE TABLE `mst_empluser` (
  `empl_id` varchar(30) NOT NULL,
  `user_id` varchar(14) NOT NULL,
  PRIMARY KEY (`empl_id`),
  UNIQUE KEY `mst_empluser_user_id_IDX` (`user_id`) USING BTREE,
  CONSTRAINT `mst_empluser_fgt_user` FOREIGN KEY (`user_id`) REFERENCES `fgt_user` (`user_id`),
  CONSTRAINT `mst_empluser_mst_empl` FOREIGN KEY (`empl_id`) REFERENCES `mst_empl` (`empl_id`)
) ENGINE=InnoDB;