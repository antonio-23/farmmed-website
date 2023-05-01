import express from 'express';
import { all_drugs, search_drug, edit_drugs } from "../controllers/drug.js";

const router = express.Router()

router.post("/alldrugs", all_drugs);
router.post("/searchdrugs", search_drug);
router.post("/editdrugs", edit_drugs)

export default router;