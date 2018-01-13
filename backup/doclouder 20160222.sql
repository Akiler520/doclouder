/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : aims

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-02-22 17:48:44
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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_area
-- ----------------------------
INSERT INTO `dms_area` VALUES ('1', '保密文档区域', 'F:/www/doclouder/secret/', '保密文档区域', '1');

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
  `id_share` int(11) DEFAULT '0' COMMENT 'the existed file id which name_disk is shared from',
  `is_valid` tinyint(1) DEFAULT '1' COMMENT '1=valid,0=invalid',
  `is_verify` tinyint(1) DEFAULT '1' COMMENT '1=passed,0=refused',
  `time_verify` int(11) DEFAULT NULL,
  `time_update` int(11) DEFAULT NULL,
  `time_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1058 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_document
-- ----------------------------
INSERT INTO `dms_document` VALUES ('1054', 'DB 20141024', 'F:/www/doclouder/secret/2016/02/22/\\14561098824479.docx', 'docx', '4923', '1', '1000', '1', null, 'a63446527f2362a3a7f16e3fd8daea2c', null, '0', '1', '1', null, null, '1456109882');
INSERT INTO `dms_document` VALUES ('1055', 'dms 20150126', 'F:/www/doclouder/secret/2016/02/22/\\1456109883573.rar', 'rar', '13175003', '1', '1000', '1', null, '96e077477605a9a9be302fe0e62e62e5', null, '0', '1', '1', null, null, '1456109883');
INSERT INTO `dms_document` VALUES ('1056', 'DMS-Design-v1.3', 'F:/www/doclouder/secret/2016/02/22/\\1456109884115.xlsx', 'xlsx', '31518', '1', '1000', '1', null, '6c485988a5178224d6d9babe1879c91e', null, '0', '1', '1', null, null, '1456109884');
INSERT INTO `dms_document` VALUES ('1057', 'DMS-Design-v1.4', 'F:/www/doclouder/secret/2016/02/22/\\1456109884276.xlsx', 'xlsx', '36159', '1', '1000', '1', null, '5c9f692fbb3266e7398188bd66566cc1', null, '0', '1', '1', null, null, '1456109884');

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
INSERT INTO `dms_folder` VALUES ('1000', '财务文档', '0', '1', null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1001', '技术文档', '0', '2', null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1002', '项目文档', '0', '2', null, null, null, null, '0', null, null);
INSERT INTO `dms_folder` VALUES ('1003', '代码文档', '-1', '1', null, null, null, null, '1', null, null);
INSERT INTO `dms_folder` VALUES ('1004', '软件文档', '-1', '2', null, null, null, null, '1', null, null);

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
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_folder_type
-- ----------------------------
INSERT INTO `dms_folder_type` VALUES ('1', '财务文档', '1', '财务文档', '1');

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
-- Table structure for dms_menu
-- ----------------------------
DROP TABLE IF EXISTS `dms_menu`;
CREATE TABLE `dms_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `href` varchar(200) DEFAULT NULL,
  `is_valid` tinyint(1) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dms_menu
-- ----------------------------
INSERT INTO `dms_menu` VALUES ('1', '系统文档', 'icon-hamburg-docs', '/Folder/treeSystem/', '1', '0');
INSERT INTO `dms_menu` VALUES ('2', '个人文档', 'icon-hamburg-docs', '/Folder/treePersonal/', '1', '0');
INSERT INTO `dms_menu` VALUES ('3', '系统设置', 'icon-hamburg-docs', '/Setting/tree/', '1', '0');
INSERT INTO `dms_menu` VALUES ('4', '扩展 API 文档', 'icon-hamburg-docs', '/Public/common/nav-doc-menu-data.json', '1', '0');
INSERT INTO `dms_menu` VALUES ('5', '演示 DEMO', 'icon-hamburg-product-design', '/Public/common/nav-api-menu-data.json', '1', '0');
INSERT INTO `dms_menu` VALUES ('6', '个人设置', 'icon-hamburg-docs', '/Setting/personal/', '1', '3');

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
