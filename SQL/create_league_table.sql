DROP TABLE IF EXISTS `leagues`;

CREATE TABLE `leagues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


LOCK TABLES `leagues` WRITE;

INSERT INTO `leagues` VALUES (1, "Gibby's Fantasy League");

UNLOCK TABLES;