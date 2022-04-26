const express = require('express');
const router = express.Router();
const {
  getGlucose,
  createGlucose
} = require('../controllers/glucose_controller')

router.get("/glucose", getGlucose)

router.post("/glucose", createGlucose);

module.exports = router; 
