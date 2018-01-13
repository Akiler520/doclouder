/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : aims

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-01-27 16:22:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dms_area
-- ----------------------------
DROP TABLE IF EXISTS `dms_area`;
CREATE TABLE `dms_area` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_document
-- ----------------------------
DROP TABLE IF EXISTS `dms_document`;
CREATE TABLE `dms_document` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'name of document',
  `name_disk` varchar(255) DEFAULT NULL,
  `ext` varchar(24) DEFAULT NULL COMMENT 'extension of document',
  `size` int(24) DEFAULT NULL COMMENT 'size of document',
  `id_user` int(12) DEFAULT NULL COMMENT 'id of user, aims_user',
  `id_folder` int(12) DEFAULT NULL COMMENT 'id of folder, aims_folder',
  `id_document_type` int(12) DEFAULT NULL COMMENT 'id of document type',
  `password` varchar(255) DEFAULT NULL,
  `hide_to` varchar(255) DEFAULT NULL COMMENT 'hide to user or group',
  `is_valid` tinyint(1) DEFAULT '1' COMMENT '1=valid,0=invalid',
  `is_verify` tinyint(1) DEFAULT '1' COMMENT '1=passed,0=refused',
  `time_verify` datetime DEFAULT NULL,
  `time_update` datetime DEFAULT NULL,
  `time_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_document_info
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_info`;
CREATE TABLE `dms_document_info` (
  `id` int(12) NOT NULL,
  `id_document` int(12) NOT NULL,
  `content` text,
  `description` text,
  `keyword` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_document_rule
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_rule`;
CREATE TABLE `dms_document_rule` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_element` int(12) DEFAULT NULL,
  `element_type` tinyint(1) DEFAULT NULL,
  `rule` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_document_type
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_type`;
CREATE TABLE `dms_document_type` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_document_version
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_version`;
CREATE TABLE `dms_document_version` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_document` int(12) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_disk` varchar(255) DEFAULT NULL,
  `version` int(12) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `time_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_folder
-- ----------------------------
DROP TABLE IF EXISTS `dms_folder`;
CREATE TABLE `dms_folder` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'name of folder',
  `pid` int(12) DEFAULT NULL COMMENT 'id of its parent folder',
  `id_folder_type` int(12) DEFAULT NULL COMMENT 'id of the type of folder',
  `password` varchar(255) DEFAULT NULL,
  `description` text,
  `hide_to` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  `time_update` datetime DEFAULT NULL,
  `time_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_folder_type
-- ----------------------------
DROP TABLE IF EXISTS `dms_folder_type`;
CREATE TABLE `dms_folder_type` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id_area` int(12) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_log
-- ----------------------------
DROP TABLE IF EXISTS `dms_log`;
CREATE TABLE `dms_log` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_user` int(12) DEFAULT NULL,
  `operation` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_permission
-- ----------------------------
DROP TABLE IF EXISTS `dms_permission`;
CREATE TABLE `dms_permission` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_permission_list
-- ----------------------------
DROP TABLE IF EXISTS `dms_permission_list`;
CREATE TABLE `dms_permission_list` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_element` int(12) DEFAULT NULL,
  `element_type` tinyint(1) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  `is_inherited` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_remind
-- ----------------------------
DROP TABLE IF EXISTS `dms_remind`;
CREATE TABLE `dms_remind` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_user` int(12) DEFAULT NULL,
  `id_user_group` int(12) DEFAULT NULL,
  `level` tinyint(1) DEFAULT NULL,
  `info` text,
  `trigger` tinyint(1) DEFAULT '0',
  `is_email` tinyint(1) DEFAULT '0',
  `time_create` datetime DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_setting
-- ----------------------------
DROP TABLE IF EXISTS `dms_setting`;
CREATE TABLE `dms_setting` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `id_user` int(12) DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_system_info
-- ----------------------------
DROP TABLE IF EXISTS `dms_system_info`;
CREATE TABLE `dms_system_info` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `level` tinyint(1) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_user
-- ----------------------------
DROP TABLE IF EXISTS `dms_user`;
CREATE TABLE `dms_user` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `vorname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_group` int(12) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `computer` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `time_create` datetime DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_user_group
-- ----------------------------
DROP TABLE IF EXISTS `dms_user_group`;
CREATE TABLE `dms_user_group` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_verify_master
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_master`;
CREATE TABLE `dms_verify_master` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) DEFAULT NULL,
  `id_user_group` varchar(255) DEFAULT NULL,
  `id_element` int(12) DEFAULT NULL,
  `element_type` int(1) DEFAULT NULL,
  `id_permission` int(12) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_verify_request
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_request`;
CREATE TABLE `dms_verify_request` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_verify_type` int(12) DEFAULT NULL,
  `id_user_apply` int(12) DEFAULT NULL,
  `id_user_verify` varchar(255) DEFAULT NULL,
  `id_element` int(12) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `info` text,
  `comment` text,
  `status` tinyint(1) DEFAULT '0',
  `time_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for dms_verify_target
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_target`;
CREATE TABLE `dms_verify_target` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `id_element` int(12) DEFAULT NULL,
  `element_type` int(1) DEFAULT NULL,
  `id_user_verify` varchar(255) DEFAULT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `id_user_group` varchar(255) DEFAULT NULL,
  `id_permission` int(12) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_all` tinyint(1) DEFAULT '1',
  `is_valid` tinyint(1) DEFAULT '1',
  `is_inherited` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
