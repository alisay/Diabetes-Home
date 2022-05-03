import express from "express";
const router = express.Router();
import * as Measurements from '../controllers/measurementsController.js';

router.get("/glucose", Measurements.getGlucose)

router.post("/glucose", Measurements.createGlucose);

export default router; 
