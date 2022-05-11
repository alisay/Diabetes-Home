import express from 'express';
const router = express.Router();
import * as Patient from '../controllers/patientController.js';

//GET Route for Dashboard 
router.get("/patientDashboard", Patient.displayDashboard);

// POST form data
router.post('/postdaily', Patient.postData);

export default router;
