# Note: This will only work after dropping all current tables, back them somewhere if you want to save
# them before running this query.
# Only use to completely reset all data

# Create new league

DROP TABLE IF EXISTS `leagues`;

CREATE TABLE `leagues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


LOCK TABLES `leagues` WRITE;

INSERT INTO `leagues` VALUES (1, "Gibby's Fantasy League");

UNLOCK TABLES;

# Create Admin Owner

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

INSERT INTO `owners` VALUES (1, "Admin", "Admin", "Admin", NULL, "Admin", "AD", "ADMIN", 1, "admin@gmail.com", "9999999999", "adminPassword1!", "admin");

UNLOCK TABLES;

# Create Admin Team (Holds all unassigned NBA players)

DROP TABLE IF EXISTS `teams`;

CREATE TABLE `teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `owner_id` int NOT NULL,
  `league_id` int NOT NULL,
  `notes` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `teams` WRITE;

INSERT INTO `teams` VALUES (1, "No Team", 1, 1, 'Admin Team');

UNLOCK TABLES;

# Create NBA Players Database (Assigned to Admin Team)

DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
	`id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar (255) NOT NULL,
    `last_name` varchar (255) NOT NULL,
    `nba_team` varchar (255),
    `fantasy_team_id` int NOT NULL,
    `league_id` int NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

LOCK TABLES `players` WRITE;

INSERT INTO `players` VALUES 
(1,'Steph','Curry','GSW',1,1),
(2,'Joel','Embiid','PHI',1,1),
(3,'Lebron','James','LAL',1,1),
(4,'Kevin','Durant','BKN',1,1),
(5,'James','Harden','BKN',1,1),
(6,'Russell','Westbrook','WSH',1,1),
(7,'Giannis','Antetokounmpo','MIL',1,1),
(8,'Luka','Doncic','DAL',1,1),
(9,'Kyrie','Irving','BKN',1,1),
(10,'Anthony','Davis','LAL',1,1),
(11,'Zion','Williamson','NOP',1,1),
(12,'Nikola','Jokic','DEN',1,1),
(13,'Jaylen','Brown','BOS',1,1),
(14,'Kawhi','Leonard','LAC',1,1),
(15,'Jayson','Tatum','BOS',1,1),
(16,'Damian','Lillard','POR',1,1),
(17,'Bradley','Beal','WSH',1,1),
(18,'Chris','Paul','PHX',1,1),
(19,'Donovan','Mitchell','UTA',1,1),
(20,'Rudy','Gobert','UTA',1,1),
(21,'Julius','Randle','NYK',1,1),
(22,'Ben','Simmons','PHI',1,1),
(23,'Zach','Lavine','CHI',1,1),
(24,'Mike','Conley','UTA',1,1),
(25,'Jamal','Murray','DEN',1,1);

UNLOCK TABLES;
