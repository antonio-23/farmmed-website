import express from 'express';
import { all_file, add_file, all_prescription, add_prescription } from "../controllers/medical_file.js";

const router = express.Router()

router.post("/allfile", all_file);
router.post("/addfile", add_file);
router.post("/allprescription", all_prescription)
router.post("/add", add_prescription)

export default router 