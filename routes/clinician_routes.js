const express = require('express');
const router = express.Router();

const {
    clinicianDashboard, 
} = require('../controllers/clinician_controller')
 
//GET Route for Patient Dashboard 
router.get("/clinicianDashboard", clinicianDashboard)


module.exports = router;
