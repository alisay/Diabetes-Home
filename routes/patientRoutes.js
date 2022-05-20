import express from 'express';
import * as Patient from '../controllers/patientController.js';
import {
    displayPatients,
    displaySinglePatient,
    createPatient,
    editPatient,
} from '../controllers/patientController.js';
import { userValidationRules, validate } from '../middleware/validator.js';
import passport from "passport";

const router = express.Router();

//GET Route for Clinician Dashboard - get all patients
// router.get('/:username/dashboard', passport.authenticate('jwt', {session: false}), displayPatients);

// GET Route for single patient page - get one patient
// router.get('/:username', displaySinglePatient)

//PATCH Route for updating a patient's details as a clinician
// router.patch("/:username", editPatient)

// POST Route for registering and creating a patient
router.post('/registerPatient', userValidationRules(), validate, createPatient);

// PATCH Route for updating a patient's details as a clinician
// router.patch('/:username/account-settings', editPatient);

// POST form data
router.post('/postdaily', Patient.postData);

export default router;
