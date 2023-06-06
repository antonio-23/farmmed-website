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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `PESEL` decimal(11,0) unsigned zerofill DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `id_role` int unsigned NOT NULL,
  `id_spec` int unsigned DEFAULT '0',
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `PESEL_UNIQUE` (`PESEL`),
  KEY `role _idx` (`id_role`),
  KEY `specjalizacja_idx` (`id_spec`),
  CONSTRAINT `role ` FOREIGN KEY (`id_role`) REFERENCES `roles` (`id_role`),
  CONSTRAINT `specjalizacja` FOREIGN KEY (`id_spec`) REFERENCES `specjalizacja` (`id_spec`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Marcin','Gonciarz',NULL,NULL,'gonciarz.m177@gmail.com','$2a$10$fZw3oiYxU1M5Wfwumh1mYObxQ6TIFa6lia6EfKP8a01fHQcy93YM2',1,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWRfcm9sZSI6MSwiaWF0IjoxNjg1NjUwODc1LCJleHAiOjE2ODU2NTQ0NzV9.uMRf8WZEosuR8P1teMdnLWDwRbGAM3QUh6pBIiBnGII'),(2,'Robert','Kubica',NULL,NULL,'kubica@kubica.com','$2a$10$zMR7/elXRdBFUp.VdXXWruG2Y/bb9Ec7V5N4KBFsGycZi086FRbhK',1,0,NULL),(3,'Jakub','Ćwik',NULL,NULL,'cwok@gmai.com','$2a$10$63.U32GHDIjsI5rSjClONuPumaBSv.NrHI0fvQ4C9uqYKFQMrShjC',3,65,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWRfcm9sZSI6MywiaWF0IjoxNjg0ODc3MTUzLCJleHAiOjE2ODQ4ODA3NTN9.vXM-qR3MvZ5YQXPZrwwdbkxxE99Hw0BqPK1AYOSwpzA'),(5,'Jan','Nowak',NULL,07813023246,'jan.nowak12345@gmail.com','$2a$10$UToAP0upoanCdsRE71JkR.RekvQGm.JDSiZ8dvhE2o2BjEEJ4d/IW',4,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWRfcm9sZSI6NCwiaWF0IjoxNjg1NDc1MjI1LCJleHAiOjE2ODU0Nzg4MjV9.yxA_nI_xdvDFrpO1u2AKmYguMsGd4cjZ--u_fcTzm3U'),(6,'Jan','Kowalski',NULL,22222222222,'j.kowalski@gmail.com','$2a$10$R40stowy9kqd46WLwpCFBuSs9iqcDLOAWGr7GP.R5DPDXhQ3dlXCe',2,0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWRfcm9sZSI6MiwiaWF0IjoxNjg1NjQ4MjU1LCJleHAiOjE2ODU2NTE4NTV9.nKaVqRl3pKXYPYIQraKheL8x0RFwxoyFSVZiONsG5gw');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
