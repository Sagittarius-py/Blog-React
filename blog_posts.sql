-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 07 Sty 2023, 19:14
-- Wersja serwera: 10.4.25-MariaDB
-- Wersja PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `blog_posts`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `car_brand`
--

CREATE TABLE `car_brand` (
  `brand_id` int(20) NOT NULL,
  `brandName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `car_brand`
--

INSERT INTO `car_brand` (`brand_id`, `brandName`) VALUES
(1, 'Audi'),
(3, 'Toyota'),
(8, 'VolksWagen'),
(9, 'Skoda'),
(10, 'Seat'),
(11, 'Lexus'),
(12, 'Honda'),
(13, 'Mazda'),
(18, 'Ford'),
(19, 'Hyundai'),
(20, 'Citroen'),
(21, 'Kia'),
(22, 'Fiat'),
(23, 'Peugeot'),
(24, 'Mercedes Benz'),
(25, 'Opel'),
(26, 'Nissan'),
(27, 'Suzuki'),
(28, 'BMW'),
(29, 'Volvo'),
(30, 'Dacia'),
(31, 'Lamborgini');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `car_combined`
--

CREATE TABLE `car_combined` (
  `carCombined_id` int(11) NOT NULL,
  `user_id` int(20) NOT NULL,
  `carBrand_id` int(11) NOT NULL,
  `carModel_id` int(11) NOT NULL,
  `carEngine_id` int(11) NOT NULL,
  `rocznik` int(4) NOT NULL DEFAULT 1900
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `car_combined`
--

INSERT INTO `car_combined` (`carCombined_id`, `user_id`, `carBrand_id`, `carModel_id`, `carEngine_id`, `rocznik`) VALUES
(1, 21, 3, 1, 1, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `car_engine`
--

CREATE TABLE `car_engine` (
  `engine_id` int(20) NOT NULL,
  `pojemnosc` float NOT NULL DEFAULT 1,
  `uklad` varchar(20) NOT NULL,
  `moc` int(20) NOT NULL DEFAULT 0,
  `momentObrotowy` bigint(20) NOT NULL DEFAULT 0,
  `nrSilnika` varchar(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `car_engine`
--

INSERT INTO `car_engine` (`engine_id`, `pojemnosc`, `uklad`, `moc`, `momentObrotowy`, `nrSilnika`) VALUES
(1, 0, 'awd', 123, 123, 'awd'),
(2, 0, 'awd', 123, 123, 'awd');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `car_model`
--

CREATE TABLE `car_model` (
  `model_id` int(20) NOT NULL,
  `brand_id` int(20) NOT NULL,
  `modelName` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `car_model`
--

INSERT INTO `car_model` (`model_id`, `brand_id`, `modelName`) VALUES
(1, 3, 'Yaris'),
(3, 0, 'cokolwiek'),
(4, 0, 'cokolwiek'),
(5, 3, 'Avensis'),
(6, 3, 'Avensis');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `IDcomment` int(11) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `commentText` longtext NOT NULL,
  `commentPost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `comments`
--

INSERT INTO `comments` (`IDcomment`, `userName`, `commentText`, `commentPost`) VALUES
(3, 'Piotr', 'Jakkolwiek', 188),
(4, 'Piotr', 'Jestem z wami', 188),
(5, 'Filip', 'Jest i MOOOOOOOOOOOOOOOOOOOOOC', 188);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `photos`
--

CREATE TABLE `photos` (
  `photo_id` int(11) NOT NULL,
  `photoName` varchar(255) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `photoFile` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `photos`
--

INSERT INTO `photos` (`photo_id`, `photoName`, `post_id`, `photoFile`) VALUES
(79, 'd5rws6c-400d7d14-f61e-4c6f-9694-97b0a0d1751d.png', 171, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f643572777336632d34303064376431342d663631652d346336662d393639342d3937623061306431373531642e706e67),
(80, 'division2_orange.png', 171, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6469766973696f6e325f6f72616e67652e706e67),
(87, '873765.jpg', 187, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f3837333736352e6a7067),
(88, 'auroral-forest-4k-illustration-h0.jpg', 187, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6175726f72616c2d666f726573742d346b2d696c6c757374726174696f6e2d68302e6a7067),
(89, 'd5rws6c-400d7d14-f61e-4c6f-9694-97b0a0d1751d.png', 187, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f643572777336632d34303064376431342d663631652d346336662d393639342d3937623061306431373531642e706e67),
(90, 'megarayquaza1920x1200.jpg', 187, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6d6567617261797175617a613139323078313230302e6a7067),
(92, 'd5rws6c-400d7d14-f61e-4c6f-9694-97b0a0d1751d.png', 188, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f643572777336632d34303064376431342d663631652d346336662d393639342d3937623061306431373531642e706e67),
(93, 'forest-653448_1920.jpg', 188, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f666f726573742d3635333434385f313932302e6a7067),
(94, 'moss-5619857_1920.jpg', 188, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6d6f73732d353631393835375f313932302e6a7067),
(96, '3i8xg9h2xv851.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f336938786739683278763835312e6a7067),
(97, '25636.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f32353633362e6a7067),
(111, 'memories.png', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6d656d6f726965732e706e67),
(112, 'minimalist-4k-wallpaper_5320563.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6d696e696d616c6973742d346b2d77616c6c70617065725f353332303536332e6a7067),
(113, 'moss-5619857_1920.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6d6f73732d353631393835375f313932302e6a7067),
(114, 'photo-1515879218367-8466d910aaa4.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f70686f746f2d313531353837393231383336372d3834363664393130616161342e6a7067),
(115, 'pobrany plik (2).jpeg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f706f6272616e7920706c696b202832292e6a706567),
(116, 'pokemon-go-hd-wallpaper.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f706f6b656d6f6e2d676f2d68642d77616c6c70617065722e6a7067),
(117, 'SHD-E3-Wallpaper-Retina.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f5348442d45332d57616c6c70617065722d526574696e612e6a7067),
(118, 'star-citizen-anvil-hawk-1.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f737461722d636974697a656e2d616e76696c2d6861776b2d312e6a7067),
(119, 'summer-wallpaper-23.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f73756d6d65722d77616c6c70617065722d32332e6a7067),
(120, 'The_Witcher_3_Wild_Hunt_Wolves_Head_Black_572570_1920x1080.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f5468655f576974636865725f335f57696c645f48756e745f576f6c7665735f486561645f426c61636b5f3537323537305f3139323078313038302e6a7067),
(121, 'the-witcher-3-wild-hunt-geralt-ciri-wallpaper-3440x1440_15.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f7468652d776974636865722d332d77696c642d68756e742d676572616c742d636972692d77616c6c70617065722d3334343078313434305f31352e6a7067),
(122, 'thumb-1920-787215.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f7468756d622d313932302d3738373231352e6a7067),
(123, 'thumb-1920-954241.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f7468756d622d313932302d3935343234312e6a7067),
(124, 'thumb-1920-1011100.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f7468756d622d313932302d313031313130302e6a7067),
(125, 'tyler-bartley-by-tyler-bartley-destiny-2-forsaken-hunter-sub.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f74796c65722d626172746c65792d62792d74796c65722d626172746c65792d64657374696e792d322d666f7273616b656e2d68756e7465722d7375622e6a7067),
(126, 'WP_Damhalla_I-2560x1440_00000.jpg', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f57505f44616d68616c6c615f492d3235363078313434305f30303030302e6a7067),
(127, 'wp1828900-programmer-wallpapers.png', 189, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f7770313832383930302d70726f6772616d6d65722d77616c6c7061706572732e706e67),
(128, 'tyler-bartley-by-tyler-bartley-destiny-2-forsaken-hunter-sub.jpg', 190, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f74796c65722d626172746c65792d62792d74796c65722d626172746c65792d64657374696e792d322d666f7273616b656e2d68756e7465722d7375622e6a7067),
(129, 'WP_Damhalla_I-2560x1440_00000.jpg', 190, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f57505f44616d68616c6c615f492d3235363078313434305f30303030302e6a7067),
(130, 'photo-1515879218367-8466d910aaa4.jpg', 191, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f70686f746f2d313531353837393231383336372d3834363664393130616161342e6a7067),
(131, 'division2_orange.png', 192, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6469766973696f6e325f6f72616e67652e706e67),
(132, 'fantasy-art.-wallpaper_.jpg', 192, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f66616e746173792d6172742e2d77616c6c70617065725f2e6a7067),
(133, 'forest-653448_1920.jpg', 192, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f666f726573742d3635333434385f313932302e6a7067),
(134, 'photo-1515879218367-8466d910aaa4.jpg', 192, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f70686f746f2d313531353837393231383336372d3834363664393130616161342e6a7067),
(135, 'WP_Damhalla_I-2560x1440_00000.jpg', 194, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f57505f44616d68616c6c615f492d3235363078313434305f30303030302e6a7067),
(136, 'ac4_Wallpaper2_1920x1080.jpg', 195, 0x687474703a2f2f3132372e302e302e313a333030322f696d616765732f6163345f57616c6c7061706572325f3139323078313038302e6a7067);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `posts`
--

CREATE TABLE `posts` (
  `user_name` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `post_text` text DEFAULT NULL,
  `id` int(11) NOT NULL,
  `likes` int(20) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `posts`
--

INSERT INTO `posts` (`user_name`, `title`, `post_text`, `id`, `likes`) VALUES
('Piotr', 'Cokolwiek', '3 kutasy kozła', 190, 1),
('Piotr', 'Cośtam', 'ajtam', 191, 5),
('Piotr', 'Coś', 'Kutas Kozła', 192, 1),
('Filip', 'Cokolwiek', 'About hemmmm', 194, 0),
('Filip', 'awd', 'awda', 195, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `userName` varchar(30) DEFAULT NULL,
  `postCount` int(11) DEFAULT 0,
  `likesCount` int(11) DEFAULT 0,
  `access_lvl` int(11) DEFAULT 0,
  `about` varchar(255) DEFAULT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`id_user`, `userName`, `postCount`, `likesCount`, `access_lvl`, `about`, `password`) VALUES
(21, 'Filip', 1, 4, 3, '', 'ChujKurwa'),
(23, 'Kuba', 0, 0, 1, 'Cokolwiek', 'Bobak'),
(24, 'Karolina', 0, 0, 2, 'Cokolwiek', 'Czaja'),
(25, 'Piotr', 0, 0, 1, 'Cokolwiek', 'Tomczyszyn');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `car_brand`
--
ALTER TABLE `car_brand`
  ADD PRIMARY KEY (`brand_id`);

--
-- Indeksy dla tabeli `car_combined`
--
ALTER TABLE `car_combined`
  ADD PRIMARY KEY (`carCombined_id`),
  ADD KEY `carBrand_id` (`carBrand_id`),
  ADD KEY `carEngine_id` (`carEngine_id`),
  ADD KEY `carModel_id` (`carModel_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `car_engine`
--
ALTER TABLE `car_engine`
  ADD PRIMARY KEY (`engine_id`);

--
-- Indeksy dla tabeli `car_model`
--
ALTER TABLE `car_model`
  ADD PRIMARY KEY (`model_id`);

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`IDcomment`);

--
-- Indeksy dla tabeli `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`photo_id`);

--
-- Indeksy dla tabeli `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `car_brand`
--
ALTER TABLE `car_brand`
  MODIFY `brand_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT dla tabeli `car_combined`
--
ALTER TABLE `car_combined`
  MODIFY `carCombined_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `car_engine`
--
ALTER TABLE `car_engine`
  MODIFY `engine_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `car_model`
--
ALTER TABLE `car_model`
  MODIFY `model_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `comments`
--
ALTER TABLE `comments`
  MODIFY `IDcomment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `photos`
--
ALTER TABLE `photos`
  MODIFY `photo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT dla tabeli `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=196;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `car_combined`
--
ALTER TABLE `car_combined`
  ADD CONSTRAINT `car_combined_ibfk_1` FOREIGN KEY (`carBrand_id`) REFERENCES `car_brand` (`brand_id`),
  ADD CONSTRAINT `car_combined_ibfk_2` FOREIGN KEY (`carEngine_id`) REFERENCES `car_engine` (`engine_id`),
  ADD CONSTRAINT `car_combined_ibfk_3` FOREIGN KEY (`carModel_id`) REFERENCES `car_model` (`model_id`),
  ADD CONSTRAINT `car_combined_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
