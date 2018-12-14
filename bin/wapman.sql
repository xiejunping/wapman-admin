-- ----------------------------
-- Table structure for wap_access
-- ----------------------------
DROP TABLE IF EXISTS `wap_access`;
CREATE TABLE `wap_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8 NOT NULL COMMENT '权限名称',
  `urls` varchar(100) CHARACTER SET utf8 NOT NULL COMMENT '权限链接',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1 -> 有效 ',
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for wap_group
-- ----------------------------
DROP TABLE IF EXISTS `wap_group`;
CREATE TABLE `wap_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `name` varchar(20) NOT NULL COMMENT '用户分组',
  `level` tinyint(1) NOT NULL DEFAULT '1' COMMENT '等级',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1 -> 有效 0 -> 禁用',
  `order` tinyint(2) NOT NULL DEFAULT '0' COMMENT '排序',
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_group_user
-- ----------------------------
DROP TABLE IF EXISTS `wap_group_user`;
CREATE TABLE `wap_group_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(11) unsigned NOT NULL COMMENT '用户ID',
  `gid` int(11) unsigned NOT NULL COMMENT '组ID',
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`) USING BTREE COMMENT '唯一分组'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_login
-- ----------------------------
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_mall
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_menu
-- ----------------------------
DROP TABLE IF EXISTS `wap_menu`;
CREATE TABLE `wap_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL DEFAULT '0' COMMENT '父级ID',
  `name` varchar(20) NOT NULL,
  `title` varchar(50) NOT NULL COMMENT '菜单名称',
  `path` varchar(50) NOT NULL COMMENT '链接',
  `level` tinyint(2) NOT NULL DEFAULT '1' COMMENT '菜单等级',
  `order` tinyint(2) NOT NULL DEFAULT '0' COMMENT '排序',
  `icon` varchar(20) NOT NULL COMMENT '图标',
  `component` varchar(20) NOT NULL COMMENT '组件名',
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1 -> 启用 0 -> 禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `path` (`path`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_role
-- ----------------------------
DROP TABLE IF EXISTS `wap_role`;
CREATE TABLE `wap_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `gid` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态 1 -> 有效 0 -> 无效',
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_role_access
-- ----------------------------
DROP TABLE IF EXISTS `wap_role_access`;
CREATE TABLE `wap_role_access` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `access_id` int(11) NOT NULL,
  `creat_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '更新日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for wap_signed
-- ----------------------------
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_unit
-- ----------------------------
DROP TABLE IF EXISTS `wap_unit`;
CREATE TABLE `wap_unit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) NOT NULL DEFAULT '0',
  `name` varchar(20) NOT NULL,
  `mode` varchar(15) DEFAULT NULL,
  `status` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wap_user
-- ----------------------------
DROP TABLE IF EXISTS `wap_user`;
CREATE TABLE `wap_user` (
  `id` int(15) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL COMMENT '账号',
  `phone` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `nickname` varchar(20) DEFAULT NULL COMMENT '昵称',
  `password` varchar(65) DEFAULT NULL COMMENT '密码',
  `email` varchar(20) DEFAULT NULL COMMENT '验证邮箱',
  `sex` int(1) unsigned DEFAULT '0' COMMENT '性别 0 -> 男  1 -> 女',
  `qq` varchar(15) DEFAULT NULL COMMENT '腾讯QQ',
  `cid` varchar(20) DEFAULT NULL COMMENT '邀请码',
  `is_setpass` int(1) NOT NULL DEFAULT '0' COMMENT '是否设置密码 1-> 设置  0 -> 未设',
  `reg_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册日期',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `pid` varchar(20) DEFAULT NULL COMMENT '推荐码',
  `all_pid` varchar(255) DEFAULT NULL COMMENT '推荐树',
  `coin` int(5) DEFAULT '0' COMMENT '金币',
  `score` int(5) DEFAULT '0' COMMENT '积分',
  `super` tinyint(1) NOT NULL DEFAULT '0' COMMENT '超级管理  1 -> 是 0 -> 否',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique_key` (`name`,`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
