/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50096
Source Host           : localhost:3306
Source Database       : edc_questionnaire

Target Server Type    : MYSQL
Target Server Version : 50096
File Encoding         : 65001

Date: 2017-05-17 10:45:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for childquiz
-- ----------------------------
DROP TABLE IF EXISTS `childquiz`;
CREATE TABLE `childquiz` (
  `childQuizID` varchar(36) NOT NULL,
  `childID` varchar(36) NOT NULL,
  `quizID` varchar(36) NOT NULL,
  `answerDatetime` datetime NOT NULL,
  `userQuizStatus` varchar(3) NOT NULL,
  PRIMARY KEY  (`childQuizID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of childquiz
-- ----------------------------

-- ----------------------------
-- Table structure for children
-- ----------------------------
DROP TABLE IF EXISTS `children`;
CREATE TABLE `children` (
  `childID` varchar(36) NOT NULL,
  `parentID` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `schoolID` varchar(36) NOT NULL,
  `schoolName` varchar(45) NOT NULL,
  `gradeID` tinyint(1) NOT NULL,
  `classID` tinyint(1) NOT NULL,
  `email` varchar(50) default NULL,
  PRIMARY KEY  (`childID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of children
-- ----------------------------
INSERT INTO `children` VALUES ('a4f07434-3997-20a1-66b7-1ea4723125b1', 'bbe6b277-582c-4735-1fdd-c6c7aebdab5a', '涂钰雯', 'bd883464-e0f4-35dd-b6df-730396c92ce3', '东荷小学', '1', '1', null);

-- ----------------------------
-- Table structure for dict_quiz_statistics
-- ----------------------------
DROP TABLE IF EXISTS `dict_quiz_statistics`;
CREATE TABLE `dict_quiz_statistics` (
  `statisticalID` varchar(36) NOT NULL,
  `eleID` varchar(36) NOT NULL,
  `quizID` varchar(36) NOT NULL,
  `statisticalType` varchar(4) NOT NULL,
  `name` varchar(60) NOT NULL,
  `nameAbbreviation` varchar(10) default NULL,
  `valueName` varchar(60) default NULL,
  `code` varchar(30) NOT NULL,
  PRIMARY KEY  (`statisticalID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dict_quiz_statistics
-- ----------------------------

-- ----------------------------
-- Table structure for quiz
-- ----------------------------
DROP TABLE IF EXISTS `quiz`;
CREATE TABLE `quiz` (
  `quizID` varchar(36) NOT NULL,
  `templateID` varchar(36) default NULL,
  `createUserID` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `subtitle` varchar(50) default NULL,
  `createDateTime` datetime NOT NULL,
  `releaseDateTime` datetime default NULL,
  `finishDateTime` datetime default NULL,
  `status` varchar(3) NOT NULL,
  `layoutStyle` varchar(3) NOT NULL,
  `askCount` int(5) NOT NULL,
  `tabCount` int(5) default NULL,
  `tabName` tinytext,
  `dataCount` int(5) NOT NULL,
  PRIMARY KEY  (`quizID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quiz
-- ----------------------------
INSERT INTO `quiz` VALUES ('6f6d010e-9626-15c9-410b-f08d46de4b6e', '82ba16d6-9f7a-e0a1-74a9-23b100e00553', '1c39c1f2-0057-8235-9197-3d84ab554228', '散瞳知情同意书', '散瞳知情同意书', '', '2017-05-14 23:26:44', null, null, '1', '001', '1', null, null, '1');
INSERT INTO `quiz` VALUES ('ddae44db-5cbb-9396-7c74-7aaef6e54969', '22006227-2e40-a1f3-d0b5-82254af9526b', '1c39c1f2-0057-8235-9197-3d84ab554228', '2016-2017暑假调查问卷随访', '调查问卷', '随访1', '2017-05-14 21:56:33', null, null, '1', '001', '13', null, null, '13');

-- ----------------------------
-- Table structure for quiz_ask
-- ----------------------------
DROP TABLE IF EXISTS `quiz_ask`;
CREATE TABLE `quiz_ask` (
  `askID` varchar(36) NOT NULL,
  `quizID` varchar(36) NOT NULL,
  `templateFlag` tinyint(1) NOT NULL,
  `askType` varchar(3) NOT NULL,
  `tabCode` varchar(40) default NULL,
  `pageCode` varchar(40) default NULL,
  `askIndex` tinyint(1) default NULL,
  `askTitle` tinytext,
  `askContent` text,
  PRIMARY KEY  (`askID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quiz_ask
-- ----------------------------
INSERT INTO `quiz_ask` VALUES ('04cb6533-f92c-d08c-aeb1-70218a08a1c8', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,2', '5', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;5.&lt;/span&gt;孩子通常阅读的距离是多少(从眼睛到书本的距离)?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad50269a41-1fbb-7994-4d99-9bd71af4ed76&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;少于10厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad50269a41-1fbb-7994-4d99-9bd71af4ed76&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;11-20厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad50269a41-1fbb-7994-4d99-9bd71af4ed76&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;21-30厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad50269a41-1fbb-7994-4d99-9bd71af4ed76&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad5-50269a41-1fbb-7994-4d99-9bd71af4ed76-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过30厘米&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('075e705d-4058-8754-ffd7-3f2439d912cd', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,1', '2', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;2.&lt;/span&gt;持续多久看电视后，休息眼睛?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5小时以内&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5-1小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1-1.5小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1.5-2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-4&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;4&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-4&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-5&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7102f42c-a918-6355-ac77-19d4f038779f&quot; value=&quot;5&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad2-7102f42c-a918-6355-ac77-19d4f038779f-5&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不休息&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('189977b2-eb8a-a729-da42-d252c7c0c931', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,1', '1', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;1.&lt;/span&gt;持续多久的阅读后，休息眼睛?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5小时以内&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5-1小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1-1.5小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1.5-2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-4&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;4&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-4&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-5&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad8fb2a3e6-ea08-55da-01cb-0892284efe7a&quot; value=&quot;5&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-8fb2a3e6-ea08-55da-01cb-0892284efe7a-5&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不休息&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('2de91bce-edf7-8e1c-05a5-dc9874581333', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '2,2', '11', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;11.&lt;/span&gt;孩子读写时，照明充足的频率?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc9422eea-de86-ee8a-32a0-41da9fd496f2&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc9422eea-de86-ee8a-32a0-41da9fd496f2&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;偶尔&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc9422eea-de86-ee8a-32a0-41da9fd496f2&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;经常&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc9422eea-de86-ee8a-32a0-41da9fd496f2&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad11-c9422eea-de86-ee8a-32a0-41da9fd496f2-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;总是&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('4277886f-32f7-f315-f6ee-b70065955656', '6f6d010e-9626-15c9-410b-f08d46de4b6e', '0', '001', null, '1,1', '1', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;1.&lt;/span&gt;是否带孩子前往散瞳&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-e868d82e-da35-349e-aefb-3c835cae3dc4-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rade868d82e-da35-349e-aefb-3c835cae3dc4&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-e868d82e-da35-349e-aefb-3c835cae3dc4-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;是&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad1-e868d82e-da35-349e-aefb-3c835cae3dc4-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rade868d82e-da35-349e-aefb-3c835cae3dc4&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad1-e868d82e-da35-349e-aefb-3c835cae3dc4-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;否&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('5c248967-6402-2fc0-4408-4b46e0dff4ef', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,2', '6', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;6.&lt;/span&gt;孩子通常看电视的距离是多少(从眼睛到电视的距离)?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad57a13880-3648-803b-6330-4aa88557f00f&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;少于1米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad57a13880-3648-803b-6330-4aa88557f00f&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1-2米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad57a13880-3648-803b-6330-4aa88557f00f&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;2-3米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad57a13880-3648-803b-6330-4aa88557f00f&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad6-57a13880-3648-803b-6330-4aa88557f00f-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过3米&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('65eec3e6-9ae9-3c0d-0c32-e9ccf0963038', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '2,1', '10', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;10.&lt;/span&gt;孩子俯卧看书的频率?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radd8e435bc-ff92-7150-7b38-4df369650edb&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radd8e435bc-ff92-7150-7b38-4df369650edb&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;偶尔&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radd8e435bc-ff92-7150-7b38-4df369650edb&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;经常&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radd8e435bc-ff92-7150-7b38-4df369650edb&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad10-d8e435bc-ff92-7150-7b38-4df369650edb-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;总是&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('699465b7-0fae-7310-487a-8d4cd6f5fd5e', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,1', '3', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;3.&lt;/span&gt;持续多长时间用电脑/手机后，休息眼睛?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5小时以内&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;0.5-1小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1-1.5小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;1.5-2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-4&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;4&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-4&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过2小时&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-5&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad7e66191b-516b-a106-bfa3-04e544492a3b&quot; value=&quot;5&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad3-7e66191b-516b-a106-bfa3-04e544492a3b-5&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不休息&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('7511594b-1716-91fc-9a3e-805eeedb5a55', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '2,1', '8', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;8.&lt;/span&gt;孩子偏着头写字的频率?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radccf7949f-a2ec-1a99-f032-78be709a779d&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radccf7949f-a2ec-1a99-f032-78be709a779d&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;偶尔&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radccf7949f-a2ec-1a99-f032-78be709a779d&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;经常&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radccf7949f-a2ec-1a99-f032-78be709a779d&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad8-ccf7949f-a2ec-1a99-f032-78be709a779d-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;总是&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('7c71a030-5342-41e5-2f9c-3e82e088f46c', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '4,2', '12', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;12.&lt;/span&gt;孩子的父母是否近视？&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad13-7efa2edd-63f8-9735-7a35-5fb9ceb679ab-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad7efa2edd-63f8-9735-7a35-5fb9ceb679ab&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad13-7efa2edd-63f8-9735-7a35-5fb9ceb679ab-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;是&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad13-7efa2edd-63f8-9735-7a35-5fb9ceb679ab-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad7efa2edd-63f8-9735-7a35-5fb9ceb679ab&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad13-7efa2edd-63f8-9735-7a35-5fb9ceb679ab-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;否&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('874840e2-bc6d-0c01-670d-f4dd459aa43e', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '2,1', '9', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;9.&lt;/span&gt;孩子仰躺着看书的频率?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad70450ee3-2e5b-7f10-462b-96e4b0b9c5a7&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;从不&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad70450ee3-2e5b-7f10-462b-96e4b0b9c5a7&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;偶尔&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad70450ee3-2e5b-7f10-462b-96e4b0b9c5a7&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;经常&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;rad70450ee3-2e5b-7f10-462b-96e4b0b9c5a7&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad9-70450ee3-2e5b-7f10-462b-96e4b0b9c5a7-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;总是&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('a8b0d253-acda-7338-476e-b40c1bb3c5f5', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '2,1', '7', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;7.&lt;/span&gt;孩子通常用电脑的距离是多少(从眼睛到屏幕的距离)?&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc4969e80-5f81-6fe2-0b0c-91eb0944263a&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;少于15厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc4969e80-5f81-6fe2-0b0c-91eb0944263a&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;15-30厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc4969e80-5f81-6fe2-0b0c-91eb0944263a&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;31-50厘米&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-3&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;&quot; name=&quot;radc4969e80-5f81-6fe2-0b0c-91eb0944263a&quot; value=&quot;3&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad7-c4969e80-5f81-6fe2-0b0c-91eb0944263a-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;超过50厘米&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('b2b5adf9-c962-0841-9c24-cdbfdc7b34be', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '1,2', '4', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;4.&lt;/span&gt;如果他/她有用眼后休息的习惯，他/她通常使用什么方法放松眼睛?&lt;/p&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-0&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;0&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;远眺休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-1&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;1&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;轻微活动休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-2&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;2&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;交替望远望近休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-3&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;3&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-3&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;做眼保健操休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-4&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;4&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-4&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;闭目休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-5&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;5&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-5&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;户外活动休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-checkbox&quot;&gt;&lt;input type=&quot;checkbox&quot; id=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-8&quot; data-input-type=&quot;002&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad9a88a14a-bdf5-a41b-4495-e81d32a39d64&quot; value=&quot;8&quot; class=&quot;md-check&quot;&gt;&lt;label for=&quot;rad4-9a88a14a-bdf5-a41b-4495-e81d32a39d64-8&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;看绿色植物休息眼睛&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');
INSERT INTO `quiz_ask` VALUES ('b30bebaf-675b-8d25-bdc1-ed14515ccca1', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '0', '001', null, '4,1', '13', null, '&lt;div class=&quot;form-group form-md-line-input form-md-radios quiz-input&quot;&gt;&lt;div class=&quot;md-radio-list&quot;&gt;&lt;p&gt;&lt;span class=&quot;quiz-ask-index&quot;&gt;13.&lt;/span&gt;您的孩子是否近视？&lt;/p&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-0&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad0635e5b1-55c3-29e1-ad1c-1e25764188a6&quot; value=&quot;0&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-0&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;是&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-1&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad0635e5b1-55c3-29e1-ad1c-1e25764188a6&quot; value=&quot;1&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-1&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;否&lt;/label&gt;&lt;/div&gt;&lt;div class=&quot;md-radio&quot;&gt;&lt;input type=&quot;radio&quot; id=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-2&quot; data-input-type=&quot;001&quot; data-ele-level=&quot;1&quot; data-statistical=&quot;statistical&quot; name=&quot;rad0635e5b1-55c3-29e1-ad1c-1e25764188a6&quot; value=&quot;2&quot; class=&quot;md-radiobtn&quot;&gt;&lt;label for=&quot;rad13-0635e5b1-55c3-29e1-ad1c-1e25764188a6-2&quot;&gt;&lt;span class=&quot;inc&quot;&gt;&lt;/span&gt;&lt;span class=&quot;check&quot;&gt;&lt;/span&gt;&lt;span class=&quot;box&quot;&gt;&lt;/span&gt;不清楚&lt;/label&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;');

-- ----------------------------
-- Table structure for quiz_ask_elements
-- ----------------------------
DROP TABLE IF EXISTS `quiz_ask_elements`;
CREATE TABLE `quiz_ask_elements` (
  `elementID` varchar(50) NOT NULL,
  `askID` varchar(36) NOT NULL,
  `quizID` varchar(36) NOT NULL,
  `elementType` varchar(3) NOT NULL,
  `elementSelector` varchar(255) default NULL,
  `elementLocation` varchar(5) default NULL,
  `elementLevel` varchar(4) NOT NULL,
  `statisticalFlag` tinyint(4) NOT NULL,
  PRIMARY KEY  (`elementID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quiz_ask_elements
-- ----------------------------
INSERT INTO `quiz_ask_elements` VALUES ('rad0635e5b1-55c3-29e1-ad1c-1e25764188a6', 'b30bebaf-675b-8d25-bdc1-ed14515ccca1', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '1');
INSERT INTO `quiz_ask_elements` VALUES ('rad50269a41-1fbb-7994-4d99-9bd71af4ed76', '04cb6533-f92c-d08c-aeb1-70218a08a1c8', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rad57a13880-3648-803b-6330-4aa88557f00f', '5c248967-6402-2fc0-4408-4b46e0dff4ef', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rad70450ee3-2e5b-7f10-462b-96e4b0b9c5a7', '874840e2-bc6d-0c01-670d-f4dd459aa43e', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rad7102f42c-a918-6355-ac77-19d4f038779f', '075e705d-4058-8754-ffd7-3f2439d912cd', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rad7e66191b-516b-a106-bfa3-04e544492a3b', '699465b7-0fae-7310-487a-8d4cd6f5fd5e', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rad7efa2edd-63f8-9735-7a35-5fb9ceb679ab', '7c71a030-5342-41e5-2f9c-3e82e088f46c', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '1');
INSERT INTO `quiz_ask_elements` VALUES ('rad8fb2a3e6-ea08-55da-01cb-0892284efe7a', '189977b2-eb8a-a729-da42-d252c7c0c931', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '1');
INSERT INTO `quiz_ask_elements` VALUES ('rad9a88a14a-bdf5-a41b-4495-e81d32a39d64', 'b2b5adf9-c962-0841-9c24-cdbfdc7b34be', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '1');
INSERT INTO `quiz_ask_elements` VALUES ('radc4969e80-5f81-6fe2-0b0c-91eb0944263a', 'a8b0d253-acda-7338-476e-b40c1bb3c5f5', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('radc9422eea-de86-ee8a-32a0-41da9fd496f2', '2de91bce-edf7-8e1c-05a5-dc9874581333', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('radccf7949f-a2ec-1a99-f032-78be709a779d', '7511594b-1716-91fc-9a3e-805eeedb5a55', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('radd8e435bc-ff92-7150-7b38-4df369650edb', '65eec3e6-9ae9-3c0d-0c32-e9ccf0963038', 'ddae44db-5cbb-9396-7c74-7aaef6e54969', '001', null, null, '1', '0');
INSERT INTO `quiz_ask_elements` VALUES ('rade868d82e-da35-349e-aefb-3c835cae3dc4', '4277886f-32f7-f315-f6ee-b70065955656', '6f6d010e-9626-15c9-410b-f08d46de4b6e', '001', null, null, '1', '1');

-- ----------------------------
-- Table structure for quiz_data
-- ----------------------------
DROP TABLE IF EXISTS `quiz_data`;
CREATE TABLE `quiz_data` (
  `recordID` varchar(36) NOT NULL,
  `childQuizID` varchar(36) NOT NULL,
  `askID` varchar(36) NOT NULL,
  `eleID` varchar(36) NOT NULL,
  `answerContent` varchar(255) NOT NULL,
  `statisticalValue` varchar(50) default NULL,
  PRIMARY KEY  (`recordID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quiz_data
-- ----------------------------

-- ----------------------------
-- Table structure for quiz_templates
-- ----------------------------
DROP TABLE IF EXISTS `quiz_templates`;
CREATE TABLE `quiz_templates` (
  `templateID` varchar(36) NOT NULL,
  `createUserID` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `createDateTime` datetime NOT NULL,
  `status` varchar(3) NOT NULL,
  `layoutStyle` varchar(3) NOT NULL,
  `askCount` int(5) NOT NULL,
  `tabCount` int(5) default NULL,
  `tabName` tinytext,
  `pageCount` int(5) default NULL,
  `dataCount` int(5) NOT NULL,
  `statisticalCount` int(5) NOT NULL,
  PRIMARY KEY  (`templateID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of quiz_templates
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userID` varchar(36) NOT NULL,
  `userStatus` varchar(2) NOT NULL,
  `loginID` varchar(20) NOT NULL,
  `password` varchar(16) NOT NULL,
  `name` varchar(50) default NULL,
  `corporation` varchar(50) default NULL,
  `email` varchar(50) default NULL,
  PRIMARY KEY  (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1c39c1f2-0057-8235-9197-3d84ab554228', '1', 'GIEDC', 'GIEDC', '高视', '北京高视', null);
INSERT INTO `users` VALUES ('bbe6b277-582c-4735-1fdd-c6c7aebdab5a', '4', '1390911091521', '091521', '1390911091521', null, null);

-- ----------------------------
-- Procedure structure for getQuizInfo
-- ----------------------------
DROP PROCEDURE IF EXISTS `getQuizInfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getQuizInfo`(in _quizID VARCHAR(36))
BEGIN
DECLARE _askID VARCHAR(50);
DECLARE i INT DEFAULT 1;
DECLARE _askCount INT;
SELECT askCount INTO _askCount FROM quiz WHERE quizID = _quizID; 
SELECT * FROM quiz WHERE quizID = _quizID;
while i <= _askCount do
SELECT askID INTO _askID FROM (SELECT (@rowNum:=@rowNum+1) AS rowIndex, a.* FROM quiz_ask AS a, (Select (@rowNum :=0) ) AS b
where quizID = _quizID ORDER BY askIndex)as askNew where askNew.rowIndex = i;
SELECT * FROM quiz_ask where quizID = _quizID AND askID = _askID;
SELECT * FROM quiz_ask_elements where quizID = _quizID AND askID = _askID;
set i=i+1;
end while;
END
;;
DELIMITER ;
