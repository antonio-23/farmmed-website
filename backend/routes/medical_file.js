import express from 'express';
import { all_file, add_file, all_prescription, add_prescription, add_drug, show_prescription, view_information } from "../controllers/medical_file.js";

const router = express.Router()

router.post("/allfile", all_file);
router.post("/addfile", add_file);
router.post("/allprescription", all_prescription);
router.post("/add", add_prescription);
router.post("/adddrug", add_drug);
router.post("/show", show_prescription);
router.post("/view", view_information);
export default router 