SET NAMES utf8;
DROP DATABASE IF EXISTS vfilm;
CREATE DATABASE vfilm CHARSET=UTF8;
USE vfilm;
CREATE TABLE IF NOT EXISTS `vfilm_users` (
  `user_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `user_name` varchar(100),
  `user_pwd` varchar(100),
  `user_email` varchar(100),
  `user_head`  varchar(100)
);
INSERT INTO `vfilm_users` VALUES(NULL, 'AA', '123456','123456@qq.com','user_head1.png');
INSERT INTO `vfilm_users` VALUES(NULL, 'BB', '123456','123456@qq.com','user_head2.png');
INSERT INTO `vfilm_users` VALUES(NULL, 'CC', '123456','123456@qq.com','user_head3.png');
INSERT INTO `vfilm_users` VALUES(NULL, 'DD', '123456','123456@qq.com','user_head4.png');
INSERT INTO `vfilm_users` VALUES(NULL, 'EE', '123456','123456@qq.com','user_head5.png');
CREATE TABLE IF NOT EXISTS `vfilm_messages`(
  `message_id` int(11) PRIMARY KEY  AUTO_INCREMENT,
  `film_name` varchar(100),
  `user_name` varchar(100),
  `user_head`  varchar(100),
  `message_time` varchar(100),
  `message`	varchar(1000)
);

