import express from 'express';
const router = express.Router();
import passport from "passport";
import * as Patient from '../controllers/patientController.js';
import {
    displayPatients,
    displaySinglePatient,
    createPatient, 
    editPatient,
} from '../controllers/patientController.js'
import { userValidationRules, validate } from "../middleware/validator.js"
  

//GET Route for Clinician Dashboard - get all patients
router.get('/:username/dashboard', passport.authenticate('jwt', {session: false}), displayPatients);

// GET Route for single patient page - get one patient
router.get('/:username', displaySinglePatient)

//PATCH Route for updating a patient's details as a clinician
router.patch("/:username", editPatient)

//POST Route for registering and creating a patient
router.post('/:username/add-patient', userValidationRules(), validate, createPatient);

//GET Route for Dashboard 
router.get("/patientDashboard", Patient.displayDashboard);

// POST form data
router.post('/postdaily', Patient.postData);

export default router;
