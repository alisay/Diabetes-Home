import express from 'express';
const router = express.Router();
import passport from "passport";
import * as Patient from '../controllers/patientController.js';
import {
    displayPatients,
    createPatient, 
    editPatient,
} from '../controllers/patientController.js'
import { userValidationRules, validate } from "../middleware/validator.js"
  

//GET Route for Clinician Dashboard
router.get('/:username/dashboard', displayPatients);

//POST Route for registering and creating a patient
router.post('/:username/add-patient', userValidationRules(), validate, createPatient);

//PATCH Route for updating a patient's details as a clinician
router.patch("/:username/account-settings", editPatient)

//GET Route for Dashboard 
router.get("/patientDashboard", Patient.displayDashboard);

// POST form data
router.post('/postdaily', Patient.postData);

export default router;
