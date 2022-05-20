import express from 'express';
import * as Patient from '../controllers/patientController.js';
import { userValidationRules, validate } from '../middleware/validator.js';

const router = express.Router();

router.post('/registerPatient', userValidationRules(), validate, Patient.createPatient);
router.post('/editPatient', Patient.editPatient);
router.post('/postdaily', Patient.postData);

export default router;
