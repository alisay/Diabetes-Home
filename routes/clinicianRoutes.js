import express from "express";
const router = express.Router();
import * as Clinician from '../controllers/clinicianController.js';

//GET Route for Patient Dashboard 
router.get("/clinicianDashboard", Clinician.clinicianDashboard);

router.get("/patientData/:username", Clinician.patientData);

export default router;
