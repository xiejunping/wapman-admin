DROP TABLE IF EXISTS `wap_user`;
CREATE TABLE `wap_user` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `password` varchar(65) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  `sex` int(1) DEFAULT 0,
  `qq` varchar(15) DEFAULT NULL,
  `cid` varchar(20) DEFAULT NULL,
  `is_setpass` int(1) NOT NULL DEFAULT 0,
  `reg_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(255) DEFAULT NULL,
  `pid` varchar(20) DEFAULT NULL,
  `all_pid` varchar(255) DEFAULT NULL,
  `coin` int(5) DEFAULT 0,
  `score` int(5) DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique_key` (`name`, `phone`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `wap_login`;
CREATE TABLE `wap_login` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sessionId` varchar(64) DEFAULT NULL,
  `client` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
