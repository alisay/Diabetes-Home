const express = require('express');
const router = express.Router();
// const {patientParamValidationRules,validate, recipeSaveRules} = require("../middleware/validator")
const {
    displayDashboard, 
} = require('../controllers/patient_controller')
 
//GET Route for Patient Dashboard 
router.get("/patientDashboard", displayDashboard)


module.exports = router;
