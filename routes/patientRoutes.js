import express from 'express';
const router = express.Router();
import * as Patient from "../controllers/patientController.js"
 
router.post('/postdaily', Patient.postData);

export default router;
