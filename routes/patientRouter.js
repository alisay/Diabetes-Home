import express from 'express';
import * as Patient from '../controllers/patientController.js';
import { userValidationRules, validate } from '../middleware/validator.js';
import { isLoggedIn, isClinician, isPatient } from '../middleware/auth.js';
const router = express.Router();

router.post('/registerPatient', userValidationRules(), validate, Patient.createPatient);
router.post('/editPatient', isLoggedIn, isClinician, Patient.editPatient);
router.post('/postdaily', isLoggedIn, isPatient, Patient.postData);

export default router;
