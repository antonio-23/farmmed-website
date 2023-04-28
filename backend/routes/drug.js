import express from 'express';
import { all_drugs, search_drug } from "../controllers/drug.js";

const router = express.Router()

router.post("/alldrugs", all_drugs);
router.post("/searchdrugs", search_drug);

export default router;