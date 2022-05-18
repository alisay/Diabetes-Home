import express from 'express';
import * as Measurements from '../controllers/measurementsController.js';

const router = express.Router();

router.get('/glucose', Measurements.getGlucose);

router.post('/glucose', Measurements.createGlucose);

export default router;
