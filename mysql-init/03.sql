-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: farmmed
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `medical_file`
--

DROP TABLE IF EXISTS `medical_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_file` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_doctor` int unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT (curdate()),
  `cel_wizyty` text NOT NULL,
  `objawy` blob NOT NULL,
  `wynik_badania` blob NOT NULL,
  `Zalecenia` blob NOT NULL,
  `Termin_kolejnej_wizyty` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user` (`id_user`),
  KEY `doctor` (`id_doctor`),
  CONSTRAINT `doctor` FOREIGN KEY (`id_doctor`) REFERENCES `user` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_file`
--

LOCK TABLES `medical_file` WRITE;
/*!40000 ALTER TABLE `medical_file` DISABLE KEYS */;
INSERT INTO `medical_file` VALUES (1,6,1,'2023-05-11','leczenie choroby',_binary '^Â®&k-õ\\\ã!_Ú„\Ð0c‚wH\êØŒZsx°}\Ð\Ëh',_binary 'ú\Úñ1½ï½¢€\Ñ1¨v~j',_binary '\r’e]p\Å÷—M<\Èi“ž\Ü','-');
/*!40000 ALTER TABLE `medical_file` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-03  0:04:47
