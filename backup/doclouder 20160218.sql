/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : aims

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-02-18 18:38:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dms_area
-- ----------------------------
DROP TABLE IF EXISTS `dms_area`;
CREATE TABLE `dms_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_area
-- ----------------------------

-- ----------------------------
-- Table structure for dms_document
-- ----------------------------
DROP TABLE IF EXISTS `dms_document`;
CREATE TABLE `dms_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'name of document',
  `name_disk` varchar(255) DEFAULT NULL,
  `ext` varchar(24) DEFAULT NULL COMMENT 'extension of document',
  `size` int(24) DEFAULT NULL COMMENT 'size of document',
  `id_user` int(11) DEFAULT NULL COMMENT 'id of user, aims_user',
  `id_folder` int(11) DEFAULT NULL COMMENT 'id of folder, aims_folder',
  `id_document_type` int(11) DEFAULT '1' COMMENT 'id of document type',
  `password` varchar(255) DEFAULT NULL,
  `md5` varchar(64) DEFAULT NULL COMMENT 'md5 string of file, get 2MB',
  `hide_to` varchar(255) DEFAULT NULL COMMENT 'hide to user or group',
  `is_valid` tinyint(1) DEFAULT '1' COMMENT '1=valid,0=invalid',
  `is_verify` tinyint(1) DEFAULT '1' COMMENT '1=passed,0=refused',
  `time_verify` int(11) DEFAULT NULL,
  `time_update` int(11) DEFAULT NULL,
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1052 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document
-- ----------------------------
INSERT INTO `dms_document` VALUES ('1001', 'test1', null, 'txt', '1024', '2', '1000', '1', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1002', 'test2ccc', null, 'pdf', '5646', '1', '1000', '1', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1003', 'test3dd11', null, 'sql', '264', '1', '1000', '2', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1004', 'test4', null, 'doc', '3252', '1', '1000', '2', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1000', 'ddddccc', null, 'doc', '23432', '2', '1000', '2', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1005', 'test5500', null, 'txt', '12', '1', '1001', '1', null, null, null, '1', '1', '1454648076', '1454648076', '1454648076');
INSERT INTO `dms_document` VALUES ('1006', 'DB 20141024', 'F:/www/doclouder/public/storage/2016/02/18/\\14557587898238.docx', 'docx', '4923', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455758789');
INSERT INTO `dms_document` VALUES ('1007', '7df_admin_new', 'F:/www/doclouder/public/storage/2016/02/18/\\14557587913639.rar', 'rar', '23640727', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455758792');
INSERT INTO `dms_document` VALUES ('1008', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\1455758792227.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455758792');
INSERT INTO `dms_document` VALUES ('1009', '2 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557588053747.png', 'png', '126014', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455758805');
INSERT INTO `dms_document` VALUES ('1010', '2', 'F:/www/doclouder/public/storage/2016/02/18/\\14557588054847.png', 'png', '126014', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455758805');
INSERT INTO `dms_document` VALUES ('1011', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557620045057.png', 'png', '115374', '1', '1003', '1', null, null, null, '1', '1', null, null, '1455762004');
INSERT INTO `dms_document` VALUES ('1012', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557620046457.png', 'png', '115374', '1', '1003', '1', null, null, null, '1', '1', null, null, '1455762004');
INSERT INTO `dms_document` VALUES ('1013', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557620048367.png', 'png', '115374', '1', '1003', '1', null, null, null, '1', '1', null, null, '1455762004');
INSERT INTO `dms_document` VALUES ('1014', '2 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557620049417.png', 'png', '126014', '1', '1003', '1', null, null, null, '1', '1', null, null, '1455762004');
INSERT INTO `dms_document` VALUES ('1015', 'desktop', 'F:/www/doclouder/public/storage/2016/02/18/\\14557622560311.ini', 'ini', '174', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455762256');
INSERT INTO `dms_document` VALUES ('1016', 'desktop', 'F:/www/doclouder/public/storage/2016/02/18/\\14557623545027.ini', 'ini', '174', '2', '1000', '1', null, null, null, '1', '1', null, null, '1455762354');
INSERT INTO `dms_document` VALUES ('1017', 'ddd', null, null, null, null, null, '1', null, null, null, '1', '1', null, null, null);
INSERT INTO `dms_document` VALUES ('1018', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557626608383.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455762660');
INSERT INTO `dms_document` VALUES ('1019', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557749910815.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455774991');
INSERT INTO `dms_document` VALUES ('1020', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557749912575.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455774991');
INSERT INTO `dms_document` VALUES ('1021', '2', 'F:/www/doclouder/public/storage/2016/02/18/\\14557749913515.png', 'png', '126014', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455774991');
INSERT INTO `dms_document` VALUES ('1022', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557769891518.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455776989');
INSERT INTO `dms_document` VALUES ('1023', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557770191145.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455777019');
INSERT INTO `dms_document` VALUES ('1024', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557770602249.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455777060');
INSERT INTO `dms_document` VALUES ('1025', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557777243098.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455777724');
INSERT INTO `dms_document` VALUES ('1026', 'phalcon-cphalcon-v1.2.3-5-gae63281', 'F:/www/doclouder/public/storage/2016/02/18/\\14557780024688.zip', 'zip', '3306681', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455778002');
INSERT INTO `dms_document` VALUES ('1027', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557800190871.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780019');
INSERT INTO `dms_document` VALUES ('1028', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557800213092.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780021');
INSERT INTO `dms_document` VALUES ('1029', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557800234163.png', 'png', '115374', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780023');
INSERT INTO `dms_document` VALUES ('1030', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557800440335.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780044');
INSERT INTO `dms_document` VALUES ('1031', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557800969805.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780097');
INSERT INTO `dms_document` VALUES ('1032', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557801453433.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780145');
INSERT INTO `dms_document` VALUES ('1033', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\1455780297676.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780298');
INSERT INTO `dms_document` VALUES ('1034', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557803516341.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780352');
INSERT INTO `dms_document` VALUES ('1035', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557805476123.rar', 'rar', '13175003', '1', '1000', '1', null, null, null, '1', '1', null, null, '1455780548');
INSERT INTO `dms_document` VALUES ('1036', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557826912729.png', 'png', '115374', '1', '1000', '1', null, 'd41d8cd98f00b204e9800998ecf8427e', null, '1', '1', null, null, '1455782691');
INSERT INTO `dms_document` VALUES ('1037', '2', 'F:/www/doclouder/public/storage/2016/02/18/\\14557829765493.png', 'png', '126014', '1', '1000', '1', null, 'd41d8cd98f00b204e9800998ecf8427e', null, '1', '1', null, null, '1455782976');
INSERT INTO `dms_document` VALUES ('1038', '2 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557831435778.png', 'png', '126014', '1', '1000', '1', null, 'e983fa8c0fbbb6b774faec70c54bbe8b', null, '1', '1', null, null, '1455783143');
INSERT INTO `dms_document` VALUES ('1039', 'desktop', 'F:/www/doclouder/public/storage/2016/02/18/\\14557831623459.ini', 'ini', '174', '1', '1000', '1', null, 'dc723b859dec1526568ad581aec334d5', null, '1', '1', null, null, '1455783162');
INSERT INTO `dms_document` VALUES ('1040', 'dms 20150126', 'F:/www/doclouder/public/storage/2016/02/18/\\14557848159915.rar', 'rar', '13175003', '1', '1000', '1', null, '96e077477605a9a9be302fe0e62e62e5', null, '1', '1', null, null, '1455784816');
INSERT INTO `dms_document` VALUES ('1041', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557868341909.png', 'png', '115374', '1', '1000', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455786834');
INSERT INTO `dms_document` VALUES ('1042', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557868343279.png', 'png', '115374', '1', '1000', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455786834');
INSERT INTO `dms_document` VALUES ('1043', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557868344269.png', 'png', '115374', '1', '1000', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455786834');
INSERT INTO `dms_document` VALUES ('1044', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557871433836.png', 'png', '115374', '1', '1000', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455787143');
INSERT INTO `dms_document` VALUES ('1045', 'DMS-Design-v1.3', 'F:/www/doclouder/public/storage/2016/02/18/\\14557877354274.xlsx', 'xlsx', '31518', '1', '1002', '1', null, '6c485988a5178224d6d9babe1879c91e', null, '1', '1', null, null, '1455787735');
INSERT INTO `dms_document` VALUES ('1046', '1 - 副本 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557879055672.png', 'png', '115374', '2', '1002', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455787905');
INSERT INTO `dms_document` VALUES ('1047', '1', 'F:/www/doclouder/public/storage/2016/02/18/\\14557879057142.png', 'png', '115374', '2', '1002', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455787905');
INSERT INTO `dms_document` VALUES ('1048', '1 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557879058622.png', 'png', '115374', '2', '1002', '1', null, 'e0ca2d1aea480e742250ae207b92dbc4', null, '1', '1', null, null, '1455787905');
INSERT INTO `dms_document` VALUES ('1049', '2 - 副本', 'F:/www/doclouder/public/storage/2016/02/18/\\14557879059532.png', 'png', '126014', '2', '1002', '1', null, 'e983fa8c0fbbb6b774faec70c54bbe8b', null, '1', '1', null, null, '1455787905');
INSERT INTO `dms_document` VALUES ('1050', 'DMS-Design-v1.3', 'F:/www/doclouder/public/storage/2016/02/18/\\14557879356879.xlsx', 'xlsx', '31518', '1', '1002', '1', null, '6c485988a5178224d6d9babe1879c91e', null, '1', '1', null, null, '1455787935');
INSERT INTO `dms_document` VALUES ('1051', 'DMS-Design-v1.3', 'F:/www/doclouder/public/storage/2016/02/18/\\14557913827871.xlsx', 'xlsx', '31518', '1', '1002', '1', null, '6c485988a5178224d6d9babe1879c91e', null, '1', '1', null, null, '1455791382');

-- ----------------------------
-- Table structure for dms_document_info
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_info`;
CREATE TABLE `dms_document_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_document` int(11) NOT NULL,
  `content` text,
  `description` text,
  `keyword` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document_info
-- ----------------------------
INSERT INTO `dms_document_info` VALUES ('1', '1', 'test text', 'ddddd', 'test');

-- ----------------------------
-- Table structure for dms_document_rule
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_rule`;
CREATE TABLE `dms_document_rule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_element` int(11) DEFAULT NULL,
  `element_type` tinyint(1) DEFAULT NULL,
  `rule` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document_rule
-- ----------------------------
INSERT INTO `dms_document_rule` VALUES ('1', '1', '1', null, null, '1');

-- ----------------------------
-- Table structure for dms_document_type
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_type`;
CREATE TABLE `dms_document_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document_type
-- ----------------------------
INSERT INTO `dms_document_type` VALUES ('1', 'type1', 'testxxxx', '1');
INSERT INTO `dms_document_type` VALUES ('2', 'type2', 'test222', '1');

-- ----------------------------
-- Table structure for dms_document_version
-- ----------------------------
DROP TABLE IF EXISTS `dms_document_version`;
CREATE TABLE `dms_document_version` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_document` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `name_disk` varchar(255) DEFAULT NULL,
  `version` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document_version
-- ----------------------------

-- ----------------------------
-- Table structure for dms_folder
-- ----------------------------
DROP TABLE IF EXISTS `dms_folder`;
CREATE TABLE `dms_folder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'name of folder',
  `pid` int(11) DEFAULT NULL COMMENT 'id of its parent folder',
  `id_folder_type` int(11) DEFAULT '1' COMMENT 'id of the type of folder',
  `password` varchar(255) DEFAULT NULL,
  `description` text,
  `hide_to` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL COMMENT 'owner id of the folder',
  `time_update` int(11) DEFAULT NULL,
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_folder
-- ----------------------------
INSERT INTO `dms_folder` VALUES ('1000', '财务文档', '0', null, null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1001', '技术文档', '0', null, null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1002', '项目文档', '0', null, null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1003', '代码文档', '-1', null, null, null, null, null, '1', null, null);
INSERT INTO `dms_folder` VALUES ('1004', '软件文档', '-1', null, null, null, null, null, '1', null, null);

-- ----------------------------
-- Table structure for dms_folder_type
-- ----------------------------
DROP TABLE IF EXISTS `dms_folder_type`;
CREATE TABLE `dms_folder_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_folder_type
-- ----------------------------

-- ----------------------------
-- Table structure for dms_language
-- ----------------------------
DROP TABLE IF EXISTS `dms_language`;
CREATE TABLE `dms_language` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(100) DEFAULT NULL COMMENT 'key of language',
  `language` varchar(100) DEFAULT NULL COMMENT 'language string',
  `type` varchar(20) DEFAULT NULL COMMENT 'type of language: en,ch',
  `status` tinyint(1) DEFAULT '1' COMMENT '1=in use,0=not use',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_language
-- ----------------------------
INSERT INTO `dms_language` VALUES ('1', 'title', 'Doclouder Management', 'en', '1');
INSERT INTO `dms_language` VALUES ('2', 'title', '云文档 管理系统', 'ch', '1');
INSERT INTO `dms_language` VALUES ('3', 'test', '只是个测试', 'en', '1');
INSERT INTO `dms_language` VALUES ('4', 'loading', 'loading', 'en', '1');
INSERT INTO `dms_language` VALUES ('5', 'loading', '加载中', 'ch', '1');
INSERT INTO `dms_language` VALUES ('6', 'change_face', '更换皮肤风格', 'ch', '1');
INSERT INTO `dms_language` VALUES ('7', 'change_face', 'Change Face', 'en', '1');
INSERT INTO `dms_language` VALUES ('8', 'username', 'Username', 'en', '1');
INSERT INTO `dms_language` VALUES ('9', 'username', '用户', 'ch', '1');
INSERT INTO `dms_language` VALUES ('10', 'document_id', 'Document ID', 'en', '1');
INSERT INTO `dms_language` VALUES ('11', 'document_id', '文档ID', 'ch', '1');
INSERT INTO `dms_language` VALUES ('12', 'prompt_search', '请输入您要查找的内容关键词', 'ch', '1');
INSERT INTO `dms_language` VALUES ('13', 'prompt_search', 'Input the keywords you wanto search', 'en', '1');
INSERT INTO `dms_language` VALUES ('14', 'screen_full', '全屏切换', 'ch', '1');
INSERT INTO `dms_language` VALUES ('15', 'screen_full', 'Full Screen', 'en', '1');
INSERT INTO `dms_language` VALUES ('16', 'logout', '退出系统', 'ch', '1');
INSERT INTO `dms_language` VALUES ('17', 'logout', 'Logout', 'en', '1');
INSERT INTO `dms_language` VALUES ('18', 'nav', '导航栏', 'ch', '1');
INSERT INTO `dms_language` VALUES ('19', 'nav', 'Navigation', 'en', '1');
INSERT INTO `dms_language` VALUES ('20', 'refresh', 'Refresh', 'en', '1');
INSERT INTO `dms_language` VALUES ('21', 'refresh', '刷新', 'ch', '1');
INSERT INTO `dms_language` VALUES ('22', 'menu', 'Menu', 'en', '1');
INSERT INTO `dms_language` VALUES ('23', 'menu', '菜单', 'ch', '1');
INSERT INTO `dms_language` VALUES ('24', 'fold_cur', 'Fold current', 'en', '1');
INSERT INTO `dms_language` VALUES ('25', 'fold_cur', '折叠当前', 'ch', '1');
INSERT INTO `dms_language` VALUES ('26', 'unfold_all', '展开当前所有', 'ch', '1');
INSERT INTO `dms_language` VALUES ('27', 'unfold_all', 'Unfold All', 'en', '1');
INSERT INTO `dms_language` VALUES ('28', 'fold_all', 'Fold all', 'en', '1');
INSERT INTO `dms_language` VALUES ('29', 'fold_all', '折叠所有', 'ch', '1');
INSERT INTO `dms_language` VALUES ('30', 'fold_all_cur', 'Fold current all', 'en', '1');
INSERT INTO `dms_language` VALUES ('31', 'fold_all_cur', '折叠当前所有', 'ch', '1');
INSERT INTO `dms_language` VALUES ('32', 'unfold_all_cur', '展开当前所有', 'ch', '1');
INSERT INTO `dms_language` VALUES ('33', 'unfold_all_cur', 'Unfold current all', 'en', '1');
INSERT INTO `dms_language` VALUES ('34', 'fold_unfold', 'Fold/Unfold', 'en', '1');
INSERT INTO `dms_language` VALUES ('35', 'fold_unfold', '展开/折叠', 'ch', '1');
INSERT INTO `dms_language` VALUES ('36', 'home_page', 'Home Page', 'en', '1');
INSERT INTO `dms_language` VALUES ('37', 'home_page', '主页', 'ch', '1');
INSERT INTO `dms_language` VALUES ('38', 'about', 'About', 'en', '1');
INSERT INTO `dms_language` VALUES ('39', 'about', '关于', 'ch', '1');
INSERT INTO `dms_language` VALUES ('40', 'use_better', '建议使用', 'ch', '1');
INSERT INTO `dms_language` VALUES ('41', 'use_better', 'Better to use', 'en', '1');
INSERT INTO `dms_language` VALUES ('42', 'browser_kind', '系列浏览器', 'ch', '1');
INSERT INTO `dms_language` VALUES ('43', 'browser_kind', 'kinds of browser', 'en', '1');
INSERT INTO `dms_language` VALUES ('44', 'about_us', 'About us', 'en', '1');
INSERT INTO `dms_language` VALUES ('45', 'about_us', '关于我们', 'ch', '1');
INSERT INTO `dms_language` VALUES ('46', 'clendar', 'Clendar', 'en', '1');
INSERT INTO `dms_language` VALUES ('47', 'clendar', '日历', 'ch', '1');
INSERT INTO `dms_language` VALUES ('48', 'friend_link', 'Friend Link', 'en', '1');
INSERT INTO `dms_language` VALUES ('49', 'friend_link', '友情链接', 'ch', '1');
INSERT INTO `dms_language` VALUES ('50', 'jump_home', '跳转至主页', 'ch', '1');
INSERT INTO `dms_language` VALUES ('51', 'jump_home', 'Jump to home', 'en', '1');
INSERT INTO `dms_language` VALUES ('52', 'fold_unfold_panel', '展开/折叠面板', 'ch', '1');
INSERT INTO `dms_language` VALUES ('53', 'fold_unfold_panel', 'Fold/Unfold the panel', 'en', '1');
INSERT INTO `dms_language` VALUES ('54', 'collection', 'Collection', 'en', '1');
INSERT INTO `dms_language` VALUES ('55', 'collection', '收藏', 'ch', '1');
INSERT INTO `dms_language` VALUES ('56', 'cancel', 'Cancel', 'en', '1');
INSERT INTO `dms_language` VALUES ('57', 'cancel', '取消', 'ch', '1');
INSERT INTO `dms_language` VALUES ('58', 'rename', 'Rename', 'en', '1');
INSERT INTO `dms_language` VALUES ('59', 'rename', '重命名', 'ch', '1');
INSERT INTO `dms_language` VALUES ('60', 'unlogin_alert', '亲，您还没有登录，请先到登录吧 :)', 'ch', '1');
INSERT INTO `dms_language` VALUES ('61', 'unlogin_alert', 'Dear, you need to login first :)', 'en', '1');
INSERT INTO `dms_language` VALUES ('62', 'doc_cannot_edit', 'Sorry, you can not access the document', 'en', '1');
INSERT INTO `dms_language` VALUES ('63', 'doc_cannot_edit', '对不起，你没有权限操作该文档', 'ch', '1');
INSERT INTO `dms_language` VALUES ('64', 'success', '操作成功', 'ch', '1');
INSERT INTO `dms_language` VALUES ('65', 'success', 'Successful', 'en', '1');
INSERT INTO `dms_language` VALUES ('66', 'error', '操作失败', 'ch', '1');
INSERT INTO `dms_language` VALUES ('67', 'error', 'Error happened', 'en', '1');
INSERT INTO `dms_language` VALUES ('68', 'save', 'Save', 'en', '1');
INSERT INTO `dms_language` VALUES ('69', 'save', '保存', 'ch', '1');
INSERT INTO `dms_language` VALUES ('70', 'start_time', 'Start Time', 'en', '1');
INSERT INTO `dms_language` VALUES ('71', 'start_time', '开始时间', 'ch', '1');
INSERT INTO `dms_language` VALUES ('72', 'end_time', 'End Time', 'en', '1');
INSERT INTO `dms_language` VALUES ('73', 'end_time', '结束时间', 'ch', '1');
INSERT INTO `dms_language` VALUES ('74', 'upload', 'Upload', 'en', '1');
INSERT INTO `dms_language` VALUES ('75', 'upload', '上传文档', 'ch', '1');
INSERT INTO `dms_language` VALUES ('76', 'upload_drag', '或将文档拖到这里，单次最多可选20个文档', 'ch', '1');
INSERT INTO `dms_language` VALUES ('77', 'upload_drag', 'You can drag 20 files here to upload', 'en', '1');
INSERT INTO `dms_language` VALUES ('78', 'start', 'Start', 'en', '1');
INSERT INTO `dms_language` VALUES ('79', 'start', '开始', 'ch', '1');

-- ----------------------------
-- Table structure for dms_log
-- ----------------------------
DROP TABLE IF EXISTS `dms_log`;
CREATE TABLE `dms_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `operation` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_log
-- ----------------------------

-- ----------------------------
-- Table structure for dms_permission
-- ----------------------------
DROP TABLE IF EXISTS `dms_permission`;
CREATE TABLE `dms_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_permission
-- ----------------------------

-- ----------------------------
-- Table structure for dms_permission_list
-- ----------------------------
DROP TABLE IF EXISTS `dms_permission_list`;
CREATE TABLE `dms_permission_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_element` int(11) DEFAULT NULL,
  `element_type` tinyint(1) DEFAULT NULL,
  `group` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  `is_inherited` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_permission_list
-- ----------------------------

-- ----------------------------
-- Table structure for dms_remind
-- ----------------------------
DROP TABLE IF EXISTS `dms_remind`;
CREATE TABLE `dms_remind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_user_group` int(11) DEFAULT NULL,
  `level` tinyint(1) DEFAULT NULL,
  `info` text,
  `trigger` tinyint(1) DEFAULT '0',
  `is_email` tinyint(1) DEFAULT '0',
  `time_create` int(11) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_remind
-- ----------------------------

-- ----------------------------
-- Table structure for dms_setting
-- ----------------------------
DROP TABLE IF EXISTS `dms_setting`;
CREATE TABLE `dms_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `info` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_setting
-- ----------------------------

-- ----------------------------
-- Table structure for dms_system_info
-- ----------------------------
DROP TABLE IF EXISTS `dms_system_info`;
CREATE TABLE `dms_system_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `level` tinyint(1) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_system_info
-- ----------------------------

-- ----------------------------
-- Table structure for dms_user
-- ----------------------------
DROP TABLE IF EXISTS `dms_user`;
CREATE TABLE `dms_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `vorname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_group` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `computer` varchar(255) DEFAULT NULL,
  `timezone` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_user
-- ----------------------------
INSERT INTO `dms_user` VALUES ('1', 'Yu', 'Min', 'akiler', '4297f44b13955235245b2497399d7a93', '1', null, null, null, '1', null);
INSERT INTO `dms_user` VALUES ('2', 'Sun', 'my', 'sunmy', '4297f44b13955235245b2497399d7a93', '1', null, null, null, '1', null);
INSERT INTO `dms_user` VALUES ('3', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('4', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('5', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('6', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('7', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('8', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('9', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('10', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('11', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('12', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('13', null, null, 'test', null, null, null, null, null, null, null);
INSERT INTO `dms_user` VALUES ('14', null, null, 'test', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for dms_user_group
-- ----------------------------
DROP TABLE IF EXISTS `dms_user_group`;
CREATE TABLE `dms_user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_user_group
-- ----------------------------

-- ----------------------------
-- Table structure for dms_verify_master
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_master`;
CREATE TABLE `dms_verify_master` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) DEFAULT NULL,
  `id_user_group` varchar(255) DEFAULT NULL,
  `id_element` int(11) DEFAULT NULL,
  `element_type` int(1) DEFAULT NULL,
  `id_permission` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_verify_master
-- ----------------------------

-- ----------------------------
-- Table structure for dms_verify_request
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_request`;
CREATE TABLE `dms_verify_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_verify_type` int(11) DEFAULT NULL,
  `id_user_apply` int(11) DEFAULT NULL,
  `id_user_verify` varchar(255) DEFAULT NULL,
  `id_element` int(11) DEFAULT NULL,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `info` text,
  `comment` text,
  `status` tinyint(1) DEFAULT '0',
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_verify_request
-- ----------------------------

-- ----------------------------
-- Table structure for dms_verify_target
-- ----------------------------
DROP TABLE IF EXISTS `dms_verify_target`;
CREATE TABLE `dms_verify_target` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_element` int(11) DEFAULT NULL,
  `element_type` int(1) DEFAULT NULL,
  `id_user_verify` varchar(255) DEFAULT NULL,
  `id_user` varchar(255) DEFAULT NULL,
  `id_user_group` varchar(255) DEFAULT NULL,
  `id_permission` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_all` tinyint(1) DEFAULT '1',
  `is_valid` tinyint(1) DEFAULT '1',
  `is_inherited` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_verify_target
-- ----------------------------