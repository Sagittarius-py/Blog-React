-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Paź 2022, 18:21
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!40101 SET NAMES utf8mb4 */
;
--
-- Baza danych: `blog_posts`
--
-- --------------------------------------------------------
--
-- Struktura tabeli dla tabeli `posts`

CREATE TABLE `posts` (
    `user_name` text DEFAULT NULL,
    `title` text DEFAULT NULL,
    `post_text` text DEFAULT NULL,
    `id` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
--
-- Zrzut danych tabeli `posts`
--
INSERT INTO `posts` (`user_name`, `title`, `post_text`, `id`)
VALUES ('a', 'b', 'c', NULL),
    ('qe2', 'qwe', 'qRWf', NULL);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;