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
-- Table structure for table `specjalizacja`
--

DROP TABLE IF EXISTS `specjalizacja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specjalizacja` (
  `id_spec` int unsigned NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_spec`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specjalizacja`
--

LOCK TABLES `specjalizacja` WRITE;
/*!40000 ALTER TABLE `specjalizacja` DISABLE KEYS */;
INSERT INTO `specjalizacja` VALUES (0,''),(1,'Alergologia'),(2,'Anestezjologia'),(3,'Angiologia'),(4,'Audiologia i foniatria'),(5,'Balneologia '),(6,'Chirurgia dziecięca'),(7,'Chirurgia klatki piersiowej'),(8,'Chirurgia naczyniowa'),(9,'Chirurgia ogólna'),(10,'Chirurgia onkologiczna'),(11,'Chirurgia plastyczna'),(12,'Chirurgia szczękowo-twarzowa'),(13,'Choroby płuc'),(14,'Choroby płuc dzieci'),(15,'Choroby wewnętrzne'),(16,'Choroby zakaźne'),(17,'Dermatologia'),(18,'Diabetologia'),(19,'Diagnostyka laboratoryjna'),(20,'Endokrynologia'),(21,'Endokrynologia ginekologiczna i rozrodczość'),(22,'Endokrynologia i diabetologia dziecięca'),(23,'Epidemiologia'),(24,'Farmakologia kliniczna'),(25,'Gastroenterologia'),(26,'Gastroenterologia dziecięca'),(27,'Genetyka kliniczna'),(28,'Geriatria'),(29,'Ginekologia onkologiczna'),(30,'Hematologia'),(31,'Hipertensjologia'),(32,'Immunologia kliniczna'),(33,'Intensywna terapia'),(34,'Kardiochirurgia'),(35,'Kardiologia'),(36,'Kardiologia dziecięca'),(37,'Medycyna lotnicza'),(38,'Medycyna morska i tropikalna'),(39,'Medycyna nuklearna'),(40,'Medycyna paliatywna'),(41,'Medycyna pracy'),(42,'Medycyna ratunkowa'),(43,'Medycyna rodzinna'),(44,'Medycyna sądowa'),(45,'Medycyna sportowa'),(46,'Mikrobiologia lekarska'),(47,'Nefrologia'),(48,'Nefrologia dziecięca'),(49,'Neonatologia'),(50,'Neurochirurgia'),(51,'Neurologia'),(52,'Neurologia dziecięca'),(53,'Neuropatologia'),(54,'Okulistyka'),(55,'Onkologia i hematologia dziecięca'),(56,'Onkologia kliniczna'),(57,'Ortopedia i traumatologia narządu ruchu'),(58,'Otorynolaryngologia'),(59,'Otorynolaryngologia dziecięca'),(60,'Patomorfologia'),(61,'Pediatria'),(62,'Pediatria metaboliczna'),(63,'Perinatologia'),(64,'Położnictwo i ginekologia'),(65,'Psychiatria'),(66,'Psychiatria dzieci i młodzieży'),(67,'Radiologia i diagnostyka obrazowa'),(68,'Radioterapia onkologiczna'),(69,'Rehabilitacja medyczna'),(70,'Reumatologia'),(71,'Seksuologia'),(72,'Toksykologia kliniczna'),(73,'Transfuzjologia kliniczna'),(74,'Transplantologia kliniczna'),(75,'Urologia'),(76,'Urologia dziecięca'),(77,'Zdrowie publiczne');
/*!40000 ALTER TABLE `specjalizacja` ENABLE KEYS */;
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
