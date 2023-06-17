DROP TABLE IF EXISTS `players`;

CREATE TABLE `players` (
	`id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar (255) NOT NULL,
    `last_name` varchar (255) NOT NULL,
    `nba_team` varchar (255),
    `fantasy_team_id` int NOT NULL,
    `league_id` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `team_id` (`fantasy_team_id`),
    KEY `leauge_id_2` (`league_id`),
    CONSTRAINT `fk_league_players` FOREIGN KEY (`league_id`) REFERENCES `leagues` (`id`)
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
