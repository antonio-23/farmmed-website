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
-- Table structure for table `recepty`
--

DROP TABLE IF EXISTS `recepty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recepty` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int unsigned NOT NULL,
  `id_doctor` int unsigned NOT NULL,
  `Date` date NOT NULL DEFAULT (curdate()),
  `key` varchar(4) DEFAULT NULL,
  `validity_date` date NOT NULL DEFAULT ((curdate() + interval 30 day)),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_idx` (`id_user`),
  KEY `doctor_idx` (`id_doctor`),
  CONSTRAINT `doctor_fk` FOREIGN KEY (`id_doctor`) REFERENCES `user` (`id`),
  CONSTRAINT `user_fk` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recepty`
--

LOCK TABLES `recepty` WRITE;
/*!40000 ALTER TABLE `recepty` DISABLE KEYS */;
INSERT INTO `recepty` VALUES (1,6,3,'2023-05-01','3783','2023-05-31'),(2,6,3,'2023-05-11','8159','2023-06-10'),(3,6,1,'2023-05-15','3709','2023-06-14'),(4,6,1,'2023-05-15','6347','2023-06-14'),(5,5,3,'2023-05-23','1866','2023-06-22'),(6,5,3,'2023-05-23','2626','2023-06-22'),(7,5,3,'2023-05-23','0764','2023-06-22'),(8,5,3,'2023-05-23','5549','2023-06-22'),(9,5,3,'2023-05-23','2315','2023-06-22'),(10,5,3,'2023-05-23','4546','2023-06-22'),(11,5,3,'2023-05-23','0255','2023-06-22'),(12,5,3,'2023-05-23','2777','2023-06-22'),(13,5,3,'2023-05-23','6512','2023-06-22'),(14,5,3,'2023-05-23','9185','2023-06-22'),(15,5,3,'2023-05-23','5454','2023-06-22');
/*!40000 ALTER TABLE `recepty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-03  0:04:48
