import express from 'express';
import * as Clinician from '../controllers/clinicianController.js';

const router = express.Router();

// GET Route for Patient Dashboard
router.get('/clinicianDashboard', Clinician.clinicianDashboard);

router.get('/viewPatient/:username', Clinician.viewPatient);

export default router;
