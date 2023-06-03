import express from 'express';
import { view_date_these_dates, view_time_these_dates, displaying_patients_for_admission, registration_for_a_medical_visit, create_schedule } from '../controllers/schedule.js';

const router = express.Router();

router.post('/create', create_schedule);
router.post('/view_date', view_date_these_dates);
router.post('/view_time', view_time_these_dates);
router.post('/displaying', displaying_patients_for_admission);
router.post('/registration', registration_for_a_medical_visit);

export default router;
