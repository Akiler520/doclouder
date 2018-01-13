/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : aims

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-02-02 21:50:56
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

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
