DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `userId` MEDIUMINT NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `email` varchar(255),
  PRIMARY KEY (`id`),
  UNIQUE KEY (`userId`)
);
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `postId` MEDIUMINT NOT NULL,
  `userId` MEDIUMINT NOT NULL,
  `caption` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`postId`),
  CONSTRAINT `fk_posts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
);
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `commentId` MEDIUMINT NOT NULL,
  `userId` MEDIUMINT NOT NULL,
  `postId` MEDIUMINT NOT NULL,
  `review` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`commentId`),
  CONSTRAINT `fk_comments_posts` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`)
);
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `likeId` MEDIUMINT NOT NULL,
  `userId` MEDIUMINT NOT NULL,
  `postId` MEDIUMINT NOT NULL,
  `like_post` BOOLEAN DEFAULT true,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`likeId`),
  CONSTRAINT `fk_likes_posts` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`)
);
