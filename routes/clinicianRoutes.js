import express from 'express';
import * as Clinician from '../controllers/clinicianController.js';

const router = express.Router();

router.get('/viewPatient/:username', Clinician.viewPatient);

export default router;
