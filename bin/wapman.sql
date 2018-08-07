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
  `mode` varchar(15) NOT NULL,
  `type` varchar(15) NOT NULL,
  `client` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `wap_signed`;
CREATE TABLE `wap_signed` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(15) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `type` varchar(15) NOT NULL,
  `reward` varchar(15) NOT NULL,
  `client` varchar(64) DEFAULT NULL,
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `wap_mall`;
CREATE TABLE `wap_mall` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sdk` int(15) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `type` varchar(15) NOT NULL,
  `real_val` int(15) NOT NULL,
  `real_unit` int(3) NOT NULL,
  `vir_val` int(15) NOT NULL,
  `vir_unit` int(3) NOT NULL,
  `status` int(1) DEFAULT NULL,
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `wap_unit`;
CREATE TABLE `wap_unit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL DEFAULT 0,
  `name` varchar(20) NOT NULL,
  `mode` varchar(15) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
