DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `owner_id` int NOT NULL,
  `league_id` int NOT NULL,
  `notes` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id_2` (`owner_id`),
  KEY `league_id` (`league_id`),
  CONSTRAINT `fk_owner` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`),
  CONSTRAINT `fk_league` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `teams` WRITE;

INSERT INTO `teams` VALUES (1, "No Team", 1, 1, 'Admin Team');

UNLOCK TABLES;