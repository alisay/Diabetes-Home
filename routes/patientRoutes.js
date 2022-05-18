import express from 'express';
import * as Patient from '../controllers/patientController.js';
import {
    createPatient,
    editPatient,
} from '../controllers/patientController.js';
import { userValidationRules, validate } from '../middleware/validator.js';

const router = express.Router();

// POST Route for registering and creating a patient
router.post('/:username/register', userValidationRules(), validate, createPatient);

// PATCH Route for updating a patient's details as a clinician
router.patch('/:username/account-settings', editPatient);

// POST form data
router.post('/postdaily', Patient.postData);

export default router;
