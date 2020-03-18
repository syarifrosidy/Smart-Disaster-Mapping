-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2018 at 06:11 AM
-- Server version: 10.2.18-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kajianmu_stimata_bnpb`
--

-- --------------------------------------------------------

--
-- Table structure for table `detailkejadian`
--

CREATE TABLE `detailkejadian` (
  `id` int(11) NOT NULL,
  `idkejadian` int(11) NOT NULL,
  `idwilayah` int(4) NOT NULL,
  `meninggal` int(11) NOT NULL DEFAULT 0,
  `hilang` int(11) NOT NULL DEFAULT 0,
  `luka` int(11) NOT NULL DEFAULT 0,
  `mengungsi` int(11) NOT NULL DEFAULT 0,
  `terdampak` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detailkejadian`
--

INSERT INTO `detailkejadian` (`id`, `idkejadian`, `idwilayah`, `meninggal`, `hilang`, `luka`, `mengungsi`, `terdampak`) VALUES
(17, 3, 3174010, 0, 0, 0, 3210, 6210),
(18, 3, 3174020, 2, 0, 0, 87, 121),
(19, 3, 3174030, 1, 0, 0, 284, 312),
(20, 3, 3174040, 0, 0, 0, 351, 412),
(21, 3, 3174050, 10, 0, 0, 17251, 55411),
(22, 3, 3174060, 0, 0, 0, 25157, 8875),
(23, 3, 3174070, 0, 0, 0, 5411, 17251),
(24, 3, 3174080, 0, 0, 0, 3981, 6824),
(25, 3, 3173010, 1, 0, 0, 286, 10392),
(26, 3, 3173020, 0, 0, 0, 87, 234),
(27, 3, 3173030, 0, 0, 0, 612, 212),
(28, 3, 3173040, 0, 0, 0, 64, 1045),
(29, 3, 3173050, 2, 0, 0, 589, 768),
(30, 3, 3173060, 0, 0, 0, 1523, 5432),
(31, 3, 3173070, 0, 0, 0, 157, 384),
(32, 3, 3173080, 0, 0, 0, 108, 1086),
(33, 3, 3171010, 0, 0, 0, 13256, 11498),
(34, 3, 3171020, 0, 0, 0, 323, 367),
(35, 3, 3171030, 0, 0, 0, 6142, 5662),
(36, 3, 3171040, 0, 0, 0, 198, 219),
(37, 3, 3171050, 0, 0, 0, 156, 281),
(38, 3, 3171060, 0, 0, 0, 104, 112),
(39, 3, 3171070, 0, 0, 0, 2811, 1321),
(40, 3, 3171080, 0, 0, 0, 963, 981),
(41, 3, 3171090, 1, 0, 0, 143, 156),
(42, 3, 3171100, 0, 0, 0, 751, 768),
(43, 3, 3172040, 1, 0, 0, 154, 93),
(44, 3, 3172070, 2, 0, 0, 99, 109),
(45, 3, 3172080, 8, 0, 0, 19437, 50003),
(46, 3, 3175010, 0, 0, 0, 581, 81),
(48, 3, 3175020, 0, 0, 0, 491, 56),
(49, 3, 3175030, 2, 0, 0, 1812, 196),
(50, 3, 3175040, 0, 0, 0, 708, 26),
(51, 3, 3175050, 4, 0, 0, 2712, 672),
(52, 3, 3175060, 0, 0, 0, 1014, 189),
(53, 2, 3174040, 20, 5, 0, 12405, 42405);

-- --------------------------------------------------------

--
-- Table structure for table `kejadian`
--

CREATE TABLE `kejadian` (
  `id` int(11) NOT NULL,
  `idwilayah` int(7) DEFAULT NULL,
  `idpeta` int(11) DEFAULT NULL,
  `namakejadian` varchar(50) NOT NULL,
  `klusterKorban` enum('Y','N') NOT NULL DEFAULT 'Y',
  `klusterLogistik` enum('Y','N') NOT NULL DEFAULT 'Y',
  `tahunMulai` int(4) NOT NULL,
  `bulanMulai` int(2) NOT NULL,
  `tglMulai` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kejadian`
--

INSERT INTO `kejadian` (`id`, `idwilayah`, `idpeta`, `namakejadian`, `klusterKorban`, `klusterLogistik`, `tahunMulai`, `bulanMulai`, `tglMulai`) VALUES
(2, 3522, 1, 'Banjir Kota Jan - 2015', 'Y', 'Y', 2015, 1, 24),
(3, 31, 1, 'Banjir DKI Jakarta Januari 2014', 'Y', 'Y', 2014, 1, 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detailkejadian`
--
ALTER TABLE `detailkejadian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idkejadian` (`idkejadian`),
  ADD KEY `idwilayah` (`idwilayah`);

--
-- Indexes for table `kejadian`
--
ALTER TABLE `kejadian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_kejadian_idwilayah` (`idwilayah`),
  ADD KEY `idpeta` (`idpeta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detailkejadian`
--
ALTER TABLE `detailkejadian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `kejadian`
--
ALTER TABLE `kejadian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detailkejadian`
--
ALTER TABLE `detailkejadian`
  ADD CONSTRAINT `detailkejadian_ibfk_1` FOREIGN KEY (`idkejadian`) REFERENCES `kejadian` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detailkejadian_ibfk_2` FOREIGN KEY (`idwilayah`) REFERENCES `wilayah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kejadian`
--
ALTER TABLE `kejadian`
  ADD CONSTRAINT `kejadian_ibfk_1` FOREIGN KEY (`idpeta`) REFERENCES `peta` (`id`),
  ADD CONSTRAINT `kejadianwil` FOREIGN KEY (`idwilayah`) REFERENCES `wilayah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
