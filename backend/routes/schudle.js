import express from 'express';
import { create_schudle, displaying_patients_for_admission, registration_for_a_medical_visit, view_these_dates } from '../controllers/schudle.js';

const router = express.Router()

router.post("/create", create_schudle);
router.post("/view", view_these_dates);
router.post("/displaying", displaying_patients_for_admission);
router.post("/registration", registration_for_a_medical_visit);

export default router 