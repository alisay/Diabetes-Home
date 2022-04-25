const express = require('express');
const router = express.Router();
// const {patientParamValidationRules,validate, recipeSaveRules} = require("../middleware/validator")
const {
    displayPatients, 
    // displayPatient,
    // createPatient,
    // removePatient,
} = require('../controllers/patient_controller')
 
//GET Route for Clinician Dashboard View All Patients
// router.get("/dashboard", displayPatients)

// //GET Route for Single Patient Page
// // router.get("/:id", patientParamValidationRules(),validate, displayPatient)
// router.get("/:id", displayPatient)

// //CREATE Route for New Patients
// // router.post("/add", patientSaveRules(),validate, createPatient)
// router.post("/add", createPatient)

// //DELETE Route for Patients
// router.delete("/:id", removePatient)




module.exports = router;
