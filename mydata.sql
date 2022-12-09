-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Server version: 5.7.32
-- PHP Version: 7.4.12
SET
    SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET
    time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Database: `mydatasql`
--
DROP DATABASE IF EXISTS `mydatasql`;

CREATE DATABASE IF NOT EXISTS `mydatasql` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `mydatasql`;

-- --------------------------------------------------------
--
-- Table structure for table `article`
--
DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
    `id` int(11) NOT NULL,
    `heading` text NOT NULL,
    `name`    text NOT NULL,
    `Summary` text NOT NULL,
    `linkk` text,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

--
-- Dumping data for table `evaluation`
--
INSERT INTO
    `article` (`id`, `heading`, `name`,`Summary`,`linkk`)
VALUES
    (1,'Algorithms','ahmed','Algorithms Algorithms','http://www.uok.edu.sy/'),
    (2, 'Programming','kaled','Programming Programming','http://www.uok.edu.sy/');

-- --------------------------------------------------------
--
-- Table structure for table `code`
--
DROP TABLE IF EXISTS `CODE`;

CREATE TABLE `CODE` (
    `id` int(11) NOT NULL,
    `code_n` varchar(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
    `CODE` (`id`, `code_n`)
VALUES
    (1,'1234'),
    (2, 'ahmed');




-- AUTO_INCREMENT for dumped tables
--
--
-- AUTO_INCREMENT for table `article`
--
ALTER TABLE
    `article`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 4;

--
-- AUTO_INCREMENT for table `hotel`
--
ALTER TABLE
    `CODE`
MODIFY
    `id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 3;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;