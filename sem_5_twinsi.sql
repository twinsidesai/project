-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2026 at 05:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sem_5_twinsi`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `p15` ()   insert into emp(`empnm`,`designation`,`city`,`salary`,`department`)values('priya','developer','ahmd',80000,'it')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `p16` (IN `e_nm` VARCHAR(20), IN `e_desig` VARCHAR(20), IN `e_ct` VARCHAR(20), IN `e_s` INT(20), IN `e_dpt` VARCHAR(20))   insert into emp(`empnm`,`designation`,`city`,`salary`,`department`)values(e_nm,e_desig,e_ct,e_s,e_dpt)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `p17` (IN `eno` INT(20))   select *from emp where empno=eno$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `p18` (IN `desig` VARCHAR(20))   select *from emp where designation=desig$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `procedure1` ()   insert into student values(150,'devani','amr')$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `pro_withpara` (IN `p_id` INT, IN `p_name` VARCHAR(20), IN `p_city` VARCHAR(20))   insert into student values(p_id,p_name,p_city)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_withpara` (IN `p_id` INT)   select *from student where id=p_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `slect_without` ()   select *from student$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `emp`
--

CREATE TABLE `emp` (
  `empno` int(11) NOT NULL,
  `empnm` varchar(20) NOT NULL,
  `designation` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `salary` int(11) NOT NULL,
  `department` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emp`
--

INSERT INTO `emp` (`empno`, `empnm`, `designation`, `city`, `salary`, `department`) VALUES
(1, 'aryan', 'cleark', 'amreli', 20000, 'finance'),
(2, 'kamin', 'manager', 'surat', 60000, 'finance'),
(3, 'nihita', 'head', 'surat', 40000, 'finance'),
(4, 'devani', 'manager', 'surat', 30000, 'finance'),
(5, 'krisha', 'clerk', 'surat', 70000, 'finance'),
(6, 'priya', 'developer', 'ahmd', 80000, 'it'),
(7, 'priya', 'developer', 'ahmd', 80000, 'it'),
(8, 'ajani', 'manager', 'amreli', 40000, 'finance'),
(9, 'krisha', 'clerk', 'amr', 6000, ''),
(10, 'kreni', 'vloggger', 'guj', 45000, 'social');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `pid` int(11) NOT NULL,
  `productname` varchar(20) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`pid`, `productname`, `price`, `quantity`) VALUES
(1, 'headphone', 3000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `stud`
--

CREATE TABLE `stud` (
  `rollno` int(11) NOT NULL,
  `firstname` varchar(20) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `course` varchar(20) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stud`
--

INSERT INTO `stud` (`rollno`, `firstname`, `lastname`, `course`, `semester`) VALUES
(1, 'drashti', 'devani', 'bsc', 5),
(2, 'dharvi', 'dudhat', 'cse', 6),
(4, 'garniya', 'trusha', 'junier', 1),
(5, 'twinsi', 'desai', 'bsc', 5),
(6, 'nhita', 'der', ' bca', 6);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `city`) VALUES
(11, 'd', 'pqr'),
(101, 'devani', 'amr'),
(102, 'der', 'saldi'),
(103, 'abc', 'guj'),
(104, 'xyz', 'amreli'),
(1, 'fdg', 'ffg'),
(104, 'xyz', 'amreli'),
(150, 'devani', 'amr'),
(150, 'devani', 'amr'),
(151, 'nihita', 'gujarat'),
(152, 'trusha', 'bhiladi'),
(99, 'desai', 'chital');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emp`
--
ALTER TABLE `emp`
  ADD PRIMARY KEY (`empno`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `stud`
--
ALTER TABLE `stud`
  ADD PRIMARY KEY (`rollno`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `emp`
--
ALTER TABLE `emp`
  MODIFY `empno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stud`
--
ALTER TABLE `stud`
  MODIFY `rollno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
