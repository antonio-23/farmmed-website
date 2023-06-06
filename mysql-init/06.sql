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
-- Table structure for table `recepta_leki`
--

DROP TABLE IF EXISTS `recepta_leki`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recepta_leki` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_recepty` int unsigned NOT NULL,
  `id_leku` int NOT NULL,
  `opakowanie` varchar(100) NOT NULL,
  `dawkowanie` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `recepta` (`id_recepty`),
  CONSTRAINT `recepta` FOREIGN KEY (`id_recepty`) REFERENCES `recepty` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recepta_leki`
--

LOCK TABLES `recepta_leki` WRITE;
/*!40000 ALTER TABLE `recepta_leki` DISABLE KEYS */;
INSERT INTO `recepta_leki` VALUES (1,1,100000824,'20 tabletek','2x1',0),(3,2,100000014,'2 tabletki','dawkowanie 1x1',0),(4,2,100004957,'20 tabl','1x1',0),(5,5,100000020,'20 tab.','2x1',0),(6,6,100000020,'14 tabl','2x1',0),(7,6,100000037,'14 tabl','2x1',1),(8,6,100006494,'60 tabl','4x1',0),(9,14,100000043,'12df','2x1',1),(10,14,100430281,'12axa','1x1',1);
/*!40000 ALTER TABLE `recepta_leki` ENABLE KEYS */;
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
