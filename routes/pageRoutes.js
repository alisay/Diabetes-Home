import express from 'express';
const router = express.Router();
import * as Page from '../controllers/pageController.js';

//GET Route for Dashboard 
router.get("/patientDashboard", Page.displayDashboard)

//POST Route for Patient/Clinician differentiation (Deliverable Two)
// router.post("/dashboard", Page.differentiateDashboard)

export default router;
