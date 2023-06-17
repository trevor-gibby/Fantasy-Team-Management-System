DROP TABLE IF EXISTS `owners`;

CREATE TABLE `owners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(32) NOT NULL,
  `address1` varchar(128) NOT NULL,
  `address2` varchar(128) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `team_id` int DEFAULT NULL,
  `email` varchar(128) NOT NULL,
  `phone` varchar(24) NOT NULL,
  `password` varchar(32) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `owners` WRITE;

INSERT INTO `owners` VALUES (1, "Admin", "Admin", "Admin", NULL, "Admin", "AD", "Admin", 1, "admin@gmail.com", "9999999999", "adminPassword1!", "admin");

UNLOCK TABLES;