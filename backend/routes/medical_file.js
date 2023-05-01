import express from 'express';
import { all_file, add_file, all_prescription } from "../controllers/medical_file.js";

const router = express.Router()

router.post("/allfile", all_file);
router.post("/addfile", add_file);
router.post("/allprescription", all_prescription)

export default router 