const express = require('express');
const router = express.Router();
const {
  createGlucose
} = require('../controllers/glucose_controller')

router.get("/glucose", (req, res) => res.render('login'))

router.post("/glucose", createGlucose);

module.exports = router;
