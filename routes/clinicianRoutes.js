import express from "express";
const router = express.Router();
import * as Clinician from '../controllers/clinicianController.js';

//GET Route for Patient Dashboard 
router.get("/clinicianDashboard", Clinician.clinicianDashboard);

router.get("/viewPatient/:username", Clinician.viewPatient);

export default router;
